import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useStore from '../../_store/userStore';
import api_url from '../../_utils/api_url';
import handleChange from '../../_utils/handleChange';
import toast_alert from '../../_utils/toast_alert';
import { Heading, Loading_request } from '../../components/Index';
import { getData } from '../../_api/_apicrud';
import Select from 'react-select'
import customStyles from '../../_utils/selectStyle';
import findSection from '../../_utils/findSection';

const Update_employee = () => {
    const { addEmployees, employees, addDesignations, designations } = useStore();
    const { id } = useParams()
    const toast = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState(employees.find(u => u._id === id))
    const [designation, setDesignation] = useState(findSection(designations,value.designation._id))
    const updateEmployee = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.put(`${api_url}/api/employee/update/${value._id}`, 
            {
                ...value,
                designation : designation?.value
            }
            , {
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
                navigate(`/employees?q=${value?.section?._id}`)
                // addEmployees(res.data.data)
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
    useEffect(() => {
        getData({
            path: 'designation',
            action: addDesignations
        })
    }, [])

    
    return (
        <div className='p-2'>
            <Heading>Update Employee (Shop)</Heading>
            <div
                className='grid grid-cols-2 gap-4'
            >
                <div className='space-y-2'>
                    <label htmlFor="">Name :</label>
                    <input
                        type='text'
                        name='name'
                        value={value?.name}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Phone number :</label>
                    <input
                        type='text'
                        name='phone'
                        value={value?.phone}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">NID No :</label>
                    <input
                        type='text'
                        name='nid'
                        value={value?.nid}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Salary :</label>
                    <input
                        type='number'
                        name='salary'
                        value={value?.salary}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Designation :</label>
                    <Select
                        styles={customStyles}
                        defaultValue={designation}
                        onChange={setDesignation}
                        options={designations.map(d => {
                            return {
                                value: d._id,
                                label: d.name
                            }
                        })}
                    />
                </div>
            </div>
            <div
                className='pt-4 space-y-4'
            >
                <div className='space-y-2'>
                    <label htmlFor="">Address :</label>
                    <textarea
                        name='address'
                        value={value?.address}
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <button
                    onClick={updateEmployee}
                    className='px-6 py-2 bg-sky-500 text-white rounded'
                >
                    Save Changes
                </button>
            </div>
            <Loading_request {...{ loading, setLoading }} />
        </div>

    );
};

export default Update_employee;