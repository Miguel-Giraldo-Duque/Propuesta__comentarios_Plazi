## Descripción del proyecto

  

El objetivo de este proyecto es realizar una propuesta para la sección de comentarios de la plataforma de aprendizaje digital Platzi, considerando algunas funcionalidades que podrían ser de amplia utilidad y mejorar la experiencia de usuario para la comunidad de estudiantes en Platzi. Mis propuestas son:

  

### ¿Cómo usar la herramienta? 📺

  

![Demo](https://img.youtube.com/vi/R1EEgBJt4gs/0.jpg)]
(https://www.youtube.com/watch?v=R1EEgBJt4gs)

  
  

### Propuestas 💡



-    📕  **Edición :** Considero que la sección de comentarios de Platzi ofrece una mala experiencia de usuario al no respetar el principio de perdonar al usuario al no permitir corregir errores en los comentarios. Actualmente, si un estudiante desea realizar cambios en su texto, debe borrar todo el comentario y volver a crearlo desde cero. Propongo que la posibilidad de editar comentarios podría reducir la carga en el backend al evitar múltiples solicitudes de comentarios borrados y re-creados además de ofrecer una mejor experiencia de usuario.

  

-  👀 **Previsualización:** Es fundamental poder previsualizar cómo quedará tu pregunta o aporte antes de enviarlo. Esto es especialmente útil dado que no todos los usuarios están familiarizados con Markdown, y poder confirmar la estructura antes de enviarla proporciona una experiencia más amigable.

  

-  🎤 **Creación de comentarios por voz:** Considero que sería una mejora significativa para el público móvil de Platzi poder crear aportes o preguntas utilizando un transcriptor de voz que convierta lo hablado en texto Markdown. Esto facilitaría la creación de aportes extensos sin la tediosidad de escribir todo manualmente.

  

-  **Opción de títulos:** Aunque entiendo que los títulos pueden resultar distractivos en la interfaz de Platzi, propongo utilizarlos en un tamaño menor que se adapte a los comentarios. Esto podría facilitar la lectura y diferenciar los puntos que los estudiantes desean expresar.

  

### Librerías y herramientas usadas en este proyecto

  

-  **Librerías:**    📚

- react-mde: Proporciona una interfaz gráfica sencilla para Markdown que incluye previsualización ,títulos, básica, negritas, cursivas, imágenes, código, etc.

  

- ReactMarkdown: Transforma texto Markdown en elementos HTML visibles en el navegador.

  

- SyntaxHighlighter: Proporciona estilos adicionales para el Markdown de código, y se puede configurar según el lenguaje de programación utilizado.

  

Nota: Reconozco que estas librerías podrían no ser las más óptimas funcionalmente para una plataforma como Platzi. Sin embargo, mi objetivo es demostrar de manera gráfica y dentro de mis capacidades una propuesta funcional que quizás no se había considerado hasta ahora.

  

### Herramientas adicionales 🔧

  

- webkitSpeechRecognition 💎 : Un recurso nativo del navegador que permite la transcripción de texto a partir del audio. Fue utilizado para la funcionalidad del micrófono.

  

- Regex 🧧 : Utilizado para transformar el texto transcrito en Markdown funcional, indicando los patrones a utilizar. Entiendo que Platzi podría implementar su propia inteligencia artificial para esta tarea dado que imagino que no seria tan eficiente usar regex a gran escala.
