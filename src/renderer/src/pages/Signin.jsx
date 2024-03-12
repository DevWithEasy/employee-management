import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../_store/userStore';
import baseUrl from '../_utils/baseUrl';
import handleChange from '../_utils/handleChange';
import toast_alert from '../_utils/toast_alert';
import logo from '../assets/user.png';

const Signin = () => {
    const { addUser } = useUserStore()
    const navigate = useNavigate()
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState({
        email: '',
        password: ''
    })

    const signin = async (e) => {
        e.preventDefault()
        if (!value.email || !value.password) {
            return toast_alert(
                toast,
                'Please insert email or password',
                'error'
            )
        }
        setLoading(true)
        try {
            const res = await axios.post(`${baseUrl}/api/auth/signin`, value)

            if (res.data.status === 200) {
                toast_alert(
                    toast,
                    res.data.message
                )
                localStorage.setItem('token', res.data.token)

                addUser(res.data.data)

                navigate('/')
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            return toast_alert(
                toast,
                error.response.data.message,
                'error'
            )
        }
    }


    return (
        <div
            className='h-screen w-full flex justify-center  bg-sky-500 text-white'
        >
            <div className='pt-10 space-y-5'>
                <div>
                <img
                    src={logo}
                    className='w-[100px] mx-auto rounded-full'
                />
                <p className='text-2xl text-center'> Administration</p>
                </div>
                <form
                    onSubmit={(e) => signin(e)}
                    className='space-y-2'
                >
                    <input
                        type='text'
                        name='email'
                        onChange={(e) => handleChange(e, value, setValue)}
                        placeholder='Enter email or phone number'
                        className='w-full p-2 text-black rounded-md focus:outline-none placeholder:text-gray-300'
                    />
                    <input
                        type='text'
                        name='password'
                        onChange={(e) => handleChange(e, value, setValue)}
                        placeholder='Enter password'
                        className='w-full p-2 text-black rounded-md focus:outline-none placeholder:text-gray-300'
                    />
                    <button
                        className='w-full p-2 text-center bg-blue-700 text-white rounded-lg shadow'
                    >
                        {
                            loading ? 'Please wait...' : 'Log In'
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signin;