import * as React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SPContext } from '../Tarea4';

import { IFields, IGrupos, ITarea4Props } from '../../models/Interfaces';

import { gruposService } from "../../services/gruposService";

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
    values
} from '@fluentui/react';

import { getSP } from '../../../../pnpjsConfig';
import { selectProperties, textAreaProperties } from 'office-ui-fabric-react';

function EditGrupo() {

    const { groupId } = useParams()
    const [groupSelected, setGroupSelected] = useState<IGrupos>()
    const [sectors, setSectors] = useState<IDropdownOption[]>([])
    const [groupTypes, setGroupTypes] = useState<IDropdownOption[]>([])
    const [themes, setThemes] = useState<IDropdownOption[]>([])

    const [sector, setSector] = useState<string>()
    const [dateCreate, setDateCreate] = useState<any>()
    const [dateFinally, setDateFinally] = useState<any>()
    const [estado, setEstado] = useState<boolean>()
    const [groupType, setGroupType] = useState<string>()
    const [theme, setTheme] = useState<any>()

    const IdListGrupos = "f1193dcc-6ec0-44f0-9124-d526430752d0";
    const updateItem = async () => {
        try {
            // const id = document.getElementById('groupId')['value'];
            if (groupId.length > 0) {
                const itemUpdate = await getSP().web.lists.getById(IdListGrupos).items.getById(parseInt(groupId)).update({
                    SectorAsociado: (sector),
                    Denominacion: document.getElementById("denominacion")['value'],
                    Descripcion: document.getElementById("descripcion")['value'],
                    FechaDeCreacion: (dateCreate),
                    FechaDeFinalizacion: (dateFinally),
                    Estado: (estado),
                    TipoDeGrupo: groupType,
                    Tematica: document.getElementById("theme")['value'],
                    // Pais: document.getElementById("country")['value'],
                    // Ciudad: document.getElementById("city")['value'],
                    // Attachments: document.getElementById("ID")['value']
                });
                let dato = document.getElementById("denominacion")["value"]

                console.log("themes", themes)
                console.log("dato", dato)
                console.log("Sector create", sector)
                console.log("Date create", dateCreate)
                console.log("Date Finally", dateFinally)
                console.log("Estado seleccionado", estado)
                console.log("GroupType", groupType)
                console.log("Tematica", theme)

                alert(`Item with ID: ${groupId} updated successfully!`);
            }
            else {
                alert(`Please enter a valid item id.`);
            }
        }
        catch (e) {
            console.log(groupId);
            console.error(e);
        }
    }


    const context = React.useContext(SPContext)
    console.log("SPContext", context?.context)

    React.useEffect(() => {
        const getGrupo = async () => {
            let callGroupSelected: IGrupos = await gruposService.getGroupSelect(parseInt(groupId))
            setGroupSelected(callGroupSelected)
        }

        // const getSectores = async () => {
        //     let callSectors: IDropdownOption[] = await gruposService.getSectors()
        //     setSectors(callSectors)
        //     console.log("Temas", callSectors)
        // }
        // getSectores();

        const getTipoDeGrupos = async () => {
            let callGroupTypes: IDropdownOption[] = await gruposService.getGroupTypes()
            setGroupTypes(callGroupTypes)
            console.log("Tipo de Grupos", callGroupTypes)
        }


        const getThemes = async () => {
            let callThemes: IDropdownOption[] = await gruposService.getTematica()
            setThemes(callThemes)
            console.log("Temas", callThemes)
        }
        getGrupo();
        getTipoDeGrupos();
        getThemes();

    }, [])

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
    // const optionsTematica: any[] = [
    //     { key: 'Header1', text: 'Tematica', itemType: DropdownMenuItemType.Header },
    //     { key: 'A', text: 'Option A' },
    // ];

    function onTaxPickerChange(terms: IPickerTerms) {
        console.log("Terms", terms);
    }

    return (
        <>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                    <Dropdown
                        id={'sector'}
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setSector(option.text)}
                        placeholder={groupSelected?.SectorAsociado}
                        label="Sector"
                        options={sectors}
                        styles={dropdownStyles}
                    />
                    <TextField id='denominacion' placeholder={groupSelected?.Denominacion} label="Denominación" />
                    <TextField id='descripcion' placeholder={groupSelected?.Descripcion} label="Descripción" multiline rows={3} />
                    <DatePicker
                        id={'createDate'}
                        onSelectDate={(date: Date) => setDateCreate(date)}
                        placeholder={groupSelected?.FechaDeCreacion}
                        label="Fecha de Creación"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        id={'finallyDate'}
                        onSelectDate={(date: Date) => setDateFinally(date)}
                        placeholder={groupSelected?.FechaDeFinalizacion}
                        label="Fecha de Finalización"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        // DatePicker uses English strings by default. For localized apps, you must override this prop.
                        strings={defaultDatePickerStrings}
                    />
                </Stack>

                <Stack {...columnProps}>
                    <Stack horizontal horizontalAlign={'end'} {...columnProps}>
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Modificar Datos" onClick={() => updateItem()} allowDisabledFocus />
                        <Link to={'/_layouts/15/workbench.aspx/'} >
                            <PrimaryButton style={{ maxWidth: "100px" }} text="Volver" allowDisabledFocus />
                        </Link>
                    </Stack>

                    <Toggle id='estado' label="Estado" onText="Abierto" offText="Cerrado" onChange={
                        (event: React.MouseEvent<HTMLElement>, checked?: boolean) => setEstado(checked)} />
                    <Dropdown
                        id='typeGroup'
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setGroupType(option.text)}
                        placeholder={groupSelected?.TipoDeGrupo}
                        label="Tipo de Grupo"
                        options={groupTypes}
                        styles={dropdownStyles}
                    />
                    <Dropdown
                        id='theme'
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setTheme(option.text)}
                        placeholder={groupSelected?.Tematica}
                        label="Temática"
                        options={themes}
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
export default EditGrupo;


