import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { SPContext } from './Tarea4';

import { Grupos, FormFields } from '../models/index';

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

const EditGrupo = () => {

    // const { context } = React.useContext(SPContext)
    const navigate = useNavigate()

    const [visible, setVisible] = useState(false)
    const [messageErrors, setMessageErrors] = useState<any[]>([])

    const { groupId } = useParams()
    const [groupSelected, setGroupSelected] = useState<Grupos>()
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
        // Ambito: [],
    })

    // *****FUNCION ACTUALIZAR GRUPO******
    const updateGroup = async () => {
        console.log(formFields)
        let newFormFieldList: FormFields = await validates.completeForm(formFields, groupSelected)
        Object.keys(formFields).forEach(old => {
            Object.keys(newFormFieldList).forEach(nw => {
                if (old === nw) {
                    formFields[old] = newFormFieldList[nw]
                }
            })
        })
        console.log(formFields)

        let messageError = validates.checkFieldsEdit(formFields)
        setMessageErrors(messageError)

        if (!messageError || messageError.length == 0) {
            setVisible(false)
            await tarea4BLL.updateGroup(formFields, parseInt(groupId))
            try {
                alert(`El grupo ${groupId} ha sido actualizado correctamente!`);
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

    // *****FUNCION BORRAR GRUPO*****
    const deleteGroup = async () => {
        let option: boolean = window.confirm("Seguro que quieres eliminar el Grupo???")
        if (option === true) {
            await tarea4BLL.deleteGroup(parseInt(groupId))
            try {
                alert(`El grupo ${groupId} ha sido borrado correctamente!`);
                setTimeout(() => {
                    navigate('/')
                }, 1000)

            } catch (error) {
                alert("Ha surgido un error al borrar el grupo");
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
        } else {
            console.log("Borrado cancelado")
            alert("Se ha cancelado el borrado")
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }

    React.useEffect(() => {
        const getGrupo = async () => {
            let callGroupSelected: Grupos = await tarea4BLL.readGroupSelect(parseInt(groupId))
            setGroupSelected(callGroupSelected)
        }
        const getSectores = async () => {
            let callSectors: IDropdownOption[] = await tarea4BLL.getSectorDenomination()
            setSectors(callSectors)
        }
        const getTipoDeGrupos = async () => {
            let callGroupTypes: IDropdownOption[] = await tarea4BLL.getGroupTypes()
            setGroupTypes(callGroupTypes)
        }
        const getThemes = async () => {
            let callThematics: IDropdownOption[] = await tarea4BLL.getThematic()
            setThemes(callThematics)
        }
        getGrupo();
        getSectores();
        getTipoDeGrupos();
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
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Modificar Datos" onClick={() => updateGroup()} allowDisabledFocus />
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Borrar Grupo" onClick={() => deleteGroup()} allowDisabledFocus />
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
                        placeholder={groupSelected?.CodigoDeGrupo}
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formFields, CodigoDeGrupo: newValue })}
                        label="Codigo De Grupo" />
                    <TextField id={'denominacion'}
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formFields, Denominacion: newValue })}
                        placeholder={groupSelected?.Denominacion} label="Denominación" />
                    <TextField id={'descripcion'}
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formFields, Descripcion: newValue })}
                        placeholder={groupSelected?.Descripcion} label="Descripción" multiline rows={3} />
                    <DatePicker
                        id={'createDate'}
                        onSelectDate={(date: Date) => setFormFields({ ...formFields, FechaDeCreacion: date })}
                        placeholder={groupSelected?.FechaDeCreacion}
                        label="Fecha de Creación"
                        firstDayOfWeek={DayOfWeek.Monday}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        onSelectDate={(date: Date) => setFormFields({ ...formFields, FechaDeFinalizacion: date })}
                        placeholder={groupSelected?.FechaDeFinalizacion}
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
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formFields, TipoDeGrupo: option.text })}
                        placeholder={groupSelected?.TipoDeGrupo}
                        label="Tipo de Grupo"
                        options={groupTypes}
                        styles={dropdownStyles}
                    />
                    <Dropdown
                        onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => setFormFields({ ...formFields, Tematica: option.text })}
                        placeholder={groupSelected?.Tematica}
                        label="Tematica"
                        options={themes}
                        styles={dropdownStyles}
                    />
                    {/* <TaxonomyPicker allowMultipleSelections={false}
                        placeholder={groupSelected?.Pais}
                        termsetNameOrID="9a43e0c6-0ed4-41e3-9f86-253fe641821a"
                        panelTitle="Selecciona un Pais"
                        label="Pais"
                        context={context as any}
                        onChange={onServicePickerPaisChange}
                        isTermSetSelectable={false} />
                    <TaxonomyPicker allowMultipleSelections={false}
                        placeholder={groupSelected?.Ciudad}
                        termsetNameOrID="a4da7450-f8c6-4352-86fa-754e2dcd4b52"
                        panelTitle="Selecciona una Ciudad"
                        label="Ciudad"
                        context={context as any}
                        onChange={onServicePickerCiudadChange}
                        isTermSetSelectable={false} />
                    <TaxonomyPicker allowMultipleSelections={true}
                        placeholder={groupSelected?.Ambito[0]}
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
                    {messageErrors.map((e) =>
                        <p>{e}</p>
                    )}
                </div>
            </div>
        </>
    );
};
export default EditGrupo;

