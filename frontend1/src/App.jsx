import React from 'react'
import Home from './pages/Home'
import { Routes, Route} from 'react-router-dom'
import Login from '../src/pages/Login'
import Doctors from '../src/pages/Doctors.jsx'
import Appointments from '../src/pages/Appointments'
import MyAppointments from '../src/pages/MyAppointments.jsx'
import About from '../src/pages/About.jsx'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Contact from '../src/pages/Contact.jsx'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import AiAssistant from './components/AiAssistant.jsx'

function App() {
  return (
    <div className='mx-7 overflow-x-hidden'>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:specaility" element={<Doctors />} />
        <Route path="/appointments/:doctId" element={<Appointments />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/abouts" element={<About />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/contacts" element={<Contact />} />

      </Routes>
      <AiAssistant/>
      <Footer />
      


    </div>
  )
}

export default App