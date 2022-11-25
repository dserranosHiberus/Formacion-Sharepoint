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

export interface ISectores {
    ID: number;
    CodigoDelSector: string;
    Denominacion: string;
    URLImagenSector: string;
    URLListaGrupos: string;
    URLListaReuniones: string;
    URLBiblioteca: string;
    URLGrupoAdmSector: string;
    URLGrupoUsuariosSector: string;
}

export interface ISectorId {
    ID: string;
    Denominacion: string;
}

export interface IGrupos {
    ID: number;
    CodigoDeGrupo: string;
    SectorAsociado: string;
    SectorAsociadoId: string | number;
    Denominacion: string;
    Descripcion: string;
    FechaDeCreacion: string;
    FechaDeFinalizacion: string;
    Estado: boolean;
    TipoDeGrupo: string;
    Tematica: string;
    Ambito: [];
    Pais: [];
    // Ciudad: [];
    // Attachments: any[];
    // AmbitoOrganizativoInternacional: string;
    // AmbitoGeografico: string;
}

export interface IFormFields {

    SectorAsociadoId: string | number;
    CodigoDeGrupo: string;
    Denominacion: string;
    Descripcion: string;
    FechaDeCreacion: Date;
    FechaDeFinalizacion: Date;
    Estado: boolean;
    TipoDeGrupo: string;
    Tematica: string;
    Pais: [];
    Ambito: any;
    Ciudad: [];
}

