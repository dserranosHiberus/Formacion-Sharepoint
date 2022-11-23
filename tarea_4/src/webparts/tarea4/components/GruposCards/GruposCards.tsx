import * as React from "react";
// import styles from "../Taller3.module.scss";
import { Link } from 'react-router-dom'

import { IGrupos } from '../../models/Interfaces';
import { gruposService } from "../../services/gruposService";


import {
    DocumentCard,
    DocumentCardTitle,
    DocumentCardDetails,
    IDocumentCardStyles,
} from '@fluentui/react/lib/DocumentCard';
import { getTheme, IStackProps, PrimaryButton, Stack } from '@fluentui/react';

const theme = getTheme();

const GruposCards = () => {
    const [groupList, setGroupList] = React.useState<IGrupos[]>([])


    React.useEffect(() => {
        const getGrupos = async () => {
            const responseGroups = await gruposService.getGruposInfo()
            setGroupList(responseGroups)
        }
        getGrupos()
    }, [])

    // console.log("Esta en grupos cards", groupList)

    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
    };

    const columnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } },
    };

    return (
        <>
            <Link to={'/_layouts/15/workbench.aspx/createGroup/'} horizontal horizontalAlign={'end'} {...columnProps}>
                <PrimaryButton style={{ maxWidth: "100px" }} text="Crear Grupo" allowDisabledFocus />
            </Link>
            <div>
                {groupList.map(item => (
                    <Link key={item.ID} to={`/_layouts/15/workbench.aspx/editGroup/${item.ID}`}>
                        <DocumentCard
                            aria-label={'Document Card with image. How to make a good design. ' +
                                'Last modified by Annie Lindqvist and 2 others in March 13, 2018.'}
                            styles={cardStyles}
                            style={{ boxShadow: theme.effects.elevation16, margin: 10 }}>

                            <DocumentCardDetails>
                                <DocumentCardTitle
                                    title={item.SectorAsociado}
                                    shouldTruncate
                                    showAsSecondaryTitle
                                />

                                <DocumentCardTitle
                                    title={item.Denominacion}
                                    shouldTruncate
                                />

                                <DocumentCardTitle
                                    title={item.Descripcion}
                                    shouldTruncate
                                    showAsSecondaryTitle
                                />

                                <DocumentCardTitle
                                    title={item.FechaDeCreacion}
                                    showAsSecondaryTitle
                                />

                                <DocumentCardTitle
                                    title={item.FechaDeFinalizacion}
                                    showAsSecondaryTitle
                                />

                                <DocumentCardTitle
                                    title={item.Estado.toString()}
                                    shouldTruncate
                                    showAsSecondaryTitle
                                />

                                <DocumentCardTitle
                                    title={item.TipoDeGrupo}
                                    shouldTruncate
                                    showAsSecondaryTitle
                                />

                                <DocumentCardTitle
                                    title={item.Tematica}
                                    shouldTruncate
                                    showAsSecondaryTitle
                                />

                            </DocumentCardDetails>
                        </DocumentCard>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default GruposCards;