import React,{useState,useEffect} from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {GetAllProduct} from './Redux/Actions/ProductActions'
import {useDispatch,useSelector} from 'react-redux'

import {FullPageLoading} from './Components/Loading/Loading.jsx'


function App() {
  const dispatch = useDispatch()


  const [loading,setLoading]=useState(true)
  const [allData,setAllData]=useState([])

  useEffect(()=>{
      // var allData = JSON.parse(localStorage.getItem('allData'))

      // if(allData){

      // }else {
      // }
      dispatch(GetAllProduct())
      setLoading(false)
  })



  if(loading){
    // console.log('masih stuck di app page baru jalan')
    return (
      <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
          {FullPageLoading(loading,100,'#0095DA')}
      </div>
    )
  }
  
  return (
    
    <Switch>
      <Route exact path='/' component={Home}/>
    </Switch>
 
  );
}

export default App;
