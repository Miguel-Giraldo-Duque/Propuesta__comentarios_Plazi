import { useEffect, useRef, useState } from 'react'
export const Transcriptor = (options) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTrasnscript] = useState("")
  const recgonitionRef = useRef(null) 
  
  
  useEffect(() =>{
    // Verificamos si webkitSpeechRecognition esta disponible
    if(!("webkitSpeechRecognition" in window)){
        console.error("Web speeach is not suported")
        return
    }

    // Configuraciones le pasamos a recgonitionRef se igual a una nueva instancia de webkitSpeechRecognition() 
    recgonitionRef.current = new window.webkitSpeechRecognition()
    const recogntion =  recgonitionRef.current
    recogntion.interimResults = options.interimResults || true
    recogntion.continuous = options.continuous || false

    var speechRecognitionList = new window.webkitSpeechGrammarList();

    // A grammar le pasamos una lista de palabras a identificar en el audio del usuario
    const grammar = "#JSGF V1.0; grammar types; public <type> = título | italico | negrilla | código  | texto | Salto | ;";
    
    // Se las agregamos a webkitSpeechGrammarList()
    speechRecognitionList.addFromString(grammar, 1);
    recogntion.grammars = speechRecognitionList

    // Transcribimos el audio y lo devolvemos en un "event" que contiene la transcripción
    recogntion.onresult = (event) =>{
    let text = ""

    // Creamos una regex con la siguiente lógica: se indica la palabra clave a buscar "/título", luego
    // se agrupa el texto que le prosigue hasta que encuentre otra palabra clave "(?=texto|negrilla|codigo|itálico|$)". Esto se repite con las demás palabras clave.

    const regex = /título\s+(.*?)\s(?=texto|negrilla|codigo|itálico|Salto|$)|texto|Salto|negrilla\s+(.*?)(?=\s+(título|texto|código|itálico|Salto|$))|itálico\s+(.*?)(?=\s+(título|texto|negrilla|código|itálico|Salto|$))|código\s+(.*?)(?=\s+(título|texto|negrilla|código|itálico|Salto|$)) /g;
  
      for (let i = 0; i < event.results.length; i++) 
          // Recorremos los resultados del evento y los añadimos a la variable text 
            text += event.results[i][0].transcript

          // Tomamos "text" y ejecutamos un replace inteligente donde por agrupación p1, p2, p3 son el indicativo de cada agrupación como título, código, etc.
          // Buscamos las secciones de texto y las transformamos en el formato markdown correspondiente.
          // Retornamos la cadena transformada en markdown. Ejemplo: "título Miguelito" --> "## Miguelito"

            const textoTransformado = text.replace(regex, (match, p1, p2, p3, p4, p5, p6) => {
              switch (true) {
                case match.startsWith("título"):
                  return `\n## ${p1} \n\n`
                case match === "texto":
                  return " ";
                case match === "Salto":
                  return "\n";
                case match.startsWith("negrilla"):
                  return `**${p2?.trim() || ''}** `;
                case match.startsWith("itálico"):
                  return `*${p4?.trim() || ''}* `;
                case match.startsWith("código"):
                  return `\`\`\`${p6?.trim() || ''}\`\`\` `;
                default:
                  return match; // caso por defecto, no debería ocurrir debido a la regex
              }
          });

          // Igulamos el valor de text al mardown
          text = textoTransformado
        

        // Seteamos los nuevos valor para transcript     
        setTrasnscript(text)
    }

    recogntion.onerror =( event )=>{
        console.error("No se reconocio", event.error)
    }

    recogntion.onend = () =>{
        setIsListening(false)
        setTrasnscript("")
    }

    return () =>{
        recogntion.stop()
    }
  }, [])


  // Metodo para iniciar la escucha que confima el valor negativo de !isListening y exitencia de  la instacia  recgonitionRef.current
  const startListening = () =>{
   
    if (recgonitionRef.current && !isListening) {
        recgonitionRef.current.start()
        setIsListening(true)
    }
  }

  // Metodo para parar la escucha, que confima el valor positivo de isListening y exitencia  de  la instacia recgonitionRef.current
  const stopListening = () =>{
    if (recgonitionRef.current && isListening) {
        recgonitionRef.current.stop()
        setIsListening(false)
    }
  }
  return {
    isListening,
    transcript,
    stopListening,
    startListening
  }
}
