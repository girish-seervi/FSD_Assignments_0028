import React from 'react'
import HeroSection from '../components/Hero/Hero'
import About from '../components/About/About'
import Qualities from '../components/Qualities/Qualities'
import Menu from '../components/Menu/Menu'
import WhoAreWe from '../components/WhoAreWe/WhoAreWe'
import Team from '../components/Team/Team'
import Reservation from '../components/ReservationForm/ReservationForm'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <HeroSection/>
      <About/>
      <Qualities/>
      <Menu/>
      <WhoAreWe/>
      <Team/>
      <Reservation/>
      <Footer/>
    </>
  )
}

export default Home
