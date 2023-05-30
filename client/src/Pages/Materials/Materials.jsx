import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { TextField } from 'formik-material-ui';
import DefaultStack from '../../componeents/DefaultStack';
import { Formik } from 'formik';
import { Form, Field } from 'formik';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import { reqJSON, sleep } from '../../Handlers/utill';
import FormEffects from '../../componeents/FormEffects';

function Materials(props) {
  const [isValidated, setIsValidated] = useState(false)
  const MaterialSchema = Yup.object().shape({
    label: Yup.string().min(2, 'Too Short!').required('Required')
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
      reqJSON('/api/materials', {
        method: 'POST',
        body: JSON.stringify(isValidated)
      }).then(async e => {
        //hide loading modal
        await sleep(1000);
        setOpenModal(false);
        //display product state
        if (e.success) {
          setAlertProps(prev => {
            return { ...prev, text: 'Material Saved Successfully', open: true }
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
  }, [isValidated]);
  
  return (
    <div>
      <div className='form-title'>Material Form</div>
      <Formik
        initialValues={{
          label: ''
        }}
        validationSchema={MaterialSchema}
        onSubmit={(values, { setSubmitting }) => {
          setIsValidated(values)
          setSubmitting(false);
        }}
      >
        {(
          values,
          errors,
          touched,
          handleChange,
          setFieldValue
        ) => (

          <Form>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              <DefaultStack>
                <Field
                  component={TextField}
                  name="label"
                  type="text"
                  label="material name"
                  variant="outlined"
                  value={values.productCode}
                />
              </DefaultStack>
              <DefaultStack>
                <Button variant="contained" type='submit'>Create Material</Button>
              </DefaultStack>
            </Box>
          </Form>
        )}
      </Formik>
      <FormEffects openModal={openModal} setOpenModal={setOpenModal} alertProps={alertProps} />
    </div>
  );
}

export default Materials;