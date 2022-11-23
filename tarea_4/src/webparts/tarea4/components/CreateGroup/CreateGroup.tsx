import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { gruposService } from "../../services/gruposService";

import { SPContext } from '../Tarea4';

import { IGrupos } from '../../models/Interfaces';

import { TaxonomyPicker, IPickerTerms, UpdateType, UpdateAction, IPickerTerm } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

import { TextField, MaskedTextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import {
    SelectableOptionMenuItemType,
    DatePicker,
    DayOfWeek,
    Dropdown,
    DropdownMenuItemType,
    IDropdownOption,
    IDropdownStyles,
    defaultDatePickerStrings,
} from '@fluentui/react';
import { getSP } from '../../../../pnpjsConfig';

function CreateGrupo() {
    const [listValue, setListValue] = React.useState<[]>([])

    const context = React.useContext(SPContext)
    console.log("SPContext", context?.context)

    const stackTokens = { childrenGap: 50 };
    const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
    const columnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } },
    };

    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Monday);

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 },
    };

    // function saveValue(id, value) {
    //     let datos = { id, value }
    //     setListValue(datos)
    // }

    async function handleCreate() {
        const nameListGrupos = "Grupos de la Unidad X";
        const IdListGrupos = "f1193dcc-6ec0-44f0-9124-d526430752d0";
        const addGroup = await getSP()
            .web.lists.getById(IdListGrupos)
            .items.add({
                SectorAsociado: document.getElementById("sector")['value'],
                Denominacion: document.getElementById("denominacion")['value'],
                Descripcion: document.getElementById("descripcion")['value'],
                // FechaDeCreacion: new Date(document.getElementById("createDate")['value'],),
                // FechaDeFinalizacion: new Date(document.getElementById("finallyDate")['value'],),
                // Ambito: document.getElementById("ID")['value'],
                Tematica: document.getElementById("theme")['value'],
                Estado: document.getElementById("estado")['value'],
                // Pais: document.getElementById("country")['value'],
                // Ciudad: document.getElementById("city")['value'],
                // Attachments: document.getElementById("ID")['value']
            });
        console.log("addGroup creado", addGroup)


        // const createGrupo = async () => {
        //     await gruposService.CreateGroup()
        // }
        // createGrupo();
        // console.log("Grupo Creado")
    }

    const onDropdownChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
        setFirstDayOfWeek(option.key as number);
    }, []);

    const optionsSector: IDropdownOption[] = [
        { key: 'Header1', text: 'Sector Asociado', itemType: DropdownMenuItemType.Header },
        { key: 'A', text: 'Option A' },

    ];
    const optionsGroupType: IDropdownOption[] = [
        { key: 'Header1', text: 'Tipo de Grupo', itemType: DropdownMenuItemType.Header },
        { key: 'A', text: 'Option A' },
    ];
    const optionsTematica: any[] = [
        { key: 'Header1', text: 'Tematica', itemType: DropdownMenuItemType.Header },
        { key: 'A', text: 'Option A' },
    ];

    function onTaxPickerChange(terms: IPickerTerms) {
        console.log("Terms", terms);
    }

    return (

        <>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                    <Dropdown
                        id='sector'
                        onChange={(_, id, value) => {
                            // handleCreate()
                            // saveValue(id, value)
                            console.log("Sector", id, value)
                        }}
                        label="Sector Asociado"
                        options={optionsSector}
                        styles={dropdownStyles}
                    />
                    <TextField id='denominacion' label="Denominación" />
                    <TextField id='descripcion' label="Descripción" multiline rows={3} />
                    <DatePicker
                        id='createDate'
                        label="Fecha de Creación"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        id='finallyDate'
                        label="Fecha de Finalización"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                    />
                </Stack>

                <Stack {...columnProps}>
                    <Stack horizontal horizontalAlign={'end'} {...columnProps}>
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Crear Grupo" onClick={() => handleCreate()} allowDisabledFocus />
                        <Link to={'/_layouts/15/workbench.aspx/'} >
                            <PrimaryButton style={{ maxWidth: "100px" }} text="Volver" allowDisabledFocus />
                        </Link>
                    </Stack>
                    <Toggle id='estado' label="Estado" defaultChecked onText="Abierto" offText="Cerrado" onChange={() => alert("Cambio de estado")} />
                    <Dropdown
                        id='typeGroup'
                        label="Tipo de Grupo"
                        options={optionsGroupType}
                        styles={dropdownStyles}
                    />
                    <Dropdown
                        id='theme'
                        label="Temática"
                        options={optionsTematica}
                        styles={dropdownStyles}
                    />
                    {/* <TaxonomyPicker allowMultipleSelections={true}
                         id='ambito' 
                         termsetNameOrID="Ambito"
                        panelTitle="Selecciona un ambito"
                        label="Ambito"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    /> */}
                    {/* <TaxonomyPicker allowMultipleSelections={false}
                          id='country' 
                          termsetNameOrID="Pais"
                        panelTitle="Selecciona un país"
                        label="Pais"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    /> */}
                    {/* <TaxonomyPicker allowMultipleSelections={false}
                         id='city'  
                         termsetNameOrID="Ciudad"
                        panelTitle="Selecciona una Ciudad"
                        label="Ciudad"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    /> */}
                </Stack>
            </Stack>
        </>
    );
};
export default CreateGrupo;