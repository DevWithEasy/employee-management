import api_url from "../_utils/api_url";
import toast_alert from "../_utils/toast_alert"
import axios from 'axios';

export const createData=async(data)=>{
    const {path,action,toast} = data
    try {
        const res = await axios.get(``,{
            headers : {
                authorization : localStorage.getItem('token'),
            }
        })
        if(res.data.success){
            toast_alert(
                toast,
                res.data.message
            )
        }
    } catch (error) {
        toast_alert(
            toast,
            res.data.message,
            'error'
        )
    }
}


export const updateData=async(data)=>{
    const {path,value,action,action_path,toast,setLoading,setView} = data
    try {
        setLoading(true)
        const res = await axios.put(`${api_url}/api/${path}`,value,{
            headers : {
                authorization : localStorage.getItem('token'),
            }
        })
        if(res.data.success){
            setLoading(false)
            action(action_path,res.data.data)
            toast_alert(
                toast,
                res.data.message
            )
            setView(false)
        }
    } catch (error) {
        setLoading(false)
        toast_alert(
            toast,
            error?.response?.data?.message,
            'error'
        )
    }
}


export const getData=async(data)=>{
    const {toast,path,action} = data
    try {
        const res = await axios.get(`${api_url}/api/${path}`,{
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        if(res.data.success){
            action(res.data.data)
        }
    } catch (error) {
        toast_alert(
            toast,
            error?.response?.data?.message,
            'error'
        )
    }
}
