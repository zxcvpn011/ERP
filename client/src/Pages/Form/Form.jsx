import React, { useEffect, useState } from 'react';
import '../../styles/Form.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { generateBarcode, reqJSON } from '../../Handlers/utill';
import { Autocomplete } from '@mui/material';
import Materials from '../../API/Materials';
import DefaultStack from '../../componeents/DefaultStack';

function FormPage(props) {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productCode: generateBarcode(),
    materials: 0
  })
  const [isValidated, setIsValidated] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    for (let i of Object.keys(formData)) {
      if (!formData[i]) return alert(`${i} is empty`)
    }
    setIsValidated(formData)
    console.log(formData);
  }
  function handleChange(e, value) {
    setFormData(prev => {
      return { ...prev, [typeof e === 'string' ? e : e.target.name]: value }
    })
  }

  useEffect(() => {
    if (isValidated) {
      setIsValidated(false)
      reqJSON('/api/products', {
        method: 'POST',
        body: JSON.stringify(isValidated)
      }).then(e => {
        if (e.success) {
          alert("product saved")
        } else if (e.error || e.errors) {
          return alert("Sorry an error occured")
        }
      })
        .catch(err => alert("Sorry an error occured"))
    }
  }, [isValidated])

  return (
    <div className='contaienr'>
      <div className='form-title'>Product Form</div>
      <form action='/' className='form' onSubmit={handleSubmit}>
        <DefaultStack>
          <Box
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="product name" variant="outlined" name='productName' onChange={(e) => handleChange(e, e.target.value)} />
          </Box>
          <Box noValidate autoComplete="off">
            <TextField id="outlined-basic" label="product price" variant="outlined" type='number' name='productPrice' onChange={(e) => handleChange(e, e.target.value)} />
          </Box>
        </DefaultStack>
        <DefaultStack>
          <Button
            variant="contained"
            onClick={() => setFormData(prev => {
              return { ...prev, productCode: generateBarcode() }
            })}
          >Generate Random Code</Button>
          <Box
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" disabled label="barcode" variant="outlined" value={formData.productCode} />
          </Box>
        </DefaultStack>
        <DefaultStack>
          <Autocomplete
            disablePortal
            options={Materials}
            sx={{ width: 300, padding: '25px' }}
            onChange={(e, v) => handleChange('materials', v.id)}
            renderInput={(params) => {
              return <TextField {...params} label="Materials" />
            }}
          />
        </DefaultStack>
        <DefaultStack>
          <Button variant="contained" type='submit'>Create Product</Button>
        </DefaultStack>
      </form>
    </div>
  );
}

export default FormPage;
