import React from 'react';
import {Heading} from '../../components/Index';
import { Link } from 'react-router-dom';

const Attendence = () => {
    return (
        <div
            className='px-2 space-y-3'
        >
            <Heading>Attendence</Heading>
            <div>
                <Link
                    to='/attendance/in'
                    className='px-4 py-1 border-l border-y'
                >
                    In time
                </Link>
                <Link
                    to='/attendence/out'
                    className='px-4 py-1 border-l border-y'
                >
                    Out Time
                </Link>
                <Link
                    to='/attendence/update'
                    className='px-4 py-1 border-l border-y'
                >
                    Update
                </Link>
                <Link
                    to='/attendence/monthly'
                    className='px-4 py-1 border-l border-y'
                >
                    Monthly
                </Link>
                <Link
                    to='/attendence/book'
                    className='px-4 py-1 border'
                >
                    Book
                </Link>
            </div>
        </div>
    );
};

export default Attendence;