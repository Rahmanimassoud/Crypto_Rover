import "./index.css";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {Typography, Row, Col, Input, Select } from "antd";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from "../../services/cryptoApi";
import ChartComponent from '../Chart/ChartComponent'


const { Option } = Select;

const CryptoDetails = () => {

    const {uuid} = useParams()
    // console.log(uuid);


    
    const [timePeriod, setTimePeriod] = useState('7d')

    const {data, isFetching} = useGetCryptoDetailsQuery(uuid)
    const {data: coinHistory} = useGetCryptoHistoryQuery({uuid, timePeriod})
    console.log(data);
    const detailsOfCrypto = data?.data?.coin;
    // console.log(detailsOfCrypto);
    console.log(coinHistory);



    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    return (
        <div>
            <div className="details-container">
            <Col className="coin-details">
                <Col className="coin-heading-container">
                    
                    
                    {detailsOfCrypto ? (
                        <>
                        <Typography.Title level={2} className="coin-details-heading">
                            {detailsOfCrypto.name}({detailsOfCrypto.symbol})
                        </Typography.Title>
                        <Typography.Text className="coin-details-heading">
                        <p>{detailsOfCrypto.name} live price, statistics, market cap, rank, and 24h volume</p>
                        </Typography.Text>
                        <Col className="coin-details-colum-container">
                            <Col>
                                <Typography.Text level={2} className="coin-details-heading">
                                    <DollarCircleOutlined /> ${detailsOfCrypto.price && millify(detailsOfCrypto.price)}
                                </Typography.Text> 
                            </Col>
                            <Col>
                                <Typography.Text level={3} className="coin-details-heading">
                                    <NumberOutlined /> Rank: {detailsOfCrypto.rank}
                                </Typography.Text>
                            </Col>
                            <Col>
                                <Typography.Text level={3} className="coin-details-heading">
                                    <ThunderboltOutlined /> 24h Volume: ${detailsOfCrypto['24hVolume'] && millify(detailsOfCrypto['24hVolume'])}
                                </Typography.Text>
                            </Col>
                            <Col>
                                <Typography.Text level={3} className="coin-details-heading">
                                <DollarCircleOutlined /> Market Cap: ${detailsOfCrypto.marketCap && millify(detailsOfCrypto.marketCap)}
                                </Typography.Text> 
                            </Col>
                            <Col>
                                <Typography.Text level={3} className="coin-details-heading">
                                <TrophyOutlined /> All-time-high: ${millify(detailsOfCrypto.allTimeHigh.price)}
                                </Typography.Text> 
                            </Col>
                        </Col>
                        <br />


                        {/* Other Stattistics section */}


                        <Typography.Title level={2} className="coin-details-heading">
                            Other Statistics
                        </Typography.Title>
                        
                        <Col className="coin-details-colum-container">
                            <Col>
                                <Typography.Text level={2} className="coin-details-heading">
                                    <FundOutlined /> Number of Markets: {detailsOfCrypto.numberOfMarkets}
                                </Typography.Text> 
                            </Col>
                            <Col>
                                <Typography.Text level={3} className="coin-details-heading">
                                    <MoneyCollectOutlined /> Number Of Exchanges:{detailsOfCrypto.numberOfExchanges }
                                </Typography.Text>
                            </Col>
                            <Col>
                                <Typography.Text level={3} className="coin-details-heading">
                                <ExclamationCircleOutlined /> Aprroved Supply: { `${detailsOfCrypto.approvedSupply}` ? <CheckOutlined /> : <ExclamationCircleOutlined />}
                                </Typography.Text>
                            </Col>
                        </Col>

                        {/* link section */}
                        <Col className="coin-desc-link">
                            <Row className="coin-desc">
                                <Typography.Title level={3} className="coin-details-heading">
                                    What is {detailsOfCrypto.name} ?
                                    <p>
                                        {HTMLReactParser(detailsOfCrypto.description)}
                                    </p>
                                </Typography.Title>
                            </Row>
                            <Col className="coin-links">
                                <Typography.Title level={3}>
                                    Links
                                </Typography.Title>
                                {detailsOfCrypto.links.map((link, index)=> (
                                    <Row key={index} className="coin-link">
                                        <Typography.Title level={5} className="link-name">
                                            {link.type}
                                        </Typography.Title>
                                        <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                                    </Row>
                                ))}
                            
                            </Col>
                        </Col>
                             {/* Time Period Select */}
                            <Select
                                defaultValue="7d"
                                className="select-timeperiod"
                                placeholder="Select Time Period"
                                onChange={(value) => setTimePeriod(value)}
                            >
                                {time.map((date) => (
                                <Option key={date}>{date}</Option>
                                ))}
                            </Select>
                        <ChartComponent coinHistory={coinHistory} currentPrice={millify(detailsOfCrypto.price)} coinName={detailsOfCrypto.name}/>
                        </>
                    ) : (
                        <p>Loading...</p>
                )}
                
                </Col>

            </Col>
            
        </div>
        </div>
    )
};

export default CryptoDetails;
