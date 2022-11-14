import * as React from 'react';


import { TaxonomyPicker, IPickerTerms, UpdateType, UpdateAction, IPickerTerm } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

import { TextField, MaskedTextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import {
    ComboBox,
    IComboBoxStyles,
    IComboBoxOption,
    SelectableOptionMenuItemType,
    DatePicker,
    DayOfWeek,
    Dropdown,
    DropdownMenuItemType,
    IDropdownOption,
    IDropdownStyles,
    defaultDatePickerStrings
} from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';

import { IGruposdeUnidadProps } from '../Interfaces';
import { WebPartContext } from '@microsoft/sp-webpart-base';

function EditGrupo(props: { grupo: IGruposdeUnidadProps, context: WebPartContext }) {

    // const [displayElements3, setDisplayElements3] = useState(false)
    // const [selected, setSelected] = useState<IGruposdeUnidadProps>();

    let listaGrupo = props.grupo
    // setSelected(listaGrupo);
    // setDisplayElements3(true)
    console.log(listaGrupo)

    const stackTokens = { childrenGap: 50 };
    const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
    const columnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } },
    };

    const [secondTextFieldValue, setSecondTextFieldValue] = React.useState('');
    const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Monday);

    const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { maxWidth: 100 } };
    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 },
    };
    const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };

    function handleEdit() {
        alert("Hola Holita ")
    }


    // const onChangeSecondTextFieldValue = React.useCallback(
    //     (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    //         if (!newValue || newValue.length <= 5) {
    //             setSecondTextFieldValue(newValue || '');
    //         }
    //     },
    //     [],
    // );

    const onDropdownChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
        setFirstDayOfWeek(option.key as number);
    }, []);

    const optionsSector: IDropdownOption[] = [
        { key: 'Header1', text: 'Sector Asociado', itemType: DropdownMenuItemType.Header },
        { key: 'A', text: 'Option A' },

    ];
    const optionsAmbito: IComboBoxOption[] = [
        { key: 'Header1', text: 'Ambito', itemType: SelectableOptionMenuItemType.Header },
        { key: 'A', text: 'Option A' },

    ];
    const optionsGroupType: IDropdownOption[] = [
        { key: 'Header1', text: 'Tipo de Grupo', itemType: DropdownMenuItemType.Header },
        { key: 'A', text: 'Option A' },
    ];
    const optionsTematica: IDropdownOption[] = [
        { key: 'Header1', text: 'Tematica', itemType: DropdownMenuItemType.Header },
        { key: 'A', text: 'Option A' },
    ];
    const optionsPais: IDropdownOption[] = [
        { key: 'Header1', text: 'Pais', itemType: DropdownMenuItemType.Header },
        { key: 'A', text: 'Option A' },
    ];
    const optionsCiudad: IDropdownOption[] = [
        { key: 'Header1', text: 'Ciudad', itemType: DropdownMenuItemType.Header },
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
                        placeholder={listaGrupo.SectorAsociado}
                        label="Sector"
                        options={optionsSector}
                        styles={dropdownStyles}
                    />
                    <TextField placeholder={listaGrupo.Denominacion} label="Denominación" />
                    <TextField placeholder={listaGrupo.Descripcion} label="Descripción" multiline rows={3} />
                    <DatePicker
                        placeholder={listaGrupo.FechaDeCreacion}
                        label="Fecha de Creación"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        placeholder={listaGrupo.FechaDeFinalizacion}
                        label="Fecha de Finalización"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                    />
                    {/* <TextField
                        placeholder={listaGrupo.CodigoDeGrupo}
                        label="Código de Grupo"
                        value={secondTextFieldValue}
                        onChange={onChangeSecondTextFieldValue}
                        styles={narrowTextFieldStyles}
                    /> */}
                </Stack>

                <Stack {...columnProps}>
                    <Stack horizontal {...columnProps}>
                        <DefaultButton style={{ maxWidth: "80px" }} text="Modificar Datos" onClick={() => handleEdit()} allowDisabledFocus />
                        <DefaultButton style={{ maxWidth: "80px" }} text="Volver a Grupos" onClick={() => alert("Volver")} allowDisabledFocus />
                    </Stack>
                    <Toggle label="Estado" defaultChecked onText="Abierto" offText="Cerrado" onChange={() => alert("Cambio de estado")} />
                    <Dropdown
                        placeholder={listaGrupo.TipoDeGrupo}
                        label="Tipo de Grupo"
                        options={optionsGroupType}
                        styles={dropdownStyles}
                    />
                    <Dropdown
                        placeholder={listaGrupo.Tematica}
                        label="Temática"
                        options={optionsTematica}
                        styles={dropdownStyles}
                    />
                    <ComboBox
                        placeholder={listaGrupo.Ambito}
                        defaultSelectedKey="A"
                        label="Ambito"
                        multiSelect
                        options={optionsAmbito}
                        styles={comboBoxStyles}
                    />
                    <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Pais"
                        panelTitle="Selecciona un país"
                        label="Pais"
                        onChange={onTaxPickerChange}
                        context={props.context}
                        isTermSetSelectable={false}
                    />
                    <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Ciudad"
                        panelTitle="Selecciona una Ciudad"
                        label="Ciudad"
                        onChange={onTaxPickerChange}
                        context={props.context}
                        isTermSetSelectable={false}
                    />
                    {/* <TextField placeholder={listaGrupo.AmbitoGeografico} label="Ambito Geográfico" />
                    <TextField placeholder={listaGrupo.AmbitoOrganizativoInternacional} label="Ambito Organizativo Internacional" /> */}
                </Stack>
            </Stack>
        </>
    );
};
export default EditGrupo;