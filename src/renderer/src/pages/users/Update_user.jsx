import {
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heading, Loading_request } from '../../components/Index';
import toast_alert from '../../_utils/toast_alert';
import baseUrl from '../../_utils/baseUrl';
import handleChange from '../../_utils/handleChange';
import useStore from '../../_store/userStore';

const Update_user = () => {
    const { users } = useStore()
    const { id } = useParams()
    const toast = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState(users.find(u => u._id === id))
    const [check, setCheck] = useState()
    const handleCheck = (e) => {
        if (e.target.checked) {
            setCheck(true)
            setValue({
                ...value,
                change_password: true,
                new_password: ''
            })
        } else {
            setCheck(false)
            setValue({
                ...value,
                change_password: false,
                new_password: ''
            })
        }
    }

    const updateUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.put(`${baseUrl}/api/auth/update/${value._id}`, value, {
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
                navigate('/admin/users')
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
        <div className='px-2'>
            <Heading>Update user</Heading>
            <form
                onSubmit={(e) => updateUser(e)}
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
                            value={value.name}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">Email address :</label>
                        <input
                            type='text'
                            name='email'
                            value={value.email}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">Phone number :</label>
                        <input
                            type='text'
                            name='phone'
                            value={value.phone}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">User Type :</label>
                        <select
                            name='isAdmin'
                            value={value.isAdmin}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 border border-gray-300 focus:border-blue-200'
                        >
                            <option value="true">Admin</option>
                            <option value='false'>User</option>
                        </select>
                    </div>
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Address :</label>
                    <textarea
                        name='address'
                        onChange={(e) => handleChange(e, value, setValue)}
                        className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                    />
                </div>

                <div
                    className='flex items-center space-x-1'
                >
                    <input
                        id='password'
                        type='checkbox'
                        onChange={(e) => handleCheck(e)}
                    />
                    <label
                        htmlFor='password'
                        className='text-sm'
                    >
                        Update password (If want update password)
                    </label>
                </div>

                {check && <div className='space-y-2'>
                    <label htmlFor="">Password :</label>
                    <input
                        type='text'
                        name='new_password'
                        value={value.new_password}
                        onChange={(e) => handleChange(e, value, setValue)}
                        className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                    />
                </div>}
                <button
                    className='px-6 py-2 bg-sky-500 text-white'
                >
                    {
                        loading ? 'Updating...' : 'Submit'
                    }
                </button>
            </form>
        </div>
    );
};

export default Update_user;