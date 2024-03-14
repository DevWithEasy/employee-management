import {
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading_request, Heading } from '../../components/Index';
import baseUrl from '../../_utils/baseUrl';
import handleChange from '../../_utils/handleChange';
import toast_alert from '../../_utils/toast_alert';
import useStore from '../../_store/userStore';
import { getData } from '../../_api/_apicrud';
import Select from 'react-select';
import customStyles from '../../_utils/selectStyle';


const New_employee = () => {
    const { addSections, addDesignations, sections, designations } = useStore()
    const toast = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [section, setSection] = useState(null)
    const [designation, setDesignation] = useState(null)
    const [value, setValue] = useState({
        name: '',
        phone: '',
        nid: '',
        dob: '',
        address: '',
        salary: '',
        joinDate: '',
    })

    const [image, setImage] = useState()

    const createEmployee = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', value.name)
        formData.append('phone', value.phone)
        formData.append('nid', value.nid)
        formData.append('dob', value.dob)
        formData.append('address', value.address)
        formData.append('salary', value.salary)
        formData.append('designation', designation?.value)
        formData.append('section', section?.value)
        formData.append('joinDate', value.joinDate)

        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/employee/create`, formData, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setLoading(false)
                toast_alert(
                    toast,
                    res.data.message
                )
                // navigate('/employees')
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            toast_alert(
                toast,
                error?.response?.data?.message,
                'error'
            )
        }
    }

    useEffect(() => {
        getData({
            path: 'section',
            action: addSections
        })
        getData({
            path: 'designation',
            action: addDesignations
        })
    }, [])

    return (
        <div className='p-2'>
            <Heading>Add new Employee (Shop)</Heading>
            <form
                onSubmit={(e) => createEmployee(e)}
                className='p-4 space-y-3'
            >
                <div
                    className='grid grid-cols-2 gap-4'
                >
                    <div className='space-y-2'>
                        <label htmlFor="">Name :</label>
                        <input
                            type='text'
                            name='name'
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
                            onChange={(e) => handleChange(e, value, setValue)}
                            required
                            className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">DOB :</label>
                        <input
                            type='date'
                            name='dob'
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
                            onChange={(e) => handleChange(e, value, setValue)}
                            required
                            className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">Joining Date :</label>
                        <input
                            type='date'
                            name='joinDate'
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
                            className='pb-2 rounded-none'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">Section :</label>
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
                            className='pb-2 rounded-none'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">Image :</label>
                        <input
                            type='file'
                            name='image'
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                            className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                </div>
                <div className='space-y-2'>
                    <label htmlFor="">Address :</label>
                    <textarea
                        name='address'
                        onChange={(e) => handleChange(e, value, setValue)}
                        required
                        className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <button
                    className='px-6 py-2 bg-sky-500 text-white'
                >
                    Submit
                </button>
            </form>
            <Loading_request {...{ loading, setLoading }} />
        </div>

    )
};

export default New_employee;