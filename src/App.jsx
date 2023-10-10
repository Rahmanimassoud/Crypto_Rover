
import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import Sidebar from './components/Sidebar/Sidebar'
import { Homepage } from './components/Homepage/Homepage'
import { Exchanges } from './components/Exchanges/Exchanges'
import CryptoDetails from './components/CryptoDetails/CryptoDetails'
import Cryptocurrencies from './components/Cryptocurrencies/Cryptocurrencies'
import Cryptonews from './components/CryptoNews/Cryptonews'


function App() {

  return (
    <div className='container'>
      <div className='sidebar'>
        <Sidebar/>
      </div>

      <div className='main-content'>
        <div className='top-section'>
          <Layout>
          <div className='routes' style={{gap: "10px"}}>
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/exchanges" element={<Exchanges/>}/>
              <Route path="/cryptoCurrencies" element={<Cryptocurrencies/>}/>
              <Route path="/crypto/:uuid" element={<CryptoDetails/>}/>
              <Route path="/news" element={<Cryptonews/>}/>
            </Routes>
          </div>
        </Layout>
        </div>
      </div>
      <div className='footer'>
        <Typography.Title  level={5}>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/news">News</Link>
          <Link to="/cryptoCurrencies">Cryptos</Link>
        </Space>
      </div>
    </div>
  )
}

export default App
