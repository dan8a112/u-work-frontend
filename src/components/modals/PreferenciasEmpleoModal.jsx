import { Delete, Work } from "@mui/icons-material";
import { Dialog, FormControlLabel, FormGroup, Switch, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, ListItemIcon, Autocomplete, TextField} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export function PreferenciasEmpleoModal({open, handleClose}){

    const [preferences, setPreferences] = useState({
        puestos: [],
        modalidades: [],
        contratos: []
    });

    const [openSearch, setOpenSearch] = useState(false);

    const idApplicant = localStorage.getItem('idPersonaSoli');

    const [preferencesAvailable, setPreferencesAvailable] = useState(null)

    useEffect(()=>{
      const fetchData = async () => {
        try {
          const contratos = await axios.get(
            `${apiUrl}/api/tablas/mantenimiento/admin/contrato/mostrar`
          );
          const puestos = await axios.get(
            `${apiUrl}/api/tablas/mantenimiento/admin/puesto/mostrar`
          );
          const modalidades = await axios.get(
            `${apiUrl}/api/tablas/mantenimiento/admin/modalidad/mostrar`
          );

          const transformedPuestos = puestos.data.map(puesto => ({
            id: puesto.id_puesto,
            label: puesto.puesto
           }));

          setPreferencesAvailable({
            contratos: contratos.data,
            puestos: transformedPuestos,
            modalidades: modalidades.data
          })
        } catch (error) {
          console.error(error);
        }
      }

      const fetchUserPreferences = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/api/solicitante/preferencias/${idApplicant}`
          );
          setDataOnState(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
      fetchUserPreferences();
    },[])


    const setDataOnState = (data) => {

      const {puestos, modalidades, contratos} = data;

      const puestosIds = puestos.map(puesto=>puesto.id)
      const modalidadesIds = modalidades.map(modalidad=>modalidad.id)
      const contratosIds = contratos.map(contrato=>contrato.id)

      setPreferences({
        puestos: puestosIds,
        modalidades: modalidadesIds,
        contratos: contratosIds
      })

    }


    /**
     * Valida si la preferencia (idPreferencia) existe en las preferencias del usuario
     */
    const isOptionExist = (id, preference)=>{
      return preferences[preference].includes(id);
    }

    const handleChange = (e, preference, idName, itemName) => {
        const { checked, name } = e.target;
        const id = preferencesAvailable[preference].find(item => item[itemName] === name)[idName];

        setPreferences(prevState => {
            const newPreferenceArray = checked
                ? [...prevState[preference], id]
                : prevState[preference].filter(item => item !== id);

            return {
                ...prevState,
                [preference]: newPreferenceArray
            };
        });
    };

    const handlePuestosChange = (id)=>{

      setPreferences(prevState => {
        //Se agrega el id al array de puestos
        const newPreferenceArray = [...prevState.puestos, id];

        //Se retorna el objeto con el array de puestos actualizado
        return {
            ...prevState,
            puestos: newPreferenceArray
        };
      });

      setOpenSearch(false);
    }

    const handlePuestosDelete = (id) => {
      setPreferences(prevState => {
        //Se crea un array con todos los ids excepto el que se va a eliminar
          const newPreferenceArray = prevState.puestos.filter(item => item !== id);
          //Se retorna el objeto con el nuevo array
          return {
              ...prevState,
              puestos: newPreferenceArray
          };
      });
    };

    const handleSubmitPreferences = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/api/solicitante/preferencias/act/${idApplicant}`,
          preferences
        );
        if (response.status === 200) {
          handleClose();
          alert("se han actualizado tus preferencias");
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
      preferencesAvailable &&
      <Dialog 
      open={open} 
      onClose={handleClose }         
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
        <DialogTitle>Preferencias de empleo</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "500px" }}>
            <Typography sx={{ fontWeight: "500" }}>Puestos</Typography>
            {openSearch ?<Autocomplete
              disablePortal
              id="combo-box-demo"
              options={preferencesAvailable.puestos}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event,newValue)=>{newValue && handlePuestosChange(newValue.id)}}
              sx={{ width: 300, mt:2}}
              renderInput={(params) => <TextField
                {...params} label="Puestos" />}
            /> : <Button onClick={()=>{setOpenSearch(true)}}>Agregar Puestos</Button>}
            
            <List dense={false}>
              {preferencesAvailable.puestos.map((value, index) => isOptionExist(value.id, "puestos") &&
              <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={()=>handlePuestosDelete(value.id)}>
                  <Delete/>
                </IconButton>
              }
              sx={{ backgroundColor: "#F1FAF9" }}
            >
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText primary={value.label} />
            </ListItem>)}  
            </List>
            <Typography sx={{ fontWeight: "500" }}>
              Modalidades de empleo
            </Typography>
            <FormGroup>
              {preferencesAvailable.modalidades.map((modalidad, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Switch
                      checked={isOptionExist(modalidad.idModalidad, "modalidades")}
                      onChange={(e) => handleChange(e, "modalidades", "idModalidad", "modalidad")}
                      name={modalidad.modalidad}
                    />
                  }
                  label={modalidad.modalidad}
                />
              ))}
            </FormGroup>
            <Typography sx={{ fontWeight: "500", mt: 2 }}>
              Tipo de contratos
            </Typography>
            <FormGroup>
              {preferencesAvailable.contratos.map((contrato, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Switch
                      checked={isOptionExist(contrato.idContrato, "contratos")}
                      onChange={(e) => handleChange(e, "contratos", "idContrato", "contrato")}
                      name={contrato.contrato}
                    />
                  }
                  label={contrato.contrato}
                />
              ))}
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button onClick={handleSubmitPreferences} autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    );
}