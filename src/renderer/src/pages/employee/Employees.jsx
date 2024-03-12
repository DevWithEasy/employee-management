import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDelete, MdEditSquare, MdInfo } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../_store/userStore';
import baseUrl from '../../_utils/baseUrl';
import toast_alert from '../../_utils/toast_alert';
import { employee_icon, selection_icon } from '../../assets/_icons/_icons';
import { Delete_data, Heading, Loading_request } from '../../components/Index';

const Employees = () => {
    const { addEmployees, employees } = useUserStore()
    const toast = useToast()
    const navigate = useNavigate()
    const [remove, setRemove] = useState(false)
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [section, setSection] = useState(null)

    const getAllEmployee = async (e) => {
        setSection(e.target.value)
        setLoading(true)
        if(!e.target.value){
            return
        }
        try {
            const res = await axios.get(`${baseUrl}/api/employee/${e.target.value}`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setLoading(false)
                addEmployees(res.data.data)
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

    return (
        <div
            className='p-2'
        >
            <Heading>All Employees</Heading>
            <div
                className='mb-2 flex items-center'
            >
                <select
                    onChange={(e) => getAllEmployee(e)}
                    className='w-[150px] py-[5px] px-2 border-l border-y border-gray-300 focus:outline-none placeholder:text-gray-300 placeholder:text-sm rounded-l'
                >
                    <option value=''>Select section</option>
                    <option value='chancur'>Chanachur</option>
                    <option value=''>Chanachur</option>
                </select>
                <input
                    type="search"
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    placeholder='Search by id'
                    className='w-[250px] py-[4.5px] px-4 border border-l-none border-gray-300 focus:outline-none placeholder:text-gray-300 placeholder:text-sm rounded-r'
                />
            </div>
            {section ?
                <>
                    {employees.length > 0 ?
                        <div className="relative overflow-x-auto space-y-3">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Image
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Phone
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Designation
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Salary
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees &&
                                        employees.filter(employee => employee._id.toLowerCase().includes(query) || employee.name.toLowerCase().includes(query) || employee.phone.toLowerCase().includes(query))
                                            .map((employee) => <tr
                                                key={employee._id}
                                                className='bg-white cursor-pointer border-b'
                                            >
                                                <td className="px-6 py-3 text-center">
                                                    <img
                                                        src={`${baseUrl}/image/${employee?.image}`}
                                                        className='w-10'
                                                    />
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.name}
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.phone}
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.salary}
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.designation}
                                                </td>
                                                <td className="px-6 py-3 text-center space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/admin/employee/${employee._id}`)
                                                        }}
                                                        className='p-1.5 bg-sky-400 text-white rounded-md'
                                                    >
                                                        <MdInfo />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/admin/employee/update/${employee._id}`)
                                                        }}
                                                        className='p-1.5 bg-green-400 text-white rounded-md'
                                                    >
                                                        <MdEditSquare />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setRemove(true)
                                                        }}
                                                        className='p-1.5 bg-red-500 text-white rounded-md'
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                    {remove && <Delete_data {...{
                                                        id: employee._id,
                                                        path: 'employee',
                                                        remove,
                                                        setRemove
                                                    }} />}
                                                </td>
                                            </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <div
                            className='py-10 flex flex-col justify-center items-center space-y-5 text-gray-500'
                        >
                            <img
                                src={employee_icon}
                                className='w-24'
                            />
                            <p>No Employee Found In This Section</p>
                        </div>
                    }
                </>

                :
                <div
                    className='py-10 flex flex-col justify-center items-center space-y-5 text-gray-500'
                >
                    <img
                        src={selection_icon}
                        className='w-16'
                    />
                    <p>Please Select a section first from top</p>
                </div>

            }

            {loading &&
                <Loading_request />
            }
        </div>

    );
};

export default Employees;