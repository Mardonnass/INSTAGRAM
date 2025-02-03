"use client";

import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signIn } from 'next-auth/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useTheme as useNextTheme } from "next-themes";
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';




export default function SignUp() {
  const { theme } = useNextTheme();
  const router = useRouter();

  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <Paper 
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 2,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Head>
            <title>Prihlasenie | ZoskaGram</title>
          </Head>

          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              color: theme === 'dark' ? '#ffffff' : '#000000'
            }}
          >
            Prihlasenie
          </Typography>

          <Typography 
            variant="body1"
            align="center"
            sx={{ 
              color: theme === 'dark' ? '#ffffff' : '#000000',
              marginBottom: 2,
              fontStyle: 'italic'
            }}
          >
            Tešíme sa, že sa k nám opäť prihlasujete
          </Typography>

          <Button 
            variant="outlined" 
            onClick={() => signIn('google')}
            fullWidth
            sx={{
              height: 48,
              fontSize: '1.1rem',
              color: '#dd4b39',
              borderColor: '#dd4b39',
              '&:hover': {
                backgroundColor: '#dd4b39',
                color: 'white',
                borderColor: '#dd4b39'
              }
            }}
          >
            Sign in with Google
          </Button>

          <Button 
            variant="outlined" 
            onClick={() => signIn('facebook')}
            fullWidth
            sx={{
              height: 48,
              fontSize: '1.1rem',
              color: '#4267B2',
              borderColor: '#4267B2',
              '&:hover': {
                backgroundColor: '#4267B2',
                color: 'white',
                borderColor: '#4267B2'
              }
            }}
          >
            Sign in with Facebook
          </Button>

          <Typography 
            variant="body2"
            sx={{ 
              color: theme === 'dark' ? '#ffffff' : '#000000'
            }}
          >
            Nemáte účet?{' '}
            <Link
              href="/registracia"
              onClick={(e) => {
                e.preventDefault();
                router.push('registracia');
              }}
              sx={{
                color: theme === 'dark' ? '#90caf9' : '#1976d2',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Registrujte sa tu
            </Link>
          </Typography>

        </Stack>
      </Paper>
    </Box>
  );
}