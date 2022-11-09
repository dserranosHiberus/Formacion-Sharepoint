import * as React from "react";
// import styles from "../Taller3.module.scss";
import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardTitle,
    DocumentCardDetails,
    DocumentCardImage,
    IDocumentCardActivityPerson,
    IDocumentCardStyles,
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import { getTheme } from '@fluentui/react';

import { ITaller3 } from "../../../../interfaces"

const theme = getTheme();

const people: IDocumentCardActivityPerson[] = [
    { name: 'Annie Lindqvist', profileImageSrc: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: 'Roko Kolar', profileImageSrc: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600', initials: 'RK' },
    { name: 'Aaron Reid', profileImageSrc: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: 'Christian Bergqvist', profileImageSrc: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600', initials: 'CB' },
    { name: 'Greta Lundberg', profileImageSrc: "https://images.pexels.com/photos/1852382/pexels-photo-1852382.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: 'Maor Sharitt', profileImageSrc: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: 'Velatine Lourvric', profileImageSrc: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=600', initials: 'VL' },
    { name: 'Kat Larrson', profileImageSrc: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

function Cards(props: { noticias: ITaller3[] }) {

    console.log("Cards props", props.noticias)
    let datos = props.noticias
    const cardStyles: IDocumentCardStyles = {
        root: { display: 'inline-block', marginRight: 20, marginBottom: 20, width: 320 },
    };

    return (
        <>
            {datos.map(e => (
                <div key={e.ID}>

                    <DocumentCard
                        aria-label={
                            'Document Card with image. How to make a good design. ' +
                            'Last modified by Annie Lindqvist and 2 others in March 13, 2018.'}
                        styles={cardStyles}
                        onClickHref="https://news.microsoft.com/es-es/"
                        style={{ boxShadow: theme.effects.elevation16, margin: 10 }}>

                        <DocumentCardDetails>
                            <DocumentCardTitle
                                title={e.categoriaNoticias}
                                showAsSecondaryTitle
                            />
                        </DocumentCardDetails>

                        <DocumentCardImage height={150} imageFit={ImageFit.cover} imageSrc={e.Imagen} />

                        <DocumentCardDetails>
                            <DocumentCardTitle
                                title={e.Title}
                                shouldTruncate
                            />
                        </DocumentCardDetails>

                        <DocumentCardDetails>
                            <DocumentCardTitle
                                title={e.descriptionNoticia}
                                shouldTruncate
                                showAsSecondaryTitle
                            />
                        </DocumentCardDetails>

                        <DocumentCardActivity
                            activity={e.fechaDePublicacion}
                            people={[{ name: e.Responsable, profileImageSrc: people[e.ID].profileImageSrc }]}
                        />

                    </DocumentCard>

                </div>
            ))}
        </>
    )

}

export default Cards;