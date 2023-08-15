"use client";

import { useEffect, useRef } from "react";

const ScrollToBottom = ({
  children,
  scrollDependecyList,
}: {
  children: React.ReactNode;
  scrollDependecyList: any[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (ref) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [scrollDependecyList]);

  return (
    <>
      {children}
      <div ref={ref}></div>
    </>
  );
};

export default ScrollToBottom;
