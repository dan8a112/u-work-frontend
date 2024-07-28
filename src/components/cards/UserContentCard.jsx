import { Card, CardContent, Grid, IconButton, Typography} from '@mui/material';
import { FormacionProfesionalCard } from './UserContentCards/FormacionProfesionalCards';
import { AddCircle } from '@mui/icons-material';
import { CondicionMedicaCards } from './UserContentCards/CondicionMedicaCards';


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
            break;
        case "secure":

        break;
        case "experience":

        break;
        case "languajes":

        break;
        case "familiar":

        break;
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
        <Typography variant="h5" marginBottom="20px">
          {title}
        </Typography>
        {data.map((value, index) =>
          renderComponents(contentType, value, index)
        )}
      </CardContent>
    </Card>
  );
}