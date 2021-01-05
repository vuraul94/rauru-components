import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";

export default {
  title: "Inputs/RichTextEditor",
  component: RichTextEditor,
  argTypes: {
    color: { control: "color" },
    textColor: { control: "color" },
  },
};

const Template = (args) => {
  const [state, setState] = useState("");
  return <RichTextEditor {...args} value={state} onChange={setState} />;
};

export const BASIC_RichTextEditor= Template.bind({});
BASIC_RichTextEditor.args = {
  placeholder: "Write Something",
  KeyPrefix: "simple-rich-text",
};

