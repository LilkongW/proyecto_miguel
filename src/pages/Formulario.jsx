// src/pages/Formulario.jsx
import { useState } from 'react';
import Cookies from 'js-cookie';
import {
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Fondo from '../assets/fondo4.jpg';

export default function Formulario() {
  const navigate = useNavigate();
  const usuario = Cookies.get('usuario') || 'Usuario';

  // Clasificación de preguntas por categoría
  const categoriaPreguntas = {
    ansiedad: [
      "Me siento ansioso(a) antes de un partido importante.",
      "Tengo miedo de no cumplir con las expectativas de mis entrenadores.",
      "A veces me preocupo por hacer el ridículo frente a mis compañeros de equipo.",
      "¿Siento que la presión de ganar me causa ansiedad?",
      "¿Te sientes constantemente preocupado por tu rendimiento en los entrenamientos o partidos?",
      "¿Te cuesta relajarte después de los entrenamientos o partidos?",
      "¿Te cuesta concentrarte durante el juego o las instrucciones del entrenador?",
      "¿Tienes pensamientos negativos recurrentes sobre tu desempeño futbolístico?"
    ],
    estres: [
      "Siento que el entrenamiento me genera un nivel alto de estrés.",
      "A veces tengo dificultades para dormir debido a pensamientos sobre el fútbol.",
      "La carga de deberes escolares y el fútbol me genera estrés.",
      "¿Sientes que las exigencias del fútbol te están sobrepasando últimamente?",
      "¿Has notado cambios en tu apetito o sueño por preocupaciones relacionadas con el fútbol?",
      "¿Te sientes mentalmente agotado incluso antes de entrenar o competir?",
      "¿Tienes dificultades para desconectarte mentalmente del fútbol cuando estás fuera del campo?"
    ],
    depresion: [
      "A veces me siento triste o desanimado(a) por mi rendimiento en el fútbol.",
      "Siento que mis emociones afectan mi rendimiento en el campo.",
      "He tenido pensamientos negativos sobre mí mismo(a) relacionados con el fútbol.",
      "¿Has perdido el interés o disfrute por jugar al fútbol como antes?",
      "¿Te sientes triste o vacío la mayor parte del tiempo, incluso durante entrenamientos o partidos?",
      "¿Tienes poca energía o te sientes cansado incluso después de descansar?",
      "¿Te cuesta motivarte para asistir a entrenamientos o partidos?"
    ],
    falta_motivacion: [
      "Me siento motivado(a) para entrenar y mejorar mis habilidades.",
      "Las metas que me fijo en el fútbol me impulsan a esforzarme más.",
      "Me siento apoyado(a) por mi equipo y entrenadores, lo que me motiva a seguir.",
      "Disfruto del proceso de aprender y mejorar en el fútbol.",
      "¿Te cuesta encontrar razones para esforzarte durante los entrenamientos?",
      "¿Evitas practicar o mejorar fuera del horario habitual de entrenamiento?",
      "¿Sientes que tus metas en el fútbol ya no son tan importantes para ti?",
      "¿Has dejado de proponerte nuevos objetivos dentro del equipo?"
    ]
  };

  // Crear array de todas las preguntas para mostrar en el formulario
  const preguntas = [
    ...categoriaPreguntas.ansiedad,
    ...categoriaPreguntas.estres,
    ...categoriaPreguntas.depresion,
    ...categoriaPreguntas.falta_motivacion
  ];

  const [respuestas, setRespuestas] = useState(
    preguntas.reduce((acc, pregunta) => {
      acc[pregunta] = false;
      return acc;
    }, {})
  );

  const handleChange = (pregunta) => {
    setRespuestas((prev) => ({
      ...prev,
      [pregunta]: !prev[pregunta],
    }));
  };

  // Función para analizar las respuestas (equivalente a la lógica del backend)
  const analizarRespuestas = (respuestasUsuario) => {
    const resultados = {};
    
    for (const [categoria, preguntasCategoria] of Object.entries(categoriaPreguntas)) {
      const total = preguntasCategoria.length;
      const positivos = preguntasCategoria.reduce((count, pregunta) => {
        return count + (respuestasUsuario[pregunta] ? 1 : 0);
      }, 0);
      
      const porcentaje = (positivos / total) * 100;
      resultados[categoria] = Math.round(porcentaje * 100) / 100; // Redondear a 2 decimales
    }
    
    return { porcentajes: resultados };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Analizar las respuestas localmente
      const resultadosAnalisis = analizarRespuestas(respuestas);
      
      // Guardar resultados en localStorage
      localStorage.setItem('resultados', JSON.stringify(resultadosAnalisis));
      
      // Navegar a la página de resultados
      navigate('/resultados');
    } catch (error) {
      console.error('Error al procesar respuestas:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 900,
          p: 4,
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'rgba(255,255,255,0.8)',
          borderRadius: 3,
        }}
      >
        <Typography variant="h3" gutterBottom align="center">
          Hola {usuario} 👋
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <FormGroup>
            {preguntas.map((pregunta, index) => (
              <Box
                key={pregunta}
                mb={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography sx={{ flex: 1, pr: 2 }}>
                  {`${index + 1}. ${pregunta} (${respuestas[pregunta] ? 'Sí' : 'No'})`}
                </Typography>
                <Checkbox
                  checked={respuestas[pregunta]}
                  onChange={() => handleChange(pregunta)}
                />
              </Box>
            ))}
          </FormGroup>
          <Box
            sx={{
              mt: 3,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '200px' }}
            >
              Ver Resultados
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}