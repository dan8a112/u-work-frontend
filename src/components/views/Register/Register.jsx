import { useTheme } from "@emotion/react";
                <MenuItem value={10}>Ten</MenuItem>
import { Container, StepLabel, Stepper, Typography, Step, Box, Button, MenuItem} from "@mui/material";
import { useState } from "react";
import { getStepContent } from "./Steps";

const steps = ['Datos Personales', 'Cuenta', 'Step 3'];

export function Register(){

    const [activeStep, setActiveStep] = useState(0);

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
      numeroTelefono: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
    };
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setFormValues({
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
        numeroTelefono: ''
      });
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
              {getStepContent(activeStep, handleChange, formValues)}
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