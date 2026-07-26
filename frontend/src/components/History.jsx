import React, { useEffect, useState } from "react";
import { fetchHistory } from "../api.js";


export default function History({ setResult, setPage }) {

  const [history, setHistory] = useState([]);


  useEffect(() => {

    async function loadHistory() {

      try {

        const data = await fetchHistory();

        setHistory(data);

      } catch (error) {

        console.error("Failed to load history:", error);

      }

    }


    loadHistory();

  }, []);




  function openReport(scan) {

    setResult(scan);

    setPage("home");

  }





  return (

    <div className="history">


      <h2>
        Scan History
      </h2>




      {history.length === 0 ? (

        <p>
          No previous scans found.
        </p>


      ) : (


        history.map((scan) => (


          <div
            className="history-card"
            key={scan.id}
          >


            <h3>
              {scan.job_title || "Untitled Job"}
            </h3>



            <p>
              Company: {scan.company_name || "N/A"}
            </p>



            <div className="history-score">

              {Math.round(scan.match_score)}%

            </div>



            <p>
              Date: {new Date(scan.created_at).toLocaleDateString()}
            </p>



            <button
              onClick={() => openReport(scan)}
            >
              View Report
            </button>



          </div>


        ))

      )}


    </div>

  );

}