import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export function CrudForm({open, handleClose, path,label, handleUpdate, keys, lastId}){

    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            const res = axios.post(
              `${apiUrl}/api/tablas/mantenimiento/admin/${path}/ingresar/${value}`
            );
            handleUpdate(prevState => {
              const newItem = {
                [keys[0]]: lastId+1, 
                [keys[1]]: value,
              }
  
              return [...prevState, newItem];
            })
            handleClose();
            setValue("");
        } catch (error) {
          console.log(error);
        }
    };

    return (
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Agrega un nuevo {label}
        </DialogTitle>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <DialogContent id="alert-dialog-description" sx={{width:"400px"}}>
              <Box sx={{p:1}}>
                      <TextField
                  sx={{ width: "100%" }}
                  type="text"
                  label={label}
                  placeholder={label}
                  value={value}
                  onChange={(e)=>{setValue(e.target.value)}}
                  required
                  />
              </Box>
          </DialogContent>
          
          <DialogActions>
              <Button size="medium" onClick={handleClose}>Cerrar</Button>
              <Button variant="contained" size="medium" type="submit">Agregar</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
}
