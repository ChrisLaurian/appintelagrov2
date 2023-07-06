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
            active_menu_registros: "text-success",
            active_menu_pendientes: "text-secondary",
            active_menu_regs: "text-secondary",
            menu_superior: true,

            aside: {
                registros: true,
                regs: false,
                estatus: false,
                registros2: true,
                AgregarProductos: false,
                NuevaReceta: false,
                bitacora: false,
                planeaciondetalle: false,
                agregartrabajador: false,

            },
            cajas: [],
            proveedores: [],
            documentos: [],
            unidades: [],
            actividades: [],
            lotes: [],
            trabajadores: [],

            registro: {
                maestro: {
                    UUID: "",
                    fecha_progamada_maestro: "",
                    descripcion_unidades_productivas: "",
                    descripcion_unidades_de_costos: "",
                    descripcion_actividad: "",
                    descripcion_supervisor: "",
                    hora_de_captura: "",
                    cantidad_trabajadores: "",
                    observaciones: "",
                    lote: "",


                },
                actividadesregistradas: [],
                lista_trabajadores: [],
                trabajadores: [],
                productos: [],
                actividades: [],
                supervisores: [],
            },
            producto: {
                UUID: "",
                cat_compras_productos_id: "",
                cantidad: "",
                cat_compras_productos_unidad_de_medida_mu_id: "",
                capturista: localStorage.getItem("ses_usuario")
            },
            trabajador: {
                UUID: "",
                nombre: "",
                cat_trabajadores_altas_id: "",
                cat_holding_04_unidades_productivas_lotes_id: "",
                cantidad: "",
                unidad_de_medida: "",
            },
            supervisor: {
                UUID: "",
                nombre: "",
                cat_trabajadores_altas_id: "",
                cat_holding_04_unidades_productivas_lotes_id: "",
                lote: "",
                inicio: "",
                fin: "",
            },
            actividad: {
                UUID: "",
                cat_actividades_id: "",
            },
            cat_trabajadores_altas_id_supervisor: "",
            cat_trabajadores_altas_id: "",
            nombre_trabajador: "",
            nombre_supervisor: "",
            nombre_lote: "",
            nombre_producto: "",
            nombre_actividad: "",
            receta: "",
            registro_receta: {
                UUID: "",
                nombre: "",
                cat_control_aplicaciones_alcance_mu_id: "",
                capturista: localStorage.getItem("ses_usuario"),
                cat_usuarios_licencias_id: localStorage.getItem("cat_usuarios_licencias_id"),
                productos: []
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
                registros2: false,
                AgregarProductos: false,
                NuevaReceta: false,
                bitacora: false,
                planeaciondetalle: false,
                agregartrabajador: false,
            };

            this.aside[puntero] = true;
            this.menu_superior = false;

            if (this.aside.registros) {
                this.active_menu_registros = "text-success";
                this.active_menu_pendientes = "text-secondary";
                this.active_menu_regs = "text-secondary";
                this.menu_superior = true;
            }

            if (this.aside.pendientes) {
                this.active_menu_registros = "text-secondary";
                this.active_menu_pendientes = "text-success";
                this.active_menu_regs = "text-secondary";
                this.menu_superior = true;
            }

            if (this.aside.regs) {
                this.active_menu_registros = "text-secondary";
                this.active_menu_pendientes = "text-secondary";
                this.active_menu_regs = "text-success";
                this.menu_superior = true;

            }

        },
        mountdata() {
            // this.unidades = JSON.parse(localStorage.getItem("cat_unidades"));
            // this.lotes = JSON.parse(localStorage.getItem("cat_lotes"));
            this.documentos = JSON.parse(localStorage.getItem("cat_documentos"));

            this.cajas = JSON.parse(localStorage.getItem("cat_cajas"));
            this.proveedores = JSON.parse(localStorage.getItem("cat_proveedores"));
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

            localStorage.setItem("regs_aplicaciones", JSON.stringify([]));

        },

        enviar() {
            console.log(this.registro.maestro);
            this.registro.actividadesregistradas.push(this.registro.maestro);
            this.registro.maestro = {
                UUID: "",
                fecha_progamada_maestro: "",
                descripcion_unidades_productivas: "",
                descripcion_unidades_de_costos: "",
                descripcion_actividad: "",
                descripcion_supervisor: "",
                hora_de_captura: "",
                cantidad_trabajadores: "",
                observaciones: "",
                lote: "",
            }
        },

        abrir_modal_pendientes() {


            // this.registros_pendientes=JSON.parse(localStorage.getItem("regs_aplicaciones"));

            this.menu('pendientes', 'Registros');

        },
        abrir_modal_movimientos() {
            this.menu('movimientos', 'Registros');

        },
        nueva_receta() {
            this.menu('NuevaReceta', 'Registros');
        },
        borrar_producto_receta(item, index) {
            this.registro_receta.productos.splice(index, 1);

        },
        editar_producto_receta(item, index) {
            this.registro_receta.productos.splice(index, 1);
            this.nombre_producto = this.nombreProductos(item.cat_compras_productos_id);
            this.producto = item;
        },
        // editar_producto_receta(item, index) {
        //     this.registro_receta.productos.splice(index, 1);
        //     this.nombre_producto = this.nombreProductos(item.cat_compras_productos_id);
        //     this.producto = item;
        // },
        seleccionar_producto_receta(item) {
            this.nombre_producto = item.producto;
            this.actividad.cat_actividades_id = item.cat_actividades_id;
            this.actividad.UUID = this.registro.maestro.UUID;

        },
        ejemplo() {
            console.log("Este es un texto de ejemplo");
        },
        // seleccionar_producto_receta(item) {
        //     this.nombre_producto = item.producto;
        //     this.producto.cat_compras_productos_id = item.cat_compras_productos_id;
        //     this.producto.UUID = this.registro_receta.UUID;

        // },

        enviar_receta() {
            console.log(this.registro_receta);
        },
        agregar_producto_receta() {
            this.registro_receta.productos.push(this.producto);
            this.nombre_producto = "";

            this.producto = {
                UUID: this.registro_receta.UUID,
                cat_compras_productos_id: "",
                cantidad: "",
                cat_compras_productos_unidad_de_medida_mu_id: "",
                capturista: localStorage.getItem("ses_usuario")
            }

        },
        ocultarcards(mostrar) {

            this.aside.registros2 = mostrar;
            this.$nextTick(() => {
                this.aside.registros2 = mostrar;
            });
        },
        borrar_trabajador_lista(index) {

            this.registro.trabajadores.splice(index, 1);
            this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);

        },
        nombreRancho(nombre) {
            var nRancho = "";
            this.unidades.forEach((element) => {
                if (nombre == element.cat_holding_03_empresas_unidades_productivas_id) {
                    nRancho = element.UP;
                }
            });
            return nRancho;
        },
        nombreTrabajador(nombre) {
            var nTrabajador = "";
            this.trabajadores.forEach((element) => {
                if (nombre == element.cat_trabajadores_altas_id) {
                    nTrabajador = element.nombre;
                }
            });
            return nTrabajador;
        },
        seleccionar_actividad(item) {
            this.nombre_actividad = item.actividad;
            this.actividad.cat_actividades_id = item.cat_actividades_id;
            this.actividad.UUID = this.registro.maestro.UUID;

        },
        seleccionar_supervisor(item) { // TODO
            this.cat_trabajadores_altas_id_supervisor = item.nombre;
            this.supervisor.cat_trabajadores_altas_id = item.cat_trabajadores_altas_id;
            this.supervisor.UUID = this.registro.maestro.UUID;

        },
        seleccionar_trabajador(item) { // TODO
            this.nombre_trabajador = item.nombre;
            this.trabajador.nombre = item.nombre_trabajador;
            this.trabajador.cat_trabajadores_altas_id = item.cat_trabajadores_altas_id;
            this.trabajador.UUID = this.registro.maestro.UUID;

        },
        agregar_trabajador_lista() {

            console.log(this.trabajador);
            if (
                this.trabajador.cantidad != "" &&
                this.trabajador.nombre != "" &&
                this.trabajador.unidad_de_medida != ""


            ) {


                this.trabajador.UUID = this.registro.maestro.UUID;
                this.registro.trabajadores.push(this.trabajador);
                this.nombre_trabajador = "";

                this.trabajador = {
                    UUID: this.registro.maestro.UUID,
                    nombre: "",
                    cat_trabajadores_altas_id: "",
                    cat_holding_04_unidades_productivas_lotes_id: "",
                    cantidad: "",
                    unidad_de_medida: "",
                }

                this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);
                console.log("Accedio al agregar trabajador lista");
            } else {

                Toast.fire({
                    icon: "error",
                    title: "faltan datos",
                });
            }
        },
        // TODO:
        guardar_trabajadores() {

            this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);
            this.nombre_trabajador = "";
            this.trabajador = {
                UUID: this.registro.maestro.UUID,
                nombre: "",
                cat_trabajadores_altas_id: "",
                cat_holding_04_unidades_productivas_lotes_id: "",
                cantidad: "",
                unidad_de_medida: "",
            }
            console.log("Accedio al guardar trabajadores");
            this.menu('planeaciondetalle', 'Registros');

        },
        // seleccionar_producto(item) {
        //     this.nombre_producto = item.producto;
        //     this.producto.cat_compras_productos_id = item.cat_compras_productos_id;
        //     this.producto.UUID = this.registro.maestro.UUID;

        // },
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
        editar_producto(item, index) {
            this.registro.productos.splice(index, 1);
            this.menu('AgregarProductos', 'Registros');
            this.nombre_actividad = this.nombreProductos(item.cat_compras_productos_id);
            this.producto = item;
        },
        // editar_producto(item, index) {
        //     this.registro.productos.splice(index, 1);
        //     this.menu('AgregarProductos', 'Registros');
        //     this.nombre_producto = this.nombreProductos(item.cat_compras_productos_id);
        //     this.producto = item;
        // },
        editar_producto_receta(item, index) {
            this.registro_receta.productos.splice(index, 1);
            this.nombre_producto = this.nombreProductos(item.cat_compras_productos_id);
            this.producto = item;
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
        borrar_producto(item, index) {
            this.registro.productos.splice(index, 1);
        },
        selecciondeinput(item) {
            var input2 = document.getElementById("actividades");
            var input3 = document.getElementById("supervisor");
            var input4 = document.getElementById("trabajadores");

            switch (item) {
                case 2:
                    {
                        if (this.nombre_actividad != this.actividad.actividad) {

                            input2.className += "form-control is-invalid";
                            document.getElementById("labelerror3").style.display = "initial";
                            document.getElementById("labelerror3").style.color = "red";

                        } else {

                            input2.className += "form-control is-valid";
                            document.getElementById("labelerror3").style.display = "none";
                        }
                    }
                    break;
                case 3: //TODO
                    {
                        if (this.cat_trabajadores_altas_id_supervisor != this.supervisor.nombre) {

                            input3.className += "form-control is-invalid";
                            document.getElementById("labelerror4").style.display = "initial";
                            document.getElementById("labelerror4").style.color = "red";

                        } else {

                            input3.className += "form-control is-valid";
                            document.getElementById("labelerror4").style.display = "none";
                        }
                    }
                    break;
                case 4: //TODO
                    {
                        if (this.nombre_trabajador != this.trabajador.nombre) {

                            input4.className += "form-control is-invalid";
                            document.getElementById("labelerror5").style.display = "initial";
                            document.getElementById("labelerror5").style.color = "red";

                        } else {

                            input4.className += "form-control is-valid";
                            document.getElementById("labelerror5").style.display = "none";
                        }
                    }
                    break;
            }
            console.log(this.nombre_actividad);
            console.log(this.actividad.actividad);

        },
        agregar_actividad() {
            // this.registro.productos.push(this.producto);
            // this.cerrar_modal_productos();
            if (this.nombre_actividad == this.actividad.actividad && this.producto.cantidad != "" && this.nombre_actividad != "") {
                this.registro.actividades.push(this.actividad);
                console.log(this.registro.actividades);
            } else {
                alert("Falta ingresar datos");
                return 0;
            }
        },
        // agregar_producto() {
        //     // this.registro.productos.push(this.producto);
        //     // this.cerrar_modal_productos();
        //     if (this.nombre_producto == this.producto.producto && this.producto.cantidad != "" && this.nombre_producto != "") {
        //         this.registro.productos.push(this.producto);
        //         console.log(this.registro.productos);
        //         this.cerrar_modal_productos();
        //         ocultarcards(true);
        //     } else {
        //         alert("Falta ingresar datos");
        //         return 0;
        //     }
        // },
        seleccionar_actividad(item, numero) {
            this.nombre_actividad = item.actividad;
            this.actividad.actividad = this.nombre_actividad;
            this.actividad.cat_actividades_id = item.cat_actividades_id;
            this.actividad.UUID = this.registro.maestro.UUID;
            this.registro.maestro.descripcion_actividad = item.actividad;
            this.selecciondeinput(numero);

        }, //TODO
        seleccionar_supervisor(item, numero) {
            this.cat_trabajadores_altas_id_supervisor = item.nombre;
            this.supervisor.nombre = this.cat_trabajadores_altas_id_supervisor;
            this.supervisor.cat_trabajadores_altas_id = item.cat_trabajadores_altas_id;
            this.supervisor.UUID = this.registro.maestro.UUID;
            this.registro.maestro.descripcion_supervisor = item.nombre;
            this.selecciondeinput(numero);

        },
        seleccionar_trabajador(item, numero) {
            this.nombre_trabajador = item.nombre;
            this.trabajador.nombre = this.nombre_trabajador;
            this.trabajador.cat_trabajadores_altas_id = item.cat_trabajadores_altas_id;
            this.trabajador.UUID = this.registro.maestro.UUID;
            this.selecciondeinput(numero);

        },
        // seleccionar_producto(item, numero) {
        //     this.nombre_producto = item.producto;
        //     this.producto.producto = this.nombre_producto;
        //     this.producto.cat_compras_productos_id = item.cat_compras_productos_id;
        //     this.producto.UUID = this.registro.maestro.UUID;
        //     this.selecciondeinput(numero);

        // },
        cerrar_modal_productos() {
            this.nombre_producto = "";
            this.producto = {
                UUID: this.registro.maestro.UUID,
                cat_compras_productos_id: "",
                cantidad: "",
                cat_compras_productos_unidad_de_medida_mu_id: "",
                capturista: localStorage.getItem("ses_usuario")
            }

            this.menu('registros', 'Registros');
            // await new Promise(resolve => setTimeout(resolve, 100));
            // this.refresch_table();

        },
        cerrar_modal_trabajadores() {
            this.menu('registros', 'Registros');
            this.nombre_trabajador = "";
            this.trabajador = {
                UUID: this.registro.maestro.UUID,
                nombre: "",
                cat_trabajadores_altas_id: "",
                cat_holding_04_unidades_productivas_lotes_id: "",
                cantidad: "",
                unidad_de_medida: "",
            }

            this.registros_trabajadores = [];
        },
        nombreRancho(nombre) {
            var nRancho = "";
            this.unidades.forEach((element) => {
                if (nombre == element.cat_holding_03_empresas_unidades_productivas_id) {
                    nRancho = element.UP;
                }
            });
            return nRancho;
        },
    },
    computed: {
        list_actividad() {
            var prod = [];

            this.actividades.forEach((actividad) => {
                let p = actividad.actividad.toUpperCase();
                if (
                    p.includes(this.nombre_actividad.toUpperCase()) &&
                    this.nombre_actividad != "" &&
                    this.nombre_actividad.toUpperCase() != p
                ) {
                    prod.push(actividad);
                }
            });
            return prod;
        },
        list_supervisores() {
            var trb = [];

            this.trabajadores.forEach((trabajador) => {
                let t = trabajador.nombre.toUpperCase();
                if (
                    t.includes(this.cat_trabajadores_altas_id_supervisor.toUpperCase()) &&
                    this.cat_trabajadores_altas_id_supervisor != "" &&
                    this.cat_trabajadores_altas_id_supervisor.toUpperCase() != t
                ) {
                    trb.push(trabajador);
                }
            });
            return trb;
        },
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
        // list_productos() {
        //     var prod = [];

        //     this.productos.forEach((producto) => {
        //         let p = producto.producto.toUpperCase();
        //         if (
        //             p.includes(this.nombre_producto.toUpperCase()) &&
        //             this.nombre_producto != "" &&
        //             this.nombre_producto.toUpperCase() != p
        //         ) {
        //             prod.push(producto);
        //         }
        //     });
        //     return prod;
        // },
    },
    mounted() {

        this.version = version();
        this.mountdata();


    },
    created() {},
    components: {},
    props: [],
}).mount('#app');