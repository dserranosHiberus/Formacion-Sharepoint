import { IDropdownOption } from "@fluentui/react";
import { ISectores, ISectorId } from "../models/Interfaces";
import { directorioBLL } from "./directorioBLL";


// *****CONSULTA DE LOS DATOS DE LA LISTA*****
const getSectoresInfo = async (): Promise<ISectores[]> => {
    let sectoresList = await directorioBLL.getSectorsArray()
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
const getSectorDenomination = async (): Promise<IDropdownOption[]> => {
    let sectoresDenominacion: any = await directorioBLL.getSectorsArray()
    return sectoresDenominacion.map((item: ISectorId) => ({
        key: item.ID,
        text: item.Denominacion
    }))
}

// *****EXPORTACIONES DE FUNCIONES*****
export const sectoresService = {
    getSectoresInfo,
    getSectorDenomination
}