
import './App.css'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom' 
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Header from './components/custom/Header'
import Footer from './components/custom/Footer'
import  { Toaster } from 'react-hot-toast';
function App() {


  return (
    <>
      <Router>
        <Header />
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <Routes>
          
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
        <Footer/>
      </Router>
      
      
    </>
  )
}

export default App
