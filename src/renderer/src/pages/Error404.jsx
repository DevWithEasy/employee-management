import React from 'react';
import { wrong_icon } from '../assets/_icons/_icons';
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
    const navigate = useNavigate()
    return (
        <div
            className='h-screen flex flex-col justify-center items-center space-y-3'
        >
            <img
                src={wrong_icon}
                className='w-[150px]'
            />
            <p className='text-gray-500'>Somthing Went Wrong</p>
            <button
                onClick={() => {
                    navigate(-1)
                }}
                className='px-6 py-2 bg-red-500 text-white rounded-md'
            >
                Go Back
            </button>
        </div>
    );
};

export default Error404;