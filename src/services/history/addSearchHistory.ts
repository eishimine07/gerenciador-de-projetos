import { FIXED_ID, LIMIT, MODEL } from '@/services/history/constants';
import storage from '@/services/storage';

export default function addSearchHistory(search: string): string {
  let searchHistory = storage.getItem<string[]>(MODEL, FIXED_ID);

  if (!searchHistory) {
    searchHistory = storage.updateItem<string[]>(MODEL, FIXED_ID, []);
  }

  searchHistory.unshift(search);

  if (searchHistory.length > LIMIT) {
    searchHistory = searchHistory.slice(0, LIMIT);
  }

  storage.updateItem<string[]>(MODEL, FIXED_ID, searchHistory);

  return search;
}