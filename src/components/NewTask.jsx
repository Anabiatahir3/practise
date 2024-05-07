import { useState, useRef, useContext } from "react";
import { ProjectContext } from "../store/project.context";

export default function NewTask() {
  const { handleAddTask } = useContext(ProjectContext);
  const [enteredTask, setEnteredTask] = useState(""); //we can use ref but using state so that we can clear the input field acc to reacts rules

  function handleAddSingleTask() {
    if (enteredTask.trim() === "") {
      return;
    }
    handleAddTask(enteredTask);
    setEnteredTask("");
  }
  return (
    <div className="flex items-center gap-4">
      <input
        value={enteredTask}
        onChange={(e) => setEnteredTask(e.target.value)}
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        onClick={handleAddSingleTask}
        className="text-stone-700 hover:text-stone-950"
      >
        Add Task
      </button>
    </div>
  );
}
