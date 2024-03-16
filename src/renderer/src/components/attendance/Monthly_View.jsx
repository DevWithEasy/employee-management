import React, { useEffect, useState } from 'react';
import { getData } from '../../_api/_apicrud';
import customStyles from '../../_utils/selectStyle';
import Select from 'react-select';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import useStore from '../../_store/userStore';
import { useNavigate } from 'react-router-dom'

const Monthly_View = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { addSections, sections } = useStore()
    const [section, setSection] = useState(null)
    const [id, setId] = useState('')

    useEffect(() => {
        getData({
            path: 'section',
            action: addSections
        })
    }, [])
    const handleGo = () => {
        onClose()
        setTimeout(() => {
            navigate(`/attendence/monthly/${section.value}/${id}`)
        }, 300)
    }
    return (
        <>
            <button
                className='px-4 py-1 border'
                onClick={onOpen}>
                Monthly
            </button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <div
                        className='px-5 pb-7 space-y-5'
                    >
                        <p classsName='pt-5'>Select section and Employee ID</p>
                        <div
                        className='space-y-3'
                        >
                            <Select
                                styles={customStyles}
                                defaultValue={section}
                                onChange={setSection}
                                options={sections.map(d => {
                                    return {
                                        value: d._id,
                                        label: d.name
                                    }
                                })}
                            />
                            <input
                                onChange={(e) => setId(e.target.value)}
                                placeholder='Employee ID'
                                className='w-full p-2 border focus:outline-sky-500'
                            />
                            <button
                            onClick={handleGo}
                            className='w-full p-2 bg-sky-500 text-white'
                            >
Go
                            </button>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Monthly_View;