import React from "react";
import Table from "./Table";

const TableStory = {
  title: "Containers/Table",
  component: Table,
  argTypes: {},
};

const TableTemplate = (args) => {
  return <Table {...args} />;
};

export const Basic_Table = TableTemplate.bind({});
Basic_Table.args = {
  headers: ["Name", "Last Name(s)", "Age"],
  keys: ["name", "last_names", "age"],
  contents: [{ name: "Raúl", last_names: "Venegas Ugalde", age: 26 },{ name: "Jhon", last_names: "Doe", age: 1000 },{ name: "Jane", last_names: "Doe", age: 900 }],
};

export default TableStory;
