import { IGrupos, IFormFields } from "../models/Interfaces";
import { IDropdownOption, themeRulesStandardCreator } from "@fluentui/react";
import { directorioBLL } from "./directorioBLL";

const nameListGrupos = "Grupos de la Unidad X";
const IdListGrupos = "f1193dcc-6ec0-44f0-9124-d526430752d0";

// *****CONSULTA DE TODOS LOS GRUPOS*****
const readGroups = async (): Promise<IGrupos[]> => {
    const gruposCall = await directorioBLL.getGroupsArray()
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
    }));
}

// *****CONSULTA DEL GRUPO SELECCIONADO*****
const readGroupSelect = async (Id: number): Promise<IGrupos> => {
    const CallGroupSelected = await directorioBLL.getGroupSelectArray(Id)
    const grupo: IGrupos = {
        ID: CallGroupSelected.ID,
        CodigoDeGrupo: CallGroupSelected.CodigoDeGrupo,
        SectorAsociado: CallGroupSelected.SectorAsociado.Denominacion,
        SectorAsociadoId: CallGroupSelected.SectorAsociadoId,
        Denominacion: CallGroupSelected.Denominacion,
        Descripcion: CallGroupSelected.Descripcion,
        FechaDeCreacion: new Date(CallGroupSelected.FechaDeCreacion).toDateString(),
        FechaDeFinalizacion: new Date(CallGroupSelected.FechaDeFinalizacion).toDateString(),
        TipoDeGrupo: CallGroupSelected.TipoDeGrupo,
        Tematica: CallGroupSelected.Tematica,
        Estado: CallGroupSelected.Estado,
    }
    // console.log("Grupo seleccionado", grupo)
    return grupo;
};

// *****CREACCION DE NUEVO GRUPO*****
const createGroup = async (formField: IFormFields) => {
    await directorioBLL.addGroup(formField)
    return
}

// *****EDICION DE UN GRUPO SELECCIONADO*****
const updateGroup = async (formField: IFormFields, Id: number) => {
    await directorioBLL.editGroup(formField, Id)
    return
}

// *****BORRADO DEL GRUPO SELECCIONADO*****
const deleteGroup = async (Id: number) => {
    await directorioBLL.deleteGroup(Id)
    return
}

// *****CONSULTA DE TIPOS DE GRUPOS*****
const getGroupTypes = async (): Promise<IDropdownOption[]> => {
    const groupTypes = await directorioBLL.getGroupTypes()
    return groupTypes.Choices.map((item: string) => ({
        key: item,
        text: item
    }));
}

// *****CONSULTA DE TEMATICAS*****
const getThematic = async (): Promise<IDropdownOption[]> => {
    const thematic = await directorioBLL.getThematic()
    return thematic.Choices.map((item: string) => ({
        key: item,
        text: item
    }));
}

// *****EXPORTACIONES DE FUNCIONES*****
export const gruposService = {
    createGroup,
    readGroups,
    readGroupSelect,
    updateGroup,
    deleteGroup,
    getGroupTypes,
    getThematic,
}