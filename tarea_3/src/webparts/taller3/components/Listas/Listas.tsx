import * as React from "react";
import { ITaller3 } from "../../../../interfaces"

import { DetailsList, DetailsListLayoutMode } from '@fluentui/react/lib/DetailsList';

const _columns = [
  { key: 'column1', name: 'Titulo', fieldName: 'Title', minWidth: 100, maxWidth: 400, isResizable: true },
  { key: 'column2', name: 'Descripcion', fieldName: 'descriptionNoticia', minWidth: 100, maxWidth: 600, isResizable: true },
  { key: 'column3', name: 'Categoria', fieldName: 'categoriaNoticias', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column4', name: 'Responsable', fieldName: 'Responsable', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column5', name: 'Imagen', fieldName: 'Imagen', minWidth: 100, maxWidth: 400, isResizable: true },
  { key: 'column6', name: 'F.Publicacion', fieldName: 'fechaDePublicacion', minWidth: 100, maxWidth: 200, isResizable: true },
];

function Listas(props: { noticias: ITaller3[] }) {

  let datos = props.noticias

  return (
    <>
      <DetailsList
        compact={false}
        items={datos}
        columns={_columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}

      />
    </>
  )
}

export default Listas