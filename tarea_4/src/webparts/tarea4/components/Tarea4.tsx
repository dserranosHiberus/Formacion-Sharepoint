import * as React from 'react';
// import styles from './Tarea4.module.scss';
import { ITarea4Props } from './Interfaces';
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../pnpjsConfig";
import { IGruposProps } from './Interfaces';
import { useEffect, useState } from "react";

import GruposCards from './GruposCards/GruposCards';

const Tarea4 = (props: ITarea4Props) => {

  const [gruposdeUnidad, setGruposdeUnidad] = useState<IGruposProps[]>([])
  const [displayElements2, setDisplayElements2] = useState(false)

  const LIST2_NAME = "Grupos de la Unidad X";
  let _sp: SPFI = getSP(props.context);


  // *****Lectura lista Grupos de Unidad X*****
  const GetGruposdeUnidad = async () => {

    await _sp.web.lists.getByTitle(LIST2_NAME).items.select("*", "SectorAsociado/Denominacion", "TaxCatchAll/Term").expand("TaxCatchAll", "SectorAsociado")().then((value: any) => {

      readGruposdeUnidad(value);

      function readGruposdeUnidad(lista2: any[]) {
        let listaGrupos = lista2.map((item: any) => {
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
        setGruposdeUnidad(listaGrupos)
        console.log("Lista Grupos", listaGrupos)
        setDisplayElements2(true)
      }
    });
  }

  useEffect(() => {
    GetGruposdeUnidad();
  }, [props]);

  return (
    <>
      {displayElements2 &&
        <GruposCards {...{ grupos: gruposdeUnidad, context: props.context }} />
      }
    </>
  )

}

export default Tarea4; 