import React from "react";
import Button from "./Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage } from "@fortawesome/free-solid-svg-icons";

const ButtonStory = {
  title: "Inputs/Button",
  component: Button,
  argTypes: {
    color: { control: "color" },
  },
};

const TemplateNormal = (args) => <Button {...args}>Button</Button>;
export const Normal = TemplateNormal.bind({});
Normal.args = {};

const TemplateRound = (args) => (
  <Button {...args}>
    <FontAwesomeIcon icon={faPlus} />
  </Button>
);
export const Round = TemplateRound.bind({});
Round.args = {
  buttonType: "round",
};

const TemplateSmall = (args) => (
  <Button {...args}>
    <FontAwesomeIcon icon={faImage} />
  </Button>
);
export const Small = TemplateSmall.bind({});
Small.args = {
  buttonType: "small",
};

export default ButtonStory;
