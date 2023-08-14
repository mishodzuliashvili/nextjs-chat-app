"use client";
import React, { useEffect, useState } from "react";
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
    <>
      {toggledSidebar && (
        <div
          onClick={() => setToggledSidebar(false)}
          className="w-full h-screen bg-black opacity-50 z-40 fixed left-0 top-0"
        ></div>
      )}
      {toggledSidebar && (
        <div className="bg-[#25292e] text-white fixed h-screen top-0 left-0 max-w-[300px] w-full z-50">
          <div className="flex flex-col justify-between h-screen">
            <div>
              {selectedTagOptions?.map((tagOption) => (
                <div
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
                </div>
              ))}
            </div>
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
        </div>
      )}
    </>
  );
};

export default MySidebar;
