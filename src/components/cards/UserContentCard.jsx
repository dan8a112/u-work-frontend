import { Card, CardContent, Grid, IconButton, Typography} from '@mui/material';
import { FormacionProfesionalCard } from './UserContentCards/FormacionProfesionalCards';
import { CondicionMedicaCards } from './UserContentCards/CondicionMedicaCards';
import { SegurosCards } from './UserContentCards/SegurosCards';
import { AddCircle } from '@mui/icons-material';
import { IdiomasCards } from './UserContentCards/IdiomasCards';
import { ExperienciaLaboralCard } from './UserContentCards/ExperienciaLaboralCard';
import { FamiliaresCard } from './UserContentCards/FamiliaresCard';


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

export function UserContentCard({title, contentType, data}) {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        bgcolor: "#F1FAF9",
        padding: 3,
        my: 5,
        position: "relative",
        boxShadow: "none"
      }}
    >
      <IconButton
        color="primary"
        size="large"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 50,
          height: 50,
        }}
      >
        <AddCircle sx={{ width: 50, height: 50 }} />
      </IconButton>
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