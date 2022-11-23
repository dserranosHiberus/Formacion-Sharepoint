import { IDropdownOption } from "@fluentui/react";
import { getSP } from "../../../pnpjsConfig";
import { ISectores } from "../models/Interfaces";

const nameListGrupos = "SectoresUnidades";
const IdListSectores = "988b9d7c-a505-4396-ad62-61ab21b28f62";

// *****CONSULTA DE TODOS LOS GRUPOS*****
const getSectoresArray = async (): Promise<ISectores[]> => {
    const sectoresCall = await getSP()
        .web.lists.getById(IdListSectores)
        .items.select("*")()
    // console.log("SectoresCall", sectoresCall)
    return sectoresCall
}


// *****CONSULTA DE LOS DATOS DE LA LISTA*****
const getSectoresInfo = async (): Promise<ISectores[]> => {

    let sectoresList = await getSectoresArray()
    return sectoresList.map((item) => ({
        ID: item.ID,
        CodigoDelSector: item.CodigoDelSector,
        Denominacion: item.Denominacion,
        URLImagenSector: item.URLImagenSector,
        URLListaGrupos: item.URLListaGrupos,
        URLListaReuniones: item.URLListaReuniones,
        URLBiblioteca: item.URLBiblioteca,
        URLGrupoAdmSector: item.URLGrupoAdmSector,
        URLGrupoUsuariosSector: item.URLGrupoUsuariosSector,

    }));
}

// *****CONSULTA DE SECTORES ASOCIADOS*****
const getSectoresDenominacion = async (): Promise<IDropdownOption[]> => {

    let sectoresDenominacion: any = await getSectoresArray()
    return sectoresDenominacion.map((item: { Denominacion: any; }) => ({
        key: item.Denominacion,
        text: item.Denominacion

    }))
}

// *****EXPORTACIONES DE FUNCIONES*****
export const sectoresService = {
    getSectoresArray,
    getSectoresInfo,
    getSectoresDenominacion
}