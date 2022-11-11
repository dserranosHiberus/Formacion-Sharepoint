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

import { IGruposProps } from '../Interfaces';
import EditGrupo from "../EditGrupo/EditGrupo";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DAO } from "../DAO";


const theme = getTheme();

function GruposCards(props: { DAOGrupos: DAO, BailarFuncion: () => void }) {

    const [groupSelected, setGroupSelected] = useState<IGruposProps>();
    const [visible, setVisible] = useState(0);

    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
    };

    function editGroup(e: IGruposProps) {
        setGroupSelected(e);
        setVisible(1)
    }
    props.BailarFuncion()
    return (
        <>
            {(visible === 0 ?
                props.DAOGrupos.getGrupos().map(e => (
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
                : visible === 1 && groupSelected != undefined ? (<EditGrupo {...{ grupo: groupSelected, DAO: props.DAOGrupos }} />) : <p>Hola</p>
            )}
        </>
    )
}

export default GruposCards;