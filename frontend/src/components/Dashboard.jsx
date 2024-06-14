/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Board from "./Board";
import Editable from "./Editable";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState({
    cardId: "",
    boardId: "",
  });

  const getBoards = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBoards(res.data.boards);
      setLoading(false);
      console.log("boards", boards, message);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const addBoard = async (name) => {
    console.log("name:", name);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getBoards();
      setLoading(false);
      setMessage(res?.message);
      console.log("boards", boards, message);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const deleteBoard = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`http://localhost:8080/api/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getBoards();
      setLoading(false);
      setMessage(res?.message);
      console.log("boards", boards);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const addList = async (boardId, name) => {
    console.log("boardId:", boardId, name);
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8080/api/${boardId}/lists`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getBoards();
      setLoading(false);
      setMessage(res?.message);
      console.log("boards", boards);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const deleteList = async (listId) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `http://localhost:8080/api/${listId}/lists`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getBoards();
      setLoading(false);
      setMessage(res?.message);
      console.log("boards", boards);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const handleDragEnter = (cardId, boardId) => {
    setTarget({ cardId, boardId }); //target card
  };

  const updateCardPosition = async (cardId, sourceBoardId, targetBoardId) => {
    console.log(
      "Updating card position - cardId:",
      cardId,
      "sourceBoardId:",
      sourceBoardId,
      "targetBoardId:",
      targetBoardId
    );
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8080/api/cards/move`,
        {
          cardId,
          sourceBoardId,
          targetBoardId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Card moved response:", res);
      getBoards();
      setLoading(false);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  //source
  const handleDragEnd = (cardId, boardId) => {
    console.log("Drag End: ", cardId, boardId);
    let sourceBoardIndex, sourceCardIndex, targetBoardIndex, targetCardIndex;

    sourceBoardIndex = boards?.findIndex((board) => board._id === boardId);
    if (sourceBoardIndex < 0) return;

    sourceCardIndex = boards[sourceBoardIndex].cards?.findIndex(
      (card) => card._id === cardId
    );
    console.log("sourceCardIndex:", sourceCardIndex);

    if (sourceCardIndex < 0) return;

    targetBoardIndex = boards?.findIndex(
      (board) => board._id === target.boardId
    );

    if (targetBoardIndex < 0) return;

    targetCardIndex = boards[targetBoardIndex].cards?.findIndex(
      (card) => card._id === target.cardId
    );
    if (targetCardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[sourceBoardIndex].cards[sourceCardIndex];
    tempBoards[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoards[targetBoardIndex].cards.splice(targetCardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTarget({
      cardId: "",
      boardId: "",
    });

    updateCardPosition(cardId, boardId, target.boardId);
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-grow items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <div className="p-4 ">
          {boards.length === 0 && (
            <p className="text-center mb-4 text-red-500">
              You donot have any Board, Please create one
            </p>
          )}
          <div className="flex gap-4 ">
            {boards &&
              boards.map((board) => {
                return (
                  <Board
                    key={board._id}
                    board={board}
                    deleteBoard={deleteBoard}
                    addList={addList}
                    deleteList={deleteList}
                    handleDragEnd={handleDragEnd}
                    handleDragEnter={handleDragEnter}
                  />
                );
              })}
            <div className="w-full">
              <Editable
                text="Add Board"
                placeholder="Enter Board Title"
                onSubmit={(value) => addBoard(value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
