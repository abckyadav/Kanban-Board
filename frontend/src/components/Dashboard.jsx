/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Board from "./Board";
import Editable from "./Editable";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { backendBaseURL, localBaseURL } from "../api";
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
      const res = await axios.get(`${backendBaseURL}/api/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBoards(res.data.boards);
      setLoading(false);
      console.log("boards", boards);
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
        `${backendBaseURL}/api/`,
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
      const res = await axios.delete(`${backendBaseURL}/api/${id}`, {
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
        `${backendBaseURL}/api/${boardId}/lists`,
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

  const updateList = async (listId, name) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${backendBaseURL}/api/${listId}/lists`,
        { name }, // Data to be sent in the body of the request
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
      const res = await axios.delete(`${backendBaseURL}/api/${listId}/lists`, {
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
  const deleteTask = async (taskId) => {
    console.log("taskId:", taskId);
    try {
      setLoading(true);
      const res = await axios.delete(`${backendBaseURL}/api/${taskId}/tasks`, {
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

  const updateTask = async (taskId, updatedTask) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${backendBaseURL}/api/${taskId}/tasks`,
        updatedTask,
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
      console.log("Task updated:", res.data.task);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const addTask = async (listId, task) => {
    console.log("task:", task);
    console.log("listId:", listId);
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendBaseURL}/api/${listId}/tasks`,
        task,
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
        `${backendBaseURL}/api/cards/move`,
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
      console.log("Card moved response:", res.data);
      getBoards();
      setLoading(false);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  //source
  const handleDragEnd = (cardId, boardId) => {
    // console.log("Drag End initiated - cardId:", cardId, "boardId:", boardId);
    let sourceBoardIndex, sourceCardIndex, targetBoardIndex, targetCardIndex;

    sourceBoardIndex = boards.findIndex((board) => board._id === boardId);

    if (sourceBoardIndex < 0) {
      console.log("Source board not found");
      return;
    }

    const sourceBoard = boards[sourceBoardIndex];

    if (!sourceBoard.lists) {
      console.log("Source board does not have any cards");
      return;
    }

    sourceCardIndex = sourceBoard.lists.findIndex(
      (list) => list._id === cardId
    );

    if (sourceCardIndex < 0) {
      console.log("Source card not found in the specified board");
      return;
    }

    targetBoardIndex = boards.findIndex(
      (board) => board._id === target.boardId
    );

    if (targetBoardIndex < 0) {
      console.error("Target board not found");
      return;
    }

    const targetBoard = boards[targetBoardIndex];

    if (!targetBoard.lists) {
      console.error("Target board does not have any cards");
      return;
    }

    targetCardIndex = targetBoard.lists.findIndex(
      (list) => list._id === target.cardId
    );

    const tempBoards = [...boards];
    const sourceCard = tempBoards[sourceBoardIndex].lists[sourceCardIndex];
    tempBoards[sourceBoardIndex].lists.splice(sourceCardIndex, 1);
    tempBoards[targetBoardIndex].lists.splice(targetCardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTarget({
      cardId: "",
      boardId: "",
    });

    console.log("Updating card position in the backend");
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
                    addList={addList}
                    addTask={addTask}
                    updateList={updateList}
                    updateTask={updateTask}
                    deleteBoard={deleteBoard}
                    deleteTask={deleteTask}
                    deleteList={deleteList}
                    handleDragEnd={handleDragEnd}
                    handleDragEnter={handleDragEnter}
                  />
                );
              })}
            <div className="w-full flex justify-center ">
              <div className="w-1/2">
                <Editable
                  text="Add Board"
                  placeholder="Enter Board Title"
                  onSubmit={(value) => addBoard(value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
