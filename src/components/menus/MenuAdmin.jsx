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


export function MenuAdmin({menuItems, saveMenuItemState}){
    const [buttonSelected, setButtonSelected] = React.useState(null);

    const handleMenuItemClick = (buttonClick) => {
      setButtonSelected(buttonClick);
      saveMenuItemState(buttonClick);
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
