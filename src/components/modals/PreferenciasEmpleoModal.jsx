import { Delete, Work } from "@mui/icons-material";
import { Dialog, FormControlLabel, FormGroup, Switch, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, ListItemIcon, Autocomplete, TextField} from "@mui/material";
import { useState } from "react";

export function PreferenciasEmpleoModal({open, handleClose}){

    const [preferences, setPreferences] = useState({
        puestos: [1],
        modalidades: [1],
        contratos: [1]
    });

    const [openSearch, setOpenSearch] = useState(false);

    const preferencesResponse = {
        puestos: [
            {
                id: 1,
                label: "Desarrollador web"
            },
            {
                id: 2,
                label: "Database manager"
            }
        ],
        modalidades: [
            {
                id: 1,
                nombre: "En remoto"
            },
            {
                id: 2,
                nombre: "Presencial"
            }
        ],
        contratos: [
            {
                id: 1,
                nombre: "Medio tiempo"
            }
        ]
    }


    /**
     * Valida si la preferencia (idPreferencia) existe en las preferencias del usuario
     * @param {*} id 
     * @param {*} preference 
     * @returns 
     */
    const isOptionExist = (id, preference)=>{
        switch (preference) {
            case "puestos":
                return preferences.puestos.includes(id);
            case "modalidades":
                return preferences.modalidades.includes(id);
            case "contratos":
                return preferences.contratos.includes(id);
            default:
                break;
        }
    }

    const handleChange = (e, preference) => {
        const { checked, name } = e.target;
        const id = preferencesResponse[preference].find(item => item.nombre === name).id;

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

    return (
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
              options={preferencesResponse.puestos}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event,newValue)=>{newValue && handlePuestosChange(newValue.id)}}
              sx={{ width: 300, mt:2}}
              renderInput={(params) => <TextField
                {...params} label="Puestos" />}
            /> : <Button onClick={()=>{setOpenSearch(true)}}>Agregar Puestos</Button>}
            
            <List dense={false}>
              {preferencesResponse.puestos.map((value, index) => isOptionExist(value.id, "puestos") &&
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
              {preferencesResponse.modalidades.map((value, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Switch
                      checked={isOptionExist(value.id, "modalidades")}
                      onChange={(e) => handleChange(e, "modalidades")}
                      name={value.nombre}
                    />
                  }
                  label={value.nombre}
                />
              ))}
            </FormGroup>
            <Typography sx={{ fontWeight: "500", mt: 2 }}>
              Tipo de contratos
            </Typography>
            <FormGroup>
              {preferencesResponse.contratos.map((value, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Switch
                      checked={isOptionExist(value.id, "contratos")}
                      onChange={(e) => handleChange(e, "contratos")}
                      name={value.nombre}
                    />
                  }
                  label={value.nombre}
                />
              ))}
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button onClick={handleClose} autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    );
}