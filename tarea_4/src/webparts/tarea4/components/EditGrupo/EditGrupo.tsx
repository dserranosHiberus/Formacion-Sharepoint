import * as React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SPContext } from '../Tarea4';
import { IGrupos, IFormFields } from '../../models/Interfaces';
import { getSP } from '../../../../pnpjsConfig';

import { sectoresService } from '../../services/sectoresService';
import { gruposService } from "../../services/gruposService";

import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Toggle } from '@fluentui/react/lib/Toggle';
import {
    DatePicker,
    DayOfWeek,
    Dropdown,
    IDropdownOption,
    IDropdownStyles,
    defaultDatePickerStrings,
} from '@fluentui/react';

import { selectProperties, textAreaProperties } from 'office-ui-fabric-react';

function EditGrupo() {

    const context = React.useContext(SPContext)

    const { groupId } = useParams()
    const [groupSelected, setGroupSelected] = useState<IGrupos>()
    const [sectors, setSectors] = useState<IDropdownOption[]>([])
    const [groupTypes, setGroupTypes] = useState<IDropdownOption[]>([])
    const [themes, setThemes] = useState<IDropdownOption[]>([])

    const [formField, setFormFields] = useState<IFormFields>({

        SectorAsociadoId: "",
        Denominacion: "",
        Descripcion: "",
        FechaDeCreacion: new Date(),
        FechaDeFinalizacion: new Date(),
        Estado: false,
        TipoDeGrupo: "",
        Tematica: "",
        Ambito: "",
        Ciudad: "",
        Pais: ""
    })

    const IdListGrupos = "f1193dcc-6ec0-44f0-9124-d526430752d0";

    React.useEffect(() => {
        const getGrupo = async () => {
            let callGroupSelected: IGrupos = await gruposService.readGroupSelect(parseInt(groupId))
            setGroupSelected(callGroupSelected)
        }
        const getSectores = async () => {
            let callSectors: IDropdownOption[] = await sectoresService.getSectorDenomination()
            setSectors(callSectors)
            // console.log("Sectores", callSectors)
        }
        const getTipoDeGrupos = async () => {
            let callGroupTypes: IDropdownOption[] = await gruposService.getGroupTypes()
            setGroupTypes(callGroupTypes)
            // console.log("Tipo de Grupos", callGroupTypes)
        }
        const getThemes = async () => {
            let callThemes: IDropdownOption[] = await gruposService.getThematic()
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

    function onTaxPickerChange(terms: IPickerTerms) {
        console.log("Terms", terms);
    }

    return (
        <>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                    <Dropdown
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formField, SectorAsociadoId: option.key })}
                        placeholder={groupSelected?.SectorAsociado}
                        label="Sector"
                        options={sectors}
                        styles={dropdownStyles}
                    />
                    <TextField id={'denominacion'}
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formField, Denominacion: newValue })}
                        placeholder={groupSelected?.Denominacion} label="Denominación" />
                    <TextField id={'descripcion'}
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formField, Descripcion: newValue })}
                        placeholder={groupSelected?.Descripcion} label="Descripción" multiline rows={3} />
                    <DatePicker
                        id={'createDate'}
                        onSelectDate={(date: Date) => setFormFields({ ...formField, FechaDeCreacion: date })}
                        placeholder={groupSelected?.FechaDeCreacion}
                        label="Fecha de Creación"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        onSelectDate={(date: Date) => setFormFields({ ...formField, FechaDeFinalizacion: date })}
                        placeholder={groupSelected?.FechaDeFinalizacion}
                        label="Fecha de Finalización"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                </Stack>

                <Stack {...columnProps}>
                    <Stack horizontal horizontalAlign={'end'} {...columnProps}>
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Modificar Datos" onClick={() => gruposService.updateGroup(formField, parseInt(groupId))} allowDisabledFocus />
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Borrar Grupo" onClick={() => gruposService.deleteGroup(parseInt(groupId))} allowDisabledFocus />
                        <Link to={'/'} >
                            <PrimaryButton style={{ maxWidth: "100px" }} text="Volver" allowDisabledFocus />
                        </Link>
                    </Stack>

                    <Toggle label="Estado" onText="Abierto" offText="Cerrado"
                        onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => setFormFields({ ...formField, Estado: checked })} />
                    <Dropdown
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formField, TipoDeGrupo: option.text })}
                        placeholder={groupSelected?.TipoDeGrupo}
                        label="Tipo de Grupo"
                        options={groupTypes}
                        styles={dropdownStyles}
                    />
                    <Dropdown
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formField, Tematica: option.text })}
                        placeholder={groupSelected?.Tematica}
                        label="Tematica"
                        options={themes}
                        styles={dropdownStyles}
                    />
                    {/* <TaxonomyPicker allowMultipleSelections={true}
                        termsetNameOrID="Ambito"
                        panelTitle="Selecciona un ambito"
                        label="Ambito"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                        required
                    /> */}
                    {/* <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Pais"
                        panelTitle="Selecciona un país"
                        label="Pais"
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    /> */}
                    {/* <TaxonomyPicker allowMultipleSelections={false}
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

