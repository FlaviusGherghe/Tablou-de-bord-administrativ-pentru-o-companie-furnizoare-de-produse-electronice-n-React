

import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip
} from "recharts";

const data = [
  {
    "name": "18-25",
    "uv": -12.47,
    "pv": 1000,
    "fill": "#8884d8"
  },
  {
    "name": "26-40",
    "uv": 12.69,
    "pv": 4567,
    "fill": "#83a6ed"
  },
  {
    "name": "41-45",
    "uv": 3.69,
    "pv": 1398,
    "fill": "#8dd1e1"
  },
  {
    "name": "56-70",
    "uv": 8.22,
    "pv": 9800,
    "fill": "#82ca9d"
  },
  {
    "name": "71+a",
    "uv": -8.63,
    "pv": 3908,
    "fill": "#a4de6c"
  },

]



export function App1() {
  return (
    <div className="graficc1"><div className="titlu"></div>
    <RadialBarChart 
  width={500} 
  height={250} 
  innerRadius="10%" 
  outerRadius="80%" 
  data={data} 
  startAngle={180} 
  endAngle={0}
>
  <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
  <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
  <Tooltip />
</RadialBarChart>
    </div>
  );
}