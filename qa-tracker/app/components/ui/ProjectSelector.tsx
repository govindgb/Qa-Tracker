"use client";

import React, { useEffect, useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";

interface ProjectSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ value, onChange }) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("projectTags");
    if (stored) {
      const parsed = JSON.parse(stored);
      const formattedOptions = parsed.map((proj: string) => ({
        label: proj,
        value: proj,
      }));
      setOptions(formattedOptions);
    }
  }, []);

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
