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
import { validates } from "../../services/validates";



const GruposCards = () => {
    const [groupList, setGroupList] = React.useState<IGrupos[]>([])
    const theme = getTheme();

    React.useEffect(() => {
        const getGrupos = async () => {
            const responseGroups = await gruposService.readGroups()
            setGroupList(responseGroups)
        }
        getGrupos()
    }, [])

    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 500 },
    };

    const columnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 600 } },
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <Stack horizontal horizontalAlign={'end'} {...columnProps}>
                    <Link to={'/createGroup/'} {...columnProps}>
                        <PrimaryButton style={{ width: "100%" }} text="Crear Grupo" allowDisabledFocus />
                    </Link>
                </Stack>
                {groupList.map(item => (
                    <Link key={item.ID} to={`/editGroup/${item.ID}`}>
                        <DocumentCard
                            aria-label={'Document Card with image. How to make a good design. ' +
                                'Last modified by Annie Lindqvist and 2 others in March 13, 2018.'}
                            styles={cardStyles}
                            style={{ boxShadow: theme.effects.elevation8, margin: 10 }}>

                            <DocumentCardDetails>
                                <DocumentCardTitle
                                    title='Sector Asociado'
                                />
                                <DocumentCardTitle
                                    title={item.SectorAsociado}
                                    showAsSecondaryTitle
                                />
                                <DocumentCardTitle
                                    title='Denominacion'
                                />
                                <DocumentCardTitle
                                    title={item.Denominacion}
                                    showAsSecondaryTitle
                                />
                                <DocumentCardTitle
                                    title='Descripcion'
                                />
                                <DocumentCardTitle
                                    title={item.Descripcion}
                                    showAsSecondaryTitle
                                />
                                <DocumentCardTitle
                                    title='Fecha de Creacion'
                                />
                                <DocumentCardTitle
                                    title={item.FechaDeCreacion}
                                    showAsSecondaryTitle
                                />
                                <DocumentCardTitle
                                    title='Fecha de Finalizacion'
                                />
                                <DocumentCardTitle
                                    title={item.FechaDeFinalizacion}
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