import React, { useState } from "react";
import MultiInput from "./MultiInput";

export default {
  title: "Inputs/MultiInput",
  component: MultiInput,
  argTypes: {
    color: { control: "color" },
    textColor: { control: "color" },
  },
};

const Template = (args) => {
  const [state, setState] = useState([]);
  return <MultiInput {...args} values={state} onChange={setState} />;
};

export const BASIC_MultiInput = Template.bind({});
BASIC_MultiInput.args = {
  placeholder: "Write something, the press ',' or Enter",
  Wrapper: "span",
  KeyPrefix: "simple-multi",
};

export const URL_MultiInput = Template.bind({});
URL_MultiInput.args = {
  placeholder: "Insert URL",
  Wrapper: "a",
  KeyPrefix: "url-multi",
  regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  regexMsg: "That's not a valid URL",
};

export const IMG_MultiInput = Template.bind({});
IMG_MultiInput.args = {
  placeholder: "Insert Image URL",
  Wrapper: "img",
  KeyPrefix: "image-multi",
  regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\.(?:jpg|gif|png)/,
  regexMsg: "That's not a valid Image URL",
  width: 200,
  height: 200,
};
