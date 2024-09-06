import { MODEL } from '@/services/projects/constants';
import storage from '@/services/storage';

export default function deleteProject(id: number): void {
  storage.removeItem(MODEL, id);
}