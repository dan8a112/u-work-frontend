import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function CrudContainer({info, keys, buttonAction, name}){

    return(
        <Box sx={{position:"relative",p: 3}}>
            <Typography fontWeight="500" fontSize="20px" sx={{mb:'20px'}}>{name}</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell sx={{fontSize:"1rem"}}>ID</TableCell>
                    <TableCell sx={{fontSize:"1rem"}}>Nombre</TableCell>
                    {keys.length>2 && <TableCell sx={{fontSize:"1rem"}}>ID Padre</TableCell>}
                    <TableCell sx={{fontSize:"1rem"}} align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {info.map((row) => (
                    <TableRow
                        key={row[keys[0]]}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" sx={{fontSize:"1rem"}}>
                            {row[keys[0]]}
                        </TableCell>
                        <TableCell sx={{fontSize:"1rem"}}>{row[keys[1]]}</TableCell>
                        {keys.length>2 && <TableCell sx={{fontSize:"1rem"}}>{row[keys[2]]}</TableCell>}
                        <TableCell sx={{fontSize:"1rem"}} align="right">
                        <IconButton sx={{mr:1, bgcolor:"#B3261E15"}}>
                            <Delete color="error"></Delete>
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" sx={{position:"absolute", top:"20px", right:"20px"}} onClick={buttonAction}>Agregar</Button>
        </Box>
    );
}