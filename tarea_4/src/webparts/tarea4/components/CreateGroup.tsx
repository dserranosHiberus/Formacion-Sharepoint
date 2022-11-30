import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SPContext } from './Tarea4';

import { FormFields } from '../models/index';

import { tarea4BLL } from '../services/tarea4BLL';
import { validates } from '../services/validates';

// import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";

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

    const { context } = React.useContext(SPContext)
    const navigate = useNavigate()

    const [visible, setVisible] = useState(false)
    const [messageErrors, setMessageErrors] = useState<any[]>([])

    const [sectors, setSectors] = useState<IDropdownOption[]>([])
    const [groupTypes, setGroupTypes] = useState<IDropdownOption[]>([])
    const [themes, setThemes] = useState<IDropdownOption[]>([])

    const [formFields, setFormFields] = useState<FormFields>({
        SectorAsociadoId: "",
        CodigoDeGrupo: "",
        Denominacion: "",
        Descripcion: "",
        FechaDeCreacion: null,
        FechaDeFinalizacion: null,
        Estado: false,
        TipoDeGrupo: "",
        Tematica: "",
        // Pais: null,
        // Ciudad: null,
        // Ambito: []

    })

    const createGroup = async () => {

        let messageError = validates.checkFieldsCreate(formFields)
        setMessageErrors(messageError)
        console.log(messageError)

        if (!messageError || messageError.length == 0) {
            setVisible(false)
            await tarea4BLL.createGroup(formFields)
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
            let callSectors: IDropdownOption[] = await tarea4BLL.getSectorDenomination()
            setSectors(callSectors)
        }
        const getTypesOfGroups = async () => {
            let callGroupTypes: IDropdownOption[] = await tarea4BLL.getGroupTypes()
            setGroupTypes(callGroupTypes)
        }
        const getThemes = async () => {
            let callThemes: IDropdownOption[] = await tarea4BLL.getThematic()
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

    // function onServicePickerPaisChange(name: IPickerTerms) {
    //     console.log(name)
    //     setFormFields({ ...formFields, Pais: name })
    // }
    // function onServicePickerCiudadChange(name: IPickerTerms) {
    //     console.log(name)
    //     setFormFields({ ...formFields, Ciudad: name })
    // }
    // function onServicePickerAmbitoChange(name: IPickerTerms) {
    //     console.log(name)
    //     setFormFields({ ...formFields, Ambito: name })
    // }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>

                    <Stack horizontal horizontalAlign={'start'} {...columnProps}>
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Crear Datos" onClick={() => createGroup()} allowDisabledFocus />
                        <Link to={'/'} >
                            <PrimaryButton style={{ maxWidth: "100px" }} text="Volver" allowDisabledFocus />
                        </Link>
                    </Stack>
                    <Dropdown
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formFields, SectorAsociadoId: option.key })}
                        label="Sector Asociado"
                        placeholder="Selecciona una opcion"
                        options={sectors}
                        styles={dropdownStyles}
                    />
                    <TextField
                        placeholder="Introduce un Codigo de Grupo"
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formFields, CodigoDeGrupo: newValue })}
                        label="Codigo De Grupo" />
                    <TextField
                        placeholder="Introduce su Denominacion"
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formFields, Denominacion: newValue })}
                        label="Denominación" />
                    <TextField
                        placeholder="Introduce una descripcion"
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formFields, Descripcion: newValue })}
                        label="Descripción" multiline rows={3} />
                    <DatePicker
                        placeholder="Selecciona una Fecha"
                        onSelectDate={(date: Date) => setFormFields({ ...formFields, FechaDeCreacion: date })}
                        label="Fecha de Creación"
                        firstDayOfWeek={DayOfWeek.Monday}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                        initialPickerDate={new Date}
                    />
                    <DatePicker
                        placeholder="Selecciona una Fecha"
                        onSelectDate={(date: Date) => setFormFields({ ...formFields, FechaDeFinalizacion: date })}
                        label="Fecha de Finalización"
                        firstDayOfWeek={DayOfWeek.Monday}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>

                    <Toggle label="Estado" onText="Abierto" offText="Cerrado"
                        onChange={(event: React.MouseEvent<HTMLElement>, checked?: boolean) => setFormFields({ ...formFields, Estado: checked })} />
                    <Dropdown
                        placeholder="Selecciona una opcion"
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formFields, TipoDeGrupo: option.text })}
                        label="Tipo de Grupo"
                        options={groupTypes}
                        styles={dropdownStyles}
                    />
                    <Dropdown
                        placeholder="Selecciona una opcion"
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formFields, Tematica: option.text })}
                        label="Tematica"
                        options={themes}
                        styles={dropdownStyles}
                    />
                    {/* <TaxonomyPicker allowMultipleSelections={false}
                        placeholder="Selecciona una opcion"
                        termsetNameOrID="9a43e0c6-0ed4-41e3-9f86-253fe641821a"
                        panelTitle="Selecciona un Pais"
                        label="Pais"
                        context={context as any}
                        onChange={onServicePickerPaisChange}
                        isTermSetSelectable={false} />
                    <TaxonomyPicker allowMultipleSelections={false}
                        placeholder="Selecciona una opcion"
                        termsetNameOrID="a4da7450-f8c6-4352-86fa-754e2dcd4b52"
                        panelTitle="Selecciona una Ciudad"
                        label="Ciudad"
                        context={context as any}
                        onChange={onServicePickerCiudadChange}
                        isTermSetSelectable={false} />
                    <TaxonomyPicker allowMultipleSelections={true}
                        placeholder="Selecciona una opcion"
                        termsetNameOrID="b99a43de-59e8-4876-9ba4-572d9cc59ab6"
                        panelTitle="Selecciona un Ambito"
                        label="Ambito"
                        context={context as any}
                        onChange={onServicePickerAmbitoChange}
                        isTermSetSelectable={true} /> */}
                </div>
            </div>
            <div style={{ display: visible === false ? "none" : "", boxShadow: "10px 10px 10px black", backgroundColor: "yellow", padding: "10px" }}>
                <div>
                    {messageErrors.map((e: string) =>
                        <p>{e}</p>
                    )}
                </div>
            </div>
        </>
    );
};
export default CreateGrupo;