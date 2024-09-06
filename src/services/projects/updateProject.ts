import Project from '@/models/project';
import { MODEL } from '@/services/projects/constants';
import ProjectDTO, { toProjectModel } from '@/services/projects/projectDTO';
import storage from '@/services/storage';

export default function updateProject(data: Project): Project {
  const updateProjectData: ProjectDTO = {
    ...data,
    createdAt: data.createdAt.toJSON(),
    deadline: data.deadline.toJSON(),
    start: data.start.toJSON(),
    updatedAt: (new Date()).toJSON(),
  };
  const projectDTO = storage.updateItem<ProjectDTO>(MODEL, updateProjectData.id, updateProjectData);

  return toProjectModel(projectDTO);
}