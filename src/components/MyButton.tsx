"use client";

import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "./my-button.css";
const MyButton = ({
  children,
  type,
  onMouseDown,
}: {
  children: React.ReactNode;
  type: string;
  onMouseDown?: (e: any) => void;
}) => {
  return (
    <AwesomeButton onMouseDown={onMouseDown} type={type}>
      {children}
    </AwesomeButton>
  );
};

export default MyButton;
