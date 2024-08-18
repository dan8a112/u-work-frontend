import * as React from 'react';
import { Box, Container, Drawer, Typography } from "@mui/material";
import { CrudContainer } from "../containers/CrudContainer";
import { CrudForm } from "../forms/CrudForm";
import { MenuAdmin } from '../menus/MenuAdmin';

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
];

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
];

const menuItems = [
  { key: 1, text: "Generos" },
  { key: 2, text: "Formaciones Profesionales" },
  { key: 3, text: "Niveles Academicos" },
  { key: 4, text: "Modalidades" },
  { key: 5, text: "Contratos" },
  { key: 6, text: "Industrias" },
  { key: 7, text: "Idiomas" },
  { key: 8, text: "Condiciones Medicas" },
  { key: 9, text: "Tipos de seguros" },
  { key: 10, text: "Estados Civil" },
  { key: 11, text: "Parentezcos" },
  { key: 12, text: "Puestos" },
  { key: 13, text: "Tipos de Empleo" },
  { key: 14, text: "Niveles de idioma" },
  { key: 15, text: "Lugares" },
  { key: 16, text: "Tipos de lugar" }
];

export function HomeAdmin() {
    const [openForm, setOpenForm] = React.useState(false);
    const [clickButton, setClickButton] = React.useState(null);

    const handleOpenForm = () => { setOpenForm(true); };
    const handleCloseForm = () => { setOpenForm(false); };

    const handleClickButton = (key) => {
        setClickButton(menuItems.find(item => item.key === key).text);
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: "#F1FAF9", minHeight: '100vh' }}>
            <Drawer
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                        marginTop: 13,
                        marginLeft: 3,
                        display: 'flex',
                        alignItems: 'center',
                        height: '80%',
                        border: '7px solid white',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <MenuAdmin menuItems={menuItems} saveMenuItemState={handleClickButton} />
            </Drawer>

            <Box
                component="main"
                sx={{ flexGrow: 1, marginTop: 11, padding: 2 }}
            >
                <Container maxWidth="md" sx={{ width: "780px" }}>
                {clickButton != null ? (
                <>
                    <CrudContainer info={generos} keys={Object.keys(generos[0])} buttonAction={handleOpenForm} name={clickButton} />
                    <CrudForm
                        open={openForm}
                        handleClose={handleCloseForm}
                        name={clickButton}
                        label={clickButton}
                    />
                </>
                ) : (
                    <Box sx={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', minHeight: '100px' }}>
                        <Typography variant="h4" sx={{ marginBottom: '10px' }}>Hola Usuario Admin</Typography>
                        <Typography variant="body1">Bienvenido al panel de administración. Seleccione una opción del menú para comenzar.</Typography>
                    </Box>

                    
                )}
                </Container>
            </Box>
        </Box>
    );
}
