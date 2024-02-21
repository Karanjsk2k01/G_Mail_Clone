import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './textEditor.css';
import DOMPurify from 'dompurify';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )
  const [convertedContent, setConvertedContent] = useState(null)

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    let html = convertToHTML(editorState.getCurrentContent())
    setConvertedContent(html)
  };

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    }
  }


  return (
    <div className="container">
      <header className="App-header">Rich Text Editor Example</header>

      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />

      {/* Render the content */}
      <div style={{ margin: '10rem' }} dangerouslySetInnerHTML={createMarkup(convertedContent)}>

      </div>
    </div>
  );
};

export default TextEditor;
