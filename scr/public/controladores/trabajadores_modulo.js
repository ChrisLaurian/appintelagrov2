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
                editar: false,

            },

            trabajadores: [],

            registro: {
                maestro: {
                    UUID: "",
                    primerNombre: "",
                    segundoNombre: "",
                    apellidoPaterno: "",
                    apellidoMaterno: "",
                    rfc: "",
                    nss: "",
                    telefono: 0,
                    permisoSMS: 0,

                    trabajadoresIdentificaciones: "",

                },
            },
            trabajador: {
                UUID: "",
                nombre: "",
                cat_trabajadores_altas_id: 0,
                celular: "",
                permiso_msm: 0,
                primerNombre: "",
                segundoNombre: "",
                apellidoMaterno: "",
                apellidoPaterno: "",
                rfc: "",
                nss: "",

            },
            nombre_trabajador: "",
            nombre_trabajador2: "",

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
                editar: false,
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

            this.trabajadores = JSON.parse(localStorage.getItem("cat_trabajadores"));



            this.registro.maestro.UUID = generateUUID();

            localStorage.setItem("regs_aplicaciones", JSON.stringify([]));

        },

        enviar() {
            console.log(this.registro.maestro);
        },

        abrir_modal_pendientes() {


            // this.registros_pendientes=JSON.parse(localStorage.getItem("regs_aplicaciones"));

            this.menu('pendientes', 'Registros');

        },
        abrir_modal_movimientos() {
            this.menu('movimientos', 'Registros');

        },

        nombreTrabajador(id) {
            var ntrabajador = "";
            this.trabajadores.forEach((element) => {
                if (id == element.cat_trabajadores_altas_id) {
                    ntrabajador = element.nombre;
                }
            });
            return ntrabajador;
        },
        ocultarNombreCodigoImpresion() {
            var dato = document.getElementById("inputIdentificacionesTrabajador")

            if (dato.value == "") {

                document.getElementById("imprimirDatos").style.display = "none";
                document.getElementById("imprimirDatos2").style.display = "none";
            } else {
                // document.getElementById("imprimirDatos").style.display = "initial";
                // document.getElementById("imprimirDatos2").style.display = "initial";
            }
        },
        seleccionar_trabajdor(item) {
            this.nombre_trabajador = item.nombre;
            this.trabajador.nombre = item.nombre;
            this.trabajador.cat_trabajadores_altas_id = item.cat_trabajadores_altas_id;
            console.log(this.trabajador);
            document.getElementById("imprimirDatos").style.display = "inherit";
            document.getElementById("imprimirDatos2").style.display = "flex";
        },
        seleccionar_trabajdorEditar(item) {
            this.nombre_trabajador2 = item.nombre;
            this.trabajador.nombre = item.nombre;
            this.trabajador.celular = item.celular_mensajes;
            this.trabajador.permiso_msm = item.permiso_msm;
            this.trabajador.cat_trabajadores_altas_id = item.cat_trabajadores_altas_id;
            console.log(this.trabajador);
        },
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
        list_trabajadores2() {
            var trb = [];

            this.trabajadores.forEach((trabajador) => {
                let t = trabajador.nombre.toUpperCase();
                if (
                    t.includes(this.nombre_trabajador2.toUpperCase()) &&
                    this.nombre_trabajador2 != "" &&
                    this.nombre_trabajador2.toUpperCase() != t
                ) {
                    trb.push(trabajador);
                }
            });
            return trb;
        },
    },
    mounted() {

        this.version = version();
        this.mountdata();


    },
    created() {},
    components: {},
    props: [],
}).mount('#app');