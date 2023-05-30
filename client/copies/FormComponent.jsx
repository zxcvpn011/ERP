import React from 'react';
import { Form, Field } from 'formik';
import { Autocomplete, Select } from 'formik-material-ui';
import { Button, MenuItem } from '@material-ui/core';
import DefaultStack from '../src/componeents/DefaultStack';
import Materials from '../src/API/Materials';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { generateBarcode } from '../src/Handlers/utill';


function FormComponent({ values, setValues }) {
  function handleChange(e) {
    console.log(e);
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  console.log(values.materials)
  return (
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
            value={values.productName}
          />
          <Field
            component={TextField}
            name="productPrice"
            type="number"
            label="product price"
            variant="outlined"
            value={values.productPrice}
          />
        </DefaultStack>
        <DefaultStack>
          <Button variant="contained" onClick={() => setValues(prev => {
            return { ...prev, productCode: generateBarcode() }
          })}>Generate Random Code</Button>
          <Field
            component={TextField}
            name="productPrice"
            type="number"
            disabled
            label="barcode"
            variant="outlined"
            value={values.productCode}
          />
        </DefaultStack>
        <DefaultStack>
          {/* <Field
            component={Autocomplete}
            name="materials"
            options={Materials}
            getOptionLabel={(option) => option.label || ''}
            sx={{ width: 300, padding: '25px' }}
            value={values.materials}
            renderInput={(params) => (
              <TextField {...params} label="Materials" variant="outlined" />
            )}
          /> */}
        </DefaultStack>
        <DefaultStack>
          <Button variant="contained" type='submit'>Create Product</Button>
        </DefaultStack>
      </Box>
    </Form>
  );
}

export default FormComponent;