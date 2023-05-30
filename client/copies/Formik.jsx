
import React, { useEffect, useState } from 'react';
import '../../styles/Form.css';
import FormComponent from './FormComponent';

import { Formik, Form, Field } from 'formik';
import { Autocomplete } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import DefaultStack from '../../componeents/DefaultStack';
import Materials from '../../API/Materials';
import { TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import { generateBarcode } from '../../Handlers/utill';


function FormikPage(props) {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productCode: generateBarcode(),
    materials: 0
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div>
      <div className='form-title'>Product Form</div>
      <Formik
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Box>
            <FormComponent values={formData} setValues={setFormData} />
            {/* <Form>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <DefaultStack>
                  <Field
                    component={TextField}
                    name="productName"
                    type="text"
                    label="product name"
                    variant="outlined"
                  />
                  <Field
                    component={TextField}
                    name="productPrice"
                    type="number"
                    label="product price"
                    variant="outlined"
                  />
                </DefaultStack>
                <DefaultStack>
                  <Button variant="contained" onClick={() => setFormData(prev => {
                    return { ...prev, productCode: generateBarcode() }
                  })}>Generate Random Code</Button>
                  <Field
                    component={TextField}
                    name="productCode"
                    type="number"
                    disabled
                    label="barcode"
                    variant="outlined"
                    value={formData.productCode}
                  />
                </DefaultStack>
                <DefaultStack>
                  <Field
                    component={Autocomplete}
                    name="materials"
                    options={Materials}
                    getOptionLabel={(option) => option.label || ''}
                    sx={{ width: 300, padding: '25px' }}
                    renderInput={(params) => (
                      <TextField {...params} label="Materials" variant="outlined" />
                    )}
                  />
                </DefaultStack>
                <DefaultStack>
                  <Button variant="contained" type='submit'>Create Product</Button>
                </DefaultStack>
              </Box>
            </Form> */}
          </Box>
        )}
      </Formik>
    </div>
  );
}

export default FormikPage