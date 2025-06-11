import Fondo from '../assets/fondo6.webp';
import { Box, Typography, Button } from '@mui/material';
import { GlobalStyles } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import MiFuente from '../assets/fonts/edosz.ttf';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/im4.jpg';

export default function Final() {
  const navigate = useNavigate();

  const volverAResultados = () => {
    navigate('/resultados');
  };

  return (
    <>
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
          minHeight: '100vh',
          height: '100vh',
          overflow: 'hidden',
          bgcolor: 'background.default',
          backgroundImage: `url(${Fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          py: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: '800px',
            textAlign: 'center',
            mb: 4,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            color="white"
            gutterBottom
            sx={{
              fontFamily: 'MiFuentePersonalizada',
              fontSize: { xs: '2rem', sm: '3.5rem', md: '6rem' },
            }}
          >
            ¡Suerte Crack!
          </Typography>

          <Typography
            variant="h5"
            color="white"
            sx={{
              textAlign: 'justify',
              mt: 2,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '2rem' },
            }}
          >
            Es hora de que pongas a prueba los consejos que te hemos dado. Verás que, con tu mente ganadora, te volverás un verdadero campeón.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {[img1, img2, img3, img4].map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`img${index + 1}`}
              sx={{
                width: { xs: 100, sm: 200 },
                height: { xs: 150, sm: 300 },
                borderRadius: 2,
                boxShadow: 3,
                objectFit: 'cover',
              }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={volverAResultados}
          sx={{
            mt: 0,
            fontWeight: 'bold',
            borderRadius: 3,
            px: 4,
            fontSize: { xs: '1rem', sm: '1.2rem' },
          }}
        >
          Volver a Resultados
        </Button>
      </Box>
    </>
  );
}
