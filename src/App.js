import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import ParsedHtml from './InputUi';

function App() {
  const [inputHtml, setInputHtml] = useState();

  useEffect(() => {
    const loadInput = async () => {
      fetch('example-actor-input.html') // Replace with the actual path to your HTML file
        .then((response) => response.text())
        .then((data) => setInputHtml(data))
        .catch((error) => {
          console.error('Error loading HTML file', error);
        });
    }

    loadInput();
  })

  return (
    <>
      <header className="App-header">
        <h1><code>Input UI</code> demo</h1>
      </header>
      <Formik
        initialValues={{
          inputType: 'urls',
          reviewsCount: 0,
        }}
        onSubmit={(values) => {
          console.log({ values });
        }}
      >
          {/* <form dangerouslySetInnerHTML={{ __html: input }}></form> */}
        {inputHtml && <ParsedHtml html={inputHtml}/>}
      </Formik>
    </>
  );
}

export default App;
