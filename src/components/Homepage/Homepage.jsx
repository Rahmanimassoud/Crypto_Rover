import "./index.css";
import millify from "millify";
import { Typography, Row, Col, Statistic, Spin, Alert } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Cryptocurrencies from "../Cryptocurrencies/Cryptocurrencies";
import Cryptonews from "../CryptoNews/Cryptonews";


export const Homepage = () => {
    const {data, isFetching, error} = useGetCryptosQuery(5) 
    console.log(data);

    const globalStats = data?.data?.stats;
    
    if (isFetching) {
        return <Spin />;
    }

    if (error) {
        return <Alert message="An error occurred while fetching the data" type="error" />;
    }

    if (!data) {
        return null;
    }


    return (
        <div>
        <Typography.Title level={2} className="heading">Crypto Stats</Typography.Title>
        <Row style={{gap: "10px"}}>
            <Col span={8} className="top-left"><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col>
            <Col span={8} className="top-right"><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
            <Col span={8} className="top-center"><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
            <Col span={8} className="top-center"><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
            <Col span={8} className="top-middle"><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
        </Row>
        <div className='home-heading-container'>
            <Typography.Title level={3} className="home-title">Top 5 Cryptos</Typography.Title>
            <Typography.Title level={5} className="show-more"><Link to="/cryptoCurrencies">More</Link></Typography.Title>
        </div>
        <Cryptocurrencies simplified/>
        <div className="home-heading-container">
            <Typography.Title level={3} className="home-title">News</Typography.Title>
            <Typography.Title level={5} className="show-more"><Link to="/news">More</Link></Typography.Title>
        </div>
        <Cryptonews simplified/>
        </div>

    )
};
