export type Theme = "light" | "dark";

export type Status = "todo" | "inprogress" | "done";

export type Task = {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  total: number;
  date: string;
  comments: number;
  links: number;
  avatars?: string[];
  extraAvatars?: number;
  status: Status;
};

export type Board = Record<Status, Task[]>;
