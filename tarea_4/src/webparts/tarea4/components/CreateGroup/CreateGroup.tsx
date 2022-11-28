import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SPContext } from '../Tarea4';
import { IFormFields, IGrupos } from '../../models/Interfaces';
import { getSP } from '../../../../pnpjsConfig';

import { sectoresService } from '../../services/sectoresService';
import { gruposService } from "../../services/gruposService";

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
    values
} from '@fluentui/react';
import { validates } from '../../services/validates';

function CreateGrupo() {

    const navigate = useNavigate()

    const [groupSelected, setGroupSelected] = useState<IGrupos>()
    const [sectors, setSectors] = useState<IDropdownOption[]>([])
    const [groupTypes, setGroupTypes] = useState<IDropdownOption[]>([])
    const [themes, setThemes] = useState<IDropdownOption[]>([])

    const [formField, setFormFields] = useState<IFormFields>({
        SectorAsociadoId: "",
        CodigoDeGrupo: "",
        Denominacion: "",
        Descripcion: "",
        FechaDeCreacion: new Date(),
        FechaDeFinalizacion: new Date(),
        Estado: false,
        TipoDeGrupo: "",
        Tematica: "",
    })

    const createGroup = async () => {

        let messageError = validates.checkFieldsCreate(formField)
        console.log(messageError)
        if (!messageError || messageError.length == 0) {

            await gruposService.createGroup(formField)
            try {
                alert(`El grupo ha sido creado correctamente!`);
                setTimeout(() => {
                    navigate('/')
                }, 1000)

            } catch (error) {
                alert("Ha surgido un error al editar el grupo");
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
        } else {
            alert(messageError)
        }
    }

    React.useEffect(() => {
        const getAssociatedSector = async () => {
            let callSectors: IDropdownOption[] = await sectoresService.getSectorDenomination()
            setSectors(callSectors)
        }
        const getTypesOfGroups = async () => {
            let callGroupTypes: IDropdownOption[] = await gruposService.getGroupTypes()
            setGroupTypes(callGroupTypes)
        }
        const getThemes = async () => {
            let callThemes: IDropdownOption[] = await gruposService.getThematic()
            setThemes(callThemes)
        }
        getAssociatedSector();
        getTypesOfGroups();
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

    return (
        <>
            <Stack horizontal tokens={stackTokens} styles={stackStyles}>
                <Stack {...columnProps}>
                    <Dropdown
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formField, SectorAsociadoId: option.key })}
                        label="Sector Asociado"
                        placeholder="Selecciona una opcion"
                        options={sectors}
                        styles={dropdownStyles}
                    />
                    <TextField
                        placeholder="Introduce un Codigo de Grupo"
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formField, CodigoDeGrupo: newValue })}
                        label="Codigo De Grupo" />
                    <TextField
                        placeholder="Introduce su Denominacion"
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formField, Denominacion: newValue })}
                        label="Denominación" />
                    <TextField
                        placeholder="Introduce una descripcion"
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formField, Descripcion: newValue })}
                        label="Descripción" multiline rows={3} />
                    <DatePicker
                        placeholder="Selecciona una Fecha"
                        onSelectDate={(date: Date) => setFormFields({ ...formField, FechaDeCreacion: date })}
                        label="Fecha de Creación"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        placeholder="Selecciona una Fecha"
                        onSelectDate={(date: Date) => setFormFields({ ...formField, FechaDeFinalizacion: date })}
                        label="Fecha de Finalización"
                        firstDayOfWeek={firstDayOfWeek}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                </Stack>

                <Stack {...columnProps}>
                    <Stack horizontal horizontalAlign={'end'} {...columnProps}>
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Crear Datos" onClick={() => createGroup()} allowDisabledFocus />
                        <Link to={'/'} >
                            <PrimaryButton style={{ maxWidth: "100px" }} text="Volver" allowDisabledFocus />
                        </Link>
                    </Stack>

                    <Toggle label="Estado" onText="Abierto" offText="Cerrado"
                        onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => setFormFields({ ...formField, Estado: checked })} />
                    <Dropdown
                        placeholder="Selecciona una opcion"
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formField, TipoDeGrupo: option.text })}
                        label="Tipo de Grupo"
                        options={groupTypes}
                        styles={dropdownStyles}
                    />
                    <Dropdown
                        placeholder="Selecciona una opcion"
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formField, Tematica: option.text })}
                        label="Tematica"
                        options={themes}
                        styles={dropdownStyles}
                    />
                </Stack>
            </Stack>
        </>
    );
};
export default CreateGrupo;