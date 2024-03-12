import React from 'react'
import Protected from './Protected'
import logo from '../assets/logo.png'
import { attendence_icon,employee_icon,home_icon,salary_icon,users_icon,section_icon,user_icon} from '../assets/_icons/_icons';
import { NavLink } from 'react-router-dom';
import useUserStore from '../_store/userStore';


const Layout = ({ children }) => {
    const { user } = useUserStore()
    const sideData = [
        {
            title: 'Home',
            image: home_icon,
            path: '/'
        },
        {
            title: 'User',
            image: users_icon,
            path: '/users'
        },
        {
            title: 'Section',
            image: section_icon,
            path: '/section'
        },
        {
            title: 'Employee',
            image: employee_icon,
            path: '/employees'
        },
        {
            title: 'Attendence',
            image: attendence_icon,
            path: '/attendences'
        },
        {
            title: 'Salary',
            image: salary_icon,
            path: '/salary'
        },
    ]
    return (
        <Protected>
            <div
                className='h-screen flex justify-between overflow-y-auto'
            >
                <div
                    className='relative h-screen w-2/12 bg-blue-100 overflow-y-auto'
                >
                    <div
                        className='p-4'
                    >
                        <img
                            src={logo}
                            className='w-[100px] mx-auto'
                        />
                    </div>
                    <div>
                        {
                            sideData.map((data,i) =>
                                <NavLink
                                    key={i}
                                    to={data.path}
                                    className='pl-4 py-2 flex items-center space-x-3'
                                >
                                    <img
                                        src={data.image}
                                        className='w-6'
                                    />
                                    <span>{data.title}</span>
                                </NavLink>
                            )
                        }
                    </div>
                    <div
                        className='absolute bottom-0 w-full cursor-pointer'
                    >
                        <div className='px-4 py-2 flex justify-between items-center space-x-2 bg-sky-500 text-white'
                        >
                            <img
                                src={user_icon}
                                alt='user'
                                className='w-8 h-8 my-auto rounded-full'
                            />
                            <div
                                className='w-full'
                            >
                                <p className='text-sm'>{user?.name}</p>
                                <p className='text-xs'>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='h-screen w-10/12 overflow-y-auto'
                >
                    {children}
                </div>
            </div>
        </Protected>
    );
};

export default Layout;