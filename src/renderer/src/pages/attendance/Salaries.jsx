import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import {Heading} from '../../components/Index';
import month from '../../_utils/Month';
import baseUrl from '../../_utils/baseUrl';
import getID from '../../_utils/getID';
import handleChange from '../../_utils/handleChange';
import MonthlySalary from '../../_utils/monthlySalary';
import toast_alert from '../../_utils/toast_alert';
import Protected from '../Protected';

const Salary = () => {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const [value, setValue] = useState({
        start: month('', 'first'),
        end: month('', 'last')
    })
    const getEmployeeMonthlySalary = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/attendance/salary`, value, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setLoading(false)
                setData(res.data.data)
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
    const monthlySalary = new MonthlySalary(value.start,data)
    const employees = monthlySalary.employees()
    // console.log(monthlySalary.totalPayable())
    return (
        <div
            className='p-2'
        >
            <Heading>Salary</Heading>
            <div
                className=''
            >
                <div
                    className='w-full'
                >
                    <form
                        onSubmit={(e) => getEmployeeMonthlySalary(e)}
                        className='w-full p-2 flex space-x-2'
                    >
                        <input
                            type='date'
                            name='start'
                            value={value?.start}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-3/12 p-2 border rounded-md border-gray-300 focus:outline-none focus:border-sky-500'
                        />
                        <input
                            type='date'
                            name='end'
                            value={value?.end}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-3/12 p-2 border rounded-md border-gray-300 focus:outline-none focus:border-sky-500'
                        />
                        <button
                            type='submit'
                            className='w-32 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600'
                        >
                            {loading ? 'Finding...' : 'Find'}
                        </button>
                    </form>
                </div>
                <div
                    className='bg-white'
                >
                    <table
                        className='w-full'
                    >
                        <thead>
                            <tr
                                className='border-b bg-gray-100'
                            >
                                <td className='p-2'>ID</td>
                                <td className='p-2'>Name</td>
                                <td className='p-2'>Salary</td>
                                <td className='p-2'>Payable</td>
                                <td className='p-2'>P</td>
                                <td className='p-2'>L</td>
                                <td className='p-2'>H</td>
                                <td className='p-2'>A</td>
                            </tr>
                        </thead>
                        <tbody>
                            {employees &&
                                employees.map(employee =>
                                    <tr
                                        key={employee._id}
                                        className='border-b'
                                    >
                                        <td className='p-2'>{getID(employee?.IDNo)}</td>
                                        <td className='p-2'>{employee?.name}</td>
                                        <td className='p-2'>{employee?.salary}</td>
                                        <td className='p-2'>{employee?.payable}</td>
                                        <td className='p-2'>{employee?.attendance?.P}</td>
                                        <td className='p-2'>{employee?.attendance?.L}</td>
                                        <td className='p-2'>{employee?.attendance?.H}</td>
                                        <td className='p-2'>{employee?.attendance?.A}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    );
};

export default Salary;