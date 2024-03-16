import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import useStore from '../../_store/userStore';
import month from '../../_utils/Month';
import api_url from '../../_utils/api_url';
import findSection from '../../_utils/findSection';
import handleChange from '../../_utils/handleChange';
import MonthlyAttendance from '../../_utils/monthlyAttendance';
import customStyles from '../../_utils/selectStyle';
import toast_alert from '../../_utils/toast_alert';
import { Heading } from '../../components/Index';
import getID from '../../_utils/getID';

const Monthly_attendance = () => {
    const { sections } = useStore()
    const toast = useToast()
    const { sectionId, id } = useParams()
    const [loading, setLoading] = useState(false)
    const [employee, setEmployee] = useState({})
    const [attendances, setAttendances] = useState([])
    const [new_attendance, setNew_attendance] = useState(false)
    const [section, setSection] = useState(findSection(sections, sectionId))
    const [value, setValue] = useState({
        id: id,
        start: month('', 'first'),
        end: month('', 'last')
    })

    const monthlyAttendance = new MonthlyAttendance(value.start, attendances)
    const daysAttendance = monthlyAttendance.daysAttendance()

    const getEmployeeMonthlyAttendance = async () => {

        try {
            setLoading(true)
            const res = await axios.post(`${api_url}/api/attendance/monthly`,
                { ...value, section: section?.value },
                {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
            if (res.data.success) {
                setLoading(false)
                setEmployee(res.data.data.employee)
                setAttendances(res.data.data.attendances)
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

    const handleGetMonthlyEmployeeAttendence = () => {

        if (!value.id || !section.value) {
            return toast_alert(
                toast,
                'Please select employee and section',
                'error'
            )
        }
        getEmployeeMonthlyAttendance()
    }

    const updateAttendance = async (employeeId, attendanceId, date, status) => {
        try {
            const res = await axios.put(`${api_url}/api/attendance/update?date=${date}&employee=${employeeId}&attendance=${attendanceId}&status=${status}&create=${new_attendance}`, {}, {
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
                    return setAttendances([...attendances, res.data.data])
                }
                setAttendances(attendances.map(attendance => attendance._id === attendanceId ? { ...attendance, status: res.data.data.status } : attendance))
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
        getEmployeeMonthlyAttendance()
    }, [])

    console.log(employee)
    return (
        <div
            className='p-1'
        >
            <Heading>Monthly Attendance</Heading>
            <div
                className='flex justify-between gap-x-4'
            >
                <div className='w-4/12'>
                    <div
                        className='p-2 space-y-2 '
                    >
                        <div
                            className='space-y-2'
                        >
                            <label
                                className='block'
                            >Employee ID :</label>
                            <input
                                type='text'
                                name='id'
                                value={value?.id}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className='w-full p-2 border border-gray-300 focus:outline-none focus:border-sky-500'
                            />
                        </div>
                        <div
                            className='space-y-2'
                        >
                            <label
                                className='block'
                            >Section :</label>
                            <Select
                                styles={customStyles}
                                defaultValue={section}
                                onChange={setSection}
                                options={sections.map(d => {
                                    return {
                                        value: d._id,
                                        label: d.name
                                    }
                                })}
                            />
                        </div>
                        <div
                            className='space-y-2'
                        >
                            <label
                                className='block'
                            >Start Date :</label>
                            <input
                                type='date'
                                name='start'
                                value={value?.start}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className='w-full p-2 border border-gray-300 focus:outline-none focus:border-sky-500'
                            />
                        </div>
                        <div
                            className='space-y-2'
                        >
                            <label
                                className='block'
                            >End Date :</label>
                            <input
                                type='date'
                                name='end'
                                value={value?.end}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className='w-full p-2 border border-gray-300 focus:outline-none focus:border-sky-500'
                            />
                        </div>
                        <button
                            onClick={handleGetMonthlyEmployeeAttendence}
                            className='w-full py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600'
                        >
                            {loading ? 'Finding...' : 'Find'}
                        </button>
                    </div>
                    <div
                        className='mx-2 p-2 bg-white border rounded-md text-sm'
                    >
                        <table
                            className='w-full'
                        >
                            <tbody>
                                <tr
                                    className='border-b'
                                >
                                    <td
                                        className='p-1'
                                    >
                                        Total Days
                                    </td>
                                    <td
                                        className='p-1'
                                    >
                                        {monthlyAttendance.days()}
                                    </td>
                                </tr>
                                <tr
                                    className='border-b'
                                >
                                    <td
                                        className='p-1'
                                    >
                                        Total work days
                                    </td>
                                    <td
                                        className='p-1'
                                    >
                                        {monthlyAttendance.workedDay()}
                                    </td>
                                </tr>
                                <tr
                                    className='border-b'
                                >
                                    <td
                                        className='p-1'
                                    >
                                        Total present
                                    </td>
                                    <td
                                        className='p-1'
                                    >
                                        {monthlyAttendance.presentDay()}
                                    </td>
                                </tr>
                                <tr
                                    className='border-b'
                                >
                                    <td
                                        className='p-1'
                                    >
                                        Total absent
                                    </td>
                                    <td
                                        className='p-1'
                                    >
                                        {monthlyAttendance.absentDay()}
                                    </td>
                                </tr>
                                <tr
                                    className='border-b'
                                >
                                    <td
                                        className='p-1'
                                    >
                                        Total leave
                                    </td>
                                    <td
                                        className='p-1'
                                    >
                                        {monthlyAttendance.leaveDay()}
                                    </td>
                                </tr>
                                <tr
                                    className='border-b'
                                >
                                    <td
                                        className='p-1'
                                    >
                                        Total Holiday
                                    </td>
                                    <td
                                        className='p-1'
                                    >
                                        {monthlyAttendance.holiDay()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div
                    className='w-8/12 px-4 pt-2'
                >
                    <div
                        className='p-2 flex space-x-5 border'
                    >
                        <div>
                            <img
                                src={`${api_url}/image/${employee?.image}`}
                                className='w-16'
                            />
                        </div>
                        <div
                        className='text-sm'
                        >
                            <p>
                                Name : <b>{employee?.name}</b>
                            </p>
                            <p>Section : {employee?.section?.name} -  ({getID(employee?.IDNo)})</p>
                            <p>Salary : {employee?.salary}</p>
                        </div>
                    </div>
                    <h2
                        className='relative p-2 text-xl text-center'
                    >
                        {monthlyAttendance.monthName()}-
                        {monthlyAttendance.year()}
                        <button
                            onClick={() => setNew_attendance(!new_attendance)}
                            className={`absolute right-0 p-2 text-xs text-white rounded ${new_attendance ? 'bg-green-500' : 'bg-red-500'}`}
                        >
                            {new_attendance ? 'Enable' : 'Disable'} new attendance
                        </button>
                    </h2>
                    {daysAttendance.length > 0 &&
                        <div
                            className='grid grid-cols-7 gap-4'
                        >
                            {
                                daysAttendance.map(day =>
                                    <div
                                        key={day.day}
                                        className='relative h-20 w-24 shadow-2xl rounded-md bg-white group'
                                    >
                                        <p
                                            className='flex justify-between px-2 py-1 text-sm border-b'
                                        >
                                            <span>{String(day?.day).padStart(2, '0')}</span>
                                            <span>{day?.name}</span>
                                        </p>

                                        <p
                                            className={`text-xl text-center h-8 w-8 mt-2 mx-auto  flex justify-center items-center rounded-full  ${day?.attendance?.status === 'P' ? 'bg-blue-50 text-blue-500' : day?.attendance?.status === 'A' ? 'bg-red-50 text-red-500' : day?.attendance?.status === 'L' ? 'bg-yellow-50 text-yellow-500' : day?.attendance?.status === 'H' ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-500 animate-pulse transition-all duration-500'}`}
                                        >
                                            <span>{day?.attendance?.status ? day?.attendance?.status : ' '}</span>
                                        </p>
                                        <div
                                            className='absolute -top-10 -left-16 hidden p-2 space-x-2 bg-white rounded-md border shadow group-hover:block'
                                        >
                                            <button
                                                onClick={() => updateAttendance(value?.id, day?.attendance?._id, monthlyAttendance.findDate(day?.day), 'P')}
                                                className={`h-7 w-7  rounded-full ${day?.attendance?.status === 'P' ? 'bg-blue-500 text-white' : 'bg-sky-50 text-sky-500 hover:bg-blue-500 hover:text-white'}`}
                                            >
                                                P
                                            </button>
                                            <button
                                                onClick={() => updateAttendance(value?.id, day?.attendance?._id, monthlyAttendance.findDate(day?.day), 'A')}
                                                className={`h-7 w-7  rounded-full ${day?.attendance?.status === 'A' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'}`}
                                            >
                                                A
                                            </button>
                                            <button
                                                onClick={() => updateAttendance(value?.id, day?.attendance?._id, monthlyAttendance.findDate(day?.day), 'L')}
                                                className={`h-7 w-7  rounded-full ${day?.attendance?.status === 'L' ? 'bg-yellow-500 text-white' : 'bg-yellow-50 text-yellow-500 hover:bg-yellow-500 hover:text-white'}`}
                                            >
                                                L
                                            </button>
                                            <button
                                                onClick={() => updateAttendance(value?.id, day?.attendance?._id, monthlyAttendance.findDate(day?.day), 'H')}
                                                className={`h-7 w-7  rounded-full ${day?.attendance?.status === 'H' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-500 hover:bg-green-500 hover:text-white'}`}
                                            >
                                                H
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
            </div>

        </div>

    );
};

export default Monthly_attendance;