import Project from "@/models/project"

type ProjectDTO = {
  client: string
  coverUrl?: string
  createdAt: string
  deadline: string
  favorite: boolean
  id: number
  start: string
  title: string
  updatedAt?: string
}

export function toProjectModel(dto: ProjectDTO): Project {
  return {
    client: dto.client,
    createdAt: new Date(dto.createdAt),
    coverUrl: dto.coverUrl,
    deadline: new Date(dto.deadline),
    favorite: dto.favorite,
    id: dto.id,
    start: new Date(dto.start),
    title: dto.title,
  }
}

export default ProjectDTO;