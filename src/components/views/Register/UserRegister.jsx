import { Container, StepLabel, Stepper, Typography, Step, Box, Button, MenuItem, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { getStepContent } from "./UserSteps";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { useNavigate } from "react-router-dom";

const steps = ['Datos Personales', 'Cuenta', 'Contacto'];

export function UserRegister({userData, edit}){

  const navigate = useNavigate();

  useEffect(()=>{
    
    if (userData!=null) {
      setFormValues({
        primerNombre: userData.primerNombre,
        segundoNombre: userData.segundoNombre,
        primerApellido: userData.primerApellido,
        segundoApellido: userData.segundoApellido,
        identificacion: userData.identificacion,
        fechaNacimiento: userData.fechaNacimiento.substring(0,10),
        nacionalidad: userData.idLugarNacimiento,
        genero: userData.idGenero,
        estadoCivil: userData.idEstadoCivil,
        correo: userData.correo,
        contrasena: userData.contrasena,
        paisResidencia: userData.idLugarResidencia,
        departamentoResidencia: "",
        municipioResidencia: "",
        titular: userData.titular,
        descripcion: userData.descripcion, 
        numeroTelefono: userData.telefono,
      })
    }
  },[])

  /**
   * MANEJO DE LOS VALIDACIONES. VALORES REQUERIDOS Y PATRONES
   */
  const validations = {
    primerNombre: { required: true },
    primerApellido: { required: true },
    identificacion: {
      required: true,
    },
    fechaNacimiento: { required: true },
    nacionalidad: { required: true },
    genero: { required: true },
    estadoCivil: { required: true },
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
    paisResidencia: { required: true },
    numeroTelefono: {
      required: true,
    },
    titular: {
      required: true,
    },
    descripcion: {
      required: true,
    }
  };

  const { errors, validateForm, resetForm } = useFormValidation(validations);

  /**
   * MANEJO DE LOS VALORES DEL FORMULARIO
   */
  const [formValues, setFormValues] = useState( userData || {
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    identificacion: "",
    fechaNacimiento: "",
    nacionalidad: "",
    genero: "",
    estadoCivil: "",
    correo: "",
    contrasena: "",
    paisResidencia: "",
    departamentoResidencia: "",
    municipioResidencia: "",
    titular:"",
    descripcion:"",
    numeroTelefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //Se destructuran los valores del formulario para poder usarlos en otras partes del codigo
  const {
    primerNombre,
    primerApellido,
    segundoNombre,
    segundoApellido,
    identificacion,
    fechaNacimiento,
    nacionalidad,
    genero,
    estadoCivil,
    correo,
    contrasena,
    paisResidencia,
    departamentoResidencia,
    municipioResidencia,
    titular,
    descripcion,
    numeroTelefono,
  } = formValues;


  /**
   * MANEJO DE LOS PASOS EN EL FORMULARIO
   */
  const [activeStep, setActiveStep] = useState(0);

  const validateSteps = (step) => {
    if (step === 0) {
      //Se hace una copia solo de los elmentos de este paso
      const stepValues = {
        primerNombre,
        primerApellido,
        identificacion,
        fechaNacimiento,
        nacionalidad,
        genero,
        estadoCivil,
      };
      return validateForm(stepValues);
    } else if (step === 1) {
      const stepValues = { correo, contrasena, titular, descripcion };
      return validateForm(stepValues);
    } else if (step === 2) {
      const stepValues = { paisResidencia, numeroTelefono };
      return validateForm(stepValues);
    }
  };

  const handleNext = () => {
    //Antes de pasar al siguiente paso se validan los campos obligatorios y patterns
    if (validateSteps(activeStep)) {
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
        const response = await axios.get("http://localhost:5001/api/SIR/info");
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
    //Se prepara el objeto a enviar con el formado dado por el backend
    const formSubmit = {
      identificacion,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      fechaNacimiento,
      correo,
      contrasena,
      telefono: numeroTelefono,
      fechaNacimiento,
      idLugarResidencia: paisResidencia,
      idLugarNacimiento: nacionalidad,
      idEstadoCivil: estadoCivil,
      idGenero: genero,
      titular,
      descripcion
    };
    //Si se ha elegido departamento o municipio se cambia en el lugar de residencia
    if (departamentoResidencia.length != 0) {
      formSubmit.idLugarResidencia = departamentoResidencia;
      if (municipioResidencia.length != 0) {
        formSubmit.idLugarResidencia = municipioResidencia;
      }
    }

    try {
      if (!edit) {
        const res = axios.post(
          "http://localhost:5001/api/usuario/ingresar",
          formSubmit
        );
        console.log(res.data);
        setSuccessRegister(true);
        setOpenDialog(true);
      }else{
        console.log(formSubmit);

        const res = axios.put(
          "http://localhost:5001/api/actualizarUsuario/7",
          formSubmit
        );
        console.log(res.data);
        setSuccessRegister(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinishForm = ()=>{
    if(!successRegister){
      navigate('/register')
    }
    navigate('/login')
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 2 }}>
        {!edit && 'Registrate'}
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
                    {`Nombre: ${formValues.primerNombre} 
                      ${formValues.segundoNombre} 
                      ${formValues.primerApellido} 
                      ${formValues.segundoApellido}`}
                  </Typography>
                  <Typography variant="body1" component="div">
                    {`Identificacion: ${formValues.identificacion}`}
                  </Typography>
                  <Typography variant="body1" component="div">
                    {`Fecha de nacimiento: ${formValues.fechaNacimiento}`}
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
              {!loading &&
                getStepContent(
                  activeStep,
                  handleChange,
                  formValues,
                  errors,
                  options
                )}
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
                  {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
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