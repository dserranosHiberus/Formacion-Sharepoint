import { Grupos, FormFields, Sectores, SectorId } from "../models/index";
import { IDropdownOption } from "@fluentui/react";
import { tarea4Service } from "./tarea4Service";

// *****CONSULTA DE TODOS LOS GRUPOS*****
const readGroups = async (): Promise<Grupos[]> => {
    const gruposCall = await tarea4Service.getGroupsArray()
    console.log(gruposCall)
    return gruposCall.map((item) => ({
        ID: item.ID,
        CodigoDeGrupo: item.CodigoDeGrupo,
        SectorAsociado: item.SectorAsociado.Denominacion,
        SectorAsociadoId: item.SectorAsociadoId,
        Denominacion: item.Denominacion,
        Descripcion: item.Descripcion,
        FechaDeCreacion: new Date(item.FechaDeCreacion).toDateString(),
        FechaDeFinalizacion: new Date(item.FechaDeFinalizacion).toDateString(),
        Estado: item.Estado,
        TipoDeGrupo: item.TipoDeGrupo,
        Tematica: item.Tematica,
        // Pais: item?.TaxCatchAll[2].Term,
        // Ciudad: item?.TaxCatchAll[1].Term,
        // Ambito: item?.Ambito[0].Label,
    }));
}

// *****CONSULTA DEL GRUPO SELECCIONADO*****
const readGroupSelect = async (Id: number): Promise<Grupos> => {
    const CallGroupSelected = await tarea4Service.getGroupSelectArray(Id)
    const grupo: Grupos = {
        ID: CallGroupSelected.ID,
        CodigoDeGrupo: CallGroupSelected.CodigoDeGrupo,
        SectorAsociado: CallGroupSelected.SectorAsociado.Denominacion,
        SectorAsociadoId: CallGroupSelected.SectorAsociadoId,
        Denominacion: CallGroupSelected.Denominacion,
        Descripcion: CallGroupSelected.Descripcion,
        FechaDeCreacion: new Date(CallGroupSelected.FechaDeCreacion).toDateString(),
        FechaDeFinalizacion: new Date(CallGroupSelected.FechaDeFinalizacion).toDateString(),
        Estado: CallGroupSelected.Estado,
        TipoDeGrupo: CallGroupSelected.TipoDeGrupo,
        Tematica: CallGroupSelected.Tematica,
        // Pais: CallGroupSelected?.TaxCatchAll[2].Term,
        // Ciudad: CallGroupSelected.TaxCatchAll[1].Term,
        // Ambito: CallGroupSelected.Ambito[0].Label,
    }
    // console.log("Grupo seleccionado", grupo)
    return grupo;
};

// *****CREACCION DE NUEVO GRUPO*****
const createGroup = async (formField: FormFields) => {
    await tarea4Service.addGroup(formField)
    return
}

// *****EDICION DE UN GRUPO SELECCIONADO*****
const updateGroup = async (formField: FormFields, Id: number) => {
    await tarea4Service.editGroup(formField, Id)
    return
}

// *****BORRADO DEL GRUPO SELECCIONADO*****
const deleteGroup = async (Id: number) => {
    await tarea4Service.deleteGroup(Id)
    return
}

// *****CONSULTA DE TIPOS DE GRUPOS*****
const getGroupTypes = async (): Promise<IDropdownOption[]> => {
    const groupTypes = await tarea4Service.getGroupTypes()
    return groupTypes.Choices.map((item: string) => ({
        key: item,
        text: item
    }));
}

// *****CONSULTA DE TEMATICAS*****
const getThematic = async (): Promise<IDropdownOption[]> => {
    const thematic = await tarea4Service.getThematic()
    return thematic.Choices.map((item: string) => ({
        key: item,
        text: item
    }));
}


// *****CONSULTA DE LOS DATOS DE LA LISTA*****
const getSectoresInfo = async (): Promise<Sectores[]> => {
    let sectoresList = await tarea4Service.getSectorsArray()
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
    let sectoresDenominacion: any = await tarea4Service.getSectorsArray()
    return sectoresDenominacion.map((item: SectorId) => ({
        key: item.ID,
        text: item.Denominacion
    }))
}

// *****EXPORTACIONES DE FUNCIONES*****
export const tarea4BLL = {
    createGroup,
    readGroups,
    readGroupSelect,
    updateGroup,
    deleteGroup,
    getGroupTypes,
    getThematic,
    getSectoresInfo,
    getSectorDenomination,
}