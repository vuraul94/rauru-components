import React, { useState } from "react";
import TextFieldArray from "./TextFieldArray";

const TextFieldArrayStory = {
  title: "Inputs/TextFieldArray",
  component: TextFieldArray,
  argTypes: {
    color: { control: "color" },
    textColor: { control: "color" },
  },
};

const Template1 = (args) => {
  const [state, setState] = useState(["Tag1", "Tag2", "Tag3"]);
  return <TextFieldArray {...args} values={state} onChange={setState} />;
};

const Template2 = (args) => {
  const [state, setState] = useState([]);
  return <TextFieldArray {...args} values={state} onChange={setState} />;
};

export const BASIC_TextFieldArray = Template1.bind({});
BASIC_TextFieldArray.args = {
  placeholder: "Write something, then press ',' or Enter",
  Wrapper: "span",
  KeyPrefix: "simple-array",
};

export const URL_TextFieldArray = Template2.bind({});
URL_TextFieldArray.args = {
  placeholder: "Insert URL",
  Wrapper: "a",
  KeyPrefix: "url-array",
  regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
  regexMsg: "That's not a valid URL",
};

export const IMG_TextFieldArray = Template2.bind({});
IMG_TextFieldArray.args = {
  placeholder: "Insert Image URL",
  Wrapper: "img",
  KeyPrefix: "image-array",
  regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)\.(?:jpg|gif|png)/,
  regexMsg: "That's not a valid Image URL",
  width: 200,
  height: 200,
};

export default TextFieldArrayStory;
