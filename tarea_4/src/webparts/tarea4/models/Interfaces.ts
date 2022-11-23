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

export interface IGrupos {
    ID: number;
    CodigoDeGrupo: string;
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
    Estado: boolean;
    Ciudad: string;
    Attachments: string;
}

export interface IFormFieds {
    sectorValue: number;
    sectorValueString: string;
    DenominationValue: string;
    DescriptionValue: string;
    CreateDateValue: string;
    FinalDateValue: string;
    StateValue: string;
}

