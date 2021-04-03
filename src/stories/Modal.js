import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Modal = ({ children, ModalButton, id, className }) => {
  const [open, setOpen] = useState(false);

  const isChild = (target) => {
    let ancestor = target.parentNode;
    while (ancestor !== null) {
      if (ancestor.id === `${id}-box`) {
        return true;
      }
      ancestor = ancestor.parentNode;
    }
    return false;
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (open && e.target.id !== `${id}-box` && !isChild(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  return (
    <ModalStyles>
      <ModalButton
        toggleOpen={() => {
          setOpen(true);
        }}
      />

      {open && (
        <div className={`modal-out ${className}-out`}>
          <div className={`modal-box ${className}-box`} id={`${id}-box`}>
            {children}
          </div>
        </div>
      )}
    </ModalStyles>
  );
};

const ModalStyles = styled.div`
  .modal-out {
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    .modal-box {
      display: inline-flex;
      flex-direction: column;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      min-height: 1rem;
      min-width: 1rem;
      max-height: 90vh;
      max-width: 70vw;
      padding: 1rem;
      border-radius: 0.1rem;
      img {
        max-height: 90vh;
        max-width: 90vh;
      }
    }
  }
`;

Modal.propTypes = {
  ModalButton: PropTypes.elementType,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Modal;
