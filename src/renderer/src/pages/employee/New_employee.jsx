import {
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Loading_request,Heading} from '../../components/Index';
import baseUrl from '../../_utils/baseUrl';
import handleChange from '../../_utils/handleChange';
import toast_alert from '../../_utils/toast_alert';
import Protected from '../Protected';

const New_employee = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState({
        name: '',
        phone: '',
        nid: '',
        dob : '',
        address: '',
        salary : '',
        designation : '',
        joinDate : '',
    })

    const [image,setImage] = useState()

    const createEmployee = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image',image)
        formData.append('name',value.name)
        formData.append('phone',value.phone)
        formData.append('nid',value.nid)
        formData.append('dob',value.dob)
        formData.append('address',value.address)
        formData.append('salary',value.salary)
        formData.append('designation',value.designation)
        formData.append('joinDate',value.joinDate)

        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/employee/create`, formData, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setLoading(false)
                toast_alert(
                    toast,
                    res.data.message
                )
                navigate('/admin/employees')
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            toast_alert(
                toast,
                error?.response?.data?.message,
                'error'
            )
        }
    }
    return (
        <div className='p-2'>
            <Heading>Add new Employee (Shop)</Heading>
            <form
                onSubmit={(e) => createEmployee(e)}
                className='w-1/2 mx-auto space-y-2 p-4 bg-white rounded shadow'
            >
                <div className='space-y-2'>
                    <label htmlFor="">Name :</label>
                    <input
                        type='text'
                        name='name'
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
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">DOB :</label>
                    <input
                        type='date'
                        name='dob'
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Address :</label>
                    <textarea
                        name='address'
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
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Joining Date :</label>
                    <input
                        type='date'
                        name='joinDate'
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Image :</label>
                    <input
                        type='file'
                        name='image'
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <button
                    className='px-6 py-2 bg-sky-500 text-white rounded'
                >
                    Submit
                </button>
            </form>
            <Loading_request {...{ loading, setLoading }} />
        </div>
        
    )
};

export default New_employee;