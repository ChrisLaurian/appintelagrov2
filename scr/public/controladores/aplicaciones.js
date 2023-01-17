var myCharacteristic;
var TotalTrabajadores = [];

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
});

const { createApp } = Vue;


createApp({
    name: "cosecha",
    data() {
        return {
            logo: "",
            version: "",
            modulo: "Registros",
            titulo: "Registros",
            nombre: "",
            aside: {
                registros: true,
                ProductosExtra: false,
                productosReceta: false,
                NuevaReceta: false,
                AgregarTrabajadores: false,

            },
            unidades: [],
            actividades: [],
            metodosAplicaciones: [],
            boquillas: [],
            tipoControl: [],
            trabajadores: [],
            lotes: [],
            alcances: [],
            productos: [],
            medidas: [],
            recetas: [],
            totaltrabajador: [],
            trabajadoresCopia: [],

            registro: {
                maestro: {
                    UUID: "",
                    fecha: "",
                    rancho: "",
                    actividad: "",
                    metodoAplicacion: "",
                    boquilla: "",
                    gasto: "",
                    tipo_control: "",
                    unidadMedidaCantidad: "",
                    parihuelasGrupal: "",
                    recetaProducto: "",
                },
                trabajadores: [],
                productos: [],
                recetas: [],
            },
            trabajador: {
                UUID: "",
                trabajadores: "",
                lote: "",
                inicioLote: "",
                finLote: "",

            },
            producto: {
                UUID: "",
                producto: "",
                cantidadProducto: "",
                unidadMedidaTipo: "",
            },
            receta: {
                // UUID: "",
                nombreReceta: "",
                alcance: "",
                recetaProducto: [],
            },





        };
    },

    methods: {
        inicio() {
            location.href = host() + "/modulos.html";
        },
        logout() {
            salir();
        },
        menu(puntero, titulo) {

            this.titulo = titulo;
            var isMobile = {
                Android() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows() {
                    return (
                        navigator.userAgent.match(/IEMobile/i) ||
                        navigator.userAgent.match(/WPDesktop/i)
                    );
                },
                any() {
                    return (
                        isMobile.Android() ||
                        isMobile.BlackBerry() ||
                        isMobile.iOS() ||
                        isMobile.Opera() ||
                        isMobile.Windows()
                    );
                },
            };
            if (isMobile.any()) $('[data-widget="pushmenu"]').PushMenu("toggle");
            this.aside = {
                registros: false,
                ProductosExtra: false,
                productosReceta: false,
                NuevaReceta: false,
                AgregarTrabajadores: false,
            };
            this.aside[puntero] = true;

        },
        mountdata() {
            this.unidades = JSON.parse(localStorage.getItem("cat_unidades"));
            this.actividades = JSON.parse(localStorage.getItem("cat_actividades"));
            this.metodosAplicaciones = JSON.parse(localStorage.getItem("cat_metodos"));
            this.boquillas = JSON.parse(localStorage.getItem("cat_boquillas"));
            this.tipoControl = JSON.parse(localStorage.getItem("cat_tipos"));
            this.trabajadores = JSON.parse(localStorage.getItem("cat_trabajadores"));
            this.lotes = JSON.parse(localStorage.getItem("cat_lotes"));
            this.alcances = JSON.parse(localStorage.getItem("cat_alcance"));
            this.productos = JSON.parse(localStorage.getItem("cat_productos"));
            this.medidas = JSON.parse(localStorage.getItem("cat_medidas"));
            this.recetas = JSON.parse(localStorage.getItem("cat_recetas"));

            this.registro.maestro.UUID = generateUUID();
            this.trabajador.UUID = this.registro.maestro.UUID;
            this.producto.UUID = this.registro.maestro.UUID;



        },
        enviar(numero) {

            switch (numero) {
                case 1:
                    {
                        console.log(this.registro);
                    }
                    break;
                case 2:
                    {
                        if (document.getElementById("filtro").value == "") {
                            alert("Ingresa un nombre");
                            document.getElementById("filtro").focus();
                            return 0;

                        }
                        if (document.getElementById("nombreLote").value == "") {
                            alert("Selecciona un lote");
                            document.getElementById("nombreLote").focus();
                            return 0;
                        }
                        if (document.getElementById("inicioLote").value == "" || document.getElementById("inicioLote").value <= 0) {
                            alert("Falta ingresar un numero positivo en el inicio del lote");
                            document.getElementById("inicioLote").focus();
                            return 0;
                        }
                        if (document.getElementById("finLote").value == "" || document.getElementById("finLote").value <= 0) {
                            alert("Falta ingresar un numero positivo en el final del lote");
                            document.getElementById("finLote").focus();
                            return 0;
                        }
                        var DesactivarInput = document.getElementById("filtro");
                        DesactivarInput.disabled = true;

                        this.registro.trabajadores.push(this.trabajador);
                        this.trabajadoresCopia.push(this.trabajador);
                        console.log(this.registro.trabajadores);
                        this.trabajador = {
                            UUID: this.registro.maestro.UUID,
                            trabajadores: this.trabajador.trabajadores,
                            lote: "",
                            inicioLote: "",
                            finLote: "",
                        };
                        document.getElementById("nombreLoteInput").value = "";
                    }
                    break;
                case 3:
                    {
                        if (document.getElementById("nombreProductoInput").value == "") {
                            alert("Falta ingresar un producto");
                            document.getElementById("nombreProductoInput").focus();
                            return 0;
                        }
                        if (document.getElementById("cantidadProducto").value == "" || document.getElementById("cantidadProducto").value <= 0) {
                            alert("Falta ingresar una cantidad positiva");
                            document.getElementById("cantidadProducto").focus();
                            return 0;
                        }
                        if (document.getElementById("unidadMedida").value == "") {
                            alert("Falta ingresar una unidad de medida");
                            document.getElementById("unidadMedida").focus();
                            return 0;
                        }

                        this.registro.productos.push(this.producto);
                        this.receta.recetaProducto.push(this.producto);
                        console.log(this.registro.productos);


                        this.producto = {
                            UUID: this.registro.maestro.UUID,
                            producto: "",
                            cantidadProducto: "",
                            unidadMedidaTipo: "",
                        };
                        document.getElementById("nombreProductoInput").value = "";
                    }
                    break;
                case 4:
                    {
                        if (this.registro.productos.length === 0) {
                            alert("Falta ingresar datos");
                            return 0;
                        }
                        this.registro.recetas.push(this.receta);
                        console.log(this.registro.recetas);
                        this.receta = {
                            nombreReceta: "",
                            alcance: "",
                            recetaProducto: [],
                        };
                        this.menu('registros', 'Registros');
                    }
                    break;
                case 5:
                    {
                        // this.registro.trabajadores.push(this.totaltrabajador);
                        this.trabajadoresCopia.push(this.totaltrabajador);
                        // this.arregloSinDuplicarse = this.trabajadoresCopia.filter((item, index) => {
                        //     return this.trabajadoresCopia.indexOf(item) === index;
                        // });
                        if (this.registro.trabajadores.length === 0) {
                            alert("Falta ingresar datos");
                            return 0;
                        }
                        console.log(this.trabajadoresCopia);
                        var hash = {};
                        this.trabajadoresCopia = this.trabajadoresCopia.filter(function(current) {
                            var exists = !hash[current.id];
                            hash[current.id] = true;
                            return exists;
                        });
                        this.menu('registros', 'Registros');


                    }
                    break;
            }

            // this.registro.maestro.UUID = generateUUID();
            // console.log(this.registro.trabajadores);

        },
        cancelar() {
            console.log("se canceló todo");
        },
        borrarLote(index) {
            this.registro.trabajadores.splice(index, 1);
            console.log(this.registro.trabajadores);

        },
        borrarProductos(index) {
            this.registro.productos.splice(index, 1);
            console.log(this.registro.productos);
        },
        borrarTrabajadores(value) {
            // this.registro.trabajadores.splice(value, 1);

            var arr = this.registro.trabajadores;
            this.registro.trabajadores = arr.filter(
                (e) => e.trabajadores !== value
            );
            var arr1 = this.trabajadoresCopia;
            this.trabajadoresCopia = arr1.filter(
                (e) => e.trabajadores !== value
            );
            console.log(this.registro.trabajadores);
        },

        nombreLote(id) {
            var nLote = "";
            this.lotes.forEach((element) => {
                if (id == element.cat_holding_04_unidades_productivas_lotes_id) {
                    nLote = element.lote;
                }
            });
            return nLote;
        },
        nombreAlcance(id) {
            var nAlcance = "";
            this.alcances.forEach((element) => {
                if (id == element.cat_control_aplicaciones_alcance_mu_id) {
                    nAlcance = element.descripcion_alcance;
                }
            });
            return nAlcance;
        },
        nombreProductos(id) {
            var nProductos = "";
            this.productos.forEach((element) => {
                if (id == element.cat_compras_productos_id) {
                    nProductos = element.producto;
                }
            });
            return nProductos;
        },
        nombreUnidadMedida(id) {
            var nMedidas = "";
            this.medidas.forEach((element) => {
                if (id == element.cat_compras_productos_unidad_de_medida_mu_id) {
                    nMedidas = element.descripcion_cat_compras_productos_unidad_de_medida;
                }
            });
            return nMedidas;
        },

        FiltrarPorTrabajador() {

            $("#filtro").on("input", function() {
                var count = 0;

                $('#nombreTrabajador option').each(function() {
                    if ($(this).text().indexOf($("#filtro").val()) == -1) {
                        $(this).prop("selected", false);
                        $(this).fadeOut();
                    } else {
                        $(this).prop("selected", false);
                        $(this).fadeIn();
                        count = count + 1;
                        document.getElementById("nombreTrabajador").size = count;
                    }

                });
            });
        },
        FiltrarPorLote() {
            $('#nombreLoteInput').on("input", function() {
                var count = 0;

                $('#nombreLote option').each(function() {
                    if ($(this).text().indexOf($("#nombreLoteInput").val()) == -1) {
                        $(this).prop("selected", false);
                        $(this).fadeOut();
                    } else {
                        $(this).prop("selected", false);
                        $(this).fadeIn();
                        count = count + 1;
                        document.getElementById("nombreLote").size = count;
                    }
                });
            });
        },

        FiltrarPorProducto() {
            $('#nombreProductoInput').on("input", function() {
                var count = 0;

                $('#nombreProducto option').each(function() {
                    if ($(this).text().indexOf($("#nombreProductoInput").val()) == -1) {
                        $(this).prop("selected", false);
                        $(this).fadeOut();
                    } else {
                        $(this).prop("selected", false);
                        $(this).fadeIn();
                        count = count + 1;
                        document.getElementById("nombreProducto").size = count;
                    }
                });
            });
            // $('#nombreProductoReceta').on("input", function() {
            //     var count = 0;

            //     $('#nombreProducto option').each(function() {
            //         if ($(this).text().indexOf($("#nombreProductoReceta").val()) == -1) {
            //             $(this).prop("selected", false);
            //             $(this).fadeOut();
            //         } else {
            //             $(this).prop("selected", false);
            //             $(this).fadeIn();
            //             count = count + 1;
            //             document.getElementById("productosReceta").size = count;
            //         }
            //     });
            // });
        },

        ocultarSelect() {
            var dato = document.getElementById("filtro")

            if (dato.value == "") {

                document.getElementById("nombreTrabajador").style.display = "none";
            } else { document.getElementById("nombreTrabajador").style.display = "initial"; }

        },
        ocultarSelectLote() {
            var dato = document.getElementById("nombreLoteInput")
            if (dato.value == "") {
                document.getElementById("nombreLote").style.display = "none";
            } else { document.getElementById("nombreLote").style.display = "initial"; }

        },
        ocultrarSelectProductos() {
            var dato = document.getElementById("nombreProductoInput")
            if (dato.value == "") {
                document.getElementById("nombreProducto").style.display = "none";
            } else { document.getElementById("nombreProducto").style.display = "initial"; }

            // var datoReceta = document.getElementById("nombreProductoReceta")
            // if (datoReceta.value == "") {
            //     document.getElementById("productosReceta").style.display = "none";
            // } else { document.getElementById("productosReceta").style.display = "initial"; }
        },

        pasarSelectAInput() {
            var selectElement = document.getElementById("nombreTrabajador");
            var selected = selectElement.options[selectElement.selectedIndex].text;
            document.getElementById("filtro").value = selected;
            document.getElementById("nombreTrabajador").style.display = "none";
        },
        pasarSelectAInputLote() {
            var selectElement = document.getElementById("nombreLote");
            var selected = selectElement.options[selectElement.selectedIndex].text;
            document.getElementById("nombreLoteInput").value = selected;
            document.getElementById("nombreLote").style.display = "none";
        },
        pasarSelectAInputProductos() {
            var selectElement = document.getElementById("nombreProducto");
            var selected = selectElement.options[selectElement.selectedIndex].text;
            document.getElementById("nombreProductoInput").value = selected;
            document.getElementById("nombreProducto").style.display = "none";

            // var selectedElementReceta = document.getElementById("productosReceta");
            // var selectedReceta = selectedElementReceta.options[selectedElementReceta.selectedIndex].text;
            // document.getElementById("nombreProductoReceta").value = selectedReceta;
            // document.getElementById("productosReceta").style.display = "none";


        },



        nombre_trabajador(id) {
            var n = "";

            this.trabajadores.forEach((element) => {
                if (id == element.cat_trabajadores_altas_id) {
                    n = element.nombre;
                }
            });
            return n;
        },
        refresch_table() {
            if ($.fn.dataTable.isDataTable("#tablaRank")) {
                $("#tablaRank").DataTable().destroy();
                $(document).ready(function() {
                    $("#tablaRank").DataTable({
                        responsive: true,
                        autoWidth: true,
                        searching: false,
                        paging: false,
                    });
                });
            } else {
                $(document).ready(function() {
                    $("#tablaRank").DataTable({
                        responsive: true,
                        autoWidth: true,
                        searching: false,
                        paging: false,
                    });
                });
            }
        }
    },
    computed: {

    },
    mounted() {

        this.version = version();
        this.mountdata();


    },
    created() {},
    components: {},
    props: [],
}).mount('#app');