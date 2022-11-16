import * as React from "react";
import { useState, useEffect } from "react";
// import styles from "../Taller3.module.scss";

// import EditGrupo from "../EditGrupo/EditGrupo";
import { IGrupos } from '../../models/Interfaces';
import { getGruposInfo } from "../../services/DAOService";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom'

import {
    DocumentCard,
    DocumentCardTitle,
    DocumentCardDetails,
    IDocumentCardStyles,
} from '@fluentui/react/lib/DocumentCard';
import { getTheme } from '@fluentui/react';


const theme = getTheme();

const GruposCards = () => {

    const [groupList, setGroupList] = React.useState<IGrupos[]>([])
    const [groupSelected, setGroupSelected] = useState<IGrupos>();
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        const getGrupos = async () => {
            const responseGroups = await getGruposInfo()
            setGroupList(responseGroups)
        }
        getGrupos()
    }, [])

    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
    };

    return (
        <>
            {groupList.map(item => (
                <Link key={item.ID} to={`/editGrupo/${item.ID}`}>
                    <DocumentCard
                        aria-label={'Document Card with image. How to make a good design. ' +
                            'Last modified by Annie Lindqvist and 2 others in March 13, 2018.'}
                        styles={cardStyles}
                        style={{ boxShadow: theme.effects.elevation16, margin: 10 }}>

                        <DocumentCardDetails>
                            <DocumentCardTitle
                                title={item.Denominacion}
                                shouldTruncate
                            />
                        </DocumentCardDetails>
                        <DocumentCardDetails>
                            <DocumentCardTitle
                                title={item.Descripcion}
                                shouldTruncate
                                showAsSecondaryTitle
                            />
                        </DocumentCardDetails>

                        <DocumentCardDetails>
                            <DocumentCardTitle
                                title={item.FechaDeCreacion}
                                showAsSecondaryTitle
                            />
                            <DocumentCardTitle
                                title={item.FechaDeFinalizacion}
                                showAsSecondaryTitle
                            />
                        </DocumentCardDetails>
                    </DocumentCard>
                </Link>
                /* </Link> */
            ))}
        </>
    )
}

export default GruposCards;