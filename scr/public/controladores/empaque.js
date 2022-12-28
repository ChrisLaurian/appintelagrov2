
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
            modulo: "Empaque",
            titulo: "Empaque",
            nombre: "",
            aside: {
                empaque: true,
                registros: false
            },
            registro: {
                uuid: "",
                peso: "0.00",
                cat_trabajadores_altas_id: "",
                tag: "",
                nombre: "",
                capturista: usuario(),
                token: token(),
                fecha_de_captura: ""
            },
            trabajadores: [],
            interval_rank: "",
            control_rank: false,
            val_ctl_rank: 0,
            table_data: []


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
                empaque: false,
                registros: false
            };
            this.aside[puntero] = true;

            if (this.aside.registros == true && this.control_rank == false) {
                this.control_rank = true;
                this.interval_rank = setInterval(() => {

                    this.val_ctl_rank += 1;
                    console.log(this.val_ctl_rank);

                    var url = "https://vdtmckbcbe.execute-api.us-east-2.amazonaws.com/produccion/regs?token=" + token();

                    fetch(url, {
                        method: "GET"
                    })
                        .then((response) => {
                            if (!response.ok) throw Error(response.status);
                            return response.json();
                        })
                        .then((data) => {
                            console.log(data);
                            this.table_data = data.data;
                           // this.refresch_table();

                        })
                        .catch((err) => {
                            console.log(err);

                        });


                }, 2000);
            }

            if (this.aside.empaque == true && this.control_rank == true) {
                this.control_rank = false;
                clearInterval(this.interval_rank);
            }

        },
        mountdata() {
            this.nombre = nombre();
            if (!localStorage.getItem("regs_mamgos")) {
                localStorage.setItem("regs_mangos", JSON.stringify([]));
            }
            this.trabajadores = JSON.parse(localStorage.getItem("cat_trabajadores"));
           
        },
        async onStartButtonClick() {
            await navigator.bluetooth
                .requestDevice({
                    filters: [
                        {
                            name: "Bascula_intelagro",
                        },
                        {
                            name: "Bascula_232_2",
                        },
                        {
                            name: "Bascula_guwlab_01",
                        },
                        {
                            name: "Bascula_guwlab",
                        },
                        {
                            name: "Bascula",
                        }
                    ],
                    optionalServices: ["91bad492-b950-4226-aa2b-4ede9fa42f59"],
                })
                .then((device) => {
                    console.log("Connecting to GATT Server...");
                    return device.gatt.connect();
                })
                .then((server) => {
                    console.log("Getting Service...");
                    return server.getPrimaryService(
                        "91bad492-b950-4226-aa2b-4ede9fa42f59"
                    );
                })
                .then((service) => {
                    console.log("Getting Characteristic...");
                    return service.getCharacteristic(
                        "ca73b3ba-39f6-4ab3-91ae-186dc9577d99"
                    );
                })
                .then((characteristic) => {
                    Toast.fire({
                        icon: "success",
                        title: "Bascula Conectada",
                    });
                    myCharacteristic = characteristic;
                    return myCharacteristic.startNotifications().then((_) => {
                        console.log("> Notifications started");
                        myCharacteristic.addEventListener(
                            "characteristicvaluechanged",
                            this.handleNotifications
                        );
                    });
                })
                .catch((error) => {
                    console.log("Argh! " + error);
                    Toast.fire({
                        icon: "error",
                        title: error,
                    });
                });
        },
        onStopButtonClick() {
            if (myCharacteristic) {
                myCharacteristic
                    .stopNotifications()
                    .then((_) => {
                        console.log("> Notifications stopped");
                        myCharacteristic.removeEventListener(
                            "characteristicvaluechanged",
                            this.handleNotifications
                        );
                    })
                    .catch((error) => {
                        console.log("Argh! " + error);
                    });
            }
        },
        handleNotifications(event) {
            var enc = new TextDecoder("utf-8");
            let value = event.target.value;
            this.registro.peso = enc.decode(value);
        },
        enviar() {
            this.registro.uuid = generateUUID();
            this.registro.fecha_de_captura = fechahoy() + " " + horahoy();

            if (this.registro.cat_trabajadores_altas_id != "" && this.registro.tag != "") {


                fetch("https://vdtmckbcbe.execute-api.us-east-2.amazonaws.com/produccion/registro", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.registro)
                })
                    .then((response) => {
                        if (!response.ok) throw Error(response.status);
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        if (data.estado == "fail") {
                            Toast.fire({
                                icon: "error",
                                title: data.err,
                            });
                        }
                        if (data.estado == "ok") {
                            Toast.fire({
                                icon: "success",
                                title: data.mess
                            });

                            this.cancelar();


                        }
                    })
                    .catch((err) => {
                        console.log(err);

                        Toast.fire({
                            icon: "error",
                            title: data.error,
                        });
                    });
            } else {
                Toast.fire({
                    icon: "info",
                    title: "Existen Campos En Blanco",
                });
            }

        },
        cancelar() {
            this.registro = {
                uuid: "",
                peso: "0.00",
                cat_trabajadores_altas_id: "",
                tag: "",
                nombre: "",
                capturista: usuario(),
                token: token(),
                fecha_de_captura: ""
            };
            document.getElementById("trabajador").focus();
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
        buscarTrabajadorCodigo() {
            var tb;
            var result = "";

            if (

                this.registro.cat_trabajadores_altas_id.length >= 5
            ) {

                result = this.registro.cat_trabajadores_altas_id.substring(0, this.registro.cat_trabajadores_altas_id.length - 1);


                this.trabajadores.forEach((item) => {
                    if (item.cat_trabajadores_altas_id == result) {
                        this.registro.nombre = item.nombre;
                        this.registro.cat_trabajadores_altas_id =
                            item.cat_trabajadores_altas_id;
                        this.encontrado = true;
                        setTimeout(() => {
                            document.getElementById("tag").focus();
                        }, 100);
                    }
                });
            }
            return "";
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
