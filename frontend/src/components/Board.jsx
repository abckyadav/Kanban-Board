/* eslint-disable react/prop-types */
import Card from "./Card";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Editable from "./Editable";
import Dropdown from "./Dropdown";
import { useState } from "react";

const Board = ({
  board,
  deleteBoard,
  addList,
  deleteList,
  handleDragEnter,
  handleDragEnd,
}) => {
  const [showDropDown, setShowDropdown] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    setShowDropdown(!showDropDown); // Toggle the dropdown
  };

  return (
    <>
      {/* board */}
      <div
        onDragOver={handleDragOver}
        onDrop={() => handleDragEnter(null, board._id)}
        className="min-w-[25%] max-h-full flex flex-col gap-4"
      >
        <div className="flex justify-between items-center">
          <p className="flex-1 font-bold">
            {board?.name} -{" "}
            <span className="text-gray-500">{board.lists.length}</span>
          </p>
          <div className="relative" onClick={handleDropdownClick}>
            <EllipsisHorizontalIcon className="w-6 h-6 hover:cursor-pointer" />

            {showDropDown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div
                  className="bg-white w-28 p-2 rounded-md shadow-md text-center hover:cursor-pointer"
                  onClick={() => deleteBoard(board?._id)}
                >
                  <p className="text-gray-500 hover:text-red-500">
                    Delete Board
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className=" bg-pink-100 flex flex-1 flex-col gap-2 p-2 overflow-y-auto ">
          {/* min-h-[80vh] */}
          {board.lists &&
            board.lists.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  boardId={board._id}
                  deleteList={deleteList}
                  handleDragEnd={handleDragEnd}
                  handleDragEnter={handleDragEnter}
                />
              );
            })}
          <Editable
            displayClass=""
            text="Add Card"
            placeholder="Enter Card Title"
            onSubmit={(value) => addList(board._id, value)}
          />
        </div>
      </div>
    </>
  );
};

export default Board;
