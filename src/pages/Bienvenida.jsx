import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { GlobalStyles } from '@mui/system';
import Avatar1 from '../assets/avatar1.png';
import Avatar2 from '../assets/avatar2.png';
import Fondo from '../assets/fondo3.jpg';
import MiFuente from '../assets/fonts/edosz.ttf';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Bienvenida() {
  const usuario = Cookies.get('usuario') || 'Usuario';
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/formulario');
  };

  return (
    <>
      {/* Inyectar fuente personalizada */}
      <GlobalStyles
        styles={`
          @font-face {
            font-family: 'MiFuentePersonalizada';
            src: url(${MiFuente}) format('truetype');
            font-weight: normal;
            font-style: normal;
          }
        `}
      />

      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.default',
          backgroundImage: `url(${Fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
        }}
      >
        {/* Capa oscura sobre el fondo para oscurecer */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 0,
          }}
        />

        {/* Imagen izquierda */}
        <Box
          component="img"
          src={Avatar1}
          alt="Avatar 1"
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            height: { xs: '40vh', sm: '60vh', md: '100vh' },
            width: 'auto',
            zIndex: 1,
          }}
        />

        {/* Imagen derecha */}
        <Box
          component="img"
          src={Avatar2}
          alt="Avatar 2"
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            height: { xs: '40vh', sm: '60vh', md: '100vh' },
            width: 'auto',
            zIndex: 1,
          }}
        />

        {/* Texto centrado con fuente personalizada */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '25%', sm: '40%' },
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 2,
            px: 2,
            maxWidth: { xs: '90vw', sm: '70vw', md: '50vw' },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            color="white"
            gutterBottom
            sx={{
              fontFamily: 'MiFuentePersonalizada',
              fontSize: { xs: '2rem', sm: '3.5rem', md: '5rem' },
            }}
          >
            ¡Bienvenido {usuario}!
          </Typography>
          <Typography
            variant="h4"
            component="p"
            color="white"
            gutterBottom
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '2rem' } }}
          >
            Te ayudaremos a que puedas tener una mentalidad fuerte, potente e invencible.
          </Typography>
          <Typography
            variant="h4"
            component="p"
            color="white"
            gutterBottom
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '2rem' },
              fontWeight: 'bold',
            }}
          >
            Una mentalidad ganadora!
          </Typography>

          {/* Botón contenido, pequeño y redondo */}
          <Box
            sx={{
              mt: 3,
              display: 'inline-block',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textTransform: 'none',
                minWidth: '160px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Ir al Formulario
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
