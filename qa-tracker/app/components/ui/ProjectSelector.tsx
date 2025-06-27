// components/ui/ProjectSelector.tsx
"use client";

import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

interface ProjectSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ value, onChange }) => {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Select project(s)"
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

export default ProjectSelector;
