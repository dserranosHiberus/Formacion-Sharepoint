import { getSP } from "../../../pnpjsConfig";
import { IGrupos } from "../models/Interfaces";
import CreateGrupo from "../components/CreateGroup/CreateGroup";
import { IDropdownOption, themeRulesStandardCreator } from "@fluentui/react";

const nameListGrupos = "Grupos de la Unidad X";
const IdListGrupos = "f1193dcc-6ec0-44f0-9124-d526430752d0";

// *****CONSULTA DE TODOS LOS GRUPOS*****
const getGruposInfo = async (): Promise<IGrupos[]> => {

    const gruposCall = await getSP()
        .web.lists.getById(IdListGrupos)
        .items.select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term")
        .expand("TaxCatchAll", "SectorAsociado")()
    console.log(gruposCall)
    return gruposCall.map((item) => ({

        ID: item.ID,
        CodigoDeGrupo: item.CodigoDeGrupo,
        SectorAsociado: item.SectorAsociado.Denominacion,
        Denominacion: item.Denominacion,
        Descripcion: item.Descripcion,
        FechaDeCreacion: new Date(item.FechaDeCreacion).toDateString(),
        FechaDeFinalizacion: new Date(item.FechaDeFinalizacion).toDateString(),
        Estado: item.Estado,
        TipoDeGrupo: item.TipoDeGrupo,
        Tematica: item.Tematica,
        // Ambito: item.TaxCatchAll[2].Term,
        // Pais: item.TaxCatchAll[1].Term,
        // Ciudad: item.TaxCatchAll[0].Term,
        // Attachments: item.Attachments
    }));
}

// *****CONSULTA DEL GRUPO SELECCIONADO*****
const getGroupSelect = async (Id: number): Promise<IGrupos> => {

    const CallGroupSelected = await getSP()
        .web.lists.getByTitle(nameListGrupos)
        .items.getById(Id)
        .select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term")
        .expand("TaxCatchAll", "SectorAsociado")()

    // console.log("Antes del return", CallGroupSelected)
    const grupo: IGrupos = {
        ID: CallGroupSelected.ID,
        SectorAsociado: CallGroupSelected.SectorAsociado.Denominacion,
        Denominacion: CallGroupSelected.Denominacion,
        Descripcion: CallGroupSelected.Descripcion,
        FechaDeCreacion: new Date(CallGroupSelected.FechaDeCreacion).toDateString(),
        FechaDeFinalizacion: new Date(CallGroupSelected.FechaDeFinalizacion).toDateString(),
        TipoDeGrupo: CallGroupSelected.TipoDeGrupo,
        Tematica: CallGroupSelected.Tematica,
        Estado: CallGroupSelected.Estado,
        // Ambito: CallGroupSelected.TaxCatchAll[2].Term,
        // Pais: CallGroupSelected.TaxCatchAll[1].Term,
        // Ciudad: CallGroupSelected.TaxCatchAll[0].Term,
        // Attachments: CallGroupSelected.Attachments
    }
    // console.log("Grupo seleccionado", grupo)
    return grupo;
};

// *****CREACCION DE NUEVO GRUPO*****
// const CreateGroup = async () => {
//     try {
//         const addGroup = await getSP()
//             .web.lists.getByTitle(nameListGrupos)
//             .items.add({
//                 SectorAsociado: document.getElementById("sector")['value'],
//                 Denominacion: document.getElementById("denominacion")['value'],
//                 Descripcion: document.getElementById("descripcion")['value'],
//                 FechaDeCreacion: new Date(document.getElementById("createDate")['value'],),
//                 FechaDeFinalizacion: new Date(document.getElementById("finallyDate")['value'],),
//                 Ambito: document.getElementById("ID")['value'],
//                 TipoDeGrupo: document.getElementById("ID")['value'],
//                 Tematica: document.getElementById("theme")['value'],
//                 AmbitoGeografico: document.getElementById("ID")['value'],
//                 AmbitoOrganizativoInternacional: document.getElementById("ID")['value'],
//                 Estado: document.getElementById("estado")['value'],
//                 Pais: document.getElementById("country")['value'],
//                 Ciudad: document.getElementById("city")['value'],
//                 Attachments: document.getElementById("ID")['value']
//             });
//         console.log("addGroup", addGroup)
//         alert(`Item created successfully with ID: ${addGroup.data.ID}`);
//     } catch (error) {
//         console.error(error)
//     }
// }

// *****EDICION DE UN GRUPO SELECCIONADO*****
// const EditGroup = async () => {
//     const editGroup = await getSP().web.lists.getById(IdListGrupos).items.getById(id).validateUpdateListItem(sysUpdateData)
//     const sysUpdateData = [
//         { FieldName: 'Title', FieldValue: grupo.denominacion },
//         { FieldName: 'CodigoGrupo', FieldValue: grupo.denominacion },
//         { FieldName: 'SectorAsociado', FieldValue: grupo.sectorAsociado.toString() },
//         { FieldName: 'Denominacion', FieldValue: grupo.denominacion },
//         { FieldName: 'DescripcionGrupo', FieldValue: grupo.descripcion },
//         { FieldName: 'FechaCreacion', FieldValue: auxCreacionDateString },
//         { FieldName: 'FechaFinalizacion', FieldValue: auxFinalizacionDateString }
//         { FieldName: 'Ambito', FieldValue: grupo.ambito },
//         { FieldName: 'TipoGrupo', FieldValue: grupo.tipoGrupo },
//         { FieldName: 'Tematica', FieldValue: grupo.tematica },
//         { FieldName: 'AmbitoGeografico', FieldValue: grupo.ambitoGeografico },
//         { FieldName: 'AmbitoOrganizativoInternacional', FieldValue: grupo.ambitoOrganizativoInternacional },
//         { FieldName: 'Estado', FieldValue: (+grupo.estado).toString() },
//         { FieldName: 'Pais', FieldValue: grupo.pais },
//         { FieldName: 'Ciudad', FieldValue: grupo.ciudad },
//     ];
// }


// *****CONSULTA DE TIPOS DE GRUPOS*****
const getGroupTypes = async (): Promise<IDropdownOption[]> => {
    const groupType: any = await getSP().web.lists.getByTitle(nameListGrupos).fields.getByInternalNameOrTitle("TipoDeGrupo").select("Choices")()
    // console.log('Themes', groupType)
    return groupType.Choices.map((item: string) => ({
        key: item,
        text: item
    }));
}

// *****CONSULTA DE TEMATICAS*****
const getTematica = async (): Promise<IDropdownOption[]> => {
    const theme: any = await getSP().web.lists.getByTitle(nameListGrupos).fields.getByInternalNameOrTitle("Tematica").select("Choices")()
    // console.log('Themes', theme)
    return theme.Choices.map((item: string) => ({
        key: item,
        text: item
    }));
}

// *****EXPORTACIONES DE FUNCIONES*****
export const gruposService = {
    getGruposInfo,
    getGroupSelect,
    getGroupTypes,
    getTematica,
    // CreateGroup
}

