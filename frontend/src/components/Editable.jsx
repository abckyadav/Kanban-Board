/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Editable = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="editable">
      {showEdit ? (
        <form
          className={`editable_edit flex flex-col gap-2 ${
            props.editClass || ""
          }`}
          onSubmit={(event) => {
            event.preventDefault();

            if (props.onSubmit) props.onSubmit(inputValue);
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={props.placeholder || "Enter Item"}
            className="w-full rounded-md p-2 border-2 border-gray-200"
          />
          <div className="flex items-center justify-between">
            <button
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg "
              type="submit"
            >
              {props.buttonText || "Add"}
            </button>
            <XMarkIcon
              className="h-4 w-4 hover:cursor-pointer hover:scale-125"
              onClick={() => {
                setShowEdit(false);
                setInputValue("");
              }}
            />
          </div>
        </form>
      ) : (
        <p
          className={` hover:cursor-pointer bg-[#f8f8f8] hover:bg-[#ccc] p-3 text-center rounded-md shadow-md ${
            props.displayClass ? props.displayClass : ""
          }`}
          onClick={() => setShowEdit(true)}
        >
          {props.text || "Add item"}
        </p>
      )}
    </div>
  );
};

export default Editable;
