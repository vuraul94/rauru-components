import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeading,
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline,
  faListUl,
  faListOl,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faTable,
  faImage,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

const RichTextEditor = ({
  value = "",
  onChange,
  placeholder,
  className,
  id = "rich-editor",
  maxHeight = 200,
  color,
}) => {
  const [innerValue, setInnerValue] = useState(""); //Used to manage the value inside the component
  const firstRenderRef = useRef(true);
  const refPlaceholder = useRef();
  const refTextArea = useRef();

  useEffect(() => {
    /** Hide Placeholder if the editor have text inside */
    if (innerValue.trim().length > 0) {
      refPlaceholder.current.style.display = "none";
    } else {
      refPlaceholder.current.style.display = "block";
    }
    /******************************************************/
    if (firstRenderRef.current || value === "" || value !== innerValue) {
      setInnerValue(value);
      refTextArea.current.innerHTML = value;
      firstRenderRef.current = false;
    }
  });

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.innerHTML);
    }
    setInnerValue(e.target.innerHTML);
  };

  const insertFormat = (event, newFormat, params) => {
    event.preventDefault();
    switch (newFormat) {
      case "BOLD":
        document.execCommand("bold");
        break;
      case "ITALIC":
        document.execCommand("italic");
        break;
      case "STRIKE_TRHOUGH":
        document.execCommand("strikeThrough");
        break;
      case "UNDERLINE": {
        document.execCommand("underline");
        break;
      }
      case "ORDERED_LIST": {
        document.execCommand("insertOrderedList");
        break;
      }
      case "UNORDERED_LIST": {
        document.execCommand("insertUnorderedList");
        break;
      }
      case "JUSTIFY_LEFT": {
        document.execCommand("justifyLeft");
        break;
      }
      case "JUSTIFY_CENTER": {
        document.execCommand("justifyCenter");
        break;
      }
      case "JUSTIFY_RIGHT": {
        document.execCommand("justifyRight");
        break;
      }
      case "JUSTIFY_FULL": {
        document.execCommand("justifyFull");
        break;
      }
      default:
        return;
    }
  };

  return (
    <RichTextEditorStyles>
      <div className="controls">
        <button className="format-btn">
          <FontAwesomeIcon icon={faHeading} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "BOLD");
          }}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "ITALIC");
          }}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "STRIKE_TRHOUGH");
          }}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "UNDERLINE");
          }}
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "ORDERED_LIST");
          }}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "UNORDERED_LIST");
          }}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "JUSTIFY_LEFT");
          }}
        >
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "JUSTIFY_CENTER");
          }}
        >
          <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "JUSTIFY_RIGHT");
          }}
        >
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
        <button
          className="format-btn"
          onClick={(e) => {
            insertFormat(e, "JUSTIFY_FULL");
          }}
        >
          <FontAwesomeIcon icon={faAlignJustify} />
        </button>
        <button className="format-btn">
          <FontAwesomeIcon icon={faTable} />
        </button>
        <button className="format-btn">
          <FontAwesomeIcon icon={faImage} />
        </button>
        <button className="format-btn">
          <FontAwesomeIcon icon={faLink} />
        </button>
      </div>
      <div className="editor-container">
        <span
          id={`${id ? `${id}-` : ""}placeholder`}
          ref={refPlaceholder}
          className="placeholder"
        >
          {placeholder}
        </span>
        <div
          className="textarea-editor"
          contentEditable
          suppressContentEditableWarning={true}
          ref={refTextArea}
          style={{ maxHeight }}
          onInput={handleChange}
        ></div>
      </div>
    </RichTextEditorStyles>
  );
};

const RichTextEditorStyles = styled.div.attrs((props) => ({
  color: props.color || "#00CCFF",
}))`
  .editor-container {
    display: flex;
    flex-direction: column;
    .textarea-editor {
      padding: 0.5rem;
      overflow-y: scroll;
      min-height: 1rem;
      border-bottom: 0.1rem solid ${(props) => props.color};
      :focus {
        outline: none;
        border-bottom: 0.2rem solid ${(props) => props.color};
      }
    }
    .placeholder {
      padding: 0.5rem;
      margin-bottom: -2.2em;
      color: #777777;
      border: 1px solid transparent;
    }
  }
  .controls {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    .format-btn {
      padding: 0.1rem;
      margin: 0.2rem;
      height: 2rem;
      width: 2rem;
      font-size: 1rem;
      color: ${(props) => props.color};
      border: 0.1rem solid ${(props) => props.color};
      :hover,
      :focus {
        border: 0.2rem solid ${(props) => props.color};
        outline: none;
      }
    }
  }
`;

export default RichTextEditor;
