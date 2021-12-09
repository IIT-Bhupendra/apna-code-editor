import Editor from "./Editor";
import { useState, useEffect } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import "./App.css";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
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
