import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function Graph({ casesType }) {
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          //Get keys from object
          const keysOfObject = Object.keys(data[casesType]);
          setKeys(keysOfObject);
          //Get values from object
          const valuesOfObject = Object.values(data[casesType]);
          setValues(valuesOfObject);
        });
    };
    fetchData();
  }, [casesType]);

  const casesTypeColors = {
    cases: {
      borderColor: "#e65c00",
      backgroundColor: "rgba(230, 92, 0, 0.5)",
    },
    recovered: {
      borderColor: "#7dd71d",
      backgroundColor: "rgba(125,215,29, 0.5)",
    },
    deaths: {
      borderColor: "#cc1034",
      backgroundColor: "rgba(251,68,67,0.5)",
    },
  };

  const config = {
    data: {
      labels: keys,
      datasets: [
        {
          label: `Worldwide ${casesType}`,
          data: values,
          backgroundColor: `${casesTypeColors[casesType].backgroundColor}`,
          borderWidth: 1,
          borderColor: `${casesTypeColors[casesType].borderColor}`,
          hoverBorderWidth: 3,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: `Worldwide ${casesType}`,
        fontSize: 15,
      },
      legend: {
        display: false,
      },
      tooltips: {},
    },
  };

  return (
    <div className="graph">
      <Line data={config.data} options={config.options} />
    </div>
  );
}

export default Graph;
