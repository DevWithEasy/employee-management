import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDelete, MdEditSquare, MdInfo } from 'react-icons/md';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStore from '../../_store/userStore';
import toast_alert from '../../_utils/toast_alert';
import { employee_icon, selection_icon } from '../../assets/_icons/_icons';
import { Delete_data, Heading, Loading_request } from '../../components/Index';
import { getData } from '../../_api/_apicrud';
import api_url from '../../_utils/api_url';
import customStyles from '../../_utils/selectStyle';
import Select from 'react-select'
import findSection from '../../_utils/findSection';

const Employees = () => {
    const { addEmployees, employees, addSections, sections } = useStore()
    const toast = useToast()
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q');
    const [remove, setRemove] = useState(false)
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [section, setSection] = useState(null)

    const getAllEmployee = async (section) => {
        setSection(section)
        setLoading(true)
        if (!section) {
            return
        }
        try {
            const res = await axios.get(`${api_url}/api/employee/all/${section?.value}`, {
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

    useEffect(() => {
        getData({
            path: 'section',
            action: addSections
        })
        if(q){
            setSection(findSection(sections, q))
            getAllEmployee(findSection(sections, q))
        }
    }, [])

    return (
        <div
            className='px-2 space-y-2'
        >
            <Heading>Employees</Heading>
            <div
                className='flex justify-between items-center'
            >
                <div
                    className='w-1/2 flex items-center'
                >
                    <Select
                        styles={customStyles}
                        defaultValue={section}
                        onChange={getAllEmployee}
                        options={sections.map(d => {
                            return {
                                value: d._id,
                                label: d.name
                            }
                        })}
                        className='w-1/2'
                    />
                    <input
                        type="search"
                        onChange={(e) => setQuery(e.target.value.toLowerCase())}
                        placeholder='Search by id'
                        className='w-1/2 p-2 border border-gray-300 focus:outline-sky-500'
                    />
                </div>
                <div
                    className='w-1/2 flex justify-end'
                >
                    <Link
                        to='/employee/new'
                        className='px-4 py-2 bg-sky-500 text-white'
                    >
                        Add New Employee
                    </Link>
                </div>
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
                                            ID No
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Phone
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Section
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
                                        employees.filter(employee => employee?.IDNo.toString().toLowerCase().includes(query) || employee?.name.toLowerCase().includes(query) || employee?.phone.toLowerCase().includes(query))
                                            .map((employee) => <tr
                                                key={employee._id}
                                                className='bg-white cursor-pointer border-b'
                                            >
                                                <td className="px-6 py-3 text-center">
                                                    <img
                                                        src={`${api_url}/image/${employee?.image}`}
                                                        className='w-10'
                                                    />
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.IDNo}
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.name}
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.phone}
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.designation?.name}
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.section?.name}
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    {employee?.salary}
                                                </td>
                                                <td className="px-6 py-3 text-center space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/employee/${employee._id}`)
                                                        }}
                                                        className='p-1.5 bg-sky-400 text-white rounded-md'
                                                    >
                                                        <MdInfo />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/employee/update/${employee._id}`)
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
                    className='py-20 flex flex-col justify-center items-center space-y-5 text-gray-500'
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