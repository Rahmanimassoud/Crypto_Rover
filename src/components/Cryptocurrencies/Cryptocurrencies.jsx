import "./index.css";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { useEffect, useState } from "react";

const Cryptocurrencies = ({simplified}) => {
        // set a count variable to keep track of cryptos so we can specify how many to show in home page bu using simplified
        const count = simplified ? 5 : 100;  

        // get the data from cryptoapi.jsx and destructure it
        const {data, isFetching} = useGetCryptosQuery(count);
    
    // create the state for cryptos
        const [cryptos, setCryptos] = useState([]);
        // console.log(cryptos);
        // console.log(count);
    
        // create state for input field
        const [search, setSearch] = useState("")
    
        useEffect(()=> {
            setCryptos(data?.data?.coins)
    
            // filter the data
            const filteredData = data?.data?.coins.filter((oneCoin) => oneCoin.name.toLowerCase().includes(search.toLowerCase()))
            setCryptos(filteredData)
        }, [data, search])



    return (
        <div>
                    {
            ! simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Crypto" onChange={(e)=> setSearch(e.target.value)}/>
                </div>
            )
        }
            <Row gutter={[32, 32]} className="crypto-card-container">
                {
                    cryptos?.map((eachCrypto)=> (
                        <Col xs={24} sm={12} lg={6} className="crypto-card" key={eachCrypto.uuid}>
                            <Link to={`/crypto/${eachCrypto.uuid}`}>
                                <Card title={`${eachCrypto.rank}. ${eachCrypto.name}. ${eachCrypto.symbol}`} hoverable>
                                <img className="crypto-image" src={eachCrypto.iconUrl} alt="Icon" style={{width: "50", height: "50px"}}/>
                                <p>Price: {millify(eachCrypto.price)}</p>
                                <p>MarketCap: {millify(eachCrypto.marketCap)}</p>
                                <p>Daily Change: {millify(eachCrypto.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
};

export default Cryptocurrencies;
