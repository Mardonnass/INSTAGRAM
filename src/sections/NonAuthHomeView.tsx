// src/app/(public)/gdpr/GDPRContent.tsx

"use client"; // Ensure this is a Client Component

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from 'next/navigation';


export default function GDPRContent() {
  const { theme } = useNextTheme();
  const router = useRouter();

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: 3
    }}>
      <Paper 
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 2,
          width: '100%',
          maxWidth: 800,
        }}
      >
        <Typography 
          variant="h3" 
          gutterBottom 
          align="center"
          sx={{ 
            color: theme === 'dark' ? '#ffffff' : '#000000',
            marginBottom: 4
          }}
        >
          Vitajte na stránke ZoskaGram
        </Typography>

        <Typography 
          variant="subtitle1" 
          paragraph
          sx={{ 
            color: theme === 'dark' ? '#ffffff' : '#000000',
            marginBottom: 2
          }}
        >
          Prezrite si rôzne príspevky od vašich spolužiakov, učiteľov či dokoca pána riaditeľa.
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography 
          variant="body2" 
          align="center"
          sx={{ 
            color: theme === 'dark' ? '#9e9e9e' : '#666666',
            fontStyle: 'italic'
          }}
        >
          Neprihlásený požívateľ, prihláste sa {' '}
          <Box
            component="span"
            onClick={() => router.push('/auth/prihlasenie')}
            sx={{
              color: theme === 'dark' ? '#90caf9' : '#1976d2',
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': {
                color: theme === 'dark' ? '#64b5f6' : '#1565c0',
              }
            }}
          >
            tu
          </Box>
          .
        </Typography>
      </Paper>
      
    </Box>
  );
}