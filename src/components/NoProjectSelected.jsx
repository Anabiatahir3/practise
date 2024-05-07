import React from "react";
import notask from "../assets/notask.jpg";
import Button from "./Button";
import { useContext } from "react";
import { ProjectContext } from "../store/project.context";

const NoProjectSelected = () => {
  const { handleAddProjectClick, selectedProjectId } =
    useContext(ProjectContext);
  console.log("id", selectedProjectId);

  return (
    <div className="w-2/3 mt-24 text-center">
      <img
        src={notask}
        alt="an empty task list "
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No project selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one.
      </p>
      <p className="mt-8">
        <Button onClick={handleAddProjectClick}>Create new project</Button>
      </p>
    </div>
  );
};

export default NoProjectSelected;
