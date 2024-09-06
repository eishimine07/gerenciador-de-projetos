import Project from '@/models/project';
import { MODEL } from '@/services/projects/constants';
import ProjectDTO, { toProjectModel } from '@/services/projects/projectDTO';
import storage from '@/services/storage';

type CreateProjectData = Omit<Project, 'id' | 'createdAt'>;
type CreateProjectDTO = Omit<ProjectDTO, 'id'>;

export default function createProject(data: CreateProjectData): Project {
  const createProjectDTO: CreateProjectDTO = {
    ...data,
    createdAt: (new Date()).toJSON(),
    deadline: data.deadline.toJSON(),
    start: data.start.toJSON(),
  };

  return toProjectModel(storage.createItem<CreateProjectDTO>(MODEL, createProjectDTO));
}