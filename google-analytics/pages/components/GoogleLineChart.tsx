import React, { useEffect, useState, useRef } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import 'chart.js/auto'; // ADD THIS

interface Metric {
  name: string;
  type: string;
}

interface Row {
  dimensions: string[];
  metrics: {
    values: string[];
  }[];
}

export interface ReportData {
  columnHeader: {
    dimensions: string[];
    metricHeader: {
      metricHeaderEntries: Metric[];
    };
  };
  data: {
    rows: Row[];
  };
}

const GoogleLineChart: React.FC<{ data: ReportData }> = ({ data }) => {
  console.log('data', data)
  const { rows } = data.data;
  const labels = rows.map((row) => row.dimensions[0]);
  const metrics = data.columnHeader.metricHeader.metricHeaderEntries.map((metric) => metric.name);
  const datasets = metrics.map((metric, index) => ({
    label: metric,
    data: rows.map((row) => Number(row.metrics[0].values[index])),
    borderColor: `rgb(${75 + index * 50}, ${192 - index * 25}, ${192 - index * 25})`,
    fill: false,
  }));

  const chartData = {
    labels,
    datasets,
  };
  const ref = useRef();

  return <div  style={{height:'400px'}}>
      <Line ref={ref} data={chartData} style={{maxHeight:'400px'}} />;
  </div> 
};

export default GoogleLineChart;
