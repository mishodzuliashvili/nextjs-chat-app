import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MyMultiSelect from "./MyMultiSelect";
import MyButton from "./MyButton";

const MySidebar = ({
  toggledSidebar,
  setToggledSidebar,
  selectedTagOptions,
  setSelectedTagOptions,
  tagOptions,
  setTagOptions,
}: {
  toggledSidebar: boolean;
  setToggledSidebar: (toggledSidebar: boolean) => void;
  selectedTagOptions: TagOption[];
  setSelectedTagOptions: any;
  tagOptions: TagOption[];
  setTagOptions: any;
}) => {
  const [addSelectedTagOptions, setAddSelectedTagOptions] = useState<
    TagOption[]
  >([]);
  return (
    <Sidebar
      backgroundColor="#25292e"
      style={{
        border: 0,
        color: "white",
      }}
      onBackdropClick={() => setToggledSidebar(false)}
      toggled={toggledSidebar}
      breakPoint="all"
    >
      <div className="flex flex-col justify-between h-screen">
        <Menu>
          {selectedTagOptions?.map((tagOption) => (
            <MenuItem
              key={tagOption.label}
              onClick={() =>
                setSelectedTagOptions((prev: TagOption[]) =>
                  prev.filter(
                    (prevTagOption: TagOption) =>
                      prevTagOption.value !== tagOption.value
                  )
                )
              }
            >
              {tagOption.label}
            </MenuItem>
          ))}
        </Menu>
        <div className="text-black p-5">
          <MyMultiSelect
            tagOptions={tagOptions}
            setTagOptions={setTagOptions}
            senderSelectedTagOptions={addSelectedTagOptions}
            setSenderSelectedTagOptions={setAddSelectedTagOptions}
            filteredElements={selectedTagOptions}
          />
          <MyButton
            onMouseDown={() => {
              setSelectedTagOptions((prev: any) => [
                ...prev,
                ...addSelectedTagOptions,
              ]);
              // that has __isNew__ set to true
              setTagOptions((prev: any) => [
                ...prev,
                ...addSelectedTagOptions.filter(
                  (tagOption) => tagOption.__isNew__ === true
                ),
              ]);
              fetch("/api/tags", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tags: addSelectedTagOptions
                    .filter((tagOption) => tagOption.__isNew__ === true)
                    .map((tagOption) => tagOption.value),
                }),
              }).then(() => {
                console.log(
                  "Added new tags",
                  addSelectedTagOptions,
                  addSelectedTagOptions.filter(
                    (tagOption) => tagOption.__isNew__ === true
                  )
                );
              });

              setAddSelectedTagOptions([]);
            }}
            type="github"
          >
            Add Tags
          </MyButton>
        </div>
      </div>
    </Sidebar>
  );
};

export default MySidebar;
