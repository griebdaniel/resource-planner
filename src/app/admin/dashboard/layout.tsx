import React, { ReactNode } from "react";
import Navbar from "./navbar";

const Dashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="">
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default Dashboard;
