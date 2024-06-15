/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  ClockIcon,
  DocumentCheckIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "./Dropdown";
import CardInfo from "./CardInfo";

const Card = ({
  boardId,
  card,
  addTask,
  updateList,
  updateTask,
  deleteTask,
  deleteList,
  handleDragEnd,
  handleDragEnter,
}) => {
  const [showDropDown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    setShowDropdown(!showDropDown); // Toggle the dropdown
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <>
      {showModal && (
        <div onClick={(e) => e.stopPropagation()}>
          <CardInfo
            card={card}
            onClose={() => setShowModal(false)}
            addTask={addTask}
            updateList={updateList}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      )}

      <div
        draggable
        onDragEnd={() => handleDragEnd(card?._id, boardId)}
        onDragEnter={() => handleDragEnter(card?._id, boardId)}
        onClick={() => setShowModal(true)}
        className="p-2 py-4 rounded-md flex flex-col gap-2 bg-white group hover:cursor-pointer"
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="font-bold">{card?.name}</div>
          <div className="relative" onClick={handleDropdownClick}>
            <EllipsisHorizontalIcon className="w-6 h-6 hover:cursor-pointer  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {showDropDown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div
                  className="bg-white w-28 p-2 rounded-md shadow-md text-center hover:cursor-pointer"
                  onClick={() => deleteList(card?._id)}
                >
                  <p className="text-gray-500 hover:text-red-500">
                    Delete Card
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex justify-between items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <p>{formatDate(card?.updatedAt || card?.createdAt)}</p>
          </div>
          <p className="flex justify-between items-center gap-1">
            <DocumentCheckIcon className="w-4 h-4" /> {card?.tasks?.length}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
