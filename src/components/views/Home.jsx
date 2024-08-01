import { useTheme } from "@emotion/react";
import DenseAppBar from "../headers/DenseAppBar";
import LoginCard from "../cards/LoginCard";
import ResponsiveAppBar from "../headers/HeaderHome";
import { Container, Box } from "@mui/material";
import OutlinedCard from "../cards/OfertaCard";  // Importa el nuevo componente
import SearchAndSuggest from "../search/SearchAndSuggest";
import PermanentDrawerLeft from "../search/Containerr";

export function Home() {
  const theme = useTheme();

  return (
    <div>
      <ResponsiveAppBar />
        <PermanentDrawerLeft></PermanentDrawerLeft>
    </div>
  );
}
/**<Container maxWidth="sm" sx={{ backgroundColor: "#F1FAF9" }}>
          <OutlinedCard
            fechaPublicacion="12-12-2012"
            puesto="Ejecutivo de ventas"
            empresa="UNAH Universidad Autonoma de Honduras"
            descripcion="Persona encargada de gestionar las ventas de la compania"
          />
          <OutlinedCard
            fechaPublicacion="12-12-2012"
            puesto="Ejecutivo de ventas"
            empresa="UNAH Universidad Autonoma de Honduras"
            descripcion="Persona encargada de gestionar las ventas de la compania"
          />
          <OutlinedCard
            fechaPublicacion="12-12-2012"
            puesto="Ejecutivo de ventas"
            empresa="UNAH Universidad Autonoma de Honduras"
            descripcion="Persona encargada de gestionar las ventas de la compania"
          />
          <OutlinedCard
            fechaPublicacion="12-12-2012"
            puesto="Ejecutivo de ventas"
            empresa="UNAH Universidad Autonoma de Honduras"
            descripcion="Persona encargada de gestionar las ventas de la compania"
          />
        </Container> */