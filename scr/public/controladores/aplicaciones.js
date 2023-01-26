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
                AgregarProductos: false,
                pendientes:false

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
                    tipo_control: [],
                    unidadMedidaCantidad: "",
                    parihuelasGrupal: "",
                },
                lista_trabajadores: [],
                trabajadores: [],
                productos: [],
            },
            registro_receta: {
                UUID: "",
                nombre: "",
                cat_control_aplicaciones_alcance_mu_id: "",
                capturista:localStorage.getItem("ses_usuario"),
                cat_usuarios_licencias_id:localStorage.getItem("cat_usuarios_licencias_id"),
                productos: []
            },
            trabajador: {
                UUID: "",
                nombre: "",
                cat_trabajadores_altas_id: "",
                cat_holding_04_unidades_productivas_lotes_id: "",
                lote: "",
                inicio: "",
                fin: "",

            },
            producto: {
                UUID: "",
                cat_compras_productos_id: "",
                cantidad: "",
                cat_compras_productos_unidad_de_medida_mu_id: "",
                capturista:localStorage.getItem("ses_usuario")
            },
            productoExtras: {
                UUID: "",
                productoExtra: "",
                cantidadProductoExtra: "",
                unidadMedidaTipoExtra: "",
            },
            nombre_trabajador: "",
            nombre_lote: "",
            nombre_producto: "",
            receta: "",

            registros_pendientes:[],
            num_pendientes:0

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
                AgregarProductos: false,
                pendientes:false
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

        localStorage.setItem("regs_aplicaciones",JSON.stringify([]));



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
                        this.trabajadoresCopia = this.trabajadoresCopia.filter(function (current) {
                            var exists = !hash[current.id];
                            hash[current.id] = true;
                            return exists;
                        });
                        this.menu('registros', 'Registros');
                    }
                    break;
                case 6:
                    {
                        if (document.getElementById("nombreProductoInputExtra").value == "") {
                            alert("Falta ingresar un producto");
                            document.getElementById("nombreProductoInputExtra").focus();
                            return 0;
                        }
                        if (document.getElementById("cantidadProductoExtra").value == "" || document.getElementById("cantidadProductoExtra").value <= 0) {
                            alert("Falta ingresar una cantidad positiva");
                            document.getElementById("cantidadProductoExtra").focus();
                            return 0;
                        }
                        if (document.getElementById("unidadMedidaExtra").value == "") {
                            alert("Falta ingresar una unidad de medida");
                            document.getElementById("unidadMedidaExtra").focus();
                            return 0;
                        }

                        this.registro.maestro.productosExtraReceta.push(this.productoExtras);
                        console.log(this.registro.maestro.productosExtraReceta);


                        this.productoExtras = {
                            UUID: this.registro.maestro.UUID,
                            productoExtra: "",
                            cantidadProductoExtra: "",
                            unidadMedidaTipoExtra: "",
                        };
                        document.getElementById("nombreProductoInputExtra").value = "";
                    }
                    break;
            }

            // this.registro.maestro.UUID = generateUUID();
            // console.log(this.registro.trabajadores);

        },
        AgregarTipoControl() {
            var input = document.getElementById("inputTipoControl");
            var lista = document.getElementById("SelectTipoControl");

            if ((lista.value != "") && (lista.value != "reset")) {
                this.registro.maestro.tipo_control.push(lista.value);
                lista.options[lista.selectedIndex].setAttribute("disabled", "disabled");
                var selected = lista.options[lista.selectedIndex].text;
                input.value += (selected + ", ");
            }


            if (lista.value == "Borrar Todo") {
                input.value = "";
                for (i = 0; i < lista.options.length; i++) {
                    lista.options[i].removeAttribute("disabled");
                }
                this.registro.maestro.tipo_control = [];

            }



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
        borrarProductosExtra(index) {
            this.registro.maestro.productosExtraReceta.splice(index, 1);
            console.log(this.registro.maestro.productosExtraReceta);
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
            console.log(id);
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

            $("#filtro").on("input", function () {
                var count = 0;

                $('#nombreTrabajador option').each(function () {
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
            $('#nombreLoteInput').on("input", function () {
                var count = 0;

                $('#nombreLote option').each(function () {
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
            $('#nombreProductoInput').on("input", function () {
                var count = 0;

                $('#nombreProducto option').each(function () {
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
        },
        FiltrarPorProductoExtra() {
            $('#nombreProductoInputExtra').on("input", function () {
                var count = 0;

                $('#nombreProductoExtra option').each(function () {
                    if ($(this).text().indexOf($("#nombreProductoInputExtra").val()) == -1) {
                        $(this).prop("selected", false);
                        $(this).fadeOut();
                    } else {
                        $(this).prop("selected", false);
                        $(this).fadeIn();
                        count = count + 1;
                        document.getElementById("nombreProductoExtra").size = count;
                    }
                });
            });
        },
        FiltrarPorActividad() {
            $("#inputActividad").on("input", function () {
                var count = 0;

                $('#selectActividad option').each(function () {
                    if ($(this).text().indexOf($("#inputActividad").val()) == -1) {
                        $(this).prop("selected", false);
                        $(this).fadeOut();
                    } else {
                        $(this).prop("selected", false);
                        $(this).fadeIn();
                        count = count + 1;
                        document.getElementById("selectActividad").size = count;
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
        },
        ocultarSelectProductosExtra() {
            var datoReceta = document.getElementById("nombreProductoInputExtra")
            if (datoReceta.value == "") {
                document.getElementById("nombreProductoExtra").style.display = "none";
            } else { document.getElementById("nombreProductoExtra").style.display = "initial"; }
        },
        ocultarSelectActividades() {
            var dato = document.getElementById("inputActividad")

            if (dato.value == "") {

                document.getElementById("selectActividad").style.display = "none";
            } else { document.getElementById("selectActividad").style.display = "initial"; }
        },
        ocultarParihuela(mostrar) {
            if (mostrar) {
                document.getElementById("GastoLabel").style.display = "initial";
                document.getElementById("GastoInput").style.display = "initial";
            } else {
                document.getElementById("GastoLabel").style.display = "none";
                document.getElementById("GastoInput").style.display = "none";
            }
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
        },
        pasarSelectAInputProductosExtra() {
            var selectedElementReceta = document.getElementById("nombreProductoExtra");
            var selectedReceta = selectedElementReceta.options[selectedElementReceta.selectedIndex].text;
            document.getElementById("nombreProductoInputExtra").value = selectedReceta;
            document.getElementById("nombreProductoExtra").style.display = "none";
        },
        pasarSelectAInputActividades() {
            var selectElement = document.getElementById("selectActividad");
            var selected = selectElement.options[selectElement.selectedIndex].text;
            document.getElementById("inputActividad").value = selected;
            document.getElementById("selectActividad").style.display = "none";
        },
        pasarSelectAInputTipoControl() {
            var selectElement = document.getElementById("SelectTipoControl");
            var selected = selectElement.options[selectElement.selectedIndex].text;
            document.getElementById("inputTipoControl").value = selected;
        },
        nombre_trabajadores(id) {
            var n = "";

            this.trabajadores.forEach((element) => {
                if (id == element.cat_trabajadores_altas_id) {
                    n = element.nombre;
                }
            });
            return n;
        },
        refresch_table() {
            if ($.fn.dataTable.isDataTable("#tablaresumen")) {
                $("#tablaresumen").DataTable().destroy();
                $(document).ready(function () {
                    $("#tablaresumen").DataTable({
                        responsive: true,
                        autoWidth: true,
                        searching: false,
                        paging: false,
                    });
                });
            } else {
                $(document).ready(function () {
                    $("#tablaresumen").DataTable({
                        responsive: true,
                        autoWidth: true,
                        searching: false,
                        paging: false,
                    });
                });
            }
        },
        /////////////////////////////// Trabajadores//////
        cerrar_modal_trabajadores() {
            this.menu('registros', 'Registros');
            this.nombre_trabajador = "";
            this.nombre_lote = "";
            this.trabajador = {
                UUID: this.registro.maestro.UUID,
                nombre: "",
                cat_trabajadores_altas_id: "",
                cat_holding_04_unidades_productivas_lotes_id: "",
                inicio: "",
                fin: "",
            }

            this.registros_trabajadores = [];
        },
        seleccionar_trabajdor(item) {
            this.nombre_trabajador = item.nombre;
            this.trabajador.nombre = item.nombre;
            this.trabajador.cat_trabajadores_altas_id = item.cat_trabajadores_altas_id;
            console.log(this.trabajador);
        },
        seleccionar_lote(item) {
            this.nombre_lote = item.lote;
            this.trabajador.cat_holding_04_unidades_productivas_lotes_id = item.cat_holding_04_unidades_productivas_lotes_id;
            this.trabajador.lote = item.lote;
            console.log(this.trabajador);
        },
        agregar_trabajador_lista() {
            if (
                this.trabajador.lote != "" &&
                this.trabajador.nombre != "" &&
                this.trabajador.inicio != "" &&
                this.trabajador.fin != ""

            ) {


                this.trabajador.UUID = this.registro.maestro.UUID;
                this.registro.trabajadores.push(this.trabajador);
                this.nombre_trabajador = "";
                this.nombre_lote = "";

                this.trabajador = {
                    UUID: this.registro.maestro.UUID,
                    nombre: "",
                    cat_trabajadores_altas_id: "",
                    cat_holding_04_unidades_productivas_lotes_id: "",
                    inicio: "",
                    fin: "",
                }

                this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);

            } else {

                Toast.fire({
                    icon: "error",
                    title: "faltan datos",
                });
            }
        },
        borrar_trabajador_lista(index) {

            this.registro.trabajadores.splice(index, 1);
            this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);

        },
        editar_trabajador_lista(item, index) {
            this.nombre_trabajador = item.nombre;
            this.nombre_lote = item.lote;
            this.trabajador = item;
            this.registro.trabajadores.splice(index, 1);
            this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);


        },
        guardar_trabajadores() {

            this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);
            this.nombre_trabajador = "";
            this.nombre_lote = "";
            this.trabajador = {
                UUID: this.registro.maestro.UUID,
                nombre: "",
                cat_trabajadores_altas_id: "",
                cat_holding_04_unidades_productivas_lotes_id: "",
                inicio: "",
                fin: "",
            }

            this.menu('registros', 'Registros');

        },
        borrar_trabajador_registro(trbj) {

            var array = this.registro.trabajadores;
            this.registro.trabajadores = array.filter(item => item.cat_trabajadores_altas_id !== trbj.cat_trabajadores_altas_id);
            this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);

        },
        editar_trabajador_registro(item) {
            this.menu('AgregarTrabajadores', 'Registros');
        },
        ////////////////// Productos //////////////
        async cerrar_modal_productos() {
            this.nombre_producto = "";
            this.producto = {
                UUID: this.registro.maestro.UUID,
                cat_compras_productos_id: "",
                cantidad: "",
                cat_compras_productos_unidad_de_medida_mu_id: "",
                capturista:localStorage.getItem("ses_usuario")
            }

            this.menu('registros', 'Registros');
            await new Promise(resolve => setTimeout(resolve, 100));
            this.refresch_table();

        },
        seleccionar_receta() {
            console.log(this.receta);

            this.receta.productos.forEach(element => {

                element.UUID = this.registro.maestro.UUID;
                element.capturista=localStorage.getItem("ses_usuario");
                this.registro.productos.push(element);

            });
            this.refresch_table();
            console.log(this.registro.productos);
        },
        seleccionar_producto(item) {
            this.nombre_producto = item.producto;
            this.producto.cat_compras_productos_id = item.cat_compras_productos_id;
            this.producto.UUID = this.registro.maestro.UUID;

        },
        borrar_producto(item, index) {
            this.registro.productos.splice(index, 1);
            this.refresch_table();
        },
        editar_producto(item, index) {
            this.registro.productos.splice(index, 1);
            this.refresch_table();
            this.menu('AgregarProductos', 'Registros');
            this.nombre_producto = this.nombreProductos(item.cat_compras_productos_id);
            this.producto = item;
        },
        agregar_producto() {
            this.registro.productos.push(this.producto);
            this.cerrar_modal_productos();
        },
        //////RECETA////////
        nueva_receta() {
            this.menu('NuevaReceta', 'Registros');
            this.registro_receta.UUID = generateUUID();
        },
        cerrar_modal_receta() {
            this.nombre_producto="";
            this.producto = {
                UUID: this.registro.maestro.UUID,
                cat_compras_productos_id: "",
                cantidad: "",
                cat_compras_productos_unidad_de_medida_mu_id: "",
                capturista:localStorage.getItem("ses_usuario")
            }

            this.registro_receta ={
                UUID: "",
                nombre: "",
                cat_control_aplicaciones_alcance_mu_id: "",
                capturista:localStorage.getItem("ses_usuario"),
                cat_usuarios_licencias_id:localStorage.getItem("cat_usuarios_licencias_id"),
                productos: []
            }

            this.menu('registros', 'Registros');
        },
        seleccionar_producto_receta(item) {
            this.nombre_producto = item.producto;
            this.producto.cat_compras_productos_id = item.cat_compras_productos_id;
            this.producto.UUID = this.registro_receta.UUID;

        },
        agregar_producto_receta() {
            this.registro_receta.productos.push(this.producto);
            this.nombre_producto="";

            this.producto = {
                UUID: this.registro_receta.UUID,
                cat_compras_productos_id: "",
                cantidad: "",
                cat_compras_productos_unidad_de_medida_mu_id: "",
                capturista:localStorage.getItem("ses_usuario")
            }
            
        },
        borrar_producto_receta(item, index) {
            this.registro_receta.productos.splice(index, 1);
            
        },
        editar_producto_receta(item, index) {
            this.registro_receta.productos.splice(index, 1);
            this.nombre_producto = this.nombreProductos(item.cat_compras_productos_id);
            this.producto = item;
        },
        enviar_receta(){
            console.log(this.registro_receta);

           var body={
            token:localStorage.getItem("ses_token"),
            registro:this.registro_receta

            }


            fetch("https://back.intelagro.net/recetas", {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then(function (response) {
            if (!response.ok) throw Error(response.status);

            return response.json();
          })
          .then((data) =>{
            console.log(data);
            if (data.estado == "fail") {
              Toast.fire({
                icon: "error",
                title: "fail",
              });
            }
            if (data.estado == "OK") {
              Toast.fire({
                icon: "success",
                title: "receta enviada"
              });
              localStorage.setItem("cat_recetas",JSON.stringify(data.data));
              this.recetas = JSON.parse(localStorage.getItem("cat_recetas"));
              this.cerrar_modal_receta();

            }
          })
          .catch((err) => {
            console.log(err);

            Toast.fire({
              icon: "error",
              title: "receta no enviada",
            });
          });


          
        },
        guardar_registro(){
           var regs=JSON.parse(localStorage.getItem("regs_aplicaciones"));
           regs.push(this.registro);
           this.num_pendientes=regs.length;
           localStorage.setItem("regs_aplicaciones",JSON.stringify(regs));

           this.registro= {
            maestro: {
                UUID: generateUUID,
                fecha: "",
                rancho: "",
                actividad: "",
                metodoAplicacion: "",
                boquilla: "",
                gasto: "",
                tipo_control: [],
                unidadMedidaCantidad: "",
                parihuelasGrupal: "",
            },
            lista_trabajadores: [],
            trabajadores: [],
            productos: [],
        }
           

        },
        abrir_modal_pendientes(){


            this.registros_pendientes=JSON.parse(localStorage.getItem("regs_aplicaciones"));

            this.menu('pendientes', 'Registros');

        },
        enviar_registros_server(){}

    },
    computed: {

        list_trabajadores() {
            var trb = [];

            this.trabajadores.forEach((trabajador) => {
                let t = trabajador.nombre.toUpperCase();
                if (
                    t.includes(this.nombre_trabajador.toUpperCase()) &&
                    this.nombre_trabajador != "" &&
                    this.nombre_trabajador.toUpperCase() != t
                ) {
                    trb.push(trabajador);
                }
            });
            return trb;
        },
        list_lotes() {
            var lt = [];
            this.lotes.forEach((lote) => {
                let l = lote.lote.toUpperCase();
                if (
                    l.includes(this.nombre_lote.toUpperCase()) &&
                    this.nombre_lote != "" &&
                    this.nombre_lote.toUpperCase() != l &&
                    this.registro.maestro.rancho == lote.cat_holding_03_empresas_unidades_productivas_id

                ) {
                    lt.push(lote);
                }
            });
            return lt;
        },
        list_productos() {
            var prod = [];

            this.productos.forEach((producto) => {
                let p = producto.producto.toUpperCase();
                if (
                    p.includes(this.nombre_producto.toUpperCase()) &&
                    this.nombre_producto != "" &&
                    this.nombre_producto.toUpperCase() != p
                ) {
                    prod.push(producto);
                }
            });
            return prod;
        },

    },
    mounted() {

        this.version = version();
        this.mountdata();


    },
    created() { },
    components: {},
    props: [],
}).mount('#app');