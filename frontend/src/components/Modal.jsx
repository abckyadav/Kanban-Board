/* eslint-disable react/prop-types */
const Modal = (props) => {
  console.log("props:modal", props);
  return (
    <div
      onClick={() => (props.onClose ? props.onClose() : "")}
      className="modal fixed top-0 left-0 h-screen bg-[#00000070] flex justify-center items-center w-full z-40"
    >
      <div
        //prevent the Modal component from closing when the user clicks inside its content.
        onClick={(event) => event.stopPropagation()}
        className="modal_content bg-white rounded-md  w-full max-w-lg overflow-auto max-h-[90vh]"
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
