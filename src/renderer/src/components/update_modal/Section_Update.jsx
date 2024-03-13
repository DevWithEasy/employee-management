import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import useStore from '../../_store/userStore';
import { updateData } from '../../_api/_apicrud';
import handleChange from '../../_utils/handleChange';

const Section_Update = ({ id, view, setView }) => {
    const toast = useToast()
    const {sections,updateEntity} = useStore()
    const [value, setValue] = useState(sections.find(section => section._id === id))
    const [loading,setLoading] = useState(false)
    return (
        <>
            <Modal
                isOpen={view}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Section</ModalHeader>
                    <ModalBody>
                        <div
                            className='space-y-3'
                        >
                            <div className='space-y-2'>
                                <label htmlFor="">Name :</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={value?.name}
                                    onChange={(e) => handleChange(e, value, setValue)}
                                    className='w-full p-2 border border-gray-300 focus:outline-sky-500'
                                />
                            </div>
                            <div
                                className='pb-3 flex justify-end items-center space-x-3'
                            >
                                <button
                                    onClick={() => setView(!view)}
                                    className='px-6 py-2 bg-gray-500 text-white'
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={()=>updateData({
                                        toast,
                                        path : `section/update/${id}`,
                                        value,
                                        action : updateEntity,
                                        action_path : 'section',
                                        setLoading,
                                        setView
                                    })}
                                    className='px-6 py-2 bg-sky-500 text-white'
                                >
                                    {loading ? 'Saving ...' : 'Save Change'}
                                </button>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Section_Update;