import * as React from 'react';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, Typography } from "@mui/material";
import { CrudContainer } from "../containers/CrudContainer";
import { CrudForm } from "../forms/CrudForm";
import { MenuAdmin } from '../menus/MenuAdmin';
import axios from 'axios';

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

const nameServices = {
    1: 'genero',
    2: 'formacion-prof',
    3: 'nivel-academico',
    4: 'modalidad',
    5: 'contrato',
    6: 'industria',
    7: 'idioma',
    8: 'condicion-medica',
    9: 'tipo-seguro',
    10: 'estado-civil',
    11: 'parentesco',
    12: 'puesto',
    13: 'tipo-empleo',
    14: 'nivel-idioma',
    15: 'lugar',
    16: 'tipo-lugar'
}

const apiUrl = import.meta.env.VITE_API_URL;

export function HomeAdmin() {

    const [openForm, setOpenForm] = React.useState(false);

    const [openDelete, setOpenDelete] = React.useState(false);

    const [openError, setOpenError] = React.useState(false);

    //id seleccionado para eliminar elemento
    const [selectedDelete, setSelectedDelete] = React.useState(null);

    const [clickButton, setClickButton] = React.useState(null);

    const [elementFetch, setElementFetch] = React.useState(null);

    //Contienen los elementos que se agregan
    const [data, setData] = React.useState(null);

    React.useEffect(()=>{
        const fetchData = async () => {
          try {
            if (elementFetch!=null) {
                const response = await axios.get(
                    `${apiUrl}/api/tablas/mantenimiento/admin/${nameServices[elementFetch]}/mostrar`
                  );
                  setData(response.data);
            }
          } catch (error) {
            console.error(error);
          }
        }

        fetchData();
    }, [elementFetch]);

    const handleOpenForm = () => { setOpenForm(true); };
    const handleCloseForm = () => { setOpenForm(false); };

    const handleClickButton = (key) => {
        setClickButton(menuItems.find(item => item.key === key).text);
        setElementFetch(menuItems.find(item => item.key === key).key);
    };

    const handleDelete = async () =>{
        try {
            const response = await axios.put(
                `${apiUrl}/api/tablas/mantenimiento/admin/${nameServices[elementFetch]}/eliminar/${selectedDelete}`
            );
                //Se encuentra el index en el array de elementos
            const itemDeleted = data.findIndex(item => item[Object.keys(data[0])[0]] === selectedDelete)
                //Se filtran solo los que no tienen ese index  
            setData(data.filter((_, i) => i !== itemDeleted));

            setOpenDelete(false);
          } catch (error) {
            if (error.response.status === 400) {
                setOpenDelete(false);
                setOpenError(true);
            }
          }
    }

    const openDeleteModal = (id)=>{
        setOpenDelete(true);
        setSelectedDelete(id);
    }

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
                {(clickButton&&data) ? (
                <>
                    <CrudContainer info={data} keys={Object.keys(data[0])} buttonAction={handleOpenForm} name={clickButton} deleteAction={openDeleteModal}/>
                    <CrudForm
                        open={openForm}
                        handleClose={handleCloseForm}
                        label={clickButton}
                        path={nameServices[elementFetch]}
                        handleUpdate={setData}
                        keys={Object.keys(data[0])}
                        lastId={data.length}
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

            <Dialog
            open={openDelete}
            onClose={()=>{setOpenDelete(false)}}
            >
                <DialogTitle>Eliminar Oferta</DialogTitle>
                <DialogContent>
                <Typography>Estas a punto de eliminar este elemento, esta accion es irreversible. Estas seguro que quieres continuar?</Typography>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{setOpenDelete(false)}}>Cerrar</Button>
                <Button onClick={handleDelete} color="error">Eliminar</Button>
                </DialogActions>
            </Dialog>

            <Dialog
            open={openError}
            onClose={()=>{setOpenError(false)}}
            >
                <DialogTitle>Eliminar Oferta</DialogTitle>
                <DialogContent>
                <Typography>No se pudo eliminar este registro porque tiene registros en otras tablas que dependen de él.
                     Cambia primero esos registros para poder actualizar</Typography>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{setOpenError(false)}}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
