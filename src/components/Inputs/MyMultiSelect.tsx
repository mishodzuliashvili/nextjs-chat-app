"use client";
import { Dispatch, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

type Option = any;

const MyMultiSelect = ({
  options,
  selectedOptions,
  setSelectedOptions,
  filterOption,
}: {
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: Dispatch<React.SetStateAction<Option[]>>;
  filterOption?: (option: Option, rawInput: string) => boolean;
}) => {
  return (
    <CreatableSelect
      value={selectedOptions}
      className="w-full z-10"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "1px solid #cccccc",
          boxShadow: "none",
          padding: "0.535rem",
          borderRadius: "999999px",
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#cccccc",
          primary: "#cccccc",
          neutral50: "#9fa6b1",
        },
      })}
      menuPlacement="top"
      instanceId="react-select-2-live-region"
      isMulti
      isClearable
      placeholder="Select and add tags..."
      onChange={(options) => setSelectedOptions(options as Option[])}
      options={options}
      filterOption={filterOption}
    />
  );
};

export default MyMultiSelect;
