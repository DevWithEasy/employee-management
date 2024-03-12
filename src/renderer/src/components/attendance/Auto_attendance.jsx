import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import baseUrl from '../../_utils/baseUrl';
import EmployeeCard from '../employee/EmployeeCard';
import Scanner_Attendance from './Scanner_attendance';
import done from '../../assets/done.gif'
import alreadyDone from '../../assets/alreadyDone.gif'
import failed from '../../assets/failed.gif'

const Auto_attendance = () => {
    const [scaneSearch, setScaneSearch] = useState('')
    const audioRef = useRef(null)
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')
    const [employee, setEmployee] = useState({})

    const image = code === 'Done' ? done : code === 'Already Done' ? alreadyDone : failed

    const handleScanSearch = async (result) => {
        if (!result) return

        if (!scaneSearch.length === 24) {
            return toast({
                id: result,
                title: 'QR not accurate againt our policy',
                status: 'error',
                isClosable: true,
            })
        } else {
            if (audioRef.current) {
                audioRef?.current?.play();
            }
        }

        try {
            const res = await axios.post(`${baseUrl}/api/attendance/create/${result}?status=P`, {}, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setEmployee(res.data.data)
                setCode(res.data.code)
                setMessage(res.data.message)

                setTimeout(() => {
                    setScaneSearch('')
                }, 1000)
                
                setTimeout(() => {
                    setCode('')
                    setMessage('')
                    setEmployee({})
                }, 5000)
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        handleScanSearch(scaneSearch)
    }, [scaneSearch])
    return (
        <div>
            <h2
                className='text-3xl font-bold text-center p-2 text-sky-500'
            >
                Auto Attendence By Employee ID Card
            </h2>
            <div
                className='flex space-x-4'
            >
                <div
                    className='w-4/12'
                >
                    <Scanner_Attendance {...{ setScaneSearch, audioRef }} />
                </div>
                <div
                    className='w-8/12 flex justify-between'
                >
                    {code && employee ?
                        <div
                            className='w-full flex justify-between items-center'
                        >
                            <div
                                className='w-4/12 flex flex-col justify-center items-center'
                            >
                                <img
                                    src={image}
                                />
                                <p
                                    className=' border border-double bg-white p-2 rounded'
                                >
                                    {message}
                                </p>
                            </div>
                            <div
                                className='w-8/12 flex justify-center'
                            >
                                {employee.name &&
                                    <EmployeeCard {...{ employee }} />
                                }
                            </div>
                        </div>
                        :
                        <div
                            className='w-full flex justify-center items-center'
                        >
                            <p className='text-4xl animate-pulse'>Waiting...</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Auto_attendance;