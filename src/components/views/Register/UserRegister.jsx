import { Container, StepLabel, Stepper, Typography, Step, Box, Button, MenuItem} from "@mui/material";
import { useState } from "react";
import { getStepContent } from "./UserSteps";
import { useFormValidation } from "../../../hooks/useFormValidation";

const steps = ['Datos Personales', 'Cuenta', 'Contacto'];

export function UserRegister(){

    const [activeStep, setActiveStep] = useState(0);
    
    const validations = {
      primerNombre: {required: true},
      primerApellido: {required: true},
      identificacion: {
        required: true
      },
      fechaNacimiento: {required: true},
      nacionalidad: {required: true},
      genero: {required: true},
      estadoCivil: {required: true},
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
      lugarResidencia: {required: true},
      numeroTelefono: {
        required: true
      }
    }

    const [formValues, setFormValues] = useState({
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      identificacion: '',
      fechaNacimiento: '',
      nacionalidad: '',
      genero: '',
      estadoCivil: '',
      correo: '',
      contrasena: '',
      lugarResidencia: '',
      direccion: '',
      numeroTelefono: ''
    });

    const {errors, validateForm, resetForm} = useFormValidation(validations)

    //Se destructuran los valores del formulario
    const{
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      identificacion,
      fechaNacimiento,
      nacionalidad,
      genero,
      estadoCivil,
      correo,
      contrasena,
      lugarResidencia,
      direccion,
      numeroTelefono
    } = formValues

    const validateSteps = (step) =>{
      if (step === 0) {
        //Se hace una copia solo de los elmentos de este paso
        const stepValues = {
        primerNombre, primerApellido, 
        identificacion, fechaNacimiento, 
        nacionalidad, genero, estadoCivil
        };
        return validateForm(stepValues);
      }else if (step ===1) {
        const stepValues = {correo, contrasena};
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
        <Typography variant="h4" sx={{mb:2}}>Registrate</Typography>
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