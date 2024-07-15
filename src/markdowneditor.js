import React, { useEffect } from 'react';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import "react-mde/lib/styles/css/react-mde-all.css";  
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { customStyle } from './css/customStyles';

import { Transcriptor } from './Transcriptor';

export const MarkdownEditor = () => {
  // Traigo las funciones de Transcriptor() y le indicamos que queremos seguir escuchando incluso cuando se deja de recibir audio
  const { isListening, transcript, stopListening, startListening } = Transcriptor({ continuous: true });

  // Creamos método para parar o iniciar la conversación
  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };

  // stopVoiceInput setea los valores nuevos para "value" una vez finalizada la transcripción
  const stopVoiceInput = () => {
    setValue(prevVal => prevVal + (transcript.length ? (prevVal.length ? " " : "") + transcript : ""));
    stopListening();
  };

  // useEffect para cargar contenido inicial desde un archivo (comentado actualmente)
  useEffect(() => {
    fetch("./textoEjemplo.txt")
      .then(response => response.text())
      .then(text => setValue(text));
  }, []);

  const [value, setValue] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("write");
  const editor = React.useRef(null);
  const [state, hideEditor] = React.useState(false);

  // Función para ocultar el editor y mostrar la vista previa
  function renderComment() {
    hideEditor(true);
  }

  // Función para volver a mostrar el editor
  function editComment() {
    hideEditor(false);
  }

  return (
    <div className={`container`}>
      {
        // La siguiente condicional permite renderizar en base al estado de edición: si es true, se renderiza la visualización de markdown; de lo contrario, el editor de markdown
        state ? (
          <div>
            <div className="preview">
              <button id='edit' onClick={editComment}></button>
              <ReactMarkdown 
                children={value} 
                components={{
                  code({ node, inline, className, children, ...props }) {
                    return !inline ? (
                      <SyntaxHighlighter style={customStyle} language="javascript" PreTag="div" {...props}>
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }} 
              />
            </div>
          </div>
        ) : (
          // Editor: Le pasamos ReactMde para la interfaz del editor con estilos extra para el código
          <div className={`editor ${state ? "hideEditor" : ""}`} ref={editor}>
            <ReactMde 
              value={isListening ? value + (transcript.length ? (value.length ? "  " : "") + transcript : "") : value}
              onChange={setValue}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              classes={{
                reactMde: 'custom-react-mde',
                textArea: 'custom-textarea',
                toolbar: 'custom-toolbar',
                preview: 'custom-preview',
              }}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(
                  <ReactMarkdown 
                    children={markdown} 
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        return !inline ? (
                          <SyntaxHighlighter style={customStyle} language="javascript" PreTag="div" {...props}>
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }} 
                  />
                )
              }
            />
            <button onClick={startStopListening} className={`talk ${isListening ? "talking" : ""} `}></button>
            <button onClick={renderComment} id='send'></button>
          </div>
        )
      }
    </div>
  );
};