import { IFormFields, IGrupos } from "../models/Interfaces"

const checkFieldsCreate = (formField: IFormFields) => {
    let messageErrorList = []

    if (!formField.SectorAsociadoId || formField.SectorAsociadoId === "") messageErrorList.push("No has seleccionado ningun sector asociado")
    if (!formField.CodigoDeGrupo || formField.CodigoDeGrupo === "") messageErrorList.push("Error en el Codigo De Grupo")
    if (!formField.Denominacion || formField.Denominacion === "") messageErrorList.push("Error en la Denominacion")
    if (!formField.Descripcion || formField.Descripcion === "") { messageErrorList.push("Error en la Descripcion") }
    if (!formField.FechaDeCreacion) messageErrorList.push("No has introducido Fecha")
    if (!formField.FechaDeFinalizacion) messageErrorList.push("No has introducido fecha")
    if (!formField.Estado) messageErrorList.push("Error en el Estado")
    if (!formField.TipoDeGrupo || formField.TipoDeGrupo === "") messageErrorList.push("No has seleccionado ningun Tipo de Grupo")
    if (!formField.Tematica || formField.Tematica === "") messageErrorList.push("No has seleccionado ninguna Tematica")

    if (formField.FechaDeCreacion > formField.FechaDeFinalizacion) messageErrorList.push("La Fecha de Creacion no puede ser inferior a la fecha de Finalizacion")
    return messageErrorList
}

const completeForm = (formField: any, groupSelected: any) => {
    let newFormFields: any = {}

    if (formField.SectorAsociadoId == null || !formField.SectorAsociadoId || formField.SectorAsociadoId == "") { newFormFields.SectorAsociadoId = (groupSelected?.SectorAsociadoId) }
    if (formField.CodigoDeGrupo == null || !formField.CodigoDeGrupo || formField.CodigoDeGrupo === "") { newFormFields.CodigoDeGrupo = (groupSelected?.CodigoDeGrupo) }
    if (formField.Denominacion == null || !formField.Denominacion || formField.Denominacion === "") { newFormFields.Denominacion = (groupSelected?.Denominacion) }
    if (formField.Descripcion == null || !formField.Descripcion || formField.Descripcion === "") { newFormFields.Descripcion = (groupSelected?.Descripcion) }
    if (formField.FechaDeCreacion == null || !formField.FechaDeCreacion) { newFormFields.FechaDeCreacion = new Date(groupSelected?.FechaDeCreacion) }
    if (formField.FechaDeFinalizacion == null || !formField.FechaDeFinalizacion) { newFormFields.FechaDeFinalizacion = new Date(groupSelected?.FechaDeFinalizacion) }
    if (formField.Estado == null || !formField.Estado) { newFormFields.Estado = (groupSelected?.Estado) }
    if (formField.TipoDeGrupo == null || !formField.TipoDeGrupo || formField.TipoDeGrupo === "") { newFormFields.TipoDeGrupo = (groupSelected?.TipoDeGrupo) }
    if (formField.Tematica == null || !formField.Tematica || formField.Tematica === "") { newFormFields.Tematica = (groupSelected?.Tematica) }

    console.log(newFormFields)
    return newFormFields
}

const checkFieldsEdit = (formField: IFormFields) => {
    let messageErrorList = []
    if (formField.FechaDeCreacion > formField.FechaDeFinalizacion) messageErrorList.push("La Fecha de Creacion no puede ser inferior a la fecha de Finalizacion")
    return messageErrorList
}

export const validates = {
    checkFieldsCreate,
    checkFieldsEdit,
    completeForm
}