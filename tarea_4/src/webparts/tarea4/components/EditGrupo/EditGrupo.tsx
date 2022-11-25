import * as React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useSPContext } from '../Tarea4';
import { IGrupos, IFormFields } from '../../models/Interfaces';
import { sectoresService } from '../../services/sectoresService';
import { gruposService } from "../../services/gruposService";

import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

// import { spfi } from "@pnp/sp";
// import "@pnp/sp/taxonomy";
// import { ITermStoreInfo } from "@pnp/sp/taxonomy";

// const sp = spfi(...);

// // get term store data
// const info: ITermStoreInfo = await sp.termStore();

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

    const context: any = useSPContext


    const { groupId } = useParams()
    const [groupSelected, setGroupSelected] = useState<IGrupos>()
    const [sectors, setSectors] = useState<IDropdownOption[]>([])
    const [groupTypes, setGroupTypes] = useState<IDropdownOption[]>([])
    const [themes, setThemes] = useState<IDropdownOption[]>([])

    const [formField, setFormFields] = useState<IFormFields>({

        SectorAsociadoId: 0,
        Denominacion: "",
        Descripcion: "",
        FechaDeCreacion: new Date(),
        FechaDeFinalizacion: new Date(),
        Estado: false,
        TipoDeGrupo: "",
        Tematica: "",
        Ambito: "",
        Ciudad: [],
        Pais: [],
        CodigoDeGrupo: "",
    })

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

    const onTaxPickerChange = (newValue?: IPickerTerms) => {
        console.log("Terms", newValue);
    }

    return (
        <>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                    <Dropdown
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formField, SectorAsociadoId: option.key })}
                        placeholder={groupSelected?.SectorAsociado}
                        label="Sector Asociado"
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

                    <TextField
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formField, CodigoDeGrupo: newValue })}
                        placeholder={groupSelected?.CodigoDeGrupo} label="Codigo del Grupo" />

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
                        initialValues={groupSelected?.Ambito}
                        onChange={onTaxPickerChange("Ambito")}
                        context={context}
                        isTermSetSelectable={false}
                        required
                    /> */}
                    <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Pais"
                        panelTitle="Selecciona un país"
                        label="Pais"
                        initialValues={groupSelected?.Pais}
                        onChange={onTaxPickerChange}
                        context={context}
                        isTermSetSelectable={false}
                    />
                    {/* <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Ciudad"
                        panelTitle="Selecciona una Ciudad"
                        label="Ciudad"
                         initialValues={groupSelected?.Ciudad}
                        onChange={ setFormFields({ ...formField, Tematica: option.text })}
                        onChange={onTaxPickerChange("Ciudad")}
                        panelTitle="Selecciona Selecciona una Ciudad"
                        context={context}
                        isTermSetSelectable={false}
                    /> */}
                </Stack>
            </Stack>
        </>
    );
};
export default EditGrupo;

