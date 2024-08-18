import { Card, CardContent, IconButton, Modal, Typography} from '@mui/material';
import { FormacionProfesionalCard } from './UserContentCards/FormacionProfesionalCards';
import { CondicionMedicaCards } from './UserContentCards/CondicionMedicaCards';
import { SegurosCards } from './UserContentCards/SegurosCards';
import { AddCircle } from '@mui/icons-material';
import { IdiomasCards } from './UserContentCards/IdiomasCards';
import { ExperienciaLaboralCard } from './UserContentCards/ExperienciaLaboralCard';
import { FamiliaresCard } from './UserContentCards/FamiliaresCard';
import { useState } from 'react';
import { HistorialAcademicoForm } from '../forms/HistorialAcademicoForm';
import { HistorialMedicoForm } from '../forms/HistorialMedicoForm';
import { SegurosForm } from '../forms/SegurosForms';
import { ExperienciaLaboralForm } from '../forms/ExperienciaLaboralForm';
import { IdiomasForm } from '../forms/IdiomasForm';
import { FamiliaresForm } from '../forms/FamiliaresForm';


function renderComponents(contentType, data, index) {
    switch (contentType) {
        case "academic":
            return(
                <FormacionProfesionalCard
                formacion={data}
                key={index}
              />
            )
        case "medic":
            return(
                <CondicionMedicaCards
                condicionMedica={data}
                key={index}
              />
            )
        case "secure":
          return(
            <SegurosCards 
            seguro={data}
            key={index}
            />
        )
        case "experience":
          return(
            <ExperienciaLaboralCard
              experiencia={data}
              key={index}
            />
          )
        case "languages":
          return(
            <IdiomasCards
              idioma={data}
              key={index}
            />
          )
        case "familiar":
            return(
              <FamiliaresCard
                familiar={data}
                key={index}
              />
            )
        default:
            return "unknown type"
    }
}

function renderForm(contentType, changeData, handleClose) {
  switch (contentType) {
      case "academic":
          return(<HistorialAcademicoForm changeData={changeData} handleClose={handleClose}/>);
      case "medic":
          return(<HistorialMedicoForm/>);
      case "secure":
        return(<SegurosForm/>);
      case "experience":
        return(<ExperienciaLaboralForm/>);
      case "languages":
        return(<IdiomasForm/>);
      case "familiar":
          return(<FamiliaresForm/>)
      default:
          return "unknown type"
  }
}

export function UserContentCard({title, contentType, data, from, changeData}) {

  const[open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <Card
      sx={{
        maxWidth: "100%",
        bgcolor: "#F1FAF9",
        padding: 3,
        my: 5,
        position: "relative",
        boxShadow: "none",
      }}
    >
     {
      from === "user" && (<IconButton
        color="primary"
        size="large"
        onClick={handleOpen}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 50,
          height: 50,
        }}
      >
      <AddCircle sx={{ width: 50, height: 50 }} />
      </IconButton>)
     }
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
        {renderForm(contentType, changeData, handleClose)}
        </>
      </Modal>
      <CardContent>
        <Typography variant="h5" marginBottom="20px" sx={{fontWeight: "500"}}>
          {title}
        </Typography>
        {data.map((value, index) =>
          renderComponents(contentType, value, index)
        )}
      </CardContent>
    </Card>
  );
}