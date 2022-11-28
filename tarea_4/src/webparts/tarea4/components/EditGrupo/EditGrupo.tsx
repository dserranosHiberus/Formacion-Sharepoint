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



function EditGrupo() {

    const navigate = useNavigate()

    const { groupId } = useParams()
    const [groupSelected, setGroupSelected] = useState<IGrupos>()
    const [sectors, setSectors] = useState<IDropdownOption[]>([])
    const [groupTypes, setGroupTypes] = useState<IDropdownOption[]>([])
    const [themes, setThemes] = useState<IDropdownOption[]>([])

    const [formField, setFormFields] = useState<IFormFields>({
        SectorAsociadoId: "",
        Denominacion: "",
        Descripcion: "",
        CodigoDeGrupo: "",
        FechaDeCreacion: new Date(),
        FechaDeFinalizacion: new Date(),
        Estado: false,
        TipoDeGrupo: "",
        Tematica: "",
    })

    const updateGroup = async () => {

        // let newFormFieldList: IFormFields[] = validates.checkFieldsEdit(formField, groupSelected)

        if (formField.SectorAsociadoId == null) { setFormFields({ ...formField, SectorAsociadoId: groupSelected?.SectorAsociadoId }) }
        if (formField.Denominacion == null) { setFormFields({ ...formField, Denominacion: groupSelected?.Denominacion }) }
        if (formField.Descripcion == null) { setFormFields({ ...formField, Descripcion: groupSelected?.Descripcion }) }
        if (formField.CodigoDeGrupo == null) { setFormFields({ ...formField, CodigoDeGrupo: groupSelected?.CodigoDeGrupo }) }
        if (formField.FechaDeCreacion == null) { setFormFields({ ...formField, FechaDeCreacion: new Date(groupSelected?.FechaDeCreacion) }) }
        if (formField.FechaDeFinalizacion == null) { setFormFields({ ...formField, FechaDeFinalizacion: new Date(groupSelected?.FechaDeFinalizacion) }) }
        if (formField.Estado == null) { setFormFields({ ...formField, Estado: groupSelected?.Estado }) }
        if (formField.TipoDeGrupo == null) { setFormFields({ ...formField, TipoDeGrupo: groupSelected?.TipoDeGrupo }) }
        if (formField.Tematica == null) { setFormFields({ ...formField, Tematica: groupSelected?.Tematica }) }


        let messageError = validates.checkFieldsCreate(formField)
        console.log(messageError)
        if (!messageError || messageError.length == 0) {

            await gruposService.updateGroup(formField, parseInt(groupId))
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
            alert(messageError)
        }
    }



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
            // console.log("Sectores", callSectors)
        }
        const getTipoDeGrupos = async () => {
            let callGroupTypes: IDropdownOption[] = await gruposService.getGroupTypes()
            setGroupTypes(callGroupTypes)
            // console.log("Tipo de Grupos", callGroupTypes)
        }
        const getThemes = async () => {
            let callThematics: IDropdownOption[] = await gruposService.getThematic()
            setThemes(callThematics)
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
    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 300 },
    };

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
                    <TextField
                        placeholder={groupSelected?.CodigoDeGrupo}
                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => setFormFields({ ...formField, CodigoDeGrupo: newValue })}
                        label="Codigo De Grupo" />
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
                        firstDayOfWeek={DayOfWeek.Monday}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                    <DatePicker
                        onSelectDate={(date: Date) => setFormFields({ ...formField, FechaDeFinalizacion: date })}
                        placeholder={groupSelected?.FechaDeFinalizacion}
                        label="Fecha de Finalización"
                        firstDayOfWeek={DayOfWeek.Monday}
                        ariaLabel="Select a date"
                        strings={defaultDatePickerStrings}
                    />
                </Stack>

                <Stack {...columnProps}>
                    <Stack horizontal horizontalAlign={'end'} {...columnProps}>
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Modificar Datos" onClick={() => updateGroup()} allowDisabledFocus />
                        <PrimaryButton style={{ maxWidth: "100px" }} text="Borrar Grupo" onClick={() => deleteGroup()} allowDisabledFocus />
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
                </Stack>
            </Stack>
        </>
    );
};
export default EditGrupo;

