import { useState, useEffect } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Editor from "react-simple-code-editor"
import Markdown from "react-markdown"
import axios from "axios"
import './App.css'


function App() {
  
  const [code,setCode] = useState(``)
  const [language, setLanguage] = useState('javascript')
  
  const [review,setReview] = useState(``)

  

  async function reviewCode() {
    setReview('Analyzing your code...');
  try {
    const response = await axios.post('http://localhost:3000/ai/get-review', {code});
    setReview(response.data);
  } catch (error) {
    
    console.error("Error fetching code review:", error);
  }
}
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <div 
              className="language-selector"
              style={{ padding: '8px 12px' }}
              >
              <label>Language: </label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
           </div>
            <Editor
              value= {code}
              onValueChange={code => setCode(code)}
              highlight= {code =>(
                <SyntaxHighlighter
                  language={language}
                  style={tomorrow}
                  customStyle={{ margin: 0, padding: 0, background: 'none' }}
                >
                  {code}
                </SyntaxHighlighter>
              )}
              padding={10}
              style={{
                fontFamily : "Fira code", 
                fontSize: 16,
                //border: "1px solid #ddd",
                borderRadius : "5px",
                height : "100%",
                width : "100%"
              }}
            />
          </div>
          <div onClick={reviewCode}
           className="review">Review</div>
        </div>
        <div className="right">
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App
