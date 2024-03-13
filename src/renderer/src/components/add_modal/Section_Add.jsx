import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import api_url from '../../_utils/api_url';
import axios from 'axios'
import toast_alert from '../../_utils/toast_alert';
import handleChange from '../../_utils/handleChange';
import useStore from '../../_store/userStore';

const Section_Add = ({ view, setView }) => {
    const {addSection} = useStore()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState({
        name: ''
    })

    const [image, setImage] = useState()

    const createSection = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', value.name)

        try {
            setLoading(true)
            const res = await axios.post(`${api_url}/api/section/create`, formData, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setLoading(false)
                addSection(res.data.data)
                toast_alert(
                    toast,
                    res.data.message
                )
                setView(false)
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
    return (
        <>
            <Modal
                isOpen={view}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Section</ModalHeader>
                    <ModalCloseButton onClick={() => setView(false)} />
                    <ModalBody>
                        <form
                            onSubmit={createSection}
                            className='space-y-5'
                        >
                            <div className='space-y-2 pb-'>
                                <label htmlFor="">Name :</label>
                                <input
                                    type='text'
                                    name='name'
                                    onChange={(e) => handleChange(e, value, setValue)}
                                    placeholder='Enter user name'
                                    className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                                />
                            </div>
                            <div className='space-y-2 pb-'>
                                <label htmlFor="">Image :</label>
                                <input
                                    type='file'
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                                />
                            </div>
                            <div
                                className='pb-3 flex justify-end items-center space-x-3'
                            >
                                {/* <button
                                    onClick={() => setView(!view)}
                                    className='px-6 py-2 bg-gray-500 text-white'
                                >
                                    Cancel
                                </button> */}
                                <button
                                    className='px-6 py-2 bg-sky-500 text-white'
                                >
                                    {loading ? 'Saving ...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Section_Add;