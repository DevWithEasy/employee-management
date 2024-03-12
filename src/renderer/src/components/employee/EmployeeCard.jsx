import baseUrl from '../../_utils/baseUrl';
import getID from '../../_utils/getID';

const EmployeeCard = ({ employee }) => {

    return (
        <div
            className='bg-white w-[85.6mm] h-[53.98mm] p-3 shadow-xl rounded-lg'
        >
            <div
                className='relative h-[50px] bg-sky-500 rounded'
            >
                <div
                    className='absolute right-2 text-white'
                >
                    <p
                        className='text-xl font-extrabold'
                    >
                        Home Plus
                    </p>
                    <p
                        className='text-xs'
                    >
                        {employee?.user?.name} Outlet {employee?.user?.address}
                    </p>
                </div>
                <img
                    src={`${baseUrl}/image/${employee?.image}`}
                    className='absolute h-[100px] w-[100px] bg-white p-1 rounded-full ml-5 mt-2'
                />
            </div>
            <div
                className='flex justify-end'
            >
                <div
                    className='w-7/12 pl-2 pb-2 py-1 flex flex-col'
                >
                    <p
                        className='text-xl font-semibold font-cardo'
                    >
                        {employee?.name}
                    </p>
                    <p
                        className='text-sm'
                    >
                        {employee?.designation}
                    </p>
                </div>

            </div>
            <div
                className='flex justify-between'
            >
                <div
                    className='w-full text-xs space-y-1'
                >
                    <div>
                        <div
                            className='w-full flex justify-between'
                        >
                            <div
                                className='w-1/2'
                            >
                                <div>
                                    <p>ID No</p>
                                    <p>{getID(employee?.IDNo)}</p>
                                </div>
                            </div>
                            <div
                                className='w-1/2'
                            >
                                <div>
                                    <p>Joined Date</p>
                                    <p>
                                        {new Date(employee?.joinDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className='w-full flex justify-between'
                        >
                            <div
                                className='w-1/2'
                            >
                                <div>
                                    <p>DOB</p>
                                    <p>
                                    {new Date(employee?.dob).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div
                                className='w-1/2'
                            >
                                <div>
                                    <p>Signature</p>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src={employee?.barCode}
                    className='h-[85px] -mt-2'
                />
            </div>
        </div>
    );
};

export default EmployeeCard;