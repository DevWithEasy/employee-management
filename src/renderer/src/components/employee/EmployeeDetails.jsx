import React from 'react';
import baseUrl from '../../_utils/baseUrl';
import getID from '../../_utils/getID';

const EmployeeDetails = ({ employee }) => {
    return (
        <div
            className='w-1/2 flex gap-x-4'
        >
            <div
                className='pt-2'
            >
                <img
                    src={`${baseUrl}/image/${employee?.image}`}
                    className='h-48 rounded-md'
                />
            </div>
            <div
                className='w-8/12'
            >
                <table className='w-full'>
                    <tbody>
                        <tr>
                            <td className='p-2'>Name </td>
                            <td className='p-2'> : </td>
                            <td className='p-2'>
                                {employee?.name}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>Phone </td>
                            <td className='p-2'> : </td>
                            <td className='p-2'>
                                {employee?.phone}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>NID </td>
                            <td className='p-2'> : </td>
                            <td className='p-2'>
                                {employee?.nid}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>DOB </td>
                            <td className='p-2'> : </td>
                            <td className='p-2'>
                                {new Date(employee?.dob).toLocaleDateString()}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>Address </td>
                            <td className='p-2'> : </td>
                            <td className='p-2'>
                                {employee?.address}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>Joining Date </td>
                            <td className='p-2'> : </td>
                            <td className='p-2'>
                                {new Date(employee?.joinDate).toLocaleDateString()}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>ID No </td>
                            <td className='p-2'> : </td>
                            <td className='p-2'>
                                {getID(employee?.IDNo)}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>Designation </td>
                            <td className='p-2'> : </td>
                            <td className='p-2'>
                                {employee?.designation}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2'>Salary </td>
                            <td className='p-2'> : </td>
                            <td className='p-2'>
                                {employee?.salary}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDetails;