import React from 'react'
import {Box, Typography} from '@mui/material'
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
export const NavBar = () => {
  return (
    <>
    <Box sx={{height:  { xs:'50px',sm: '50px', md:'80px', lg: '100px' },width: '100%',display: 'flex',justifyContent: 'center',alignItems: 'center',bgcolor: 'rgb(116, 183, 87)',}}>
        <Box sx={{height: '100px',display: 'flex',justifyContent:'center',alignItems: 'center',}}>
            <AssignmentTwoToneIcon  sx={{fontSize: { xs: 30, sm: 40, md: 50 },color:'white'}}/>
            <Typography variant="overline" sx={{fontSize: { xs: '12px', sm: '15px', md: '15px', lg: '20px' },color: 'rgb(74, 74, 74)',fontWeight: 'bold',textAlign: 'center',flex: 1,ml: 1,}}>
            Simple Task Manager Web App
            </Typography>
        </Box>
    </Box>

    </>
  )
}
