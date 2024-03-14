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

const MonthlyBook_View = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { addSections, sections } = useStore()
    useEffect(() => {
        getData({
            path: 'section',
            action: addSections
        })
    }, [])
    const handleSelect = (section) => {
        onClose()
        setTimeout(() => {
            navigate(`/attendence/book/${section.value}`)
        }, 300)
    }
    return (
        <>
            <button
                className='px-4 py-1 border'
                onClick={onOpen}>
                Book
            </button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <div
                        className='px-5 pb-5 space-y-5'
                    >
                        <p classsName='pt-5'>Select your section which section you want to view</p>
                        <Select
                            styles={customStyles}
                            defaultValue={null}
                            onChange={handleSelect}
                            options={sections.map(d => {
                                return {
                                    value: d._id,
                                    label: d.name
                                }
                            })}
                            autoFocus
                            className='pb-2 rounded-none'
                        />
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MonthlyBook_View;