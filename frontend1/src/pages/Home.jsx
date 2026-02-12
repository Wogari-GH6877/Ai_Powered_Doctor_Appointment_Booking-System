import React from 'react'
import Navbar from "../components/Navbar.jsx"
import Header from '../components/Header.jsx'
import Specaility from '../components/Specaility.jsx'
import TopDoctors from '../components/TopDoctors.jsx'
import Banner from '../components/Banner.jsx'
// import AiAssistant from '../components/Aiassistant.jsx '

function Home() {
  return (
    <div>
        <Header />
        <Specaility />
        <TopDoctors />
        {/* <AiAssistant/> */}
        <Banner />

    </div>
  )
}

export default Home