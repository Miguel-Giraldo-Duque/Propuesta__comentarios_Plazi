import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';


export const customStyle = {
    ...dark,
    'pre[class*="language-"]': {
      ...dark['pre[class*="language-"]'],
      background: '#131212', // Cambia el fondo del contenedor del código
      borderRadius: '5px', // Añade un radio de borde
      border: "0.1em solid #c91448", // Añade un borde sólido
      padding: '20px', // Añade padding
      overflow: 'auto', // Añade overflow automático
    },
  };