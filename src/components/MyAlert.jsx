import React, { useState } from 'react';
import { Alert } from 'reactstrap';

export const MyAlert=({text})=>{
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert className="alert" color="light" isOpen={visible} toggle={onDismiss}>
        {text}
    </Alert>
  );
}

