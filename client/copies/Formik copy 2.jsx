
import React, { useEffect, useState } from 'react';
import '../../styles/Form.css';

import { Formik, Form, Field } from 'formik';
import { Select,TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem'
import DefaultStack from '../../componeents/DefaultStack';
import { Box } from '@mui/material';
import Materials from '../../API/Materials';
import { generateBarcode, reqJSON } from '../../Handlers/utill';
import * as Yup from 'yup';


function FormikPage(props) {

  const ProductSchema = Yup.object().shape({
    productName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    productPrice: Yup.string().max(9, 'Too Long!').required('Required'),
    productCode: Yup.number().required('Required'),
    materials: Yup.string().required('Required')
  });

  const [isValidated, setIsValidated] = useState(false)

  useEffect(() => {
    if (isValidated) {
      setIsValidated(false)
      reqJSON('/api/products', {
        method: 'POST',
        body: JSON.stringify(isValidated)
      }).then(e => {
        if(e.success) {
          alert("product saved")
        } else if(e.error || e.errors) {
          return alert("Sorry an error occured")
        }
      })
    }
  }, [isValidated])

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
          console.log(values);
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
        }) => (
          <Box>
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
                  <Button variant="contained" onClick={() => setFieldValue('productCode', generateBarcode())}>Generate Random Code</Button>
                  <Field
                    component={TextField}
                    name="productCode"
                    type="number"
                    disabled
                    label="barcode"
                    variant="outlined"
                    value={values.productCode}
                  />
                </DefaultStack>
                <DefaultStack>
                  <Field
                    component={Select}
                    style={{ width: "200px" }}
                    variant="outlined"
                    name="materials"
                    label="materials"
                    value={values.materials}
                    onChange={handleChange}
                    error={
                      touched.materials &&
                      Boolean(errors.materials)
                    }
                  >
                    <MenuItem key={-1} value="">
                      Not Selected
                    </MenuItem>
                    {Materials.map((e, i) => (
                      <MenuItem key={i} value={e.id}>{e.label}</MenuItem>
                    ))}
                  </Field>
                </DefaultStack>
                <DefaultStack>
                  <Button variant="contained" type='submit'>Create Product</Button>
                </DefaultStack>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </div>
  );
}

export default FormikPage