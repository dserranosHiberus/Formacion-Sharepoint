import { getSP } from "../../../pnpjsConfig";
import { IGrupos } from "../models/Interfaces";
import { IFields } from "../models/Interfaces";


let nameListGrupos = "Grupos de la Unidad X";

export const getGruposInfo = async (): Promise<IGrupos[]> => {

    const gruposCall = await getSP().web.lists.getByTitle(nameListGrupos).items.select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term").expand("TaxCatchAll", "SectorAsociado")()
    let grupos = gruposCall.map((item) => {
        return {
            ID: item.ID,
            CodigoDeGrupo: item.CodigoDeGrupo,
            SectorAsociado: item.SectorAsociado.Denominacion,
            Denominacion: item.Denominacion,
            Descripcion: item.Descripcion,
            FechaDeCreacion: new Date(item.FechaDeCreacion).toLocaleDateString('es-ES'),
            FechaDeFinalizacion: new Date(item.FechaDeFinalizacion).toLocaleDateString('es-ES'),
            Ambito: item.TaxCatchAll[2].Term,
            TipoDeGrupo: item.TipoDeGrupo,
            Tematica: item.Tematica,
            AmbitoGeografico: item.AmbitoGeografico,
            AmbitoOrganizativoInternacional: item.AmbitoOrganizativoInternacional,
            Estado: item.Estado,
            Pais: item.TaxCatchAll[1].Term,
            Ciudad: item.TaxCatchAll[0].Term,
            Attachments: item.Attachments
        }
    });
    return grupos;
}


export const getTematica = async (): Promise<IFields> => {

    const Tematica: IFields = await getSP().web.lists.getByTitle(nameListGrupos).fields.getByInternalNameOrTitle("Tematica")();
    return Tematica;
}


export const getGroupSelect = async (Id: number): Promise<any> => {

    const grupo = await getSP().web.lists.getByTitle(nameListGrupos).items.getById(Id)()

    console.log('Antes de return', grupo)
    // let grupos = await getGruposInfo()
    //     let grupoFiltered = grupos.filter(grupo => grupo.ID = responseIdSelected);
    return grupo

    // return grupoFiltered
}
