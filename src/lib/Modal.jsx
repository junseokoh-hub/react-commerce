import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const BackdropContainer = styled.div`
  position: fixed;
  top: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.75);
`;

const Backdrop = ({ closeModal }) => {
  return <BackdropContainer onClick={closeModal} />;
};

const ModalOverLay = ({ children }) => {
  return <div>{children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children, closeModal }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModal} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverLay>{children}</ModalOverLay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;
