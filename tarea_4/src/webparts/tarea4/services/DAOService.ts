import { getSP } from "../../../pnpjsConfig";
import { IGrupos } from "../models/Interfaces";

let nameListGrupos = "Grupos de la Unidad X";

export const getGruposInfo = async (): Promise<IGrupos[]> => {

    let _sp = getSP()
    let gruposCall = await _sp.web.lists.getByTitle(nameListGrupos).items.select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term").expand("TaxCatchAll", "SectorAsociado")()
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
