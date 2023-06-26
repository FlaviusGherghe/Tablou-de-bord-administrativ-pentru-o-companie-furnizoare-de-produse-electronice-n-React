import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

const data = [
  {
    subject: "Marketing",
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: "Vanzari",
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: "Produs",
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: "Finante",
    A: 99,
    B: 100,
    fullMark: 150
  },

];

export default function Grafic3() {
  return (
    <div className="graficc3"><div className="titlu">Venit pe departament + varsta angajati pe categorii</div>
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={580}
      height={420}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
    </div>
  );
}
