import React, { InputHTMLAttributes } from "react";

export const DdInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <div>
      <input
        {...props}
        className="w-full capitalize p-3 outline-blue-300 bg-neutral-200 rounded-lg "
        autoFocus
      />
    </div>
  );
};

export const DdTextArea: React.FC<InputHTMLAttributes<HTMLTextAreaElement>> = (
  props
) => {
  return (
    <div className="w-full">
      <textarea
        {...props}
        className="w-full p-3 outline-blue-300 bg-neutral-200 rounded-lg "
        autoFocus
        rows={10}
      >
        {props.value}
      </textarea>
    </div>
  );
};
