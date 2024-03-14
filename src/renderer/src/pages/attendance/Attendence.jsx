import React, { useState } from 'react';
import {Heading} from '../../components/Index';
import { useNavigate } from 'react-router-dom';
import MonthlyBook_View from '../../components/attendence/MonthlyBook_View';
import Monthly_View from '../../components/attendence/Monthly_View';

const Attendence = () => {
    const navigate = useNavigate()
    const [bookView,setBookView] = useState(false)
    const [monthlyView,setMonthlyView] = useState(false)
    const [] = useState()
    const [] = useState()
    const [] = useState()
    return (
        <div
            className='px-2 space-y-3'
        >
            <Heading>Attendence</Heading>
            <div>
                <button
                    onClick={()=>navigate('/attendence/in')}
                    className='px-4 py-1 border-l border-y'
                >
                    In time
                </button>
                <button
                    onClick={()=>navigate('/attendence/out')}
                    className='px-4 py-1 border-l border-y'
                >
                    Out Time
                </button>
                <button
                    onClick={()=>navigate()}
                    to='/attendence/update'
                    className='px-4 py-1 border-l border-y'
                >
                    Update
                </button>
                <Monthly_View/>
                <MonthlyBook_View/>
            </div>
        </div>
    );
};

export default Attendence;