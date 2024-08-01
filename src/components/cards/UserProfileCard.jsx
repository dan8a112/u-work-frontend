import {Card, CardContent, Typography} from '@mui/material';


export function UserProfileCard({userName, description, place, gender}) {
  return (
    <Card
      sx={{
        width: "100%",
        bgcolor: "#F1FAF9",
        textAlign: "center",
        padding: 4,
        height: 380,
        boxShadow: "none",
      }}
    >
      <img src={gender=="Masculino" ? "img/man.png" : "img/woman.png"} style={{ width: "200px" }} />
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: "600" }}>
          {userName}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ fontWeight: "500", mb: 1 }}
        >
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {place}
        </Typography>
      </CardContent>
    </Card>
  );
}