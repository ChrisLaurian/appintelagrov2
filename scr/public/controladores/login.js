

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
const { createApp } = Vue

createApp({
  name: "login",
  data() {
    return {
      logo: "",
      logo2: "",
      usuario: "",
      pass: "",
      version: ""
    };
  },
  methods: {
    login: function () {
      if (this.pass != "" && this.usuario != "") {
        var logindata = {
          "user": this.usuario,
          "pass": this.pass,
        };
        fetch("https://back.intelagro.net/login", {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logindata),
        })
          .then(function (response) {
            if (!response.ok) throw Error(response.status);

            return response.json();
          })
          .then(function (data) {
            console.log(data);
            if (data.estado == "fail") {
              Toast.fire({
                icon: "error",
                title: "Contraseña y/o Usuario Incorrectos",
              });
            }
            if (data.estado == "OK") {
              Toast.fire({
                icon: "success",
                title: data.mess
              });
              setTimeout(async() => {
              await inicio(
                  data.usuario.nombre,
                  data.usuario.cat_usuarios_licencia_id,
                  data.usuario.token,
                  data.usuario.usuario,
                  data.usuario.vigente,
                  data.modulos,
                  data.catalogos
                );

                
              }, 1000);

            }
          })
          .catch((err) => {
            console.log(err);

            Toast.fire({
              icon: "error",
              title: "Contraseña y/o Usuario Incorrectos",
            });
          });
      } else {
        Toast.fire({
          icon: "info",
          title: "Existen Campos En Blanco",
        });
      }
    },
  },
  computed: {},
  mounted() {
  this.version=version();
  },
  created() { },
  components: {},
  props: [],
}).mount('#app');


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
   
    navigator.serviceWorker.register("./sw.js");
  });
}