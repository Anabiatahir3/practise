import { createContext, useState } from "react";

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

export default function ProjectContextProvider({ children }) {
  const [projectState, setProjectState] = useState({
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
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function handleCancelProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }
  function handleSelectedProject(id) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }
  function handleDeleteProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
    }));
  }

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const newTask = {
        taskId: Math.random(),
        projectId: prevState.selectedProjectId,
        text: text,
      };

      return {
        ...prevState, //spread operator for the whole state object
        tasks: [newTask, ...prevState.tasks], //spread operator for the array inside the state object
      };
    });
  }
  function handleDeleteTask(id) {
    // setProjectState((prevState) => ({
    //   ...prevState,
    //   tasks: prevState.tasks.filter((task) => task.taskId !== id),
    // }));
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.taskId !== id),
      };
    });
  }

  return (
    <ProjectContext.Provider value={ctxValue}>
      {children}
    </ProjectContext.Provider>
  );
}
