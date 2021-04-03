import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
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
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

/**A simple RichTextEditor */
const RichTextEditor = ({
  value = "",
  onChange,
  placeholder,
  id = "rich-editor",
  maxHeight = 200,
  minHeight = 10,
  color,
}) => {
  const [innerValue, setInnerValue] = useState(""); //Used to manage the value inside the component
  const [tableCols, setTableCols] = useState(1);
  const [tableRows, setTableRows] = useState(1);
  const [imageSrc, setImageSrc] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDisplay, setLinkDisplay] = useState("");

  const firstRenderRef = useRef(true); //Check if its the first time that the component is rendered
  const refPlaceholder = useRef(); // Used to set the placeholder
  const refTextArea = useRef();

  const isDescendant = (parent, child) => {
    let node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  useEffect(() => {
    /** Hide Placeholder if the editor have text inside */
    if (refTextArea.current.innerHTML.length > 0) {
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
  }, [value, innerValue, setInnerValue]);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.innerHTML);
    }
    setInnerValue(e.target.innerHTML);
  };

  //Function to change the format of the selected text or add content
  const insertFormat = (event, newFormat, params) => {
    event.preventDefault();
    const sel = window.getSelection();
    const node = sel.baseNode;
    //Check if the selected area is inside the textarea of the RichTextEditor
    if (
      isDescendant(refTextArea.current, node) ||
      refTextArea.current === node
    ) {
      switch (newFormat) {
        /** < Simple formats, this ones only wraps the selected text with --*/
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
        /**-- Simple formats, this ones only wraps the selected text >*/

        /**< Insertion formats, this ones add new elements to the text editor --*/
        case "IMAGE": {
          if (/(https?:\/\/.*\.(?:png|jpg|gif|svg))/.test(imageSrc)) {
            document.execCommand("insertImage", false, imageSrc);
            setImageSrc("");
            hideToggle(`${id}-img-src`);
          }
          break;
        }

        case "TABLE": {
          console.log("a");
          let tableStructure = ``;
          for (let row = 0; row < params.rows; row++) {
            let colsStructure = ``;
            for (let col = 0; col < params.cols; col++) {
              colsStructure += `<td></td>`;
            }
            tableStructure += `<tr>${colsStructure}</tr>`;
          }
          document.execCommand(
            "insertHTML",
            false,
            `<table border="1" style="width:100%;">${tableStructure}</table>`
          );
          setTableCols(1);
          setTableRows(1);
          hideToggle(`${id}-table-dimensions`);
          break;
        }

        case "LINK": {
          if (linkUrl.trim() !== "") {
            document.execCommand(
              "insertHTML",
              false,
              `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" >${
                linkDisplay.trim() !== "" ? linkDisplay : linkUrl
              }</table>`
            );
            setLinkUrl("");
            setLinkDisplay("");
            hideToggle(`${id}-link-params`);
          }

          break;
        }
        /**-- Insertion formats, this ones add new elements to the text editor >*/

        default:
          // Check if the tag is the same, if this occurs it will remove this tag and replace it with a simple div
          if (node.parentNode.nodeName !== newFormat) {
            document.execCommand("formatBlock", false, newFormat);
          } else {
            document.execCommand("formatBlock", false, "DIV");
          }
          break;
      }
    }
  };

  // Hide and unhide the subcontrols
  const hideToggle = (id) => {
    const element = document.getElementById(id);
    if (Object.values(element.classList).includes("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  };

  // Return a button with the setted values
  const formatButton = (label, format, params) => {
    return (
      <button
        className="format-btn"
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          insertFormat(e, format, params);
        }}
      >
        {typeof label !== "string" ? <FontAwesomeIcon icon={label} /> : label}
      </button>
    );
  };

  return (
    <RichTextEditorStyles color={color} id={id}>
      <div className="controls">
        <button
          className="format-btn"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            hideToggle(`${id}-header-levels`);
          }}
        >
          <FontAwesomeIcon icon={faHeading} />
        </button>

        <div id={`${id}-header-levels`} className="subcontrols hidden">
          {formatButton("1", `H1`)}
          {formatButton("2", `H2`)}
          {formatButton("3", `H3`)}
          {formatButton("4", `H4`)}
          {formatButton("5", `H5`)}
          {formatButton("6", `H6`)}
        </div>

        {formatButton(faBold, "BOLD")}
        {formatButton(faItalic, "ITALIC")}
        {formatButton(faStrikethrough, "STRIKE_TRHOUGH")}
        {formatButton(faUnderline, "UNDERLINE")}
        {formatButton(faListOl, "ORDERED_LIST")}
        {formatButton(faListUl, "UNORDERED_LIST")}
        {formatButton(faAlignLeft, "JUSTIFY_LEFT")}
        {formatButton(faAlignCenter, "JUSTIFY_CENTER")}
        {formatButton(faAlignRight, "JUSTIFY_RIGHT")}
        {formatButton(faAlignJustify, "JUSTIFY_FULL")}

        {/*< Insert Table controls --*/}
        <button
          className="format-btn"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            hideToggle(`${id}-table-dimensions`);
          }}
        >
          <FontAwesomeIcon icon={faTable} />
        </button>
        <div id={`${id}-table-dimensions`} className="subcontrols hidden">
          <label htmlFor="cols" className="rich-label">
            cols
          </label>
          <input
            type="number"
            className="control-input"
            name="cols"
            min={1}
            value={tableCols}
            onChange={(e) => {
              setTableCols(e.target.value);
            }}
          />
          <label htmlFor="rows" className="rich-label">
            rows
          </label>
          <input
            type="number"
            className="control-input"
            name="rows"
            min={1}
            value={tableRows}
            onChange={(e) => {
              setTableRows(e.target.value);
            }}
          />
          {formatButton(faCheck, "TABLE", { rows: tableRows, cols: tableCols })}
        </div>
        {/*-- Insert Table controls >*/}

        {/*< Insert Image controls --*/}
        <button
          className="format-btn"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            hideToggle(`${id}-img-src`);
          }}
        >
          <FontAwesomeIcon icon={faImage} />
        </button>
        <div id={`${id}-img-src`} className="subcontrols hidden">
          <input
            type="text"
            placeholder="Image URL"
            value={imageSrc}
            onChange={(e) => {
              setImageSrc(e.target.value);
            }}
          />
          {formatButton(faCheck, "IMAGE")}
        </div>
        {/*-- Insert Image controls >*/}

        {/*< Insert Link controls --*/}
        <button
          className="format-btn"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            hideToggle(`${id}-link-params`);
          }}
        >
          <FontAwesomeIcon icon={faLink} />
        </button>
        <div id={`${id}-link-params`} className="subcontrols hidden">
          <input
            type="text"
            placeholder="URL"
            value={linkUrl}
            onChange={(e) => {
              setLinkUrl(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Display Text"
            value={linkDisplay}
            onChange={(e) => {
              setLinkDisplay(e.target.value);
            }}
          />
          {formatButton(faCheck, "LINK")}
        </div>
        {/*-- Insert Link controls >*/}
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
          style={{ maxHeight, minHeight }}
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
      border-bottom: 0.1rem solid ${(props) => props.color};
      resize: vertical;
      :focus {
        outline: none;
        border-bottom: 0.2rem solid ${(props) => props.color};
      }
      table {
        border-collapse: collapse;
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
    align-items: center;
    .format-btn {
      padding: 0.1rem;
      margin: 0.2rem;
      height: 2rem;
      width: 2rem;
      font-size: 1rem;
      background-color: transparent;
      color: ${(props) => props.color};
      border: 0.1rem solid ${(props) => props.color};
      :hover,
      :focus {
        border: 0.2rem solid ${(props) => props.color};
        outline: none;
      }
      :hover {
        cursor: pointer;
      }
    }
    .subcontrols {
      border: 0.1rem solid ${(props) => props.color};
      input[type="text"],
      input[type="number"] {
        border: none;
        border-bottom: 0.1rem solid ${(props) => props.color};
        :focus {
          border-bottom: 0.2rem solid ${(props) => props.color};
          outline: none;
        }
      }
      input[type="number"] {
        width: 4rem;
      }
    }
  }
  .hidden {
    display: none;
  }
`;

RichTextEditor.propTypes = {
  /** The value is an HTML save as String */
  value: PropTypes.string,
  /**
   * The usual onChange of the inputs
   */
  onChange: PropTypes.func,
  /** Only a simple string, used as placeholder */
  placeholder: PropTypes.string,
  /** Id, is recomended set it */
  id: PropTypes.string.isRequired,
  /**MaxHeight of the textarea of the editor */
  maxHeight: PropTypes.number,
  /**MinHeight of the textarea of the editor */
  minHeight: PropTypes.number,
  color: PropTypes.string,
};

export default RichTextEditor;
