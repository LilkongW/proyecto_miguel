import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Fade,
} from '@mui/material';
import Cookies from 'js-cookie';
import Fondo from '../assets/fondo2.jpg';
import Logo from '../assets/logo.png';

export default function Inicio() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [animacionEstado, setAnimacionEstado] = useState('logoFadeIn'); // Estados: logoFadeIn, logoVisible, logoFadeOut, formularioFadeIn
  const [logoVisible, setLogoVisible] = useState(false);
  const [formularioVisible, setFormularioVisible] = useState(false);

  useEffect(() => {
    // Secuencia de animaciones controlada por timeouts
    
    // 1. Inicia con logo haciendo fade in
    const logoFadeInTimer = setTimeout(() => {
      setLogoVisible(true);
      setAnimacionEstado('logoVisible');
    }, 200);
    
    // 2. Mantiene el logo visible por un momento
    const logoVisibleTimer = setTimeout(() => {
      setAnimacionEstado('logoFadeOut');
    }, 2000);
    
    // 3. Hace fade out del logo
    const logoFadeOutTimer = setTimeout(() => {
      setLogoVisible(false);
      setAnimacionEstado('formularioFadeIn');
    }, 3000);
    
    // 4. Hace fade in del formulario
    const formularioFadeInTimer = setTimeout(() => {
      setFormularioVisible(true);
    }, 3500);

    return () => {
      clearTimeout(logoFadeInTimer);
      clearTimeout(logoVisibleTimer);
      clearTimeout(logoFadeOutTimer);
      clearTimeout(formularioFadeInTimer);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario && contrasena) {
      Cookies.set('usuario', usuario, { expires: 1 });
      navigate('/bienvenida');
    } else {
      alert('Por favor completa ambos campos');
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed', // 🔄 Asegura que el fondo siempre cubra la pantalla sin scroll
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden', // 🚫 Evita que los hijos lo estiren
        backgroundImage: `url(${Fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0, // Para que no tape el contenido
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          zIndex: -1, // Asegura que esté debajo del contenido
        },
      }}
    >

      {/* Logo con animación de fade in y fade out */}
      <Fade in={logoVisible} timeout={1000}>
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={Logo} alt="Logo" style={{ maxWidth: '50%', maxHeight: '50%' }} />
        </Box>
      </Fade>

      {/* Formulario con animación de fade in */}
      <Fade in={formularioVisible} timeout={1000}>

        <Paper
          elevation={0}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
            alignContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0)', // completamente transparente
            zIndex: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <img src={Logo} alt="Logo" style={{ maxWidth: '50%', maxHeight: '50%' }} />
          </Box>

          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ color: 'white' }} // ✅ texto blanco
          >
            Iniciar Sesión
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Usuario"
              variant="outlined"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              InputProps={{
                style: { color: 'white' }, // ✅ texto del input blanco
              }}
              InputLabelProps={{
                style: { color: 'white' }, // ✅ label blanco
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  '& fieldset': {
                    borderColor: 'white', // ✅ borde blanco
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />

            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 1,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '20px',       
                  paddingX: 4,                 
                  paddingY: 1,                 
                  textTransform: 'none',      
                  fontWeight: 'bold',         
                }}
              >
                Iniciar Sesión
              </Button>
            </Box>

          </Box>
        </Paper>

      </Fade>
    </Box>
  );
}