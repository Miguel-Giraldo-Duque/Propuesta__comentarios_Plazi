import YoutubePlayer from 'react-player';
import './css/App.css';
import { MarkdownEditor } from './markdowneditor.js';
function App() {
  return (
    <div className="App">
      <h1 className="title">Editor de texto markdown para Platzi</h1>
      <div className="content">
        <div className='player'>
        <YoutubePlayer width={"100%"} height={"100%"} className="react-player" controls url={"https://www.youtube.com/watch?v=R1EEgBJt4gs"}></YoutubePlayer>
        </div>
        <MarkdownEditor></MarkdownEditor>
      </div>
  </div>
  );
}

export default App;
