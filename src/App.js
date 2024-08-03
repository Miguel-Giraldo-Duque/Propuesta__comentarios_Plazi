import YoutubePlayer from 'react-player';
import './css/App.css';
import { MarkdownEditor } from './markdowneditor.js';
function App() {
  return (
    <div className="App">
      <h1 className="title">Editor de texto markdown para Platzi</h1>
      <div className="content">
        <YoutubePlayer width={"600px"} controls url={"https://www.youtube.com/watch?v=R1EEgBJt4gs"}></YoutubePlayer>
        <MarkdownEditor></MarkdownEditor>
      </div>
  </div>
  );
}

export default App;
