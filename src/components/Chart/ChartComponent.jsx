import "./index.css";
import { Line } from "react-chartjs-2";
import {Typography, Row, Col, Input, Select } from "antd";
import Chart from "chart.js/auto";
import 'chartjs-chart-financial';

export const ChartComponent = ({coinHistory, currentPrice, coinName}) => {
    const coinPrice = []
    const coinTimeStamp = []

    for(let i = 0; i< coinHistory?.data?.history?.length; i+=1){
        coinPrice.push(coinHistory.data.history[i].price)
    }
    console.log(coinPrice, "this is price ");

    if (coinHistory && coinHistory.data && coinHistory.data.history) {
        for (let i = 0; i < coinHistory.data.history.length; i++) {
            const timestamp = coinHistory.data.history[i].timestamp;
            if (timestamp) {
            coinTimeStamp.push(new Date(timestamp * 1000).toDateString());
        }
    }
}

    console.log(coinTimeStamp);

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: "price in USD",
                data: coinPrice,
                fill: "false",
                backgroundColor: '#0071bd',
                borderColor: 'black'
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <div>
            <canvas id="candlestickChart"></canvas>
            <Row className="chart-header">
                <Typography.Title level={2} className="chart-tile">{coinName} Price Chart</Typography.Title>
                <Col className="price-container">
                    <Typography.Title level={5} className="price-change">Coin History {coinHistory?.data?.change}</Typography.Title>
                    <Typography.Title level={5} className="current-price">Current {coinName}Price: ${currentPrice}</Typography.Title>
                </Col>
            </Row>
            <Line data={data} options={options}/>
        </div>
    )
};

export default ChartComponent;