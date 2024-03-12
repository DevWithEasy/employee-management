import React, { useState } from 'react';
import useUserStore from '../../_store/userStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import toast_alert from '../../_utils/toast_alert';
import {Loading_request,Heading} from '../../components/Index';
import axios from 'axios'
import baseUrl from '../../_utils/baseUrl';
import handleChange from '../../_utils/handleChange';
import Protected from '../Protected';

const Update_employee = () => {
    const {addEmployees,employees} = useUserStore();
    const {id} = useParams()
    const toast = useToast()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState(employees.find(u => u._id === id))
    const updateEmployee= async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.put(`${baseUrl}/api/employee/update/${value._id}`,value,{
                headers: {
                    authorization : localStorage.getItem('token')
                }
            })
            if(res.data.status === 200){
                setLoading(false)
                toast_alert(
                    toast,
                    res.data.message
                )
                navigate('/admin/employees')
                addEmployees(res.data.data)
            }
        } catch (error) {
            setLoading(false)
            toast_alert(
                toast,
                error?.response?.data?.message,
                'error'
            )
            console.log(error)
        }
    }
    return (
        <div className='p-2'>
            <Heading>Update Employee (Shop)</Heading>
            <form
                onSubmit={(e) => updateEmployee(e)}
                className='w-1/2 mx-auto space-y-2 p-4 bg-white rounded shadow'
            >
                <div className='space-y-2'>
                    <label htmlFor="">Name :</label>
                    <input
                        type='text'
                        name='name'
                        value={value?.name}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Phone number :</label>
                    <input
                        type='text'
                        name='phone'
                        value={value?.phone}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">NID No :</label>
                    <input
                        type='text'
                        name='nid'
                        value={value?.nid}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Address :</label>
                    <textarea
                        name='address'
                        value={value?.address}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Salary :</label>
                    <input
                        type='number'
                        name='salary'
                        value={value?.salary}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Designation :</label>
                    <input
                        type='text'
                        name='designation'
                        value={value?.designation}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                {/* <div className='space-y-2'>
                    <label htmlFor="">Joining Date :</label>
                    <input
                        type='date'
                        name='joinDate'
                        value={value?.joinDate}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div> */}
                <button
                    className='px-6 py-2 bg-sky-500 text-white rounded'
                >
                    Submit
                </button>
            </form>
            <Loading_request {...{ loading, setLoading }} />
        </div>
        
    );
};

export default Update_employee;