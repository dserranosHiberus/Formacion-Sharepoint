import { getSP } from "../../../pnpjsConfig";
import { IGrupos, IFormFields } from "../models/Interfaces";
import CreateGrupo from "../components/CreateGroup/CreateGroup";
import { IDropdownOption, themeRulesStandardCreator } from "@fluentui/react";

const nameListGrupos = "Grupos de la Unidad X";
const IdListGrupos = "f1193dcc-6ec0-44f0-9124-d526430752d0";

// *****CONSULTA DE TODOS LOS GRUPOS*****
const readGroups = async (): Promise<IGrupos[]> => {

    const gruposCall = await getSP()
        .web.lists.getById(IdListGrupos)
        .items.select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term")
        .expand("TaxCatchAll", "SectorAsociado")()
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
        Ambito: item.TaxCatchAll[2].Term,
        Pais: item.TaxCatchAll[1].Term,
        Ciudad: item.TaxCatchAll[0].Term,
        // Attachments: item.Attachments
    }));
}

// *****CONSULTA DEL GRUPO SELECCIONADO*****
const readGroupSelect = async (Id: number): Promise<IGrupos> => {

    const CallGroupSelected = await getSP()
        .web.lists.getByTitle(nameListGrupos)
        .items.getById(Id)
        .select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term")
        .expand("TaxCatchAll", "SectorAsociado")()

    // console.log("Antes del return", CallGroupSelected)
    const grupo: IGrupos = {
        ID: CallGroupSelected.ID,
        SectorAsociado: CallGroupSelected.SectorAsociado.Denominacion,
        SectorAsociadoId: CallGroupSelected.SectorAsociadoId,
        Denominacion: CallGroupSelected.Denominacion,
        Descripcion: CallGroupSelected.Descripcion,
        FechaDeCreacion: new Date(CallGroupSelected.FechaDeCreacion).toDateString(),
        FechaDeFinalizacion: new Date(CallGroupSelected.FechaDeFinalizacion).toDateString(),
        TipoDeGrupo: CallGroupSelected.TipoDeGrupo,
        Tematica: CallGroupSelected.Tematica,
        Estado: CallGroupSelected.Estado,
        Ambito: CallGroupSelected.TaxCatchAll[2].Term,
        Pais: CallGroupSelected.TaxCatchAll[1].Term,
        Ciudad: CallGroupSelected.TaxCatchAll[0].Term,
        // Attachments: CallGroupSelected.Attachments
    }
    // console.log("Grupo seleccionado", grupo)
    return grupo;
};

// *****CREACCION DE NUEVO GRUPO*****
// const createGroup = async () => {
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
const updateGroup = async (formField: IFormFields, Id: number) => {
    try {
        const itemUpdate = await getSP()
            .web.lists.getById(IdListGrupos)
            .items.getById(Id)
            .update({
                SectorAsociadoId: formField.SectorAsociadoId,
                Denominacion: formField.Denominacion,
                Descripcion: formField.Descripcion,
                FechaDeCreacion: formField.FechaDeCreacion,
                FechaDeFinalizacion: formField.FechaDeFinalizacion,
                Estado: formField.Estado,
                TipoDeGrupo: formField.TipoDeGrupo,
                Tematica: formField.Tematica,
                // Pais: formField.Pais,
                // Ciudad: formField.Ciudad,
                // Attachments: formField.Attachments
            })

        alert(`El grupo ${Id} ha sido actualizado correctamente!`);
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)

    } catch (error) {
        alert("Ha surgido un error al editar el grupo");
        console.error("Ha surgido un error al editar el grupo", error);
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }
}

// *****BORRADO DEL GRUPO SELECCIONADO*****
const deleteGroup = async (Id: number) => {
    let option: boolean = window.confirm("Seguro que quieres eliminar el Grupo???")
    if (option === true) {
        const deleteItem = async () => {
            let deleteItem = await getSP().web.lists.getById(IdListGrupos).items.getById(Id).delete();
            console.log("Datos del borrado", deleteItem);
            alert(`El grupo: ${Id} se ha borrado correctamente!`);
            setTimeout(() => {
                window.location.href = '/'
            }, 1000)
        }
        deleteItem()
    }
    else {
        console.log("Borrado cancelado")
        alert("Se ha cancelado el borrado")
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }
}

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
const getThematic = async (): Promise<IDropdownOption[]> => {
    const theme: any = await getSP().web.lists.getByTitle(nameListGrupos).fields.getByInternalNameOrTitle("Tematica").select("Choices")()
    // console.log('Themes', theme)
    return theme.Choices.map((item: string) => ({
        key: item,
        text: item
    }));
}

// *****EXPORTACIONES DE FUNCIONES*****
export const gruposService = {
    // createGroup
    readGroups,
    readGroupSelect,
    updateGroup,
    deleteGroup,
    getGroupTypes,
    getThematic,
}

