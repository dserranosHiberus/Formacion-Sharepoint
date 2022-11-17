import { getSP } from "../../../pnpjsConfig";
import { IGrupos, ITarea4Props } from "../models/Interfaces";
import { IFields } from "../models/Interfaces";

const nameListGrupos = "Grupos de la Unidad X";

export const getGruposInfo = async (): Promise<IGrupos[]> => {

    const gruposCall = await getSP().web.lists.getByTitle(nameListGrupos).items.select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term").expand("TaxCatchAll", "SectorAsociado")()
    const grupos: IGrupos[] = gruposCall.map<IGrupos>((item) => {
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

    const CallGroupSelected = await getSP().web.lists.getByTitle(nameListGrupos).items.getById(Id).select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term").expand("TaxCatchAll", "SectorAsociado")()
    console.log("Antes del return", CallGroupSelected)
    const grupo: IGrupos = {
        ID: CallGroupSelected.ID,
        CodigoDeGrupo: CallGroupSelected.CodigoDeGrupo,
        SectorAsociado: CallGroupSelected.SectorAsociado.Denominacion,
        Denominacion: CallGroupSelected.Denominacion,
        Descripcion: CallGroupSelected.Descripcion,
        FechaDeCreacion: new Date(CallGroupSelected.FechaDeCreacion).toLocaleDateString('es-ES'),
        FechaDeFinalizacion: new Date(CallGroupSelected.FechaDeFinalizacion).toLocaleDateString('es-ES'),
        Ambito: CallGroupSelected.TaxCatchAll[2].Term,
        TipoDeGrupo: CallGroupSelected.TipoDeGrupo,
        Tematica: CallGroupSelected.Tematica,
        AmbitoGeografico: CallGroupSelected.AmbitoGeografico,
        AmbitoOrganizativoInternacional: CallGroupSelected.AmbitoOrganizativoInternacional,
        Estado: CallGroupSelected.Estado,
        Pais: CallGroupSelected.TaxCatchAll[1].Term,
        Ciudad: CallGroupSelected.TaxCatchAll[0].Term,
        Attachments: CallGroupSelected.Attachments
    }
    console.log("Despues del return", grupo)
    return grupo;
};


