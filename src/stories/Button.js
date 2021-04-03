import React from "react";
import styled from "styled-components";

const Button = ({
  buttonType = "normal",
  color = "#00ccff",
  children,
  ...props
}) => {
  return (
    <StyledButton buttonType={buttonType} color={color}>
      <button type="button" {...props}>
        {children}
      </button>
    </StyledButton>
  );
};

const StyledButton = styled.div.attrs((props) => ({
  color: props.color,
  buttonType: props.buttonType,
}))`
  display: inline-flex;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.1rem solid ${(props) => props.color};
    color: ${(props) => props.color};
    background-color: transparent;
    :hover,
    :focus {
      cursor: pointer;
      border-width: 0.2rem;
      font-weight: bold;
      outline: none;
    }
    ${(props) => {
      switch (props.buttonType) {
        case "round":
          return `
          border-radius: 10rem;
          padding: 0.5rem;
          min-height: 2.5rem;
          min-width: 2.5rem;
          `;
        case "small":
          return `
          border-radius: 0.4rem;
          padding: 0.1rem;
          min-height: 1rem;
          min-width: 1rem;
          `;
        default:
          return `
            padding: 0.4rem 2rem;
            border-radius: 0.4rem;
          `;
      }
    }}
  }
`;

export default Button;
