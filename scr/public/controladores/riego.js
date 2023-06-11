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
                registros2: true,
                AgregarProductos: false,

            },
            cajas: [],
            proveedores: [],
            documentos: [],
            unidades: [],

            registro: {
                maestro: {
                    UUID: "",
                    fecha_de_captura: "",
                    descripcion_unidades_productivas: "",
                    descripcioncabezal: "",
                    descripcion_programa: "",
                    numero_de_pulso: "",

                },
                lista_trabajadores: [],
                trabajadores: [],
                productos: [],
            },
            producto: {
                UUID: "",
                cat_compras_productos_id: "",
                cantidad: "",
                cat_compras_productos_unidad_de_medida_mu_id: "",
                capturista: localStorage.getItem("ses_usuario")
            },
            nombre_trabajador: "",
            nombre_lote: "",
            nombre_producto: "",
            receta: "",

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
                registros2: false,
                AgregarProductos: false,
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

        ocultarcards(mostrar) {

            this.aside.registros2 = mostrar;
            this.$nextTick(() => {
                this.aside.registros2 = mostrar;
            });
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
        seleccionar_producto(item) {
            this.nombre_producto = item.producto;
            this.producto.cat_compras_productos_id = item.cat_compras_productos_id;
            this.producto.UUID = this.registro.maestro.UUID;

        },
        nombreProductos(id) {
            console.log(id);
            var nProductos = "";
            this.productos.forEach((element) => {
                if (id == element.cat_compras_productos_id) {
                    nProductos = element.producto;
                }
            });
            return nProductos;
        },
        editar_producto(item, index) {
            this.registro.productos.splice(index, 1);
            this.menu('AgregarProductos', 'Registros');
            this.nombre_producto = this.nombreProductos(item.cat_compras_productos_id);
            this.producto = item;
        },
        editar_producto_receta(item, index) {
            this.registro_receta.productos.splice(index, 1);
            this.nombre_producto = this.nombreProductos(item.cat_compras_productos_id);
            this.producto = item;
        },
        nombreUnidadMedida(id) {
            var nMedidas = "";
            this.medidas.forEach((element) => {
                if (id == element.cat_compras_productos_unidad_de_medida_mu_id) {
                    nMedidas = element.descripcion_cat_compras_productos_unidad_de_medida;
                }
            });
            return nMedidas;
        },
        borrar_producto(item, index) {
            this.registro.productos.splice(index, 1);
        },
        selecciondeinput(item) {
            var input2 = document.getElementById("Producto1");


            switch (item) {
                case 2:
                    {
                        if (this.nombre_producto != this.producto.producto) {

                            input2.className += "form-control is-invalid";
                            document.getElementById("labelerror3").style.display = "initial";
                            document.getElementById("labelerror3").style.color = "red";

                        } else {

                            input2.className += "form-control is-valid";
                            document.getElementById("labelerror3").style.display = "none";
                        }
                    }
                    break;
            }
            console.log(this.nombre_producto);
            console.log(this.producto.producto);

        },
        agregar_producto() {
            // this.registro.productos.push(this.producto);
            // this.cerrar_modal_productos();
            if (this.nombre_producto == this.producto.producto && this.producto.cantidad != "" && this.nombre_producto != "") {
                this.registro.productos.push(this.producto);
                console.log(this.registro.productos);
                this.cerrar_modal_productos();
                ocultarcards(true);
            } else {
                alert("Falta ingresar datos");
                return 0;
            }
        },
        seleccionar_producto(item, numero) {
            this.nombre_producto = item.producto;
            this.producto.producto = this.nombre_producto;
            this.producto.cat_compras_productos_id = item.cat_compras_productos_id;
            this.producto.UUID = this.registro.maestro.UUID;
            this.selecciondeinput(numero);

        },
        cerrar_modal_productos() {
            this.nombre_producto = "";
            this.producto = {
                UUID: this.registro.maestro.UUID,
                cat_compras_productos_id: "",
                cantidad: "",
                cat_compras_productos_unidad_de_medida_mu_id: "",
                capturista: localStorage.getItem("ses_usuario")
            }

            this.menu('registros', 'Registros');
            // await new Promise(resolve => setTimeout(resolve, 100));
            // this.refresch_table();

        },
    },
    computed: {
        list_productos() {
            var prod = [];

            this.productos.forEach((producto) => {
                let p = producto.producto.toUpperCase();
                if (
                    p.includes(this.nombre_producto.toUpperCase()) &&
                    this.nombre_producto != "" &&
                    this.nombre_producto.toUpperCase() != p
                ) {
                    prod.push(producto);
                }
            });
            return prod;
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