import * as React from 'react';
import { Box, Container, Divider, Drawer, Typography } from "@mui/material";
import { styled } from '@mui/system';

const OffersType = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    cursor: "pointer",
    borderBottom: "1px solid #e8e8e8"
  }));

  const menuItems = [
    {
        key: 1,
        text: "Generos"
    },
    {
        key: 2,
        text: "Formaciones Profesionales"
    },
    {
        key: 3,
        text: "Niveles Academicos"
    },
    {
        key: 4,
        text: "Modalidades"
    },
    {
        key: 5,
        text: "Contratos"
    },
    {
        key: 6,
        text: "Industrias"
    },
    {
        key: 7,
        text: "Idiomas"
    },
    {
        key: 8,
        text: "Condiciones Medicas"
    },
    {
        key: 9,
        text: "Tipos de seguros"
    },
    {
        key: 10,
        text: "Estados Civil"
    },
    {
        key: 11,
        text: "Parentezcos"
    },
    {
        key: 12,
        text: "Puestos"
    },
    {
        key: 13,
        text: "Tipos de Empleo"
    },
    {
        key: 14,
        text: "Niveles de idioma"
    },
    {
        key: 15,
        text: "Lugares"
    },
    {
        key: 16,
        text: "Tipos de lugar"
    }
    ]

export function MenuAdmin(){
    const [buttonSelected, setButtonSelected] = React.useState(null);

    const handleMenuItemClick = (buttonClick) => {
      setButtonSelected(buttonClick);
    };
    return (
        <>
            <Box sx={{ marginTop: 2 }}>
                <Typography sx={{ paddingInline: '20px', paddingBottom: 0 }}>
                    Menu
                </Typography>
                <Divider sx={{ width: 250, borderColor: '#000'}} variant="middle" />
            </Box>

            <Box sx={{
                boxSizing: 'border-box',
                width: '90%',
                p: '5% 0',
                overflowY: 'auto',
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
            }}>
                {menuItems.map((item) => (
                    <OffersType
                        onClick={() => handleMenuItemClick(item.key)}
                        sx={{ backgroundColor: buttonSelected === item.key ? "#F1FAF9" : "#fff" }}
                    >
                        <Typography>{item.text}</Typography>
                    </OffersType>
                ))}

                

            </Box>
        </>
    );
}
