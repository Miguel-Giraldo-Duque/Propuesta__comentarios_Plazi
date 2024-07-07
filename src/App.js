import logo from './logo.svg';
import './App.css';
import { MarkdownEditor } from './markdowneditor.js';
function App() {
  return (
    <div className="App">
      <h1>Editor de texto markdown para Plazi </h1>
      <MarkdownEditor></MarkdownEditor>
    </div>
  );
}

export default App;
