import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { IGrupos } from '../../models/Interfaces';
import { getGroupSelect } from "../../services/DAOService";

// import { TaxonomyPicker, IPickerTerms, UpdateType, UpdateAction, IPickerTerm } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
// import { TextField, MaskedTextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
// import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
// import {
//     SelectableOptionMenuItemType,
//     DatePicker,
//     DayOfWeek,
//     Dropdown,
//     DropdownMenuItemType,
//     IDropdownOption,
//     IDropdownStyles,
//     defaultDatePickerStrings
// } from '@fluentui/react';
// import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
// import { Toggle } from '@fluentui/react/lib/Toggle';


function EditGrupo() {

    const { groupId } = useParams()
    const [groupSelected, setGroupSelected] = useState<IGrupos>()

    React.useEffect(() => {
        const getGrupo = async () => {
            const responseGroup = await getGroupSelect(parseInt(groupId))
            console.log('Respuesta de getGrupo', responseGroup)
            setGroupSelected(responseGroup)
        }
        getGrupo();
        console.log(groupSelected)
    }, [groupId])

    // let listaGrupo = props.grupo

    // console.log(listaGrupo)

    // const stackTokens = { childrenGap: 50 };
    // const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
    // const columnProps: Partial<IStackProps> = {
    //     tokens: { childrenGap: 15 },
    //     styles: { root: { width: 300 } },
    // };

    // const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Monday);

    // const dropdownStyles: Partial<IDropdownStyles> = {
    //     dropdown: { width: 300 },
    // };

    // function handleEdit() {
    //     alert("Hola Holita ")
    // }

    // const onDropdownChange = React.useCallback((event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
    //     setFirstDayOfWeek(option.key as number);
    // }, []);

    // const optionsSector: IDropdownOption[] = [
    //     { key: 'Header1', text: 'Sector Asociado', itemType: DropdownMenuItemType.Header },
    //     { key: 'A', text: 'Option A' },

    // ];
    // const optionsGroupType: IDropdownOption[] = [
    //     { key: 'Header1', text: 'Tipo de Grupo', itemType: DropdownMenuItemType.Header },
    //     { key: 'A', text: 'Option A' },
    // ];
    // const optionsTematica: any[] = [
    //     { key: 'Header1', text: 'Tematica', itemType: DropdownMenuItemType.Header },
    //     {

    //     }
    //     { key: { results.map }, text: 'Option A' },
    // ];

    // function onTaxPickerChange(terms: IPickerTerms) {
    //     console.log("Terms", terms);
    // }

    return (
        <>
            <p>Hola</p>
            {/* <Stack horizontal tokens={stackTokens} styles={stackStyles}>
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
                </Stack>

                <Stack {...columnProps}>
                    <Stack horizontal horizontalAlign={'end'} {...columnProps}>
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Modificar Datos" onClick={() => handleEdit()} allowDisabledFocus />
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Volver a Grupos" onClick={() => alert("Volver")} allowDisabledFocus />
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
                    <TaxonomyPicker allowMultipleSelections={true}
                        // initialValues={null}
                        termsetNameOrID="Ambito"
                        panelTitle="Selecciona un ambito"
                        label="Ambito"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    />
                    <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Pais"
                        panelTitle="Selecciona un país"
                        label="Pais"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    />
                    <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Ciudad"
                        panelTitle="Selecciona una Ciudad"
                        label="Ciudad"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    />
                </Stack>
    </Stack> */}
        </>
    );
};
export default EditGrupo;