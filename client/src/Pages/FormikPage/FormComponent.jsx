import React from 'react';
import '../../styles/Form.css';

import { Form, Field } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem'
import DefaultStack from '../../componeents/DefaultStack';
import { Box } from '@mui/material';
import { generateBarcode } from '../../Handlers/utill';
// import Materials from '../../API/Materials';

function FormComponent({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  Materials
}) {
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
          <Button
            variant="contained"
            onClick={() => setFieldValue('productCode', generateBarcode())}
          >
            Generate Random Code
          </Button>
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
  );
}

export default FormComponent;