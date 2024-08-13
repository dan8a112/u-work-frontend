import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";

export function CrudForm({open, handleClose, path, name, label}){
    
    const validations = {
      [name]: { required: true }
    };
  
    const { errors, validateForm } = useFormValidation(validations);

    const [formValues, setFormValues] = useState({
        [name]: ""
      });
  
    const handleChange = (e)=>{
      const { name, value } = e.target;
      setFormValues({
          ...formValues,
          [name] : value
      });
    }

    const handleSubmit = () => {
        try {
            if(validateForm(formValues)){
                const res = axios.post(
                    `http://localhost:5001/api/${path}`,
                    formValues
                  );
                  console.log(res.data);
            }
        } catch (error) {
          console.log(error);
        }
    };

    const handleSubmitTemporal = ()=>{
        if(validateForm(formValues)){
            console.log(formValues);
        }
    }

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

        <DialogContent id="alert-dialog-description" sx={{width:"400px"}}>
            <Box sx={{p:1}}>
                    <TextField
                sx={{ width: "100%" }}
                type="text"
                label={label}
                placeholder={label}
                name={name}
                value={formValues[name]}
                onChange={handleChange}
                error={!!errors[name]}
                helperText={errors[name]}
                />
            </Box>
        </DialogContent>
        
        <DialogActions>
            <Button size="medium" onClick={handleClose}>Cerrar</Button>
            <Button variant="contained" size="medium" onClick={handleSubmitTemporal}>Agregar</Button>
        </DialogActions>
      </Dialog>
    );
}
