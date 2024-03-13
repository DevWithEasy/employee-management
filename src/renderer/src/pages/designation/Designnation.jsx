import React, { useEffect, useState } from 'react';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { getData } from '../../_api/_apicrud';
import useStore from '../../_store/userStore';
import { Delete_data, Designation_Add, Designation_Update, Heading } from '../../components/Index';

const Designnation = () => {
    const { addDesignations, designations } = useStore()
    const [id, setId] = useState(false)
    const [add, setAdd] = useState(false)
    const [update, setUpdate] = useState(false)
    const [remove, setRemove] = useState(false)
    const [query, setQuery] = useState('')

    useEffect(() => {
        getData({
            path : 'designation',
            action : addDesignations
        })
    }, [])

    return (
        <div
            className='px-2 space-y-2'
        >
            <Heading>Designnation</Heading>
            <div
                className='flex justify-between items-center'
            >
                <input
                    type="search"
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    placeholder='Search by name,email,phone'
                    className='w-[350px] py-1 px-4 border border-gray-300 focus:outline-none placeholder:text-gray-300 placeholder:text-sm'
                />
                <div
                    className='w-full flex justify-end'
                >
                    <button
                        onClick={() => setAdd(!add)}
                        className='px-4 py-2 bg-sky-500 text-white'
                    >
                        Add New Designnation
                    </button>
                </div>
            </div>
            <div className="relative overflow-x-auto space-y-3">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sl
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            designations.filter(designation => designation.name.toLowerCase().includes(query))
                                .map((designation, i) => <tr
                                    key={designation._id}
                                    className='bg-white'
                                >
                                    <td className="px-6 py-3">{i + 1}</td>
                                    <td className="px-6 py-3">{designation?.name}</td>
                                    <td className="px-6 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => {
                                                setUpdate(!update)
                                                setId(designation?._id)
                                            }}
                                            className='p-1.5 bg-green-400 text-white rounded-md'
                                        >
                                            <MdEditSquare />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setRemove(!remove)
                                                setId(designation?._id)
                                            }}
                                            className='p-1.5 bg-red-500 text-white rounded-md'
                                        >
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
                {add && <Designation_Add {...{
                    view : add,
                    setView : setAdd
                }} />}
                {update && <Designation_Update {...{
                    id,
                    view : update,
                    setView : setUpdate
                }} />}
                {remove && <Delete_data {...{
                    id,
                    path: 'designation',
                    remove,
                    setRemove
                }} />}
            </div>
        </div>
    );
};

export default Designnation;