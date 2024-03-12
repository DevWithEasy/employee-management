import { useState } from "react";
import { accounting_icon, administration_icon, bakery_icon, biscuit_icon, cake_icon, distribution_icon, employee_icon, snacks_icon, store_icon, users_icon, wafer_icon, water_icon } from "../assets/_icons/_icons";
import { useEffect } from "react";

const Home = () => {
    const [time, setTime] = useState(new Date())

    function tick() {
        setTime(new Date());
    }

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000)

        return () => {
            clearInterval(timerID);
        }
    }, [])

    return (
        <div
            className="px-6 space-y-5"
        >
            <div
                className="py-4"
            >
                <h2
                    className="text-center text-4xl text-red-600 font-bold"
                >
                    S&B Nice Food Valley Ltd.
                </h2>
                <p className="text-right">{time.toLocaleDateString()} - {time.toLocaleTimeString()}</p>
            </div>


            <div
                className="grid grid-cols-4 gap-4"
            >
                {/* users */}
                <div
                    className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                >
                    <div>
                        <img
                            src={users_icon}
                            className="w-10"
                        />
                    </div>
                    <div
                        className="text-blue-500"
                    >
                        <p>Total users : </p>
                        <p className="text-2xl font-semibold">5</p>
                    </div>
                </div>

                {/* section */}
                <div
                    className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                >
                    <div>
                        <img
                            src={employee_icon}
                            className="w-10"
                        />
                    </div>
                    <div
                        className="text-blue-500"
                    >
                        <p>Total Sections : </p>
                        <p className="text-2xl font-semibold">6</p>
                    </div>
                </div>

                {/* employes */}
                <div
                    className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                >
                    <div>
                        <img
                            src={employee_icon}
                            className="w-10"
                        />
                    </div>
                    <div
                        className="text-blue-500"
                    >
                        <p>Total employees : </p>
                        <p className="text-2xl font-semibold">15</p>
                    </div>
                </div>
            </div>
            <div
                className="space-y-2"
            >
                <p
                    className="pb-2 text-xl font-bold border-b"
                >
                    Section and Manpower Summery :
                </p>
                <div
                    className="grid grid-cols-4 gap-4"
                >
                    {/* admin */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={administration_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Administration : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* accounting */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={accounting_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Accounting & Vat : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* store */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={store_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Store (RM & PM) : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* distribution */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={distribution_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Distribution & Load : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* biscuit */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={biscuit_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Biscuit : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* wafer */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={wafer_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Wafer : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* cake */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={cake_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Cake (Tiffin Cake) : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* snacks */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={snacks_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Snacks/Chanachur : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* backey */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={bakery_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Bakery : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                    {/* water */}
                    <div
                        className="p-4 flex space-x-4 bg-blue-50/50 border border-blue-500/50 rounded-md"
                    >
                        <div>
                            <img
                                src={water_icon}
                                className="w-10"
                            />
                        </div>
                        <div
                            className="text-blue-500"
                        >
                            <p>Water Plant : </p>
                            <table
                                className="w-full"
                            >
                                <tbody>
                                    <tr>
                                        <td>Male</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                    <tr>
                                        <td>Female</td>
                                        <td>-</td>
                                        <td className="font-semibold">05</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Home;