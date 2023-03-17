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
            active_menu_horas: "text-secondary",

            menu_superior: true,
            aside: {
                registros: true,
                pendientes: false,
                editar: false,
                incidencias: false,
                editarAsistencia: false,
                editarIncidencia: false,
                agregarTrabajador: false,
                horas: false,


            },

            cat_actIE: [],
            unidades: [],
            turnos: [],
            trabajadores: [],
            incidencia: [],

            registro: {
                maestro: {
                    UUID: "",
                    fecha: "",
                    rancho: "",
                    turno: "",
                    cat_actIE: "",
                    hora: "",
                    trabajadoresEditar: "",
                    incidencia: "",
                    observaciones: "",
                    trabajadoresIncidencia: "",
                    fechaEditar: "",
                    horaEditar: "",
                    ObservacionEditarIncidencia: "",



                },
                lista_trabajadores: [],
                trabajadores: [],
            },
            nombre_trabajador: "",
            nombre_trabajador2: "",
            trabajador: {
                nombre: "",
                cat_trabajadores_altas_id: "",
                cat_usuarios_licencias_id: "",
                celular_mensajes: "",
                permiso_msm: "",
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
                editar: false,
                incidencias: false,
                editarAsistencia: false,
                editarIncidencia: false,
                agregarTrabajador: false,
                horas: false,


            };
            this.aside[puntero] = true;
            this.menu_superior = false;

            if (this.aside.registros) {
                this.active_menu_registros = "text-success";
                this.active_menu_pendientes = "text-secondary";
                this.active_menu_regs = "text-secondary";
                this.active_menu_horas = "text-secondary";

                this.menu_superior = true;
            }

            if (this.aside.pendientes) {
                this.active_menu_registros = "text-secondary";
                this.active_menu_pendientes = "text-success";
                this.active_menu_regs = "text-secondary";
                this.active_menu_horas = "text-secondary";
                this.menu_superior = true;
            }

            if (this.aside.regs) {
                this.active_menu_registros = "text-secondary";
                this.active_menu_pendientes = "text-secondary";
                this.active_menu_regs = "text-success";
                this.active_menu_horas = "text-secondary";
                this.menu_superior = true;
            }
            if (this.aside.horas) {
                this.active_menu_registros = "text-secondary";
                this.active_menu_pendientes = "text-secondary";
                this.active_menu_regs = "text-secondary";
                this.active_menu_horas = "text-success";
                this.menu_superior = true;
            }

        },
        mountdata() {
            this.unidades = JSON.parse(localStorage.getItem("cat_unidades"));
            this.turnos = JSON.parse(localStorage.getItem("cat_turnos"));
            this.cat_actIE = JSON.parse(localStorage.getItem("cat_actIE"));
            this.trabajadores = JSON.parse(localStorage.getItem("cat_trabajadores"));
            this.incidencia = JSON.parse(localStorage.getItem("cat_incidencias"));



            this.registro.maestro.UUID = generateUUID();

            localStorage.setItem("regs_aplicaciones", JSON.stringify([]));

        },

        enviar() {
            // console.log(this.registro.maestro);
        },

        abrir_modal_pendientes() {


            // this.registros_pendientes=JSON.parse(localStorage.getItem("regs_aplicaciones"));

            this.menu('pendientes', 'Registros');

        },
        cerrar_modal_editarAsistencia() {
            this.menu('registros', 'Registros');
        },
        cerrar_modal_agregarTrabajador() {
            this.menu('registros', 'Registros');

        },
        cerrar_modal_editarIncidencia() {
            this.menu('registros', 'Registros');
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
        seleccionar_trabajdor(item) {
            this.nombre_trabajador = item.nombre;
            this.trabajador.nombre = item.nombre;
            this.trabajador.cat_trabajadores_altas_id = item.cat_trabajadores_altas_id;
            this.trabajador.cat_usuarios_licencias_id = item.cat_usuarios_licencias_id;
            this.trabajador.celular_mensajes = item.celular_mensajes;
            this.trabajador.permiso_msm = item.permiso_msm;
            this.registro.lista_trabajadores.push(this.trabajador);
            // console.log(this.trabajador);
            this.trabajador = {
                    nombre: "",
                    cat_trabajadores_altas_id: "",
                }
                // this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);
            this.nombre_trabajador = "";
            this.menu('registros', 'Registros');
        },
        borrar_trabajador_registro(trbj) {
            // console.log(trbj);
            // var array = this.registro.trabajadores;
            // this.registro.trabajadores = array.filter(item => item.cat_trabajadores_altas_id !== trbj.cat_trabajadores_altas_id);
            // this.registro.lista_trabajadores = this.registro.trabajadores.filter((item, index, self) => self.findIndex((i) => i.cat_trabajadores_altas_id === item.cat_trabajadores_altas_id) === index);
            this.registro.lista_trabajadores.splice(trbj, 1);
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

                let idtrabajador = trabajador.cat_trabajadores_altas_id;
                if (
                    idtrabajador == this.nombre_trabajador2.slice(2)

                ) {
                    if (this.registro.lista_trabajadores.indexOf(trabajador) == -1) {
                        this.registro.lista_trabajadores.push(trabajador);
                    }
                    this.nombre_trabajador2 = "";
                }
            });
            console.log(this.registro.lista_trabajadores);
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