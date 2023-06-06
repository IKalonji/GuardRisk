import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function MainButton(props) {
  return (
    <Stack spacing={2} direction="row">
      <Button className={props.ClassName} size="large" sx={props.Style} fullWidth variant={props.variant} onClick={props.clicked} >{props.buttonContent}</Button>
    </Stack>
  );
}

export default MainButton;