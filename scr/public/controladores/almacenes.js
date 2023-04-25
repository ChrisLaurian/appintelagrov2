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
                pendientes: false,
                inventario: false,
                traspasos: false,
                existencias: false,
                agregarproductos: false,

            },

            lotes: [],
            proveedores: [],
            estatusalmacen: [],
            requisiciones: [],
            almacenes: [],
            documentos: [],
            compraestatus: [],
            productos: [],


            registro: {
                maestro: {
                    UUID: "",
                    fecha: "",
                    requisicion: "",
                    almacenes: "",
                    documentos: "",
                    referencia: "",
                    total: 0,
                    compraestatus: "",

                },
                productos: [],
            },
            producto: {
                UUID: "",
                cat_compras_productos_id: "",
                cantidad: "",
                producto: "",
                ubicacion: "",
                caducidad: "",
                precio: "",

            },
            proveedor: {
                nombre: "",
                cat_compras_proveedores_id: "",
            },
            nombre_proveedor: "",
            nombre_producto: "",

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
                inventario: false,
                traspasos: false,
                existencias: false,
                agregarproductos: false,
            };
            this.aside[puntero] = true;

        },
        mountdata() {
            this.unidades = JSON.parse(localStorage.getItem("cat_unidades"));
            this.lotes = JSON.parse(localStorage.getItem("cat_lotes"));
            this.proveedores = JSON.parse(localStorage.getItem("cat_proveedores"));
            this.estatusalmacen = JSON.parse(localStorage.getItem("cat_estatus_almacen"));
            this.requisiciones = JSON.parse(localStorage.getItem("cat_requisiciones"));
            this.almacenes = JSON.parse(localStorage.getItem("cat_almacenes"));
            this.documentos = JSON.parse(localStorage.getItem("cat_documentos"));
            this.compraestatus = JSON.parse(localStorage.getItem("cat_almacen_lpn"));
            this.productos = JSON.parse(localStorage.getItem("cat_productos"));


            this.registro.maestro.UUID = generateUUID();

            localStorage.setItem("regs_aplicaciones", JSON.stringify([]));

        },

        enviar() {

            console.log(this.registro);
        },

        abrir_modal_pendientes() {


            // this.registros_pendientes=JSON.parse(localStorage.getItem("regs_aplicaciones"));

            this.menu('pendientes', 'Registros');

        },

        seleccionar_proveedor(item) {
            this.nombre_proveedor = item.descripcion_proveedores;
            this.proveedor.nombre = item.descripcion_proveedores;
            this.proveedor.cat_compras_proveedores_id = item.cat_compras_proveedores_id;
        },
        nombre_proveedor(id) {
            var n = "";

            this.proveedores.forEach((element) => {
                if (id == element.cat_compras_proveedores_id) {
                    n = element.descripcion_proveedores;
                }
            });
            return n;
        },


        cerrar_modal_productos() {
            this.nombre_producto = "";
            this.producto = {
                UUID: this.registro.maestro.UUID,
                cat_compras_productos_id: "",
                cantidad: "",
                producto: "",
                ubicacion: "",
                caducidad: "",
                precio: "",
            }

            this.menu('registros', 'Registros');
            // document.getElementById("btnagregarproductos").focus();
            // setTimeout(() => {
            //     this.$refs.btnagregarproductos.$refs.input.focus();
            // }, 50);
            this.$nextTick(() => {
                this.$refs.btnagregarproductos.focus();
            });
        },
        seleccionar_producto(item) {
            this.nombre_producto = item.producto;
            this.producto.producto = this.nombre_producto;
            this.producto.cat_compras_productos_id = item.cat_compras_productos_id;
            this.producto.UUID = this.registro.maestro.UUID;


        },
        agregar_producto() {
            this.registro.productos.push(this.producto);
            console.log(this.registro.productos);
            this.cerrar_modal_productos();
        },
        nombreProductos(id) {
            var nProductos = "";
            this.productos.forEach((element) => {
                if (id == element.cat_compras_productos_id) {
                    nProductos = element.producto;
                }
            });
            return nProductos;
        },
        borrar_producto(item, index) {
            this.registro.productos.splice(index, 1);
        },
        editar_producto(item, index) {
            this.registro.productos.splice(index, 1);

            this.menu('agregarproductos', 'Registros');
            this.nombre_producto = this.nombreProductos(item.cat_compras_productos_id);
            this.producto = item;
        },

    },
    computed: {

        list_proveedores() {
            var trb = [];

            this.proveedores.forEach((proveedor) => {
                let t = proveedor.descripcion_proveedores.toUpperCase();
                if (
                    t.includes(this.nombre_proveedor.toUpperCase()) &&
                    this.nombre_proveedor != "" &&
                    this.nombre_proveedor.toUpperCase() != t
                ) {
                    trb.push(proveedor);
                }
            });
            return trb;

        },
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