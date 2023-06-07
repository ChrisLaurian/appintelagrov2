const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
});

const { createApp } = Vue

createApp({
    name: "modulos",
    data() {
        return {
            logo: "",
            modulos: {
                Aplicaciones: true,
                Plantilla: true,
                Drenaje: true,
                Plagas: true,
                Phcena: true,
                Finanzas: true,
                Asistencia: true,
                TrabajadoresModulo: true,
                Estados: true,
                Almacenes: true,
                Dashboards: true,
                Riego: true,



            },
            version: "",

        };
    },
    methods: {
        router: function(puntero) {
            this.modulos[puntero] = true;

        },
        Aplicaciones() {
            location.href = host() + "/aplicaciones.html";
        },
        Plantilla() {
            location.href = host() + "/plantilla.html";
        },
        Trabajadores() {
            location.href = host() + "/trabajadores.html";
        },
        Drenaje() {
            location.href = host() + "/drenaje.html";
        },
        Plagas() {
            location.href = host() + "/plagasEnfermedades.html";
        },
        Phcena() {
            location.href = host() + "/phcena.html";
        },
        Finanzas() {
            location.href = host() + "/finanzas.html";
        },
        Asistencia() {
            location.href = host() + "/asistencia.html";
        },
        TrabajadoresModulo() {
            location.href = host() + "/trabajadores_modulo.html";
        },
        Estados() {
            location.href = host() + "/estados.html";
        },
        Almacenes() {
            location.href = host() + "/almacenes.html";
        },
        Dashboards() {
            location.href = host() + "/dashboard.html";
        },
        Riego() {
            location.href = host() + "/riego.html";
        },


        salir() {
            salir();
        }
    },
    computed: {},
    mounted() {

        this.version = version();
        /* if (localStorage.getItem("modulos")) {
        var modulos = JSON.parse(localStorage.getItem("modulos"));
  
        modulos.forEach((element) => {
          this.router(element.decripcion);
          
        });
      }
      */



    },
    created() {},
    components: {},
    props: [],
}).mount('#app');