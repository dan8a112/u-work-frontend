import { useState } from "react";
import { CrudContainer } from "../containers/CrudContainer";
import { CrudForm } from "../forms/CrudForm";

const generos = [
    {
        idGenero: 1,
        nombreGenero: "Masculino"
    },
    {
        idGenero: 2,
        nombreGenero: "Femenino"
    },
    {
        idGenero: 3,
        nombreGenero: "Otro"
    }
]

const lugares = [
    {
        idLugar: 1,
        nombreLugar: "Honduras",
        idLugarPadre: ""
    },
    {
        idLugar: 2,
        nombreLugar: "Francisco Morazan",
        idLugarPadre: 1
    },
    {
        idLugar: 3,
        nombreLugar: "El Paraiso",
        idLugarPadre: 1
    }
]


export function Test(){

    const [openForm, setOpenForm] = useState(false);

    const handleOpenForm = ()=>{setOpenForm(true)}
    const handleCloseForm = ()=>{setOpenForm(false)}

    return(
        <>
        <CrudContainer info={lugares} keys={Object.keys(lugares[0])} buttonAction={handleOpenForm}></CrudContainer>
        <CrudForm
        open={openForm}
        handleClose={handleCloseForm}
        name="nombreIdioma"
        label="Idioma"
        ></CrudForm>
        </>
    )
}