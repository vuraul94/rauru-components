import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const TextField = ({
  type = "text",
  color = "#00CCFF",
  value,
  onChange,
  refUp,
  ...props
}) => {
  const inputRef = useRef();
  const [passIcon, setPassIcon] = useState(faEye);

  useEffect(() => {
    if (refUp) {
      refUp(inputRef);
    }
  }, [refUp]);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleNumber = (e, action) => {
    if (inputRef.current) {
      if (action === "increment") {
        inputRef.current.stepUp();
      } else if (action === "decrement") {
        inputRef.current.stepDown();
      }
    }
  };

  const togglePassword = (e) => {
    if (inputRef.current) {
      if (inputRef.current.type === "password") {
        inputRef.current.type = "text";
        setPassIcon(faEyeSlash);
      } else if (inputRef.current.type === "text") {
        inputRef.current.type = "password";
        setPassIcon(faEye);
      }
    }
  };

  return (
    <>
      {type === "number" && (
        <Button
          buttonType="small"
          color={color}
          onClick={(e) => {
            handleNumber(e, "decrement");
          }}
        >
          <FontAwesomeIcon icon={faMinus} className="control" />
        </Button>
      )}
      <StyledInput
        type={type}
        color={color}
        value={value}
        onChange={handleChange}
        ref={inputRef}
        {...props}
      />
      {type === "number" && (
        <Button
          buttonType="small"
          color={color}
          onClick={(e) => {
            handleNumber(e, "increment");
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="control" />
        </Button>
      )}
      {type === "password" && (
        <Button buttonType="small" color={color} onClick={togglePassword}>
          <FontAwesomeIcon icon={passIcon} />
        </Button>
      )}
    </>
  );
};

const StyledInput = styled.input.attrs((props) => ({
  type: props.type,
  color: props.color,
  disabled: props.disabled,
}))`
  border-radius: 0.2rem;
  border  : 0.1rem solid ${(props) => props.color};
  padding: 0.2rem 0.3rem;
  :focus {
    outline: none;
    border: 0.2rem solid ${(props) => props.color};
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: red;
  }

  ${(props) => {
    if (props.disabled) {
      return `
          border: 0.2rem solid #CCC;
          background-color:  #AAA;
        `;
    }
  }}

  ${(props) => {
    if (props.type === "number") {
      return `
          text-align: center;
          ::-webkit-outer-spin-button,
          ::-webkit-inner-spin-button{
            -webkit-appearance: none;
          }
          -moz-appearance: textfield;
        `;
    } else if (props.type === "password") {
      return `
          ::-ms-reveal,
          ::-ms-clear {
            display: none;
          }
        `;
    }
  }}
`;

export default TextField;
