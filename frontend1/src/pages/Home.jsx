import React from 'react'
import Navbar from "../components/Navbar.jsx"
import Header from '../components/Header.jsx'
import Specaility from '../components/Specaility.jsx'
import TopDoctors from '../components/TopDoctors.jsx'
import Banner from '../components/Banner.jsx'

function Home() {
  return (
    <div>
        <Header />
        <Specaility />
        <TopDoctors />
        <Banner />
    </div>
  )
}

export default Home