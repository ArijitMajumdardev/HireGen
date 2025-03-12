
import './App.css'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom' 
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Header from './components/custom/Header'
import Footer from './components/custom/Footer'
import  toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthProvider'
import { useEffect } from 'react'

import API from './lib/ServerAPI'
import ResumeEdit from './pages/ResumeEdit'
import ResumeView from './pages/ResumeView'
import SharedResumePage from './pages/SharedResumePage'
function App() {

  const { setIsLogged, setUser } = useAuthContext()



  
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await API.get('/user-detail')
        console.log(res)
        if (res.status == 200) {
          setUser({ email: res.data.email, name: res.data.name })
        setIsLogged(true)
       }
      } catch (error) {
        console.log("LogIn")
      }
    }

    fetchUserDetail()
    
  },[])


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
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/resume/:id/edit' element={<ResumeEdit/>} />
          <Route path='/my-resume/:id/view' element={<ResumeView/>} />
          <Route path='/share/:id/view' element={<SharedResumePage/>} />
        </Routes>
        <Footer/>
      </Router>
      
      
    </>
  )
}

export default App
