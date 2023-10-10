import "./index.css";

import { Link } from "react-router-dom";
import {Select,Row,Col,Input,Typography,Avatar,Card,} from "antd";
import moment from "moment/moment";
import { useGetNewsQuery } from "../../services/cryptoNews";


const Cryptonews = ({simplified}) => {


    
    const {data: news, error, isLoading} = useGetNewsQuery({category: 'Cryptocurrency', count: simplified ? 5 : 20});

    if (isLoading) return "loading";
    if (error) return "error";

    // change the object to array so we can map over it, the api data was object
    const newsArray = Object.values(news);

    return (
        <Row gutter={[24, 24]}>
            {newsArray.map((oneNews, index) => (
                <Col key={index} xs={24} sm={12} lg={8}>
                    <Card hoverable className="news-card">
                        <a href={oneNews.link} target="_blank" rel="noopener noreferrer">
                            <div className="news-image-container">
                                <Typography.Title level={5} className="news-title">
                                    {oneNews.title.length > 30 ? `${oneNews.title.substring(0, 30)}...` : oneNews.title}
                                </Typography.Title>
                                <p>Publisher:{oneNews.publisher}</p>
                                <img style={{maxWidth: "100px", maxHeight: "100px"}} src={oneNews?.thumbnail?.resolutions[0]?.url} alt={oneNews.title} />
                            </div>
                            <Typography.Text>
                                {oneNews.description}
                            </Typography.Text>
                            <div className="provider-container">
                                <div>
                                    <Typography.Text >{moment(oneNews.datePublished).startOf('ss').fromNow()}</Typography.Text>
                                </div>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
};

export default Cryptonews;
