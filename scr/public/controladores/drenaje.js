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
            lotes: [],

            registro: {
                maestro: {
                    UUID: "",
                    fecha: "",
                    rancho: "",
                    lote: "",
                    periodo: "",
                    phEntrada: 0,
                    phSalida: 0,
                    ceEntrada: 0,
                    ceSalida: 0,
                    aguaEntrada: 0,
                    aguaSalida: 0,
                    riegos: 0,
                    minutosRiego: 0,
                    m3SinFertilizante: 0,
                    m3ConFertilizante: 0,

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

        },
        mountdata() {
            this.unidades = JSON.parse(localStorage.getItem("cat_unidades"));
            this.lotes = JSON.parse(localStorage.getItem("cat_lotes"));

            this.registro.maestro.UUID = generateUUID();

            localStorage.setItem("regs_aplicaciones", JSON.stringify([]));

        },

        enviar() {
            console.log(this.registro.maestro);
        },
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