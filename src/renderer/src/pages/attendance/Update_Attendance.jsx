import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import baseUrl from '../../_utils/baseUrl';
import { Heading } from '../../components/Index';
import getID from '../../_utils/getID';
import today from '../../_utils/today';
import toast_alert from '../../_utils/toast_alert';
import Protected from '../Protected';


const Update_Attendance = () => {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState([])
    const [date, setDate] = useState(today())

    const handleDate = (e) => {
        var selectedDate = new Date(e.target.value)

        var today = new Date();

        today.setUTCHours(0, 0, 0, 0)

        if (selectedDate > today) {
            toast_alert(
                toast,
                'Pleae selcet less date from today.',
                'error'
            )
        } else {
            setDate(e.target.value)
        }
    }

    const getAllEmployee = async (date) => {
        try {
            setLoading(true)
            const res = await axios.get(`${baseUrl}/api/attendance/update?date=${date}`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setLoading(false)
                setEmployees(res.data.data)
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

    const updateAttendance = async (employeeId, attendanceId, status) => {
        try {
            const res = await axios.put(`${baseUrl}/api/attendance/update?date=${date}&employee=${employeeId}&attendance=${attendanceId}&status=${status}`, {}, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                toast_alert(
                    toast,
                    res.data.message,
                )
                setEmployees(employees.map(employee => employee._id === employeeId ? { ...employee, attendance: { _id: res.data.data._id, status: res.data.data.status } } : employee))
            }
        } catch (error) {
            toast_alert(
                toast,
                error?.response?.data?.message,
                'error'
            )
        }
    }

    useEffect(() => {
        getAllEmployee(date)
    }, [date])


    return (
        <div
                className='p-2'
            >
                <Heading>Update Daily Attendance</Heading>
                <div
                    className='space-y-2'
                >
                    <input
                        type='date'
                        value={date}
                        onChange={(e) => handleDate(e)}
                        className='w-1/4 p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    />
                    <table
                        className='w-1/2'
                    >
                        <thead
                            className='bg-slate-200'
                        >
                            <tr>
                                <td className='px-4 py-2'>ID No</td>
                                <td className='px-4 py-2'>Name</td>
                                <td className='px-4 py-2'>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {employees &&
                                employees.map(employee =>
                                    <tr
                                        key={employee._id}
                                        className='bg-white border-b'
                                    >
                                        <td
                                            className='px-4 py-2'
                                        >
                                            {getID(employee?.IDNo)}
                                        </td>
                                        <td
                                            className='px-4 py-2'
                                        >
                                            {employee?.name}
                                        </td>
                                        <td
                                            className='px-4 py-2 space-x-2'
                                        >
                                            <button
                                                onClick={() => updateAttendance(employee?._id, employee?.attendance?._id, 'P')}
                                                className={`h-7 w-7  rounded-full ${employee?.attendance?.status === 'P' ? 'bg-blue-500 text-white' : 'bg-sky-50 text-sky-500'}`}
                                            >
                                                P
                                            </button>
                                            <button
                                                onClick={() => updateAttendance(employee?._id, employee?.attendance?._id, 'A')}
                                                className={`h-7 w-7  rounded-full ${employee?.attendance?.status === 'A' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-500'}`}
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => updateAttendance(employee?._id, employee?.attendance?._id, 'L')}
                                                className={`h-7 w-7  rounded-full ${employee?.attendance?.status === 'L' ? 'bg-yellow-500 text-white' : 'bg-yellow-50 text-yellow-500'}`}
                                            >
                                                L
                                            </button>
                                            <button
                                                onClick={() => updateAttendance(employee?._id, employee?.attendance?._id, 'H')}
                                                className={`h-7 w-7  rounded-full ${employee?.attendance?.status === 'H' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-500'}`}
                                            >
                                                H
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default Update_Attendance;