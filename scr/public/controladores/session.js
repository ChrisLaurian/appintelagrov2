async function inicio(nombre, cat_usuarios_licencias_id, token, usuario, vigente, modulos, catalogos) {
    if (!localStorage.getItem("ses_uuid")) {
        localStorage.setItem("ses_uuid", generateUUID());
    }

    await this.mountCatalogos(catalogos);

    localStorage.setItem('ses_usuario', usuario);
    localStorage.setItem('ses_nombre', nombre);
    localStorage.setItem('ses_token', token);
    localStorage.setItem('ses_vigente', vigente);
    localStorage.setItem("modulos", JSON.stringify(modulos));
    localStorage.setItem('cat_usuarios_licencias_id', cat_usuarios_licencias_id);
    location.href = host() + "/modulos.html";


}

function redirect() {
    location.href = rutas.host + rutas.informes;
    location.href = rutas.host + rutas.campo;
    location.href = rutas.host + rutas.devices;

}

function imei() {
    if (localStorage.getItem("ses_uuid")) {
        return localStorage.getItem("ses_uuid");
    } else {
        this.salir();
    }
}

function token() {
    if (localStorage.getItem("ses_token")) {
        return localStorage.getItem("ses_token");
    } else {
        this.salir();
    }
}

function usuario() {
    if (localStorage.getItem("ses_usuario")) {
        return localStorage.getItem("ses_usuario");
    } else {
        this.salir();
    }
}

function nombre() {
    if (localStorage.getItem("ses_nombre")) {
        return localStorage.getItem("ses_nombre");
    } else {
        this.salir();
    }
}

function licencia() {

    if (localStorage.getItem("cat_usuarios_licencias_id")) {
        return localStorage.getItem("cat_usuarios_licencias_id");
    } else {
        this.salir();
    }

}

function salir() {

    if (this.validar_salida()) {

        localStorage.clear();

        location.href = host();

    }
}

function compareRole(page) {
    if (localStorage.getItem("role")) {
        if (localStorage.getItem("role") == page) {
            return true;
        } else {
            this.salir();
        }
    } else {
        this.salir();

    }
}

function mountCatalogos(catalogos) {
    console.log(catalogos);
    return new Promise((resolve) => {

        localStorage.setItem(
            "cat_actividades",
            JSON.stringify(catalogos.actividades)
        );
        localStorage.setItem(
            "cat_boquillas",
            JSON.stringify(catalogos.boquillas)
        );
        localStorage.setItem("cat_alcance", JSON.stringify(catalogos.alcance));
        localStorage.setItem(
            "cat_trabajadores",
            JSON.stringify(catalogos.trabajadores)
        );
        localStorage.setItem(
            "cat_funcionalidad",
            JSON.stringify(catalogos.funcionalidad)
        );
        localStorage.setItem("cat_lotes", JSON.stringify(catalogos.lotes));
        localStorage.setItem("cat_medidas", JSON.stringify(catalogos.medidas));
        localStorage.setItem("cat_metodos", JSON.stringify(catalogos.metodos));
        localStorage.setItem("cat_tipos", JSON.stringify(catalogos.tipos));
        localStorage.setItem("cat_unidades", JSON.stringify(catalogos.unidades));
        localStorage.setItem("cat_recetas", JSON.stringify(catalogos.recetas));
        localStorage.setItem("cat_productos", JSON.stringify(catalogos.productos));
        localStorage.setItem("cat_documentos_caja", JSON.stringify(catalogos.documentos_caja));
        localStorage.setItem("cat_cajas", JSON.stringify(catalogos.cajas));
        localStorage.setItem("cat_movimientos", JSON.stringify(catalogos.movimientos));
        localStorage.setItem("cat_proveedores", JSON.stringify(catalogos.proveedores));
        localStorage.setItem("cat_costeo", JSON.stringify([]));
        localStorage.setItem("cat_turnos", JSON.stringify(catalogos.turnos));
        localStorage.setItem("cat_almacen_lpn", JSON.stringify(catalogos.almacen_lpn));
        localStorage.setItem("cat_almacen_entradas", JSON.stringify(catalogos.almacen_entradas));
        localStorage.setItem("cat_almacen_traspaso", JSON.stringify(catalogos.almacen_traspaso));
        localStorage.setItem("cat_documentos", JSON.stringify(catalogos.documentos));
        localStorage.setItem("cat_requisiciones", JSON.stringify(catalogos.requisiciones));
        localStorage.setItem("cat_estatus_almacen", JSON.stringify(catalogos.estatus_almacen));
        localStorage.setItem("cat_almacenes", JSON.stringify(catalogos.almacenes));
        localStorage.setItem("cat_estatus_compras", JSON.stringify(catalogos.estatus_compras));
        localStorage.setItem("cat_plagas", JSON.stringify(catalogos.plagas));
        localStorage.setItem("cat_dispositivos", JSON.stringify(catalogos.dispositivos));
        localStorage.setItem("cat_incidencias", JSON.stringify(catalogos.incidencias));
        localStorage.setItem("cat_actIE", JSON.stringify(catalogos.actIE));
        localStorage.setItem("cat_tags", JSON.stringify(catalogos.tags));
        localStorage.setItem("cat_dano", JSON.stringify(catalogos.dano));
        localStorage.setItem("cat_zona", JSON.stringify(catalogos.zona));

        resolve("ready");

    });

}

function validar_salida() {

    if (localStorage.getItem(storageName("cosecha"))) {
        if (JSON.parse(localStorage.getItem(storageName("cosecha"))).length > 0) {


            alert(`Existen ${JSON.parse(localStorage.getItem(storageName("cosecha"))).length} Registros de finanzas sin enviar`);


            return false;
        }
    }

    if (localStorage.getItem(storageName("finanzas"))) {
        if (JSON.parse(localStorage.getItem(storageName("finanzas"))).length > 0) {


            alert(`Existen ${JSON.parse(localStorage.getItem(storageName("finanzas"))).length} Registros de finanzas sin enviar`);


            return false;
        }
    }

    if (localStorage.getItem(storageName("aplicaciones"))) {
        if (JSON.parse(localStorage.getItem(storageName("aplicaciones"))).length > 0) {
            return false;
        }
    }

    if (localStorage.getItem(storageName("recetas"))) {
        if (JSON.parse(localStorage.getItem(storageName("recetas"))).length > 0) {
            return false;
        }
    }

    if (localStorage.getItem(storageName("asistencias"))) {
        if (JSON.parse(localStorage.getItem(storageName("asistencias"))).length > 0) {
            return false;
        }
    }

    if (localStorage.getItem(storageName("incidencias"))) {
        if (JSON.parse(localStorage.getItem(storageName("incidencias"))).length > 0) {
            return false;
        }
    }


    if (localStorage.getItem(storageName("phcena"))) {
        if (JSON.parse(localStorage.getItem(storageName("phcena"))).length > 0) {
            return false;
        }
    }

    if (localStorage.getItem(storageName("drenaje"))) {
        if (JSON.parse(localStorage.getItem(storageName("drenaje"))).length > 0) {
            return false;
        }
    }


    if (localStorage.getItem(storageName("plagas"))) {
        if (JSON.parse(localStorage.getItem(storageName("plagas"))).length > 0) {
            return false;
        }
    }

    if (localStorage.getItem(storageName("requisicion"))) {
        if (JSON.parse(localStorage.getItem(storageName("requisicion"))).length > 0) {
            return false;
        }
    }

    return true;
}

function host() {
    return "http://localhost:3333"
        // return "https://eliteproduce.intelagro.net"
}