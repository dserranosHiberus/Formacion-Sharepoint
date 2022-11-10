import * as React from "react";
// import styles from "../Taller3.module.scss";
import { useState, useEffect } from "react";

import {
    DocumentCard,
    DocumentCardTitle,
    DocumentCardDetails,
    IDocumentCardStyles,
} from '@fluentui/react/lib/DocumentCard';
import { getTheme } from '@fluentui/react';

import { IGruposdeUnidadProps } from '../Interfaces';
import EditGrupo from "../EditGrupo/EditGrupo";
import { WebPartContext } from "@microsoft/sp-webpart-base";


const theme = getTheme();

function GruposCards(props: { grupos: IGruposdeUnidadProps[], context: WebPartContext }) {


    const [tarea4, setTarea4] = useState<IGruposdeUnidadProps[]>([]);
    const [groupSelected, setGroupSelected] = useState<IGruposdeUnidadProps>();
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        setTarea4(props.grupos);
    }, [props])

    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
    };

    function editGroup(e: IGruposdeUnidadProps) {
        setGroupSelected(e);
        setVisible(1)
    }

    return (
        <>
            {(visible === 0 ?
                tarea4.map(e => (
                    <div key={e.ID}>
                        <DocumentCard
                            aria-label={'Document Card with image. How to make a good design. ' +
                                'Last modified by Annie Lindqvist and 2 others in March 13, 2018.'}
                            styles={cardStyles}
                            onClick={() => { editGroup(e) }}
                            style={{ boxShadow: theme.effects.elevation16, margin: 10 }}>

                            <DocumentCardDetails>
                                <DocumentCardTitle
                                    title={e.Denominacion}
                                    shouldTruncate
                                />
                            </DocumentCardDetails>
                            <DocumentCardDetails>
                                <DocumentCardTitle
                                    title={e.Descripcion}
                                    shouldTruncate
                                    showAsSecondaryTitle
                                />
                            </DocumentCardDetails>

                            <DocumentCardDetails>
                                <DocumentCardTitle
                                    title={e.FechaDeCreacion}
                                    showAsSecondaryTitle
                                />
                                <DocumentCardTitle
                                    title={e.FechaDeFinalizacion}
                                    showAsSecondaryTitle
                                />
                            </DocumentCardDetails>
                        </DocumentCard>
                    </div>
                ))
                : visible === 1 && groupSelected != undefined ? (<EditGrupo {...{ grupo: groupSelected, context: props.context }} />) : <p>Hola</p>
            )}
        </>
    )
}

export default GruposCards;