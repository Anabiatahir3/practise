import { createContext, useState, useReducer } from "react";

export const ProjectContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  handleAddProjectClick: () => {},
  handleAddProject: () => {},
  handleCancelProject: () => {},
  handleSelectedProject: () => {},
  handleDeleteProject: () => {},
  handleAddTask: () => {},
  handleDeleteTask: () => {},
});

function ProjectReducer(state, action) {
  if (action.type === "ADD_FIRST_CLICK") {
    return {
      ...state,
      selectedProjectId: null,
    };
  }
  if (action.type === "ADD_PROJECT") {
    return {
      ...state,
      projects: [...state.projects, action.payload],
      selectedProjectId: undefined,
    };
  }

  if (action.type === "CANCEL_PROJECT") {
    return {
      ...state,
      selectedProjectId: undefined,
    };
  }
  if (action.type === "SELECTED_PROJECT") {
    return {
      ...state,
      selectedProjectId: action.payload,
    };
  }

  if (action.type === "DELETE_PROJECT") {
    return {
      ...state,
      selectedProjectId: undefined,
      projects: state.projects.filter(
        (project) => project.id !== state.selectedProjectId
      ),
    };
  }

  if (action.type === "ADD_TASK") {
    const newTask = { ...action.payload, projectId: state.selectedProjectId };
    return {
      ...state,
      tasks: [...state.tasks, newTask],
    };
  }

  if (action.type === "DELETE_TASK") {
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.taskId !== action.payload),
    };
  }
}

export default function ProjectContextProvider({ children }) {
  const [projectState, projectStateDispatch] = useReducer(ProjectReducer, {
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  let ctxValue = {
    selectedProjectId: projectState.selectedProjectId,
    projects: projectState.projects,
    tasks: projectState.tasks,
    handleAddProjectClick: handleAddProjectClick,
    handleAddProject: handleAddProject,
    handleCancelProject: handleCancelProject,
    handleSelectedProject: handleSelectedProject,
    handleDeleteProject: handleDeleteProject,
    handleAddTask: handleAddTask,
    handleDeleteTask: handleDeleteTask,
  };
  function handleAddProjectClick() {
    projectStateDispatch({
      type: "ADD_FIRST_CLICK",
    });
  }

  function handleAddProject(projectData) {
    projectStateDispatch({
      type: "ADD_PROJECT",
      payload: {
        ...projectData,
        id: Math.random(),
      },
    });
  }

  function handleCancelProject() {
    projectStateDispatch({
      type: "CANCEL_PROJECT",
    });
  }
  function handleSelectedProject(id) {
    projectStateDispatch({
      type: "SELECTED_PROJECT",
      payload: id,
    });
  }
  function handleDeleteProject() {
    projectStateDispatch({
      type: "DELETE_PROJECT",
    });
  }

  function handleAddTask(text) {
    projectStateDispatch({
      type: "ADD_TASK",
      payload: {
        taskId: Math.random(),
        text,
      },
    });
  }
  function handleDeleteTask(id) {
    projectStateDispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
}
