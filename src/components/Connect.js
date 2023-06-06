import React from 'react';
import { useNavigate } from 'react-router-dom';


import MainButton from './Button';

const Connect = (props) => {
  
  const navigate = useNavigate();

  const callConnectFromStateService = async () => {
    let result = await props.singleton.connectToMetaMask();
    if (result) {
      navigate("/management");
    }
  }

  return (
    <MainButton
      clicked={callConnectFromStateService}
      buttonContent={props.content}
      Style={props.SX}
      variant={props.Variant}
      ClassName={props.ClassName}
    />
  );
};

export default Connect;