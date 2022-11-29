import { getSP } from "../../../pnpjsConfig";
import { IGrupos, IFormFields, ISectores } from "../models/Interfaces";
import { IDropdownOption } from "@fluentui/react";

const IdListGrupos = "f1193dcc-6ec0-44f0-9124-d526430752d0";
const IdListSectores = "988b9d7c-a505-4396-ad62-61ab21b28f62";

// *****CREAR UN GRUPO*****
const addGroup = async (formField: IFormFields) => {
    await getSP()
        .web.lists.getById(IdListGrupos)
        .items.add({
            SectorAsociadoId: formField.SectorAsociadoId,
            CodigoDeGrupo: formField.CodigoDeGrupo,
            Denominacion: formField.Denominacion,
            Descripcion: formField.Descripcion,
            FechaDeCreacion: formField.FechaDeCreacion,
            FechaDeFinalizacion: formField.FechaDeFinalizacion,
            Estado: formField.Estado,
            TipoDeGrupo: formField.TipoDeGrupo,
            Tematica: formField.Tematica,
        })
    return
}

// *****EDITAR UN GRUPO*****
const editGroup = async (formField: IFormFields, Id: number) => {
    await getSP()
        .web.lists.getById(IdListGrupos)
        .items.getById(Id)
        .update({
            SectorAsociadoId: formField.SectorAsociadoId,
            CodigoDeGrupo: formField.CodigoDeGrupo,
            Denominacion: formField.Denominacion,
            Descripcion: formField.Descripcion,
            FechaDeCreacion: formField.FechaDeCreacion,
            FechaDeFinalizacion: formField.FechaDeFinalizacion,
            Estado: formField.Estado,
            TipoDeGrupo: formField.TipoDeGrupo,
            Tematica: formField.Tematica,
        })
    return
}

// *****BORRAR UN GRUPO*****
const deleteGroup = async (Id: number) => {
    await getSP().web.lists.getById(IdListGrupos).items.getById(Id).delete();
    return
}

// *****CONSULTA DE TODOS LOS GRUPOS*****
const getGroupsArray = async (): Promise<IGrupos[]> => {
    const groupsCall = await getSP().web.lists.getById(IdListGrupos)
        .items.select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term")
        .expand("TaxCatchAll", "SectorAsociado")()
    console.log(groupsCall)
    return groupsCall
}

// *****CONSULTA DEL GRUPO SELECCIONADO*****
const getGroupSelectArray = async (Id: number): Promise<IGrupos> => {
    const callGroupSelected = await getSP().web.lists.getById(IdListGrupos)
        .items.getById(Id)
        .select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term")
        .expand("TaxCatchAll", "SectorAsociado")()
    return callGroupSelected
}

// *****CONSULTA DE TODOS LOS SECTORES*****
const getSectorsArray = async (): Promise<ISectores[]> => {
    const sectoresCall = await getSP()
        .web.lists.getById(IdListSectores)
        .items.select("*")()
    // console.log("SectoresCall", sectoresCall)
    return sectoresCall
}

// *****CONSULTA DE TIPOS DE GRUPOS*****
const getGroupTypes = async (): Promise<any> => {
    const groupTypes: IDropdownOption = await getSP().web.lists.getById(IdListGrupos).fields.getByInternalNameOrTitle("TipoDeGrupo").select("Choices")()
    return groupTypes
}

// *****CONSULTA DE TEMATICAS*****
const getThematic = async (): Promise<any> => {
    const thematic: IDropdownOption = await getSP().web.lists.getById(IdListGrupos).fields.getByInternalNameOrTitle("Tematica").select("Choices")()
    return thematic
}

export const directorioBLL = {
    addGroup,
    editGroup,
    deleteGroup,
    getGroupsArray,
    getGroupSelectArray,
    getSectorsArray,
    getGroupTypes,
    getThematic
}