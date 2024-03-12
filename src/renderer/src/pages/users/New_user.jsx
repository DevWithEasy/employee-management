import {
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, Loading_request } from '../../components/Index';
import toast_alert from '../../_utils/toast_alert';
import baseUrl from '../../_utils/baseUrl';
import handleChange from '../../_utils/handleChange';

const New_user = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: ''
    })

    const createUser = async (e) => {
        e.preventDefault()
        if (!value.name || !value.email || !value.phone || !value.password) {
            return toast_alert(
                toast,
                'Please required all field.',
                'error'
            )
        }
        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/auth/create`, value, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.status === 200) {
                setLoading(false)
                toast_alert(
                    toast,
                    res.data.message
                )
                navigate('/users')
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
        <div className='px-2'>
            <Heading>Add new user (Adminitration)</Heading>
            <form
                onSubmit={(e) => createUser(e)}
                className='p-4 space-y-4'
            >
                <div
                    className='grid grid-cols-2 gap-4'
                >
                    <div className='space-y-2'>
                        <label htmlFor="">Name :</label>
                        <input
                            type='text'
                            name='name'
                            onChange={(e) => handleChange(e, value, setValue)}
                            placeholder='Enter user name'
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">Email address :</label>
                        <input
                            type='text'
                            name='email'
                            onChange={(e) => handleChange(e, value, setValue)}
                            placeholder='Enter user email address'
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">Phone number :</label>
                        <input
                            type='text'
                            name='phone'
                            onChange={(e) => handleChange(e, value, setValue)}
                            placeholder='Enter user phone number'
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">Password :</label>
                        <input
                            type='text'
                            name='password'
                            onChange={(e) => handleChange(e, value, setValue)}
                            placeholder='Enter your password'
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Address :</label>
                    <textarea
                        name='address'
                        onChange={(e) => handleChange(e, value, setValue)}
                        placeholder='Enter user address'
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

export default New_user;