

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
            logo: "https://eliteproduce.mx/wp-content/uploads/2022/03/favicon.png",
            version: "",
            modulo: "Trabajadores",
            titulo: "Identificaciones",
            aside: {
                identificaciones: true,
            },
            registro: {
                nombre: "",
                cat_trabajadores_altas_id: "",
            },
            nombre_de_trabajador: "",
            trabajadores: [],
            encontrado: false,
            device_impresora: "",
            buscar: false


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
            this.aside = {};
            this.aside[puntero] = true;

        },
        mountdata() {
            this.nombre = nombre();
            this.trabajadores = JSON.parse(localStorage.getItem("cat_trabajadores"));
        },
        buscarNombre() {
            this.buscar = true;
        },
        seleccionarTrabajador(item) {
            this.buscar = false;
            this.nombre_de_trabajador = "";
            this.registro.nombre = item.nombre;
            this.registro.cat_trabajadores_altas_id = item.cat_trabajadores_altas_id;
            this.encontrado = true;
        },
        cancelar() {
            this.encontrado = false;
            this.registro = {
                nombre: "",
                cat_trabajador_altas_id: "",
            };
        },
        async imprimir() {
            var im = await this.imprimir_data(this.registro);

            this.cancelar();
        },
        async imprimir_data(reg) {
            return new Promise(async (resolve) => {
                console.log(this.device_impresora);
                if (this.device_impresora != "") {
                    let server = await this.device_impresora.gatt.connect();
                    let service = await server.getPrimaryService(
                        "49535343-fe7d-4ae5-8fa9-9fafd205e455"
                    );
                    let characteristic = await service.getCharacteristic(
                        "49535343-8841-43f4-a8d4-ecbe34729bb3"
                    );

                    var esc = "\x1B"; //ESC byte in hex notation
                    var newLine = "\x0D\x0A"; //LF byte in hex notation
                    var cmds = esc + "\x61" + "\x01";
                    cmds += esc + "\x21" + "\x00";
                    cmds += esc + "\x20" + "\x02";
                    cmds += reg.nombre;
                    cmds += esc + "\x40";
                    cmds +=esc + "\x61" + "\x01";
                    cmds += esc + "\x21" + "\x00";
                    cmds += esc + "\x20" + "\x02";
                    cmds += reg.cat_trabajadores_altas_id;
                    cmds += esc + "\x40\x0D\x0A";
                    cmds +=esc + "\x61" + "\x01";
                    cmds += "\x1d\x6b\x04"+reg.cat_trabajadores_altas_id+"\x00";
                    cmds += esc + "\x4A" + "\x0A";
                    cmds += esc + "\x4A" + "\x0A";
                    cmds += esc + "\x4A" + "\x0A";

                
                   
                    
                    var arr = [];
                    for (var i = 0; i < cmds.length; i++) {
                        arr.push(cmds[i].charCodeAt(0));
                    }
                            
                    console.log(arr);
                    var data = arr;
                    let result = new Uint8Array(data).buffer;
                    await characteristic.writeValue(result);
                    

                    resolve(reg);
                } else {
                    await navigator.bluetooth
                        .requestDevice({
                            filters: [
                                {
                                    name: "MTP-II",
                                },
                                {
                                    name: "RT-330PB",
                                },
                                {
                                    name: "MTP-2",
                                },
                            ],
                            optionalServices: ["49535343-fe7d-4ae5-8fa9-9fafd205e455"],
                        })
                        .then((device) => {
                            console.log("Connecting to GATT Server...");
                            Toast.fire({
                                icon: "success",
                                title: "Impresora Conectada",
                            });
                            this.device_impresora = device;
                            return device.gatt.connect();
                        })
                        .then((server) => {
                            console.log("Getting Service...");
                            return server.getPrimaryService(
                                "49535343-fe7d-4ae5-8fa9-9fafd205e455"
                            );
                        })
                        .then((service) => {
                            console.log("Getting Characteristic...");
                            return service.getCharacteristic(
                                "49535343-8841-43f4-a8d4-ecbe34729bb3"
                            );
                        })
                        .then(async (characteristic) => {


                            var esc = "\x1B"; //ESC byte in hex notation
                            var newLine = "\x0D\x0A"; //LF byte in hex notation
                            var cmds = esc + "\x61" + "\x01";
                            cmds += esc + "\x21" + "\x00";
                            cmds += esc + "\x20" + "\x02";
                            cmds += reg.nombre;
                            cmds += esc + "\x40";
                            cmds +=esc + "\x61" + "\x01";
                            cmds += esc + "\x21" + "\x00";
                            cmds += esc + "\x20" + "\x02";
                            cmds += reg.cat_trabajadores_altas_id;
                            cmds += esc + "\x40\x0D\x0A";
                            cmds +=esc + "\x61" + "\x01";
                            cmds += "\x1d\x6b\x04"+reg.cat_trabajadores_altas_id+"\x00";
                            cmds += esc + "\x4A" + "\x0A";
                            cmds += esc + "\x4A" + "\x0A";
                            cmds += esc + "\x4A" + "\x0A";

                        
                           
                            
                            var arr = [];
                            for (var i = 0; i < cmds.length; i++) {
                                arr.push(cmds[i].charCodeAt(0));
                            }
                                    
                            console.log(arr);
                            var data = arr;
                            let result = new Uint8Array(data).buffer;
                            await characteristic.writeValue(result);
                            



                        })
                        .catch((error) => {
                            Toast.fire({
                                icon: "error",
                                title: error,
                            });
                        });
                }
            });
        },

    },
    computed: {
        buscarTrabajador() {
            var p = [];

            if (this.trabajadores.length > 0 && this.nombre_de_trabajador != "") {
                this.trabajadores.forEach((element) => {
                    if (element.nombre != null) {
                        var n = element.nombre.toUpperCase();
                        if (n.includes(this.nombre_de_trabajador.toUpperCase())) {
                            p.push(element);
                        }
                    }
                });
            }

            return p;
        },
    },
    mounted() {

        this.version = version();
        this.mountdata();


    },
    created() { },
    components: {},
    props: [],
}).mount('#app');

