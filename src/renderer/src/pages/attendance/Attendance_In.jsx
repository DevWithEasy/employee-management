import Heading from '../../components/Heading';
import Auto_attendance from '../../components/attendance/Auto_attendance';
import axios from 'axios';
import baseUrl from '../../_utils/baseUrl';
import Protected from '../Protected';

const Attendance_In = () => {
    const attendanceClosed=async()=>{
        try {
            const res = await axios.post(`${baseUrl}/api/attendance/closed`, {}, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                console.log(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div
            className='p-2'
        >
            <Heading>Taking Daily Attendance</Heading>
            
            <Auto_attendance/>

            <div
                className='py-2'
            >
                <button
                    onClick={()=>attendanceClosed()}
                    className='px-4 py-2 bg-red-500 text-white rounded'
                >
                    Attendace Closed
                </button>
            </div>
            
        </div>
    );
};

export default Attendance_In;