import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  Chart,
  PointElement,
  LineElement,
} from "chart.js";
import { Col, Row, Typography } from "antd";
import { useEffect, useRef } from "react";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, coinColor }) => {
  const chartRef = useRef(null);
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i]?.timestamp * 1000
      ).toLocaleDateString()
    );
  }

  // Clear any existing chart instances before rendering a new one
  useEffect(() => {
    if (chartRef.current && chartRef.current.getContext("2d")) {
      const chart = new Chart(chartRef.current.getContext("2d"), {});
      chart.destroy();
    }
  }, [coinHistory]); // Trigger only when coinHistory changes

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price of ${coinName} in USD`,
        data: coinPrice,
        fill: false,
        backgroundColor: `${coinColor}` || "#0071bd",
        borderColor: `${coinColor}` || "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
