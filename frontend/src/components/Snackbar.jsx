import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

// eslint-disable-next-line react/prop-types
const Snackbar = () => {
  const { message, error } = useContext(AppContext);
  const duration = 3000;
  const [visible, setVisible] = useState(false);
  console.log("message", message, "error:", error);

  useEffect(() => {
    if (message || error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, error, duration]);

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white rounded shadow-lg z-50"
        style={{
          backgroundColor: error ? "rgb(250, 100, 100)" : "rgb(4, 143, 50)",
        }}
      >
        {error || message}
      </div>
    </>
  );
};

export default Snackbar;
