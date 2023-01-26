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
          Plantilla:true,
          Drenaje:true
         
         
        },
        version: "",
      
      };
    },
    methods: {
      router: function (puntero) {
        this.modulos[puntero] = true;
       
      },
      Aplicaciones() {
        location.href = host()+"/aplicaciones.html";
      },
      Plantilla() {
        location.href = host()+"/plantilla.html";
      },
      Trabajadores() {
        location.href = host()+"/trabajadores.html";
      },
      Drenaje() {
        location.href = host()+"/drenaje.html";
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
    components: { },
    props: [],
}).mount('#app');
