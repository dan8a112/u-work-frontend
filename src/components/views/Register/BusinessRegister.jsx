import { useTheme } from "@emotion/react";
import { Container, StepLabel, Stepper, Typography, Step, Box, Button, MenuItem} from "@mui/material";
import { useState } from "react";
import { getStepContent } from "./BussinessSteps";
import { useFormValidation } from "../../../hooks/useFormValidation";

const steps = ['Cuenta', 'Empresa', 'Director'];

export function BussinesRegister(){

    const validations = {
      nombre: {required: true},
      industria: {required: true},
      pais: {required: true},
      sitioWeb: {required: true},
      numeroTelefono: {required: true},
      correo: {
        required: true, 
        pattern: {value:/\S+@\S+\.\S+/, message:"El correo debe tener el formato correcto"}
      },
      contrasena: {
        required: true, 
        pattern: {value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/, message:"Por favor ingresa una contraseña que tenga los siguientes atributos: " + 
                              "Al menos 8 caracteres de longitud. Al menos una letra mayúscula. Al menos una letra minúscula. "+
                              "Al menos un número. Al menos un carácter especial (como @, #, $, %, etc.)."}
      },
      primerNombre: {required: true},
      primerApellido: {required: true},
      telefonoContacto: {required: true},
      identificacion: {required: true},
      genero: {required: true}
    }

    const [formValues, setFormValues] = useState({
        nombre: "",
        industria: "",
        pais: "",
        sitioWeb: "",
        numeroTelefono: "",
        correo: "",
        contrasena: "",
        director: {
          primerNombre: "",
          segundoNombre: "",
          primerApellido: "",
          segundoApellido: "",
          telefonoContacto: "",
          identificacion: "",
          genero: ""
        }
    });

    const [activeStep, setActiveStep] = useState(0);

    const {errors, validateForm, resetForm} = useFormValidation(validations)

    //Se destructuran los valores del formulario
    const{
        nombre,
        industria,
        pais,
        sitioWeb,
        numeroTelefono,
        correo,
        contrasena,
        director: {
          primerNombre,
          primerApellido,
          telefonoContacto,
          identificacion,
          genero
        }
    } = formValues

    const validateSteps = (step) =>{
      let stepValues = {};
      if (step === 0) {
        //Se hace una copia solo de los elmentos de este paso
        stepValues = {
          nombre,
          industria,
          pais,
          sitioWeb,
          numeroTelefono
        };
        return validateForm(stepValues);
      }else if (step ===1) {
        stepValues = {correo, contrasena};
        return validateForm(stepValues);
      }else if (step === 2){
        stepValues = {
          primerNombre,
          primerApellido,
          telefonoContacto,
          identificacion,
          genero
        };
        return validateForm(stepValues);
      }
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
    };
  
    const handleNext = () => {
      //if(validateSteps(activeStep)){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        //resetForm();
      //}
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    return (
        <Container maxWidth="sm">
        <Typography variant="h4" sx={{mb:2}}>Registra tu empresa</Typography>
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2, mb: 2 }}>
          {activeStep === steps.length ? (
            <Box>
              <Typography>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          ) : (
            <Box>
              {getStepContent(activeStep, handleChange, formValues, errors)}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
    );
}