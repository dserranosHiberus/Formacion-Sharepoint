import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITarea4Props {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    context: WebPartContext;
    title: string;
    displayMode: DisplayMode;
    updateProperty: (value: string) => void;
}



export interface ISectoresyUnidadesProps {
    ID: number;
    CodigoDelSector: number;
    Denominacion: string;
    URLImagenSector: string;
    URLListaGrupos: string;
    URLListaReuniones: string;
    URLBiblioteca: string;
    URLGrupoAdmSector: string;
    URLGrupoUsuariosSector: string;
}

export interface IGruposdeUnidadProps {
    ID: number;
    CodigoDeGrupo: number;
    SectorAsociado: string;
    Denominacion: string;
    Descripcion: string;
    FechaDeCreacion: string;
    FechaDeFinalizacion: string;
    Ambito: string;
    TipoDeGrupo: string;
    Tematica: string;
    AmbitoGeografico: string;
    AmbitoOrganizativoInternacional: string;
    Pais: string;
    Estado: Boolean;
    Ciudad: string;
    Attachments: string;
}

