import React, { useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import TextField from "./TextField";

/**
 * An Input that saves multiple values (This can be usefull with tags or saving multiple urls)
 */
export const TextFieldArray = ({
  placeholder,
  Wrapper = React.Fragment,
  wrapperProps = {},
  values = [],
  onChange,
  KeyPrefix = "multi-input",
  regex,
  regexMsg,
  height,
  width,
  color,
  textColor,
}) => {
  const errorMsg = useRef();

  const handleKeyPress = (e) => {
    //Add a new value when the key pressed is Enter or ","
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newValue = e.target.value;
      //Verify if the new value fit with the regular expression setted in the props
      if (!regex || new RegExp(regex).test(newValue)) {
        const newValues = [...values, newValue];
        onChange(newValues);
        e.target.value = "";
        errorMsg.current.innerText = "";
      } else {
        errorMsg.current.innerText = regexMsg;
      }
      //Clean the input value
    }
  };

  const removeItem = (index) => {
    // const newValues = values.filter((value) => value !== values[index]);
    const newValues = [
      ...values.slice(0, index),
      ...values.slice(index + 1, values.length),
    ];
    onChange(newValues);
  };

  const generateElements = () => {
    return values.map((value, i) => {
      const props = Wrapper !== React.Fragment ? wrapperProps : null;
      if (Wrapper === "a") {
        props.href = value;
      }
      return (
        <div className="value-element" key={`${KeyPrefix}-${i}`}>
          {Wrapper !== "img" ? (
            <Wrapper {...props}>{value}</Wrapper>
          ) : (
            <img
              src={value}
              height={height}
              width={width}
              alt={`multiinput${i}`}
            />
          )}
          <FontAwesomeIcon
            className="delete-btn"
            icon={faTrash}
            onClick={() => removeItem(i)}
          />
        </div>
      );
    });
  };

  return (
    <TextFieldArrayStyles color={color} textColor={textColor}>
      <div className="multi-input-elements">{generateElements()}</div>

      <TextField
        type="text"
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        className="multi-input-input"
      />
      <div className="error-msg" ref={errorMsg}></div>
    </TextFieldArrayStyles>
  );
};

TextFieldArray.propTypes = {
  /**
   * A string thath work as the input placeholder
   */
  placeholder: PropTypes.string,
  /**
   * The element that wraps the items to add (can be a string (html tag), or a react component)
   */
  Wrapper: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.string,
  ]),
  /**
   * Properties for the wrapper component
   */
  wrapperProps: PropTypes.object,
  /**
   * Values of the component, I normally put a state
   */
  values: PropTypes.array,
  /**
   * The usual onChange of the inputs
   */
  onChange: PropTypes.func,
  /**
   * Prefix to the key of the listed elements
   */
  KeyPrefix: PropTypes.string,
  /**
   * Regular expression to limit the possible entries
   */
  regex: PropTypes.instanceOf(RegExp),
  /**
   * Message displayed if the entry fits with the regex
   */
  regexMsg: PropTypes.string,
  /**
   * This prop only do something if the wrapper is "img"
   */
  height: PropTypes.number,
  /**
   * This prop only do something if the wrapper is "img"
   */
  width: PropTypes.number,

  color: PropTypes.string,
  textColor: PropTypes.string,
};

const TextFieldArrayStyles = styled.div.attrs((props) => ({
  color: props.color || "#00CCFF",
  textColor: props.textColor || "#FFFFFF",
}))`
  display: flex;
  flex-direction: column;
  width: 100%;
  .multi-input-elements {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    .value-element,
    a {
      margin: 0.3rem;
      background-color: ${(props) => props.color};
      padding: 0.3rem 0.5rem;
      border-radius: 0.5rem;
      color: ${(props) => props.textColor};
      .fa-trash {
        margin: 0 0.3rem;
      }
    }
  }
  .delete-btn {
    :hover {
      cursor: pointer;
    }
  }
`;

export default TextFieldArray;
