import React, { useState } from 'react';
import month from '../../_utils/Month';
import {Heading} from '../../components/Index';
import toast_alert from '../../_utils/toast_alert';
import handleChange from '../../_utils/handleChange';
import MonthlyAttendanceBook from '../../_utils/MonthlyAttendanceBook';
import baseUrl from '../../_utils/baseUrl';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import getID from '../../_utils/getID';
import statusColor from '../../_utils/statusColor';
import Protected from '../Protected';

const Monthly_attendance_book = () => {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [new_attendance, setNew_attendance] = useState(false)
    const [data, setData] = useState([])
    const [value, setValue] = useState({
        start: month('', 'first'),
        end: month('', 'last')
    })

    const getMonthlyAttendanceBook = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/attendance/monthlybook`, value, {
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

    const updateAttendance = async (employeeId, attendanceId, date, status) => {

        try {
            const res = await axios.put(`${baseUrl}/api/attendance/update?date=${date}&employee=${employeeId}&attendance=${attendanceId}&status=${status}&create=${new_attendance}`, {}, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                toast_alert(
                    toast,
                    res.data.message,
                )
                if (new_attendance && res.data.code === 'new') {
                    const employee = data.find(e => e.employee._id == employeeId)

                    const attendances = [...employee.attendances, res.data.data]

                    const updateEmployee = { ...employee, attendances }
                    
                    const newData = data.map(e => {
                        return e.employee._id !== employeeId ? e : updateEmployee
                    })

                    setData(newData)
                }
                const employee = data.find(e => e.employee._id == employeeId)

                const attendances = employee.attendances.map(attendance => attendance._id === attendanceId ? { ...attendance, status: res.data.data.status } : attendance)

                const updateEmployee = { ...employee, attendances }

                const newData = data.map(e => {
                    return e.employee._id !== employeeId ? e : updateEmployee
                })

                setData(newData)
                // setAttendances(attendances.map(attendance => attendance._id ===attendanceId ? {...attendance,status :res.data.data.status} : attendance))
            }
        } catch (error) {
            toast_alert(
                toast,
                error?.response?.data?.message,
                'error'
            )
        }
    }

    const monthlyAttendanceBook = new MonthlyAttendanceBook(value.start, data)
    
    return (
        <div
            className='p-2'
        >
            <Heading>Monthly Attendance Book</Heading>
            <div
                className='relative w-full'
            >
                <form
                    onSubmit={(e) => getMonthlyAttendanceBook(e)}
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
                <button
                    onClick={() => setNew_attendance(!new_attendance)}
                    className={`absolute right-0 top-3 p-2 text-xs text-white rounded ${new_attendance ? 'bg-green-500' : 'bg-red-500'}`}
                >
                    {new_attendance ? 'Enable' : 'Disable'} new attendance
                </button>
            </div>
            <div
                className='bg-white overflow-x-auto'
            >
                <table
                    className='w-full'
                >
                    <thead>
                        <tr
                            className='border-b bg-gray-100'
                        >
                            <td className='sticky left-0 bg-gray-100 z-10 border'>
                                <div>
                                    <table>
                                        <tr>
                                            <td className='p-2 text-center border-r'>
                                                <span
                                                    className='block w-8'
                                                >
                                                    ID
                                                </span>
                                            </td>
                                            <td className='p-2 border-r'>
                                                <span
                                                    className='block w-40'
                                                >
                                                    Name
                                                </span>
                                            </td>
                                            <td className='p-2 text-center border-r'>
                                                <span
                                                    className='block w-16'
                                                >
                                                    Salary
                                                </span>
                                            </td>
                                            <td className='p-2 text-center border-r'>
                                                <span
                                                    className='block w-8'
                                                >
                                                    P
                                                </span>
                                            </td>
                                            <td className='p-2 text-center border-r'>
                                                <span
                                                    className='block w-8'
                                                >
                                                    L
                                                </span>
                                            </td>
                                            <td className='p-2 text-center border-r'>
                                                <span
                                                    className='block w-8'
                                                >
                                                    H
                                                </span>
                                            </td>
                                            <td className='p-2 text-center'>
                                                <span
                                                    className='block w-8'
                                                >
                                                    A
                                                </span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>

                            {
                                monthlyAttendanceBook.
                                    daysWithDay()
                                    .map(day =>
                                        <td
                                            key={day.day}
                                            className='text-center border text-sm'
                                        >
                                            <span>{day?.day}</span>
                                            <br />
                                            <span>{day?.name}</span>
                                        </td>
                                    )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            monthlyAttendanceBook
                                .attendance()
                                .map((a, i) =>
                                    <tr
                                        key={i}
                                        className='border-b hover:bg-sky-50'
                                    >
                                        <td
                                            className='sticky left-0 bg-white z-10'
                                        >
                                            <div>
                                                <table>
                                                    <tr>
                                                        <td className='p-2 text-center border-r'>
                                                            <span
                                                                className='block w-8'
                                                            >
                                                                {getID(a?.employee?.IDNo)}
                                                            </span>
                                                        </td>
                                                        <td className='p-2 border-r'>
                                                            <span
                                                                className='block w-40'
                                                            >
                                                                {a?.employee?.name}
                                                            </span>
                                                        </td>
                                                        <td className='p-2 text-center border-r'>
                                                            <span
                                                                className='block w-16'
                                                            >
                                                                {a?.employee?.salary}
                                                            </span>
                                                        </td>
                                                        <td className='p-2 text-center border-r'>
                                                            <span
                                                                className='block w-8'
                                                            >
                                                                {a?.attendance?.P}
                                                            </span>
                                                        </td>
                                                        <td className='p-2 text-center border-r'>
                                                            <span
                                                                className='block w-8'
                                                            >
                                                                {a?.attendance?.L}
                                                            </span>
                                                        </td>
                                                        <td className='p-2 text-center border-r'>
                                                            <span
                                                                className='block w-8'
                                                            >
                                                                {a?.attendance?.H}
                                                            </span>
                                                        </td>
                                                        <td className='p-2 text-center'>
                                                            <span
                                                                className='block w-8'
                                                            >
                                                                {a?.attendance?.A}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                        {
                                            a.attendances.map(attendance =>
                                                <td
                                                    key={attendance?._id}
                                                    className='p-2 text-center border'
                                                >
                                                    <select
                                                        onChange={(e) => updateAttendance(a.employee._id, attendance?.attendance?._id, monthlyAttendanceBook.findDate(attendance?.day), e.target.value)}
                                                        value={attendance?.attendance?.status}
                                                        className={`status w-7 h-7 rounded-full text-center cursor-pointer focus:outline-none ${statusColor(attendance?.attendance?.status)}`}
                                                    >
                                                        <option value=''>-</option>
                                                        <option value='P'>P</option>
                                                        <option value='A'>A</option>
                                                        <option value='H'>H</option>
                                                        <option value='L'>L</option>
                                                    </select>
                                                </td>
                                            )
                                        }
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
    );
};

export default Monthly_attendance_book;