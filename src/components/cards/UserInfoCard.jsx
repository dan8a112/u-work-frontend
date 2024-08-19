import { Card, CardContent, Typography, Button, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import { PreferenciasEmpleoModal } from '../modals/PreferenciasEmpleoModal';
import { useEffect, useState } from 'react';
import { UserRegister } from '../views/Register/UserRegister';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export function UserInfoCard({ phoneNumber, email, birthdate, from, action, idSolicitud, idOferta }) {

  const [openPreferences, setOpenPreferences] = useState(false);
  const handleOpenPreferences = () => { setOpenPreferences(true) };
  const handleClosePreferences = () => { setOpenPreferences(false) };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => { setOpenEdit(true) };
  const handleCloseEdit = () => { setOpenEdit(false) };

  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura de la modal
  const [modalAction, setModalAction] = useState(''); // Estado para controlar la acción (seleccionar o reclutar)
  const [applicationMessage, setApplicationMessage] = useState(''); // Estado para mensaje de solicitud
  const [description, setDescription] = useState(''); // Estado para la descripción

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleSelectUser = () => {
    setModalAction('select');
    setOpenModal(true);
  }

  const handleRecluteUser = async () => {
    setModalAction('recruit');
    setOpenModal(true);
  }

  const handleModalClose = () => {
    setOpenModal(false);
  }

  const handleConfirmAction = async () => {
    const idSolicitanteP = localStorage.getItem('idPersonaSoli');
    
    if (modalAction === 'recruit') {
      const datosEstado = {
        idSolicitud: idSolicitud,
        idEstado: 3
      };
      try {
        await axios.put(`${apiUrl}/api/solicitudes/cambiar-estado/${idSolicitanteP}`, datosEstado);
        alert("Usuario reclutado con éxito");
      } catch (error) {
        console.error("Error al reclutar usuario:", error);
        alert("Error al reclutar usuario");
      }
    } else if (modalAction === 'select') {
      // Enviar la descripción al backend
      const idEmpresa = localStorage.get('idEmpresa');
      const data = {
        idOferta,
        idSolicitante: idEmpresa,
        idEstadoSolicitud: 1,
        emisorSolicitud: 1,
        descripcion: description
      };
      try {
        await axios.post(`${apiUrl}/api/solicitudes/crear`, data);
        alert("Usuario seleccionado con éxito");
      } catch (error) {
        console.error("Error al seleccionar usuario:", error);
        alert("Error al seleccionar usuario");
      }
    }

    setOpenModal(false);
    setDescription(''); // Limpiar descripción
  }

  useEffect(() => {
    const idApplicant = localStorage.getItem('idPersonaSoli');
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/usuario/obtener/${idApplicant}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [openEdit]);

  const renderActions = () => {
    switch (from) {
      case "user":
        return (
          <>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={handleOpenPreferences}>Preferencias</Button>
            <Button variant="contained" onClick={handleOpenEdit}>Editar Perfil</Button>
          </>
        );
      case "enterprise":
        return (action === "select" ?
          <Button variant="contained" onClick={handleSelectUser}>Seleccionar</Button> :
          <Button variant="contained" onClick={handleRecluteUser}>Reclutar</Button>)
      default:
        break;
    }
  }

  return (
    <Card sx={{ width: "100%", bgcolor: "#F1FAF9", padding: 3, height: 380, boxShadow: "none" }}>
      <CardContent>
        <Typography sx={{ fontWeight: "600", mb: 2 }} variant="h6">Información General</Typography>
        <Typography variant="body1" component="div" sx={{ fontWeight: "600" }}>
          Teléfono
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {phoneNumber}
        </Typography>
        <Typography variant="body1" component="div" sx={{ fontWeight: "600" }}>
          Correo
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {email}
        </Typography>
        <Typography variant="body1" component="div" sx={{ fontWeight: "600" }}>
          Fecha Nacimiento
        </Typography>
        <Typography sx={{ mb: 4 }}>
          {birthdate}
        </Typography>
        <CardActions sx={{ justifyContent: "center" }}>
          {renderActions()}
        </CardActions>
      </CardContent>
      <PreferenciasEmpleoModal open={openPreferences} handleClose={handleClosePreferences} />
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <UserRegister edit={true} userData={userData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {modalAction === 'recruit' ? 'Reclutar Usuario' : 'Seleccionar Usuario'}
        </DialogTitle>
        <DialogContent id="alert-dialog-description" sx={{ width: "600px" }}>
          <Typography sx={{ mb: 2 }}>
            {modalAction === 'recruit' ?
              'Estás a punto de reclutar a este usuario, confirma para proceder...' :
              'Estás a punto de seleccionar a este usuario, proporciona una descripción para completar el proceso...'}
          </Typography>
          {modalAction === 'select' && (
            <Box sx={{ p: 1 }}>
              <TextField
                sx={{ width: "100%" }}
                type="text"
                label="Descripción"
                placeholder="Escribe una descripción..."
                name="description"
                value={description}
                multiline
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
          )}
          {modalAction === 'recruit' && (
            <Box sx={{ p: 1 }}>
              <TextField
                sx={{ width: "100%" }}
                type="text"
                label="Mensaje de solicitud"
                placeholder="Cuéntanos por qué te gustaría aplicar a esta oferta..."
                name="applicationMessage"
                value={applicationMessage}
                multiline
                rows={4}
                onChange={(e) => setApplicationMessage(e.target.value)}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button size="medium" onClick={handleModalClose}>Cerrar</Button>
          <Button
            variant="contained"
            size="medium"
            onClick={handleConfirmAction}
          >
            {modalAction === 'recruit' ? 'Reclutar' : 'Seleccionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
