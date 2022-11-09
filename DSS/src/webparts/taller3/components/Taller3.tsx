import * as React from "react";
import "./Taller3.module.scss";
import { ITaller3Props } from "./ITaller3Props";
import { SPFI } from "@pnp/sp";
import { useEffect, useState } from "react";
import { ITaller3 } from "../../../interfaces";
import { getSP } from "../../../pnpjsConfig";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

import { ComboBox, IComboBox, IComboBoxOption, IComboBoxStyles } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';

import Cards from "./Cards/Cards";
import Listas from "./Listas/Listas";


const Taller3 = (props: ITaller3Props) => {

  const [visible, setVisible] = useState(0); //Lo usamos para ir mostrando diferentes componentes
  const [taller3Items, setTaller3Items] = useState<ITaller3[]>([])
  const [newsFilter, setNewsFilter] = useState<ITaller3[]>([])
  const [searchFilterValue, setSearchFilterValue] = useState("")
  const [categoryFilterValue, setCategoryFilterValue] = useState("")
  const [responsableFilterValue, setResponsableFilterValue] = useState("")
  const [displayElements, setDisplayElements] = useState(false)

  const LIST_NAME = "Noticias";
  let _sp: SPFI = getSP(props.context);

  const searchTituloStyles: Partial<ISearchBoxStyles> = { root: { maxWidth: 500 } };
  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 300 } };
  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

  const optionsCategoria: IComboBoxOption[] = [
    { key: '', text: '' },
    { key: 'Nacional', text: 'Nacional' },
    { key: 'Internacional', text: 'Internacional' },
    { key: 'Local', text: 'Local' },
    { key: 'Deportes', text: 'Deportes' },
    { key: 'Corazon', text: 'Corazon' },
  ];


  const getTaller3Items = async () => {
    // console.log("context", _sp)
    await _sp.web.lists.getByTitle(LIST_NAME).items.select("*", "Responsable/Title").orderBy('categoriaNoticias').expand("Responsable")().then((value: any) => {
      // console.log("Noticias: ", value);
      initializeVariables(value);

    });
  }

  function initializeVariables(noticias: any[]) {
    let arrayNoticias = noticias.map((item: any) => {
      return {
        ID: item.ID,
        Title: item.Title,
        descriptionNoticia: item.descriptionNoticia,
        categoriaNoticias: item.categoriaNoticias,
        fechaDePublicacion: new Date(item.fechaDePublicacion).toLocaleDateString('es-ES'),
        Responsable: item.Responsable.Title,
        Imagen: item.Imagen.Url,
      }
    });
    setTaller3Items(arrayNoticias)
    setNewsFilter(arrayNoticias)
    setDisplayElements(true)
  }

  useEffect(() => {
    getTaller3Items();
  }, [props]);


  // Funcion Filtrado Principal

  function filter(titulo: string, categoria: string, responsable: string) {
    let auxV = taller3Items.filter(news => {
      if (news.Title.toLowerCase().indexOf(titulo.toLowerCase()) > -1 || news.descriptionNoticia.toLowerCase().indexOf(searchFilterValue.toLowerCase()) > -1) {
        return true
      } else {
        return false
      }
    })

    auxV = auxV.filter(news => {
      if (news.categoriaNoticias.indexOf(categoria) > -1) {
        return true
      } else {
        return false
      }
    })

    auxV = auxV.filter(news => {
      if (news.Responsable.toLowerCase().indexOf(responsable.toLowerCase()) > -1) {
        return true
      } else {
        return false
      }
    })
    setNewsFilter(auxV)
    console.log(auxV)
  }


  // Llamadas a filtrados

  function filterTitulo(props: any) {
    setSearchFilterValue(props)
    console.log(props)
    filter(props, categoryFilterValue, responsableFilterValue)
  }

  function filterCategoria(props: any) {
    setCategoryFilterValue(props)
    console.log(props)
    filter(searchFilterValue, props, responsableFilterValue)
  }

  function filterResponsable(props: any) {
    setResponsableFilterValue(props)
    console.log(props)
    filter(searchFilterValue, categoryFilterValue, props)
  }


  return (
    <>
      <WebPartTitle displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty} />

      <div className="buttons">
        <h4>Selecciona una Vista</h4>
        <div>
          <DefaultButton className="button" text="Cards" onClick={() => setVisible(1)} />
          <DefaultButton className="button" text="Listas" onClick={() => setVisible(2)} />
        </div>
      </div>

      <div className="filters">
        <SearchBox
          styles={searchTituloStyles}
          placeholder="Introduce Titulo o Descripcion"
          onClear={ev => {
            setNewsFilter(taller3Items);
          }}
          onChange={(_, newValue) => {
            filterTitulo(newValue)
          }}
        />

        <div>
          <ComboBox
            defaultSelectedKey=""
            label="Selecciona Categoría"
            options={optionsCategoria}
            styles={comboBoxStyles}
            calloutProps={{ doNotLayer: true }}
            onChange={(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => { filterCategoria(value) }}
          />

          <SearchBox
            styles={searchBoxStyles}
            placeholder="Introduce un Responsable"
            onEscape={ev => {
              console.log('Custom onEscape Called');
            }}
            onClear={ev => {
              setNewsFilter(taller3Items);
            }}
            onChange={(_, newValue) => { filterResponsable(newValue) }}
          />
        </div>
      </div>

      {displayElements && newsFilter.length > 0 &&
        (visible === 1 ? (<Cards {...{ noticias: newsFilter }} />) : (<Listas {...{ noticias: newsFilter }} />)
        )}
    </>
  )
}

export default Taller3;