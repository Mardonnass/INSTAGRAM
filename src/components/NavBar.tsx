"use client";

import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Avatar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Navbar() {
  const [value, setValue] = React.useState('/');
  const router = useRouter();
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };

  // Non-authenticated navigation paths
  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Registrácia", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
    { label: "Podmienky", value: "/podmienky", icon: <ArticleOutlinedIcon /> },
    { label: "O mne", value: "/o-mne", icon: <InfoIcon /> },
    { label: "GDPR", value: "/gdpr", icon: <GavelOutlinedIcon /> }
  ];

  // Authenticated navigation paths
  const authPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladanie", icon: <SearchIcon /> },
    { label: "Pridať", value: "/pridat", icon: <AddCircleIcon /> },
    { label: "Prispevky", value: "/prispevok", icon: <HomeIcon /> },
    { label: "Notifikacie", value: "/notifikacie", icon: <HomeIcon /> },
    {
      label: "Profil",
      value: "/profil",
      icon: session?.user?.image ? (
        <Avatar 
          alt={session?.user?.name || "User"} 
          src={session?.user?.image || undefined} 
        />
      ) : (
        <Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>
      )
    },
    { label: "Odhlásiť", value: "/auth/odhlasenie", icon: <LogoutIcon /> },
  ];

  // Decide which paths to use based on authentication status
  const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;

  // Theme toggle button
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Box sx={{ width: '100%', position: 'fixed', bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleNavigation}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: theme === 'dark' ? '#1a1a1a' : 'background.paper',
          borderTop: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        {navigationPaths.map((path) => (
          <BottomNavigationAction
            key={path.value}
            label={path.label}
            value={path.value}
            icon={path.icon}
          />
        ))}
      </BottomNavigation>

      {/* Theme Toggle Button */}
      <Box
        sx={{
          position: 'absolute',
          right: '16px',  // Move a bit from the right edge
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,  // Ensure it stays on top of the BottomNavigation
        }}
      >
        <IconButton 
          onClick={handleThemeToggle}
          sx={{
            color: theme === 'dark' ? '#ffffff' : '#000000',
            '&:hover': {
              color: theme === 'dark' ? '#ffffff' : '#000000',
            },
          }}
        >
          {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Box>
  );
}
