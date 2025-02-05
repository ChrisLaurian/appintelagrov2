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

            },
            cajas: [],
            proveedores: [],
            documentos: [],

            registro: {
                maestro: {
                    UUID: "",
                    fecha: "",
                    caja: "",
                    importe: 0,
                    movimiento: "",
                    proveedor: "",
                    tipoComprobante: "",
                    transaccion: "",
                    noComprobante: 0,
                    comentario: "",

                },
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

        nombreRancho(nombre) {
            var nRancho = "";
            this.unidades.forEach((element) => {
                if (nombre == element.cat_holding_03_empresas_unidades_productivas_id) {
                    nRancho = element.UP;
                }
            });
            return nRancho;
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