import React, { useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import "./Editor.css";

function Editor({ title, language, onValChange, initialValue }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`editor ${collapsed ? "collapsed" : ""}`}>
      <div className="editor__header">
        <p className="editor__title">{title}</p>
        {language == "css" && <p className="App__title">Apna Code Editor</p>}
        <button
          className={`btn ${collapsed ? "colored" : ""}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          <OpenInFullIcon />
        </button>
      </div>
      <div className="codemirror">
        <CodeMirror
          className="editor__box code-mirror-wrapper"
          value={initialValue}
          options={{
            mode: language,
            theme: "material",
            lineNumbers: true,
            lint: true,
          }}
          onChange={(editor, data, value) => {
            onValChange(value);
          }}
        />
      </div>
    </div>
  );
}

export default Editor;
