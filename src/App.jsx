import { useState, useContext } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import { ProjectContext } from "./store/project.context";

function App() {
  const { selectedProjectId, projects } = useContext(ProjectContext);

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  let content = <SelectedProject project={selectedProject} />;
  if (selectedProjectId === null) {
    content = <NewProject />;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar selectedProjectId={selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
