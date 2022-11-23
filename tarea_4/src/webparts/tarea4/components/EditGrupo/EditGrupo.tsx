import * as React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SPContext } from '../Tarea4';
import { IGrupos } from '../../models/Interfaces';
import { getSP } from '../../../../pnpjsConfig';

import { sectoresService } from '../../services/sectoresService';
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

import { selectProperties, textAreaProperties } from 'office-ui-fabric-react';

function EditGrupo() {

    const { groupId } = useParams()
    const [groupSelected, setGroupSelected] = useState<IGrupos>()
    const [sectors, setSectors] = useState<IDropdownOption[]>([])
    const [groupTypes, setGroupTypes] = useState<IDropdownOption[]>([])
    const [themes, setThemes] = useState<IDropdownOption[]>([])

    const [sector, setSector] = useState<string>()
    const [denomination, setDenomination] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [dateCreate, setDateCreate] = useState<Date>()
    const [dateFinally, setDateFinally] = useState<Date>()
    const [estado, setEstado] = useState<boolean>()
    const [groupType, setGroupType] = useState<string>()
    const [theme, setTheme] = useState<string>()

    const IdListGrupos = "f1193dcc-6ec0-44f0-9124-d526430752d0";

    const updateItem = async () => {
        try {
            if (groupId.length > 0) {
                console.log("Sectores", sectors)
                console.log("GroupTypes", groupTypes)
                console.log("themes", themes)

                console.log("Sector create", sector)
                console.log("Denominacion", denomination)
                console.log("Descripcion", description)
                console.log("Date create", dateCreate)
                console.log("Date Finally", dateFinally)
                console.log("Estado seleccionado", estado)
                console.log("GroupType", groupType)
                console.log("Tematica", theme)

                const itemUpdate = await getSP().web.lists.getById(IdListGrupos).items.getById(parseInt(groupId)).update({
                    SectorAsociado: sector,
                    Denominacion: denomination,
                    Descripcion: description,
                    FechaDeCreacion: dateCreate,
                    FechaDeFinalizacion: dateFinally,
                    Estado: estado,
                    TipoDeGrupo: groupType,
                    Tematica: theme,
                    // Pais: document.getElementById("country")['value'],
                    // Ciudad: document.getElementById("city")['value'],
                    // Attachments: document.getElementById("ID")['value']
                });

                console.log("Sectores", sectors)
                console.log("GroupTypes", groupTypes)
                console.log("themes", themes)

                console.log("Sector create", sector)
                console.log("Denominacion", denomination)
                console.log("Descripcion", description)
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

    React.useEffect(() => {
        const getGrupo = async () => {
            let callGroupSelected: IGrupos = await gruposService.getGroupSelect(parseInt(groupId))
            setGroupSelected(callGroupSelected)
        }
        const getSectores = async () => {
            let callSectors: IDropdownOption[] = await sectoresService.getSectoresDenominacion()
            setSectors(callSectors)
            // console.log("Sectores", callSectors)
        }
        const getTipoDeGrupos = async () => {
            let callGroupTypes: IDropdownOption[] = await gruposService.getGroupTypes()
            setGroupTypes(callGroupTypes)
            // console.log("Tipo de Grupos", callGroupTypes)
        }
        const getThemes = async () => {
            let callThemes: IDropdownOption[] = await gruposService.getTematica()
            setThemes(callThemes)
            // console.log("Temas", callThemes)
        }

        getGrupo();
        getSectores();
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
                    <TextField id={'denominacion'}
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setDenomination(newValue)}
                        placeholder={groupSelected?.Denominacion} label="Denominación" />
                    <TextField id={'descripcion'}
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setDescription(newValue)}
                        placeholder={groupSelected?.Descripcion} label="Descripción" multiline rows={3} />
                    <DatePicker
                        id={'createDate'}
                        onSelectDate={(date: Date) => setDateCreate(date)}
                        placeholder={groupSelected?.FechaDeCreacion}
                        label="Fecha de Creación"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        id={'finallyDate'}
                        onSelectDate={(date: Date) => setDateFinally(date)}
                        placeholder={groupSelected?.FechaDeFinalizacion}
                        label="Fecha de Finalización"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
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

                    <Toggle id='estado' label="Estado" onText="Abierto" offText="Cerrado"
                        onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => setEstado(checked)} />
                    <Dropdown
                        id={'typeGroup'}
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setGroupType(option.text)}
                        placeholder={groupSelected?.TipoDeGrupo}
                        label="Tipo de Grupo"
                        options={groupTypes}
                        styles={dropdownStyles}
                    />
                    <Dropdown
                        id={'theme'}
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setTheme(option.text)}
                        placeholder={groupSelected?.Tematica}
                        label="Tematica"
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


