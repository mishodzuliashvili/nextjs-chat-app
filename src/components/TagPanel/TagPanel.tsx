"use client";
import { useMain } from "@/app/context";
import MyMultiSelect from "../Inputs/MyMultiSelect";
import { useState } from "react";
import { createTags } from "@/utils/tags";

const TagPanel = () => {
  const [selectedTagOptions, setSelectedTagOptions] = useState<TagOption[]>([]);
  const {
    toggledTagPanel,
    setToggledTagPanel,
    activeTagOptions,
    setActiveTagOptions,
    tagOptions,
    setTagOptions,
  } = useMain();

  const removeTagFromActives = (tagName: string) => {
    setActiveTagOptions((oldActiveTagOptions) =>
      oldActiveTagOptions.filter(
        (activeTagOption) => activeTagOption.value !== tagName
      )
    );
  };

  const addNewTagsToTagOptions = () => {
    const newTagOptions = selectedTagOptions.filter(
      (selectedTagOption) =>
        !tagOptions.find(
          (tagOption) => tagOption.value === selectedTagOption.value
        )
    );
    setTagOptions((oldTagOptions) => [...oldTagOptions, ...newTagOptions]);
  };

  const addNewTagsToActives = async () => {
    const newActiveTagOptions = selectedTagOptions.filter(
      (selectedTagOption) =>
        !activeTagOptions.find(
          (activeTagOption) => activeTagOption.value === selectedTagOption.value
        )
    );
    await createTags(
      newActiveTagOptions
        .filter((ntag) => ntag.__isNew__)
        .map((tagOption) => tagOption.value)
    );
    setActiveTagOptions((oldActiveTagOptions) => [
      ...oldActiveTagOptions,
      ...newActiveTagOptions,
    ]);
  };

  const addTags = async (e: any) => {
    e.preventDefault();
    addNewTagsToTagOptions();
    await addNewTagsToActives();
    setSelectedTagOptions([]);
  };

  return (
    <>
      {toggledTagPanel && (
        <div className="fixed left-0 top-0 h-screen w-full z-50">
          <div
            onClick={() => setToggledTagPanel(false)}
            className="bg-[#00000091] w-full h-full"
          ></div>
          <div className="absolute left-0 top-0 w-full h-full max-w-xs bg-[#d9d9d9] p-5 flex flex-col gap-10 justify-between overflow-auto">
            <div className="flex flex-col gap-3">
              {activeTagOptions.map((activeTagOption) => (
                <div
                  className="p-3 bg-[#ededed] rounded-full cursor-pointer font-medium hover:opacity-60 hover:line-through"
                  onClick={() => removeTagFromActives(activeTagOption.value)}
                  key={activeTagOption.value}
                >
                  {activeTagOption.value}
                </div>
              ))}
            </div>
            <form
              onSubmit={addTags}
              className="flex flex-col gap-4 items-start"
            >
              <MyMultiSelect
                options={tagOptions}
                selectedOptions={selectedTagOptions}
                setSelectedOptions={setSelectedTagOptions}
                filterOption={(option, rawInput) => {
                  return !activeTagOptions.find(
                    (ato) => ato.value === option.value
                  );
                }}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TagPanel;
