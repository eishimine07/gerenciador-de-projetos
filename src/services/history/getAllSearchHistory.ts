import { FIXED_ID, MODEL } from '@/services/history/constants';
import storage from '@/services/storage';

export default function getAllSearchHistory(): string[] {
  return storage.getItem<string[]>(MODEL, FIXED_ID) ?? [];
}