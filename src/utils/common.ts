import { USER_HISTORY } from "./const";
import { isBrowser } from "./isBrowser";

export const getSecretHistory = (): string[] => {
  if (isBrowser()) {
    const data = localStorage.getItem(USER_HISTORY) as string;

    return JSON.parse(data) as string[];
  }

  return [];
};

export const setSecretHistory = (data: string): void => {
  if (isBrowser() && data !== "") {
    const userSecret = getSecretHistory();
    let search: string[] = [];
    if (userSecret?.length > 0) {
      if (userSecret.includes(data)) {
        //put searched keyword on first item
        const index = userSecret.indexOf(data);
        search = [...userSecret];
        search.splice(index, 1);
        search.unshift(data);
      } else {
        search = [data, ...userSecret];
      }
    }
    if (userSecret?.length === 0) {
      search.push(data);
    }
    localStorage.setItem(USER_HISTORY, JSON.stringify(search));
  }
};

export const clearHistory = (data: string[]) => {
  if (isBrowser()) {
    localStorage.setItem(USER_HISTORY, JSON.stringify(data));
  }
};

export const clearAllHistory = () => {
  if (isBrowser()) {
    localStorage.setItem(USER_HISTORY, JSON.stringify([]));
  }
};
