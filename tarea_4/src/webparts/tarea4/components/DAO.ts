// import * as React from 'react';
import { useState } from "react";

import { ITarea4Props } from './Interfaces';
import { ISectoresProps } from './Interfaces';
import { IGruposProps } from './Interfaces';


import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { WebPartContext } from "@microsoft/sp-webpart-base";


interface IDAO {
    getSectoresInfo(props: ITarea4Props): Promise<boolean>
    getGruposInfo(props: ITarea4Props): Promise<boolean>
}

export class DAO implements IDAO {

    private _sp: SPFI;
    private context: WebPartContext;
    private LIST_Sector = "Sectores/Unidades";
    private LIST2_Grupos = "Grupos de la Unidad X";

    private sectores: ISectoresProps[];
    private grupos: IGruposProps[];
    private tematicas: any[];

    constructor(context: WebPartContext) {
        this._sp = getSP(context);
        this.context = context

        console.log("Creaccion de DAO")

        this.getSectoresInfo();
        this.getGruposInfo();

    }


    public getSectores() {
        return this.sectores;
    }

    public getGrupos() {
        return this.grupos
    }

    public getTematicas() {
        return this.tematicas
    }

    public getContext() {
        return this.context
    }


    // ***** Lectura Lista Sectores y Unidades *****
    public async getSectoresInfo(): Promise<boolean> {

        let sectoresAux = await this._sp.web.lists.getByTitle(this.LIST_Sector).items()

        this.sectores = sectoresAux.map((item: any) => {
            return {
                ID: item.ID,
                CodigoDelSector: item.CodigoDelSector,
                Denominacion: item.Denominacion,
                URLImagenSector: item.URLImagenSector,
                URLListaGrupos: item.URLListaGrupos,
                URLListaReuniones: item.URLListaReuniones,
                URLBiblioteca: item.URLBiblioteca,
                URLGrupoAdmSector: item.URLGrupoAdmSector,
                URLGrupoUsuariosSector: item.URLGrupoUsuariosSector,
            }
        })
        return true;
    }

    // *****Lectura lista Grupos de Unidad X*****
    public async getGruposInfo(): Promise<boolean> {

        let gruposAux = await this._sp.web.lists.getByTitle(this.LIST2_Grupos).items.select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term").expand("TaxCatchAll", "SectorAsociado")()

        this.grupos = gruposAux.map((item: any) => {
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
        console.log(this.grupos)
        return true;
    }
}
