import React, { useEffect } from 'react'
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import "react-mde/lib/styles/css/react-mde-all.css";  
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { customStyle } from './customStyles';
import { Trascriptor } from './Trascriptor';
export const MarkdownEditor = () => {
  const {  isListening,transcript,stopListening,startListening}  = Trascriptor({continuous:true})

  const startStopListening= () =>{
    isListening ? stopVoiceInput() : startListening()
  }

  
  const stopVoiceInput = () =>{
    setValue(prevVal => prevVal  + (transcript.length ? (prevVal.length ? " " : "") + transcript : "") )
    stopListening()
  }

  // useEffect(()=>{
  //   fetch("/file.txt")
  //   .then(response => response.text())
  //   .then(text => setValue(text))
  // },[])

    const [value , setValue] = React.useState("")
    const [selectedTab , setSelectedTab] = React.useState("write")
    const editor = React.useRef(null)
    const [state , hideEditor ] = React.useState(false)
    

  function renderComment () {
    hideEditor(true)
  }


  function editComment() {
    hideEditor(false)
  }
    return (

    <div className={`conteiner`}  >
      {
        state ? (
          <div>
         
              <div className="preview" >
              <button id='edit' onClick={editComment}></button>
             <ReactMarkdown children={value} components={
              {
                code({ node, inline, className, children, ...props }){
                  return !inline ? (
                    <SyntaxHighlighter style={customStyle} language="javascript" PreTag="div" {...props}>
                       {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ): (
                    <code className={className} {...props}>
                       {children}
                    </code> 
                  )
                }
              }
             } />
          </div>
          </div>
        
        ) : (
        <div className={`editor ${state  ? "hideEditor": ""}`} ref={editor}>
       
        <ReactMde 
         value={isListening ? value + (transcript.length ? (value.length ?  "  " : "") + transcript : "" ): value }
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
         Promise.resolve(<ReactMarkdown children={markdown} components={
          {
            code({ node, inline, className, children, ...props }){
              return !inline ? (
                <SyntaxHighlighter style={customStyle} language="javascript" PreTag="div" {...props}>
                   {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ): (
                <code className={className} {...props}>
                   {children}
                </code> 
              )
            }
          }
         } />)
          
         }
        />
         <button onClick={startStopListening} id='talk'></button>
        <button onClick={renderComment} id='send'></button>
        </div>
      )}
    </div>
  )
}
