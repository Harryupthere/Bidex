import { useWeb3React } from "@web3-react/core";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const RegisterModal = () => {
  const { account } = useWeb3React();
  const { open, changeLoginModalState } = useAuth();
  return (
    <>
      <Modal
        title="You are almost there!"
        centered
        open={open}
        onOk={() => changeLoginModalState(false)}
        onCancel={() => changeLoginModalState(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default RegisterModal;
