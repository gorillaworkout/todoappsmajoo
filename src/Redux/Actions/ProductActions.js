import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Majoo} from '../../Helpers/apiUrl'
toast.configure()

export const GetAllProduct=()=>{
    return (dispatch)=>{
        axios.get(`${Majoo}`)
        .then((res)=>{
            console.log(res.data)
            var allData = res.data
            var getAllProgress = []
            var getAllSuccess  = []
            allData.forEach((val,index,array)=>{
                if(val.status === 0){
                    getAllProgress.push(val)
                }else {
                    getAllSuccess.push(val)
                }

                if(index === array.length - 1){
                    // console.log(index)
                    // console.log(getAllProgress)
                    // console.log(getAllSuccess)
                    // console.log(allData)
                    dispatch({type:'GETALLPRODUCT',
                    allProduct:allData,
                    allOnProgress:getAllProgress,
                    allOnSuccess:getAllSuccess})
                }
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
}