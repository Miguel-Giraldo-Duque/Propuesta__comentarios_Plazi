import React, { useEffect, useRef, useState } from 'react'

export const Trascriptor = (options) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTrasnscript] = useState("")
  const recgonitionRef = useRef(null) 
  
  useEffect(() =>{
    if(!("webkitSpeechRecognition" in window)){
        console.error("Web speeach is not suported")
        return
    }
    recgonitionRef.current = new window.webkitSpeechRecognition()
    const recogntion =  recgonitionRef.current
    recogntion.interimResults = options.interimResults || true
    recogntion.continuous = options.continuous || false

    var speechRecognitionList = new window.webkitSpeechGrammarList();

    const grammar = "#JSGF V1.0; grammar types; public <type> = título | italico | negrilla | codigo | texto  ;";
    speechRecognitionList.addFromString(grammar, 1);
    recogntion.grammars = speechRecognitionList

    // console.log(speechRecognitionList[0].src)

    recogntion.onresult = (event) =>{

      
      // const regex = /título\s+(.*?)\s(texto|negrilla|codigo|italico)/;
      // const titles = info.match(regex)
      // if (titles) {
      //   const contentTitle = titles[1]
      //   console.log(contentTitle)
      // }


        let  text = ""
        for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript
        }


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

  const startListening = () =>{
   
    if (recgonitionRef.current && !isListening) {
        recgonitionRef.current.start()
        console.log(transcript)
        setIsListening(true)
    }
  }
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
