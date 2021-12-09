import Editor from "./Editor";
import { useState, useEffect } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import "./App.css";

function App() {
  const initialHtml = `<!-- HTML: Encode the projects to decode your future -->
  <h1> Apna Code Editor </h1>
  <button>Start Building Your Dream Project</button>`;

  const initialCss = `/* CSS: Encode the projects to decode your future */
  *{
    font-family: arial;
  }
  
  body{
    display: flex;
      flex-direction: column;
     justify-content: center;
      align-items: center;
  }
  
  h1{
    color: hotpink;
  }
  
  button{
    background-color: lightgreen;
    border:none;
    cursor: pointer;
    color: white;
    padding: 0.8em 2em;
    font-size: 1.5em;
    font-weight: bolder;
    border-radius: 15px;
  }`;

  const [html, setHtml] = useLocalStorage("html", initialHtml);
  const [css, setCss] = useLocalStorage("css", initialCss);
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState(``);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `<html><style>${css}</style><body>${html}<script>${js}</script></body></html>`
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const htmlHandler = (htmlVal) => {
    setHtml(htmlVal);
  };

  const cssHandler = (cssVal) => {
    setCss(cssVal);
  };

  const jsHandler = (jsVal) => {
    setJs(jsVal);
  };

  return (
    <div className="App">
      <div className="top-pane">
        <Editor
          title="HTML"
          language="xml"
          initialValue={html}
          onValChange={htmlHandler}
        />
        <Editor
          title="CSS"
          language="css"
          initialValue={css}
          onValChange={cssHandler}
        />
        <Editor
          title="JS"
          language="javascript"
          initialValue={js}
          onValChange={jsHandler}
        />
      </div>
      <div className="bottom-pane">
        <iframe title="output-screen" srcDoc={srcDoc} />
      </div>
    </div>
  );
}

export default App;
