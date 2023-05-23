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
            logo: "https://intelagro.net/intelagro/img/logito.png",
            version: "",
            modulo: "Registros",
            titulo: "Registros",
            nombre: "",
            aside: {
                principal: false,
                registros: true,
                graficas: false,
                trabajadores: false,

            },
            unidades: [],
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
                principal: false,
                registros: false,
                graficas: false,
                trabajadores: false,
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
            this.aside.principal = true




        },



    },
    computed: {

        total() {
            var valor;

            valor = parseInt(this.edad1) + parseInt(this.edad2);
            return valor;
        }

    },
    mounted() {

        this.version = version();
        this.mountdata();


    },
    created() {},
    components: {},
    props: [],
}).mount('#app');