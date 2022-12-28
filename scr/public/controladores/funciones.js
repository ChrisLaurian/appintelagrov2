
function fechahoy() {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = now.getFullYear() + "-" + month + "-" + day;
    return today;
}

function horahoy() {
    var date = new Date();
    var hour = date.getHours(),
        min = date.getMinutes();

    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;

    var displayTime = hour + ":" + min;
    return displayTime;
}

function timestamp() {
    var hoy = new Date();
    var fecha =
        hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var hora =
        hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    var fechaYHora = fecha + " " + hora;
    return fechaYHora;
}

function generateUUID() {
    var d = new Date().getTime();
    var d2 =
        (typeof performance !== "undefined" &&
            performance.now &&
            performance.now() * 1000) ||
        0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });

}

function version() {
    return "26112022";
}

function storageName(name) {
    var names = {
        aplicaciones: "regs_aplicaciones",
        recetas: "regs_recetas",
        finanzas: "regs_finanzas",
        asistencias: "regs_asistencias",
        incidencias: "regs_incidencias",
        phcena: "regs_phcena",
        drenaje: "regs_drenaje",
        plagas: "regs_plagas",
        requisicion: "regs_requisicion",
        cosecha: "regs_cosecha"
    }

    return names[name];
}
