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
            ocultarCajas: false,
            mostrarFormulario: true,
            aside: {
                registros: true,
                pendientes: false,
                

            },

            unidades: [],
            lotes: [],


            registro: {
                maestro: {
                    UUID: "",
                    fecha: "",
                    rancho: "",
                    licencia: "",
                    trabajador: "",
                    hora: "",
                    
                    
                    
                    
                },
                cajas: {
                    sector: "",
                    cultivo: "",
                    variedad: "",
                    cantidad: 0,
                    sku: "",

                }
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
        get_catalogos() {


            return new Promise((resolve) => {
                var ses = localStorage.getItem("session");
                fetch("https://back20.intelagro.net/catalogos?token=" + ses.replace(/(")/gm, ""))
                    .then(function (response) {
                        return response.json();
                    })
                    .then((res) => {
                        console.log(res);

                        localStorage.setItem("cat_unidades", JSON.stringify(res.catalogos.cat_unidades));
                        localStorage.setItem("cat_lotes", JSON.stringify(res.catalogos.cat_lotes));
                        localStorage.setItem("cat_trabajadores", JSON.stringify(res.catalogos.cat_trabajadores));
                        localStorage.setItem("cat_ActIE", JSON.stringify(res.catalogos.cat_ActIE));
                        localStorage.setItem("cat_turnos", JSON.stringify(res.catalogos.cat_turnos));
                        localStorage.setItem("cat_cultivos", JSON.stringify(res.catalogos.cat_cultivos));
                        localStorage.setItem("cat_empaques", JSON.stringify(res.catalogos.cat_empaques));
                        localStorage.setItem("cat_Incidencias", JSON.stringify(res.catalogos.cat_Incidencias));

                        resolve(true);
                    })
                    .catch(function (err) {
                        console.log(err);
                        resolve(false);
                    });
            });
        },
        async mountdata() {

       

            if (!localStorage.getItem(this.reg_storage_slida_rancho)) {
                localStorage.setItem(this.reg_storage_slida_rancho, JSON.stringify([]));
            }
          

            var d = await this.get_catalogos();

            this.trabajadores = JSON.parse(localStorage.getItem("cat_trabajadores"));
            this.unidades = JSON.parse(localStorage.getItem("cat_unidades"));
            this.turnos = JSON.parse(localStorage.getItem("cat_turnos"));
            this.actIE = JSON.parse(localStorage.getItem("cat_ActIE"));
            this.incidencias = JSON.parse(localStorage.getItem("cat_Incidencias"));
            this.editar_fecha = fechahoy();
            this.fecha_entradas = fechahoy();
            this.editar_Salidas = fechahoy();


        },

        enviar() {
            //Validacion por if else
            if (this.registro.maestro.rancho.trim() === ""){
                alert("Rancho no puede estar vacio.");
            }else if( this.registro.maestro.fecha.trim() === ""){
                alert("Fecha no puede quedar vacio.");
            }else if( this.registro.maestro.hora.trim() ===""){
                alert("Hora no puede quedar vacio.");
            }else if(this.registro.maestro.licencia.trim() === ""){
                alert( "Licencia no puede quedar vacio.");
            }else if( this.registro.maestro.trabajador.trim() === ""){
                alert("Trabajador no puede quedar vacio.")
            }else{
                console.log(this.registro.maestro, this.registro.maestro.cajas);
            }
        },

        enviar_caja() {
            
            this.ocultarCajas = false;
            this.mostrarFormulario = true;

            //Validador de campos en formulario 
            if( this.registro.cajas.sector.trim() === "" ){
                alert("Sector no puede quedar vacio.");
            }else if ( this.registro.cajas.cultivo.trim() === "" ){
                alert("Cultivo no puede quedar vacio.");
            }else if( this.registro.cajas.variedad.trim() === "" ){
                alert("Variedad no puede quedar vacio.");
            }else if( this.registro.cajas.cantidad.trim() === "" ){
                alert("Cantidad no puede quedar vacio.");
            }else if( this.registro.cajas.sku.trim() === "" ){
                alert("SKU no puede quedar vacio.");
            }else{

                console.log(this.registro.cajas);
                //Limpiar formulario
                this.registro.cajas.sector = "";
                this.registro.cajas.cultivo = "";
                this.registro.cajas.variedad = "";
                this.registro.cajas.cantidad = "";
                this.registro.cajas.sku = "";
            }

            
            
        },

        mostrar_cajas(){
            this.ocultarCajas = true;
            this.mostrarFormulario = false;

            
        },

        abrir_modal_pendientes() {


            // this.registros_pendientes=JSON.parse(localStorage.getItem("regs_aplicaciones"));

            this.menu('pendientes', 'Registros');

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


