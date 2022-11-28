import { IGroup } from "@fluentui/react"
import { IFormFields, IGrupos } from "../models/Interfaces"

const checkFieldsCreate = (formField: IFormFields) => {
    let messageErrorList = []

    if (!formField.CodigoDeGrupo || formField.CodigoDeGrupo === "") messageErrorList.push("Error en el Codigo De Grupo")
    if (!formField.Denominacion || formField.Denominacion === "") messageErrorList.push("Error en la Denominacion")
    if (!formField.Descripcion || formField.Descripcion === "") { messageErrorList.push("Error en la Descripcion") }
    if (!formField.Estado) messageErrorList.push("Error en el Estado")
    if (!formField.FechaDeCreacion) messageErrorList.push("No has introducido Fecha")
    if (!formField.FechaDeFinalizacion) messageErrorList.push("No has introducido fecha")
    if (!formField.SectorAsociadoId || formField.SectorAsociadoId === "") messageErrorList.push("No has seleccionado ningun sector asociado")
    if (!formField.Tematica || formField.Tematica === "") messageErrorList.push("No has seleccionado ninguna Tematica")
    if (!formField.TipoDeGrupo || formField.TipoDeGrupo === "") messageErrorList.push("No has seleccionado ningun Tipo de Grupo")
    if (formField.FechaDeCreacion > formField.FechaDeFinalizacion) messageErrorList.push("La Fecha de Creacion no puede ser inferior a la fecha de Finalizacion")
    return messageErrorList
}

// const checkFieldsEdit = (formField: IFormFields, groupSelected: IGrupos) => {
//     let newFormFields: IFormFields[] = [
//         {
//             SectorAsociadoId: "",
//             Denominacion: "",
//             Descripcion: "",
//             CodigoDeGrupo: "",
//             FechaDeCreacion: new Date(),
//             FechaDeFinalizacion: new Date(),
//             Estado: false,
//             TipoDeGrupo: "",
//             Tematica: "",
//         }
//     ]

//     if (formField.SectorAsociadoId == null) newFormFields.push(groupSelected?.SectorAsociadoId) 
//     if (formField.Denominacion == null) { setFormFields({ ...formField, Denominacion: groupSelected?.Denominacion }) }
//     if (formField.Descripcion == null) { setFormFields({ ...formField, Descripcion: groupSelected?.Descripcion }) }
//     if (formField.CodigoDeGrupo == null) { setFormFields({ ...formField, CodigoDeGrupo: groupSelected?.CodigoDeGrupo }) }
//     if (formField.FechaDeCreacion == null) { setFormFields({ ...formField, FechaDeCreacion: new Date(groupSelected?.FechaDeCreacion) }) }
//     if (formField.FechaDeFinalizacion == null) { setFormFields({ ...formField, FechaDeFinalizacion: new Date(groupSelected?.FechaDeFinalizacion) }) }
//     if (formField.Estado == null) { setFormFields({ ...formField, Estado: groupSelected?.Estado }) }
//     if (formField.TipoDeGrupo == null) { setFormFields({ ...formField, TipoDeGrupo: groupSelected?.TipoDeGrupo }) }
//     if (formField.Tematica == null) { setFormFields({ ...formField, Tematica: groupSelected?.Tematica }) }
//     return newFormFields
// }


export const validates = {
    checkFieldsCreate,
    // checkFieldsEdit
}