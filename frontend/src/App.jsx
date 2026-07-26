import React, { useState } from "react";
import UploadForm from "./components/UploadForm.jsx";
import ResultsDashboard from "./components/ResultsDashboard.jsx";
import History from "./components/History.jsx";
import { submitScan } from "./api.js";


export default function App() {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState("home");


  async function handleSubmit(payload) {

    setLoading(true);
    setError(null);
    setResult(null);

    try {

      const data = await submitScan(payload);

      setResult(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }



  return (

    <div className="app-shell">


      <header>

        <h1>
          ResumeMatch
        </h1>


        <p>
          AI-powered ATS Resume Analyzer
        </p>



        <nav>

          <button 
            onClick={() => setPage("home")}
          >
            Home
          </button>


          <button 
            onClick={() => setPage("history")}
          >
            History
          </button>


        </nav>


      </header>





      {page === "home" && (

        <>


          <UploadForm
            onSubmit={handleSubmit}
            loading={loading}
          />



          {error && (

            <p className="error">
              {error}
            </p>

          )}





          {loading && (

            <div className="ai-loader">


              <div className="robot">
                🤖
              </div>



              <h3>
                AI is analyzing your resume...
              </h3>



              <div className="loader-steps">


                <p>
                  ✓ Extracting resume information
                </p>


                <p>
                  ✓ Comparing skills with job description
                </p>


                <p>
                  ⏳ Generating personalized suggestions
                </p>


              </div>


            </div>

          )}





          <ResultsDashboard 
            result={result}
          />


        </>

      )}






      {page === "history" && (

        <History
          setResult={setResult}
          setPage={setPage}
        />
      )}



    </div>

  );

}