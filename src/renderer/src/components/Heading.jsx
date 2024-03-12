import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import useUserStore from '../_store/userStore';

const Heading = ({ children }) => {
    const navigate = useNavigate()
    const { user } = useUserStore()

    return (
        <div className='relative flex justify-between items-center border-b p-2 mb-2'>
            <div
                onClick={() => {
                    navigate(-1)
                }}
                className='flex items-center cursor-pointer'
            >
                <BsArrowLeft
                    size={20}
                    className='text-red-500'
                />
                <span className='text-center text-xl p-2 uppercase'>{children}</span>
            </div>
        </div>
    );
};

export default Heading;