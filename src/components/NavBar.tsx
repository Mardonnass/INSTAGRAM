"use client"; // Mark this as a Client Component

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          switch (newValue) {
            case 0: router.push('/'); break; // Home
            case 1: router.push('/profil'); break; // Profile
            case 2: router.push('/prispevok'); break; // Post
            case 3: router.push('/auth/registracia'); break; // Sign Up
            case 4: router.push('/auth/prihlasenie'); break; // Log In
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="Post" icon={<AddBoxIcon />} />
        <BottomNavigationAction label="Sign Up" icon={<PersonAddIcon />} />
        <BottomNavigationAction label="Log In" icon={<LoginIcon />} />
      </BottomNavigation>
    </Box>
  );
}




// import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// const Navbar = () => {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <IconButton edge="start" color="inherit" aria-label="menu">
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h6" style={{ flexGrow: 1 }}>
//           App Name
//         </Typography>
//         <Button color="inherit">Login</Button>
//       </Toolbar>
//     </AppBar>
//   );
// };