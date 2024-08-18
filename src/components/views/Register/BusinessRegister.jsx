import { Container, StepLabel, Stepper, Typography, Step, Box, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent} from "@mui/material";
import { useEffect, useState } from "react";
import { getStepContent } from "./BussinessSteps";
import { useFormValidation } from "../../../hooks/useFormValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const steps = ['Cuenta', 'Empresa', 'Director'];

const apiUrl = import.meta.env.VITE_API_URL;

export function BussinesRegister(){

  //Para hacer navegaciones de react router
  const navigate = useNavigate();


  /**
   * MANEJO DE LOS VALIDACIONES. VALORES REQUERIDOS Y PATRONES
   */
  const validations = {
    nombre: { required: true },
    industria: { required: true },
    pais: { required: true },
    sitioWeb: { required: true },
    numeroTelefono: { required: true },
    correo: {
      required: true,
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "El correo debe tener el formato correcto",
      },
    },
    contrasena: {
      required: true,
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
        message:
          "Por favor ingresa una contraseña que tenga los siguientes atributos: " +
          "Al menos 8 caracteres de longitud. Al menos una letra mayúscula. Al menos una letra minúscula. " +
          "Al menos un número. Al menos un carácter especial (como @, #, $, %, etc.).",
      },
    },
    primerNombre: { required: true },
    primerApellido: { required: true },
    telefonoContacto: { required: true },
    identificacion: { required: true },
    genero: { required: true },
  };

  //Hook de validaciones (hook personalizado)
  const { errors, validateForm, resetForm } = useFormValidation(validations);


  /**
   * MANEJO DE LOS VALORES DEL FORMULARIO
   */
  const [formValues, setFormValues] = useState({
    nombre: "",
    industria: "",
    pais: "",
    sitioWeb: "",
    numeroTelefono: "",
    correo: "",
    contrasena: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    telefonoContacto: "",
    identificacion: "",
    genero: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //Se destructuran los valores del formulario para poderlos utilizar en otra parte
  const {
    nombre,
    industria,
    pais,
    sitioWeb,
    numeroTelefono,
    correo,
    contrasena,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    telefonoContacto,
    identificacion,
    genero
  } = formValues;


  /**
   * MANEJO DE LOS PASOS EN EL FORMULARIO
   */
  const [activeStep, setActiveStep] = useState(0);

  const validateSteps = (step) => {
    let stepValues = {};
    if (step === 0) {
      //Se hace una copia solo de los elmentos de este paso
      stepValues = {
        nombre,
        industria,
        pais,
        sitioWeb,
        numeroTelefono,
      };
      return validateForm(stepValues);
    } else if (step === 1) {
      stepValues = { correo, contrasena };
      return validateForm(stepValues);
    } else if (step === 2) {
      stepValues = {
        primerNombre,
        primerApellido,
        telefonoContacto,
        identificacion,
        genero,
      };
      return validateForm(stepValues);
    }
  };

  const handleNext = () => {
    if(validateSteps(activeStep)){
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    resetForm();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /**
   * FETCH PARA TRAER OPCIONES (campos options)
   */

  //Los datos de los elementos options del formulario de registro
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/SIR/info`);
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * SUBMIT DE FORMULARIO
   */
  const [successRegister, setSuccessRegister] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmitForm = () => {
    //Se prepara el objeto para que las variables hagan matching con el backend
    const formSubmit = {
      nombreEmpresa: nombre,
      correoEmpresa: correo,
      contrasena,
      telefonoEmpresa: numeroTelefono,
      idDireccionPais: pais,
      idIndustria: industria,
      sitioWeb,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      telefonoPersona: telefonoContacto,
      identificacion,
      idGenero: genero
    };
    try {
      const res = axios.post(
        `${apiUrl}/api/empresa/ingresar`,
        formSubmit
      );
      console.log(res.data);
      setSuccessRegister(true);
      setOpenDialog(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinishForm = ()=>{
    if(!successRegister){
      navigate('/registerBussiness')
    }
    navigate('/login')
  }


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Registra tu empresa
      </Typography>
      <Box sx={{ width: "100%" }}>
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
            <Typography variant="h6">Datos Generales</Typography>
            <Typography variant="body2" marginBottom={2}>
              Asegurate que los datos que ingresaste sean correctos, si es
              asi, procede a registrarte
            </Typography>
            <Card sx={{ minWidth: 275, mb: 2 }}>
              <CardContent>
                <Typography variant="body1" component="div">
                  {`Nombre de la empresa : ${formValues.nombre}`}
                </Typography>
                <Typography variant="body1" component="div">
                  {`Correo de Empresa: ${formValues.correo}`}
                </Typography>
                <Typography variant="body1" component="div">
                  {`telefono de Empresa: ${formValues.numeroTelefono}`}
                </Typography>
                <Typography variant="body1" component="div">
                  {`Nombre Director: ${formValues.primerNombre} 
                    ${formValues.segundoNombre} 
                    ${formValues.primerApellido} 
                    ${formValues.segundoApellido}`}
                </Typography>
              </CardContent>
            </Card>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button variant="contained" onClick={handleSubmitForm}>
              Registrar
            </Button>
          </Box>
          ) : (
            <Box>
              {!loading && getStepContent(activeStep, handleChange, formValues, errors, options)}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Dialog open={openDialog}>
        <DialogTitle>Registro de usuario</DialogTitle>
        <DialogContent>
          {successRegister
            ? "El registro ha sido exitoso"
            : "Algo salio mal con el registro"}
        </DialogContent>
        <DialogActions>
          {successRegister ? (
            <Button onClick={handleFinishForm}>Ir a Iniciar Sesion</Button>
          ) : (
            <Button onClick={handleFinishForm} color="inherit">Empezar de nuevo</Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}