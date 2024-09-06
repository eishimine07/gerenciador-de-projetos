import Project from '@/models/project';
import { MODEL } from '@/services/projects/constants';
import ProjectDTO, { toProjectModel } from '@/services/projects/projectDTO';
import storage from '@/services/storage';

export default function getAllProjects(): Project[] {
  return storage.getAll<ProjectDTO>(MODEL)
    .map((projectDTO) => toProjectModel(projectDTO));
}