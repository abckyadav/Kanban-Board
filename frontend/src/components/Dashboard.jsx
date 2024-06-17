/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import Board from "./Board";
import Editable from "./Editable";
import LoadingAnimation from "./LoadingAnimation";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { boards, loading, getBoards, addBoard } = useContext(AppContext);

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      {loading && <LoadingAnimation />}
      <div className="p-6">
        {boards.length === 0 && (
          <p className="text-center mb-4 text-red-500">
            Note : You do not have any Board, Please create one
          </p>
        )}
        <div className="flex gap-4 ">
          {boards &&
            boards.map((board) => {
              return <Board key={board._id} board={board} />;
            })}
          <div className="w-full flex justify-center ">
            <div className="w-1/4 min-w-[10rem]">
              <Editable
                text="Add Board"
                placeholder="Enter Board Title"
                onSubmit={(value) => addBoard(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
