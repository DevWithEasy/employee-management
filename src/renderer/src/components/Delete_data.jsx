import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import useUserStore from '../_store/userStore';
import baseUrl from '../_utils/baseUrl';
import toast_alert from '../_utils/toast_alert';
import api_url from '../_utils/api_url';


const Delete_data = ({ id, path, remove, setRemove }) => {
  const { removeEntity } = useUserStore()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const deleteData = async () => {
    setLoading(true)
    try {
      const res = await axios.delete(`${api_url}/api/${path}/delete/${id}`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      if (res.data.status === 200) {
        setLoading(false)
        removeEntity(path, id)
        setRemove(!remove)
        toast_alert(
          toast,
          res.data.message
        )
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
      <AlertDialog
        isOpen={remove}
        onClose={() => {
          setRemove(false)
        }}
        className='bg-red-500'
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter
              className='space-x-2'
            >
              <button
                onClick={() => setRemove(!remove)}
                className='px-6 py-2 bg-gray-500 text-white'
              >
                Cancel
              </button>
              <button
                onClick={() => deleteData()}
                className='px-6 py-2 bg-red-500 text-white'
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Delete_data;