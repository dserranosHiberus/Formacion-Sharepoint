import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { IFormFields, IGrupos } from '../../models/Interfaces';

import { sectoresService } from '../../services/sectoresService';
import { gruposService } from "../../services/gruposService";
import { validates } from '../../services/validates';

import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps } from '@fluentui/react/lib/Stack';
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

// *****FUNCION CREAR GRUPO******
function CreateGrupo() {

    const navigate = useNavigate()

    const [visible, setVisible] = useState(false)
    const [messageErrors, setMessageErrors] = useState<any[]>([])

    const [sectors, setSectors] = useState<IDropdownOption[]>([])
    const [groupTypes, setGroupTypes] = useState<IDropdownOption[]>([])
    const [themes, setThemes] = useState<IDropdownOption[]>([])

    const [formField, setFormFields] = useState<IFormFields>({
        SectorAsociadoId: "",
        CodigoDeGrupo: "",
        Denominacion: "",
        Descripcion: "",
        FechaDeCreacion: null,
        FechaDeFinalizacion: null,
        Estado: false,
        TipoDeGrupo: "",
        Tematica: "",
    })

    const createGroup = async () => {

        let messageError = validates.checkFieldsCreate(formField)
        setMessageErrors(messageError)
        console.log(messageError)

        if (!messageError || messageError.length == 0) {
            setVisible(false)
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
            setVisible(true)
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

    const columnProps: Partial<IStackProps> = {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } },
    };

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 },
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
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
                        firstDayOfWeek={DayOfWeek.Monday}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        placeholder="Selecciona una Fecha"
                        onSelectDate={(date: Date) => setFormFields({ ...formField, FechaDeFinalizacion: date })}
                        label="Fecha de Finalización"
                        firstDayOfWeek={DayOfWeek.Monday}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
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
                </div>
            </div>
            <div style={{ display: visible === false ? "none" : "", boxShadow: "10px 10px 10px black", backgroundColor: "yellow", padding: "10px" }}>
                <div>
                    {messageErrors.map((e) =>
                        <p>{e}</p>
                    )}
                </div>
            </div>
        </>
    );
};
export default CreateGrupo;