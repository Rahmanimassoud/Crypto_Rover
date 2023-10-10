import "./Sidebar";
import { Button, Typography, Menu, Avatar } from 'antd'
import { Link } from "react-router-dom";
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";
import icon from '/src/assets/images/logo.jpg'
import newL from '/src/assets/images/newL.jpg'

const Sidebar = () => {
    return (
        <div className='sidebar' style={{position: "fixed"}}>
            <div className='logo-container' style={{display: "flex", gap: "5px"}}>
            <Avatar size={"large"} src={<img src={newL} alt="avatar" />}/>
            <Typography.Title level={2} className="logo">
                <Link to="/">Crypto_Rover</Link>
            </Typography.Title>
            </div>
            <Menu theme="" >
                <Menu.Item icon={<HomeOutlined/>}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined/>}>
                    <Link to="/cryptoCurrencies">CryptoCurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined/>}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined/>}>
                    <Link to="/news">Crypto News</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
};

export default Sidebar;
