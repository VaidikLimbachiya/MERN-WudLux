import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer/Footer'
import Services from './Components/Services/service'
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import Slider from './Components/Header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      {/* <Slider />  */}
       <Header /> 
       <Services /> 
       <Footer /> 
    </>
  )
}

export default App
