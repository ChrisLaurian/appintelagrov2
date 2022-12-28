
var myCharacteristic;

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
             
            }


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
           
           
        },
        enviar() {
         

        },
        cancelar() {
          
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
                $(document).ready(function () {
                    $("#tablaRank").DataTable({
                        responsive: true,
                        autoWidth: true,
                        searching: false,
                        paging: false,
                    });
                });
            } else {
                $(document).ready(function () {
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
    created() { },
    components: {},
    props: [],
}).mount('#app');
