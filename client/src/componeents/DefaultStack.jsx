import { Stack } from '@mui/material';
import React from 'react';

function DefaultStack(props) {
  return (
    <Stack direction="row" spacing={2} useFlexGap={false} sx={{
      margin: '8px',
    }} {...props}>
      {props.children}
    </Stack>
  );
}

export default DefaultStack;