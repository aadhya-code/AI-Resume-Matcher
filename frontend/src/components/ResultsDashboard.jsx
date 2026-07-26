import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#2f6f4f", "#e2e8f0"];

export default function ResultsDashboard({ result }) {
  if (!result) return null;
  console.log("ATS SUMMARY:", result.ats_summary);


  const {
    match_score,
    ats_summary,
    strengths = [],
    matched_keywords = [],
    missing_keywords = [],
    projects_to_highlight = [],
    suggestions = [],
  } = result;
 

  const chartData = [
    {
      name: "Skills Found",
      value: matched_keywords.length,
    },
    {
      name: "Skills Missing",
      value: missing_keywords.length,
    },
  ];


  const getScoreLabel = () => {

    if (match_score >= 85)
      return "Excellent Match 🟢";

    if (match_score >= 60)
      return "Good Match 🟡";

    return "Needs Improvement 🔴";

  };


  return (
    <div className="results">


      {/* ATS SCORE */}
      <div className="score-card">

        <div className="score-number">
          {Math.round(match_score)}%
        </div>

        <div className="score-label">
          {getScoreLabel()}
        </div>


        <div className="progress-bar">

          <div
            className={`progress-fill ${
              match_score >= 85
                ? "excellent"
                : match_score >= 60
                ? "good"
                : "weak"
            }`}
            style={{
              width: `${match_score}%`,
            }}
          />

        </div>

      </div>



      {/* ATS SUMMARY */}

      <div className="info-card">

        <h3>
          📋 ATS Summary
        </h3>

        {result.ats_summary ? (
          <p>
            {result.ats_summary}
          </p>
        ) : (
          <p>
            No ATS summary available
          </p>
        )}

      </div>



      {/* CHART */}

      <div className="chart-card">

        <ResponsiveContainer width="100%" height={250}>

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
            >

              {chartData.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>





      {/* STRENGTHS */}

      <div className="info-card">

        <h3>
          Resume Strengths
        </h3>

        <ul>

          {strengths.map((item, i) => (
            <li key={i}>
              ✓ {item}
            </li>
          ))}

        </ul>

      </div>






      {/* SKILLS */}

      <div className="keyword-columns">


        <div>

          <h3>
            Skills Found
          </h3>


          <ul className="tag-list matched">

            {matched_keywords.map((skill) => (

              <li key={skill}>
                {skill}
              </li>

            ))}

          </ul>

        </div>




        <div>


          <h3>
            Skills To Learn
          </h3>


          <ul className="tag-list missing">

            {missing_keywords.map((skill) => (

              <li key={skill}>
                {skill}
              </li>

            ))}


          </ul>


        </div>


      </div>






      {/* PROJECTS */}

      <div className="info-card">


        <h3>
          Projects To Highlight
        </h3>


        <ul>

          {projects_to_highlight.map((project, i) => (

            <li key={i}>
              🚀 {project}
            </li>

          ))}


        </ul>


      </div>







      {/* SUGGESTIONS */}

      <div className="suggestions">


        <h3>
          Resume Improvements
        </h3>


        <ul>


          {suggestions.map((suggestion, i) => (

            <li key={i}>
              {suggestion}
            </li>

          ))}


        </ul>


      </div>



    </div>
  );
}