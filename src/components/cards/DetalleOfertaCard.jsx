import { Container, Typography } from "@mui/material";

export function DetalleOfertaCard({ title, children, backgroundColor }) {
  return (
    <Container 
      sx={{
        padding: "20px", 
        backgroundColor: backgroundColor || "#ffffff", 
        mb: "20px"
      }}
    >
      <Typography sx={{ fontSize: "1.2rem", fontWeight: "500", color: "#49454F" }}>
        {title}
      </Typography>
      <div style={{ width: "60%", backgroundColor: "#49454F", height: "1px", marginBottom: "20px" }}></div>
      {children}
    </Container>
  );
}
