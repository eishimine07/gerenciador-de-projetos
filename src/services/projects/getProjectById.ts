import Project from '@/models/project';
import { MODEL } from '@/services/projects/constants';
import ProjectDTO, { toProjectModel } from '@/services/projects/projectDTO';
import storage from '@/services/storage';

export default function getProjectById(id: number): Project | null {
  const projectDTO = storage.getItem<ProjectDTO>(MODEL, id);

  if (!projectDTO) return null;

  return toProjectModel(projectDTO);
}