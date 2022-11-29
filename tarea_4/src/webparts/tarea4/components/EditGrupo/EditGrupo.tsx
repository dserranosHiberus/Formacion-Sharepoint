import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { IGrupos, IFormFields } from '../../models/Interfaces';

import { sectoresService } from '../../services/sectoresService';
import { gruposService } from "../../services/gruposService";
import { validates } from '../../services/validates';

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

const EditGrupo = () => {

    const navigate = useNavigate()

    const [visible, setVisible] = useState(false)
    const [messageErrors, setMessageErrors] = useState<any[]>([])

    const { groupId } = useParams()
    const [groupSelected, setGroupSelected] = useState<IGrupos>()
    const [sectors, setSectors] = useState<IDropdownOption[]>([])
    const [groupTypes, setGroupTypes] = useState<IDropdownOption[]>([])
    const [themes, setThemes] = useState<IDropdownOption[]>([])

    const [formFields, setFormFields] = useState<IFormFields>({
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

    // *****FUNCION ACTUALIZAR GRUPO******
    const updateGroup = async () => {
        console.log(formFields)
        let newFormFieldList: IFormFields = await validates.completeForm(formFields, groupSelected)
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
            await gruposService.updateGroup(formFields, parseInt(groupId))
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
            await gruposService.deleteGroup(parseInt(groupId))
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
            let callGroupSelected: IGrupos = await gruposService.readGroupSelect(parseInt(groupId))
            setGroupSelected(callGroupSelected)
        }
        const getSectores = async () => {
            let callSectors: IDropdownOption[] = await sectoresService.getSectorDenomination()
            setSectors(callSectors)
        }
        const getTipoDeGrupos = async () => {
            let callGroupTypes: IDropdownOption[] = await gruposService.getGroupTypes()
            setGroupTypes(callGroupTypes)
        }
        const getThemes = async () => {
            let callThematics: IDropdownOption[] = await gruposService.getThematic()
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

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
                    <Stack horizontal horizontalAlign={'end'} {...columnProps}>
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

