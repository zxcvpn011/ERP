
import React, { useEffect, useState } from 'react';
import '../../styles/Form.css';
// import FormComponent from './FormComponent';

import { Formik, Form, Field } from 'formik';
import { Autocomplete, Select } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem'
import DefaultStack from '../../componeents/DefaultStack';
import Materials from '../../API/Materials';
import { TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import { generateBarcode } from '../../Handlers/utill';
import * as Yup from 'yup';


function FormikPage(props) {

  const ProductSchema = Yup.object().shape({
    productName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    productPrice: Yup.string()
      .max(9, 'Too Long!')
      .required('Required'),
    productCode: Yup.number().required('Required'),
    materials: Yup.number().required('Required')
  });

  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productCode: generateBarcode(),
    materials: 0
  })
  const validate = (values, props /* only available when using withFormik */) => {
    const errors = {};
    for (let i of values) {
      if (!values[i]) {
        errors[i] = 'Required';
      }
    }
    return errors;
  };

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
        validationSchema={ProductSchema}
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
            {/* <FormComponent values={formData} setValues={setFormData} /> */}
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
                  {/* <Field
                    component={Autocomplete}
                    name="materials"
                    options={Materials}
                    getOptionLabel={(option) => option.label || ''}
                    sx={{ width: 300, padding: '25px' }}
                    renderInput={(params) => (
                      <TextField {...params} label="Materials" variant="outlined" />
                    )}
                  /> */}

                  {/* <Select>
                    <MenuItem>okdsoa</MenuItem>
                  </Select> */}
                  <Field
                    component={Select}
                    style={{ width: "200px" }}
                    variant="outlined"
                    name="materials"
                    select
                    label="materials"
                    value={values.materials}
                    onChange={handleChange}
                    error={
                      touched.materials &&
                      Boolean(errors.materials)
                    }
                    helperText={
                      touched.materials && errors.materials
                    }
                  >
                    <MenuItem key={"1"} value={"0"}>
                      No Selected // Or Empty
                    </MenuItem>
                    <MenuItem key={"2"} value={"1"}>
                      No Selected // Or Empty
                    </MenuItem>
                    <MenuItem key={"3"} value={"2"}>
                      No Selected // Or Empty
                    </MenuItem>
                    <MenuItem key={"4"} value={"3"}>
                      No Selected // Or Empty
                    </MenuItem>
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