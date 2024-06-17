import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { backendBaseURL } from "../api";

const AppContext = createContext();

/* eslint-disable react/prop-types */
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [boards, setBoards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [target, setTarget] = useState({
    cardId: "",
    boardId: "",
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${backendBaseURL}/api/login`, {
        email,
        password,
      });
      setUser(res?.data?.user);
      setMessage(res?.data?.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error("Login failed", error);
      if (error.response) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (name, email, password, navigate) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${backendBaseURL}/api/register`, {
        name,
        email,
        password,
      });
      if (res.status === 200) {
        alert(res.data.message);
        navigate("/");
      }
      setMessage(res?.data?.message);
    } catch (error) {
      console.error("Signup failed", error);
      if (error.response) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setMessage("Logout Successfully");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const getBoards = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendBaseURL}/api/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setBoards(res.data.boards);
      // setMessage(res?.data?.message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const addBoard = async (name) => {
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
      setLoading(false);
      getBoards();
      setMessage(res?.data?.message);
      console.log("boards", boards, message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
      setLoading(false);
      getBoards();
      setMessage(res?.data?.message);
      console.log("boards", boards);
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
      setLoading(false);
      getBoards();
      setMessage(res?.data?.message);
      console.log("boards", boards);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const updateList = async (listId, name) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${backendBaseURL}/api/${listId}/lists`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      getBoards();
      setMessage(res?.data?.message);
      console.log("boards", boards);
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
      setLoading(false);
      getBoards();
      setMessage(res?.data?.message);
      console.log("message:", message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const addTask = async (listId, task) => {
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
      setMessage(res?.data?.message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
      setLoading(false);
      getBoards();
      setMessage(res?.message);
      setMessage(res?.data?.message);
      console.log("Task updated:", res.data.task);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const deleteTask = async (taskId) => {
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
      setMessage(res?.data?.message);
      console.log("message:", message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
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
      setLoading(false);
      getBoards();
      setMessage(res?.data?.message);
      console.log("Card moved response:", res.data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  //target
  const handleDragEnter = (cardId, boardId) => {
    setTarget({ cardId, boardId });
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

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleSignup,
        handleLogout,
        loading,
        message,
        error,
        boards,
        getBoards,
        addBoard,
        deleteBoard,
        addList,
        updateList,
        deleteList,
        addTask,
        updateTask,
        deleteTask,
        handleDragEnter,
        handleDragEnd,
        showModal,
        setShowModal,
        selectedCardId,
        setSelectedCardId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
