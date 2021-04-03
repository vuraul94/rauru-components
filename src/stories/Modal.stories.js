import React from "react";
import Modal from "./Modal";
import Button from "./Button";

const ModalStory = {
  title: "Containers/Modal",
  component: Modal,
  argTypes: {},
};

const TemplateBasic = (args) => {
  return <Modal {...args}>Test</Modal>;
};

export const Basic_Modal = TemplateBasic.bind({});
Basic_Modal.args = {
  ModalButton: ({toggleOpen}) => <Button onClick={toggleOpen}>Modal</Button>,
  id:"basic-modal"
};

const TemplateImage = (args) => {
  return <Modal {...args}><img src="https://res.cloudinary.com/rauru/image/upload/v1601074827/Peter_guzwwy" alt="peter" /></Modal>;
};

export const Image_Modal = TemplateImage.bind({});
Image_Modal.args = {
  ModalButton: ({toggleOpen}) => <img src="https://res.cloudinary.com/rauru/image/upload/c_thumb,h_100,w_100/v1601074827/Peter_guzwwy" onClick={toggleOpen} alt="peter-thumb"/>,
  id:"basic-modal"
};

export default ModalStory;
