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
                    unidadMedidaTipo: "",
                    unidadMedidaCantidad: "",
                    parihuelasGrupal: "",
                    alcance: "",
                    producto: "",
                    nombreReceta: "",
                    cantidadProducto: "",
                    medida: "",

                },
                trabajadores: [],
                productos: [],
            },
            trabajador: {
                UUID: "",
                trabajadores: "",
                lote: "",
                inicioLote: "",
                finLote: "",

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
                registros: false
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

            this.registro.maestro.UUID = generateUUID();
            this.trabajador.UUID = this.registro.maestro.UUID;


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
                        // creacionDeObjeto(totalTrabajadores);
                        // const Enviartrabajadores = {
                        //     trabajadores: this.trabajadores,
                        //     lotes: this.lotes,
                        //     inicioLote: this.inicioLote,
                        //     finLote: this.finLote
                        // }
                        var DesactivarInput = document.getElementById("filtro");
                        DesactivarInput.disabled = true;
                        this.registro.trabajadores.push(this.trabajador);
                        console.log(this.registro.trabajadores);
                        this.trabajador = {
                            UUID: this.registro.maestro.UUID,
                            trabajadores: "",
                            lote: "",
                            inicioLote: "",
                            finLote: "",

                        };

                    }
                    break;
            }

            this.registro.maestro.UUID = generateUUID();
            console.log(this.registro.trabajadores);

        },
        cancelar() {

        },
        borrarLote(index) {


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

            $('#filtro').on("input", function() {
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

        ocultarSelect() {
            var dato = document.getElementById("filtro")

            if (dato.value == "") {

                document.getElementById("nombreTrabajador").style.display = "none";
            } else { document.getElementById("nombreTrabajador").style.display = "initial"; }

        },

        pasarSelectAInput() {
            var selectElement = document.getElementById("nombreTrabajador");
            var selected = selectElement.options[selectElement.selectedIndex].text;
            document.getElementById("filtro").value = selected;
            document.getElementById("nombreTrabajador").style.display = "none";
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