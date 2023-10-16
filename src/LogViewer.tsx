import { ChangeEvent, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  LogarithmicScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Grid } from "@mui/material";

import FileInputButton from "./FileInputButton";
import JsonViewer from "./JsonViewer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface jsonDataProps {
  enum_map: {
    StockTradeAction: {
      [key: string]: number;
    };
  };
  metadata: {
    [key: string]: string | number;
  };
  batch_logs: {
    loss: number;
    lr: number;
    rewards: number[];
    actions: number[];
  }[];
}

const LogViewer = () => {
  const [data, setData] = useState<jsonDataProps>();
  const [loss, setLoss] = useState<number[]>([]);
  const [lr, setLr] = useState<number[]>([]);
  const [rewards, setRewards] = useState<number[]>([]);
  const [buyActions, setBuyActions] = useState<number[]>([]);
  const [sellActions, setSellActions] = useState<number[]>([]);
  const [holdActions, setHoldActions] = useState<number[]>([]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files?.item(0);
    reader.onload = () => {
      const jsonData: jsonDataProps = JSON.parse(reader.result as string);
      setData(jsonData);
      jsonData.batch_logs.forEach((batch) => {
        setLoss((prev) => [...prev, batch.loss]);
        setLr((prev) => [...prev, batch.lr]);
        setRewards((prev) => [
          ...prev,
          batch.rewards.reduce((a, b) => a + b, 0) / batch.rewards.length,
        ]);
        setBuyActions((prev) => [
          ...prev,
          batch.actions.filter((action) => action === 0).length,
        ]);
        setSellActions((prev) => [
          ...prev,
          batch.actions.filter((action) => action === 1).length,
        ]);
        setHoldActions((prev) => [
          ...prev,
          batch.actions.filter((action) => action === 2).length,
        ]);
      });
    };
    if (file) reader.readAsText(file);
  };

  const lossData = {
    labels: Array.from({ length: loss.length }, (v, i) => i),
    datasets: [
      {
        label: "Loss",
        data: loss,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const lrData = {
    labels: Array.from({ length: lr.length }, (v, i) => i),
    datasets: [
      {
        label: "Lr",
        data: lr,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const rewardsData = {
    labels: Array.from({ length: rewards.length }, (v, i) => i),
    datasets: [
      {
        label: "Rewards",
        data: rewards,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const actionData = {
    labels: Array.from({ length: buyActions.length }, (v, i) => i),
    datasets: [
      {
        label: "Buy",
        data: buyActions,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Sell",
        data: sellActions,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Hold",
        data: holdActions,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <>
      <FileInputButton onChange={handleFile}>Upload</FileInputButton>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Line
            options={{
              ...options,
              scales: {
                x: {
                  display: true,
                },
                y: {
                  display: true,
                  type: "logarithmic",
                },
              },
            }}
            data={lossData}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Line options={options} data={lrData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Line options={options} data={rewardsData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Line options={options} data={actionData} />
        </Grid>
        <Grid item xs={12}>
          <JsonViewer data={data ?? {}} />
        </Grid>
      </Grid>
    </>
  );
};

export default LogViewer;
