
import React, { useEffect, useState } from 'react';
import '../../styles/Form.css';

import FormEffects from '../../componeents/FormEffects.jsx';
import { Formik } from 'formik';
import { Box } from '@mui/material';
import { generateBarcode, reqJSON, sleep } from '../../Handlers/utill';
import * as Yup from 'yup';
import FormComponent from './FormComponent';



function FormikPage(props) {
  const [Materials, setMaterials] = useState([])
  //form validation
  const [isValidated, setIsValidated] = useState(false)
  const ProductSchema = Yup.object().shape({
    productName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    productPrice: Yup.string().max(9, 'Too Long!').required('Required'),
    productCode: Yup.number().required('Required'),
    materials: Yup.string().required('Required')
  });

  //handling some styling
  const [openModal, setOpenModal] = React.useState(false);
  const [alertProps, setAlertProps] = useState({
    severity: 'success', text: '', open: false
  })
  const handleCloseAlert = async (ms) => {
    await sleep(ms);
    setAlertProps(prev => {
      return { ...prev, open: false }
    })
  }
  

  useEffect(() => {
    if (isValidated) {
      //roolback validation state to false
      setIsValidated(false);
      //display loading modal
      setOpenModal(true);
      reqJSON('/api/products', {
        method: 'POST',
        body: JSON.stringify(isValidated)
      }).then(async e => {
        //hide loading modal
        await sleep(1000);
        setOpenModal(false);
        //display product state
        if (e.success) {
          setAlertProps(prev => {
            return { ...prev, text: 'Product Saved Successfully', open: true }
          })
          handleCloseAlert(2000)
        } else if (e.error || e.errors) {
          setAlertProps(prev => {
            return { severity: 'error', text: 'Sorry an error occured', open: true }
          })
          handleCloseAlert(2000)
        }
      }).catch(async err => {
        await sleep(1000);
        setOpenModal(false);

        setAlertProps(prev => {
          return { severity: 'error', text: 'Sorry an error occured', open: true }
        })
        handleCloseAlert(2000)
        console.log(err);
      })
    }
  }, [isValidated])

  useEffect(() => {
    reqJSON('/api/materials')
    .then(e => setMaterials(e))
  }, [])

  return (
    <div>
      <div className='form-title'>Product Form</div>
      <Formik
        initialValues={{
          productName: '',
          productPrice: '',
          productCode: generateBarcode(),
          materials: ''
        }}
        validationSchema={ProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          setIsValidated(values)
          setSubmitting(false);
        }}
      >
        {(items) => (
          <Box>
            <FormComponent {...items} Materials={Materials} />
            <FormEffects openModal={openModal} setOpenModal={setOpenModal} alertProps={alertProps} />
          </Box>
        )}
      </Formik>
    </div>
  )
}

export default FormikPage