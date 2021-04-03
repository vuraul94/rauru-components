import React, { useState } from "react";
import TextField from "./TextField";

const TextFieldStory = {
  title: "Inputs/TextField",
  component: TextField,
  argTypes: {
    color: { control: "color" },
  },
};

const Template = (args) => {
  const [value, setValue] = useState("");
  return <TextField {...args} value={value} onChange={setValue} />;
};

export const Text = Template.bind({});
Text.args = {
  type: "text",
  placeholder: "Text",
  autoComplete: "off",
};

export const Number = Template.bind({});
Number.args = {
  type: "number",
  placeholder: "0",
  max: 10,
  min: 0,
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Password",
};

export default TextFieldStory;
