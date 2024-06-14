/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/24/solid";

const Chip = (props) => {
  return (
    <div
      className="flex gap-2 items-center justify-center py-2 px-3 rounded-full text-xs w-fit "
      style={{ backgroundColor: props.color }}
    >
      {props.text}
      {props.close && <XMarkIcon className="h-4 w-4 hover:cursor-pointer" />}
    </div>
  );
};

export default Chip;
