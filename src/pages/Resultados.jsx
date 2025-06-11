import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Modal,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fondo from '../assets/fondo5.jpg';
import MiFuente from '../assets/fonts/edosz.ttf';
import { GlobalStyles } from '@mui/system';
import { consejos } from './consejos.jsx';
import Entrenador from '../assets/avantar3.png';
import Entrenadora from '../assets/avatar4.png';
import jugador from '../assets/avatar5.jpg';

export default function Resultados() {
  const navigate = useNavigate();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('resultados');
    if (datosGuardados) {
      const data = JSON.parse(datosGuardados);
      const resultadosArray = Object.keys(data.porcentajes).map((categoria) => ({
        titulo: categoria,
        porcentaje: data.porcentajes[categoria],
      }));
      setResultados(resultadosArray);
    }
  }, []);

  // Encontrar el porcentaje más alto
  const porcentajeMayor = Math.max(...resultados.map(item => item.porcentaje));
  
  // Encontrar todos los resultados que tienen el porcentaje más alto
  const resultadosMayores = resultados.filter(item => item.porcentaje === porcentajeMayor);

  const categorias = {
    'ansiedad': 'Ansiedad',
    'estres': 'Estrés',
    'depresion': 'Depresión',
    'falta_motivacion': 'Falta de Motivación',
  };

  const articulos = {
    ansiedad: 'la',
    depresion: 'la',
    falta_motivacion: 'la',
    estres: 'el'
  };

  const mensajesJugador = {
    ansiedad: 'Recuerda respirar profundo y confiar en ti mismo. Todo mejora paso a paso.',
    estres: 'Tómate un momento para ti. El descanso también forma parte del progreso.',
    depresion: [
      'A veces me siento triste o desanimado(a) por mi rendimiento en el fútbol. Recuerda que una mala etapa no define tu talento. Habla con personas de confianza, revisa lo que ya has logrado y enfócate en pequeñas metas. El fútbol tiene altibajos, y todos los jugadores pasan por momentos difíciles.',
      'He perdido interés en otras actividades que solía disfrutar, además del fútbol. Esto puede ser un síntoma de desgaste emocional. Es importante hablar con un profesional si esta falta de interés se prolonga. Retomar hobbies y descansar mentalmente ayuda a reactivar el entusiasmo.',
      'Siento que mis emociones afectan mi rendimiento en el campo. Reconocerlo ya es un paso muy positivo. Aprender a gestionar emociones (tristeza, frustración, enojo) a través de herramientas como journaling o hablar con un psicólogo deportivo puede ayudarte a liberar esa carga.',
      'He tenido pensamientos negativos sobre mí mismo(a) relacionados con el fútbol. No dejes que una etapa difícil nuble tu valor como persona y jugador. Es útil escribir tus fortalezas y recordar por qué empezaste a jugar. También es importante hablar con alguien que pueda ayudarte profesionalmente.',
      '¿Has perdido el interés o disfrute por jugar al fútbol como antes? Reflexiona sobre lo que te hacía disfrutar antes: ¿el juego?, ¿la competencia?, ¿los amigos? A veces, la presión externa apaga nuestra pasión. Tómate un tiempo para reconectar con tu "para qué" y no dudes en pedir apoyo emocional si lo necesitas.',
      '¿Te sientes triste o vacío la mayor parte del tiempo, incluso durante entrenamientos o partidos? La tristeza prolongada no es debilidad, es una señal de que algo necesita atención. Habla con alguien de confianza (psicólogo, entrenador, familia) y date permiso para sentir. Buscar apoyo no te hace menos competitivo, te hace más fuerte.',
      '¿Tienes poca energía o te sientes cansado incluso después de descansar? Evalúa tu descanso, nutrición y estado emocional. A veces el cuerpo está bien, pero la mente está cargada. Si esto persiste, consulta a un especialista: la fatiga mental también requiere tratamiento y cuidado.',
      '¿Te cuesta motivarte para asistir a entrenamientos o partidos? Establece metas pequeñas y significativas. A veces, solo dar el primer paso es suficiente. Rodearte de personas que te inspiren y recordar tus logros pasados puede ayudarte a recuperar la motivación poco a poco.',
      '¿Te sientes inútil o con baja autoestima respecto a tu papel en el equipo? Recuerda que el rendimiento no define tu valor como persona. Habla con tu entrenador sobre tus aportes. A veces, lo que tú ves como poco, otros lo ven como valioso. La autoestima también se entrena.'
    ],
    falta_motivacion: 'Reconecta con lo que te gusta del fútbol. Lo haces por ti.'
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Determinar si usar entrenadora (si alguno de los resultados mayores incluye ansiedad o falta_motivacion)
  const esEntrenadora = resultadosMayores.some(resultado => 
    ['ansiedad', 'falta_motivacion'].includes(resultado.titulo)
  );
  const imagenEntrenador = esEntrenadora ? Entrenadora : Entrenador;

  return (
    <>
      <GlobalStyles styles={`@font-face {
        font-family: 'MiFuentePersonalizada';
        src: url(${MiFuente}) format('truetype');
        font-weight: normal;
        font-style: normal;
      }`} />
      <Box sx={{
        minHeight: '100vh',
        backgroundImage: `url(${Fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Título */}
        <Typography variant="h2" component="h1" color="white" gutterBottom sx={{
          fontFamily: 'MiFuentePersonalizada',
          fontSize: { xs: '2rem', sm: '3.5rem', md: '5rem' },
          textAlign: 'center',
        }}>
          Resultados del test
        </Typography>

        {/* Tarjetas */}
        <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1000px', width: '100%' }}>
          {resultados.map((resultado, index) => (
            <Grid item key={index}>
              <Paper elevation={3} sx={{
                width: { xs: 360, sm: 220 },
                height: 220,
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(4px)',
              }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1.2rem', sm: '1.7rem' } }}>
                  {categorias[resultado.titulo] || resultado.titulo}
                </Typography>
                <Typography variant="h4" color="primary" sx={{
                  marginTop: 2,
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                  fontWeight: 500,
                }}>
                  {resultado.porcentaje}%
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Botones */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 5, flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Ver consejo{resultadosMayores.length > 1 ? 's' : ''}
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/formulario')}>
            Volver al formulario
          </Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/final')}>
            Siguiente
          </Button>
        </Box>

        {/* Modal */}
        <Modal open={open} onClose={handleClose}
        sx={{
          overflowY: 'auto',
        }}
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: 1000,
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: esEntrenadora ? 'row' : 'row-reverse' },
              alignItems: 'flex-start',
              gap: 4,
            }}>
              {/* Imagen del entrenador */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flexShrink: 0,
                alignSelf: { xs: 'center', sm: 'flex-start' }
              }}>
                <Box component="img" 
                  src={imagenEntrenador} 
                  alt="Entrenador" 
                  sx={{ 
                    width: 'auto', 
                    height: { xs: 300, sm: 400 }, 
                    objectFit: 'contain' 
                  }} 
                />
              </Box>

              {/* Contenido de consejos */}
              <Box sx={{ 
                textAlign: { xs: 'center', sm: 'left' },
                flex: 1,
                minWidth: 0 // Permite que el contenido se ajuste
              }}>
                {resultadosMayores.length === 1 ? (
                  // Un solo consejo
                  <>
                    <Typography variant="h4" gutterBottom mb={2}>
                      Consejo para {articulos[resultadosMayores[0].titulo] || 'la'} {categorias[resultadosMayores[0].titulo] || resultadosMayores[0].titulo}
                    </Typography>
                    <Typography variant="body1" mb={3}>
                      {consejos[resultadosMayores[0].titulo] || 'Mantente positivo y enfocado.'}
                    </Typography>
                  </>
                ) : (
                  // Múltiples consejos
                  <>
                    {resultadosMayores.map((resultado, index) => (
                      <Box key={resultado.titulo} sx={{ mb: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ 
                          color: 'primary.main',
                          fontWeight: 'bold'
                        }}>
                          {categorias[resultado.titulo] || resultado.titulo}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                          {consejos[resultado.titulo] || 'Mantente positivo y enfocado.'}
                        </Typography>
                        {index < resultadosMayores.length - 1 && (
                          <Box sx={{ 
                            borderBottom: '1px solid', 
                            borderColor: 'divider',
                            mb: 2 
                          }} />
                        )}
                      </Box>
                    ))}
                  </>
                )}

                <Button sx={{ mt: 3 }} variant="contained" onClick={handleClose}>
                  Cerrar
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
}