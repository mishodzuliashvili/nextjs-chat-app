"use client";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const MyMultiSelect = ({
  senderSelectedTagOptions,
  setSenderSelectedTagOptions,
  filteredElements = [],
  tagOptions,
  setTagOptions,
}: {
  senderSelectedTagOptions: TagOption[];
  setSenderSelectedTagOptions: (senderSelectedTagOptions: TagOption[]) => void;
  filteredElements?: any;
  tagOptions: TagOption[];
  setTagOptions: (tagOptions: TagOption[]) => void;
}) => {
  return (
    <CreatableSelect
      value={senderSelectedTagOptions as TagOption[]}
      className="w-full z-10"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "1px solid #cccccc",
          boxShadow: "none",
          padding: "0.40rem",
          borderRadius: "0.375rem",
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
      onChange={(ops) => setSenderSelectedTagOptions(ops as TagOption[])}
      options={tagOptions.filter(
        (tagOption) =>
          !filteredElements.find(
            (filteredElement: any) => filteredElement.value === tagOption.value
          )
      )}
    />
  );
};

export default MyMultiSelect;
