import "./grafic.scss"
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";



const data = [
 {name : "Ianuarie", Total: 1200},
 {name : "Februarie", Total: 2100},
 {name : "Martie", Total: 800},
 {name : "Aprilie", Total: 1600},
 {name : "Mai", Total: 900},
 {name : "Iunie", Total: 1700},
];

const Grafic = () => {
  return (
    <div className="grafic"> 
      <div className="titlu">Venituri ultimile 6 luni</div>
      <BarChart
      width={950}
      height={350}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" className="grilaDiagrama"  />
      <XAxis dataKey="name" />
      <YAxis  />
      <Tooltip  />
      <Legend  />
      <ReferenceLine y={0} stroke="white" />
      <Bar dataKey="Total" fill="#82ca9d" />
    </BarChart>
    </div>
  )
}

export default Grafic