import type { Board, Status, Task } from "./types";

export const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Design new ui presentation", subtitle: "Dribbble marketing", progress: 7, total: 10, date: "24 Aug 2022", comments: 7, links: 2, status: "todo" },
  {
    id: "t2",
    title: "Add more ui/ux mockups",
    subtitle: "Pinterest promotion",
    progress: 4,
    total: 10,
    date: "25 Aug 2022",
    comments: 2,
    links: 2,
    avatars: ["https://i.pravatar.cc/80?img=12", "https://i.pravatar.cc/80?img=47"],
    extraAvatars: 2,
    status: "todo"
  },
  { id: "t3", title: "Design few mobile screens", subtitle: "Dropbox mobile app", progress: 3, total: 10, date: "26 Aug 2022", comments: 6, links: 4, status: "todo" },
  {
    id: "t4",
    title: "Create a tweet and promote",
    subtitle: "Twitter marketing",
    progress: 2,
    total: 14,
    date: "27 Aug 2022",
    comments: 3,
    links: 2,
    avatars: ["https://i.pravatar.cc/80?img=31", "https://i.pravatar.cc/80?img=21"],
    extraAvatars: 2,
    status: "todo"
  },
  {
    id: "i1",
    title: "Design system update",
    subtitle: "Oreo website project",
    progress: 3,
    total: 10,
    date: "12 Nov 2022",
    comments: 2,
    links: 0,
    avatars: ["https://i.pravatar.cc/80?img=8", "https://i.pravatar.cc/80?img=63"],
    extraAvatars: 2,
    status: "inprogress"
  },
  { id: "i2", title: "Create brand guideline", subtitle: "Oreo branding project", progress: 7, total: 10, date: "13 Nov 2022", comments: 2, links: 13, status: "inprogress" },
  {
    id: "i3",
    title: "Create wireframe for ios app",
    subtitle: "Oreo ios app project",
    progress: 4,
    total: 10,
    date: "14 Nov 2022",
    comments: 4,
    links: 0,
    avatars: ["https://i.pravatar.cc/80?img=15", "https://i.pravatar.cc/80?img=60"],
    extraAvatars: 2,
    status: "inprogress"
  },
  { id: "i4", title: "Create ui kit for layout", subtitle: "Crypto mobile app", progress: 3, total: 10, date: "15 Nov 2022", comments: 23, links: 12, status: "inprogress" },
  { id: "d1", title: "Add product to the market", subtitle: "Ui8 marketplace", progress: 10, total: 10, date: "6 Jan 2022", comments: 1, links: 5, status: "done" },
  { id: "d2", title: "Launch product promotion", subtitle: "Kickstarter campaign", progress: 10, total: 10, date: "7 Jan 2022", comments: 17, links: 3, status: "done" },
  {
    id: "d3",
    title: "Make twitter banner",
    subtitle: "Twitter marketing",
    progress: 10,
    total: 10,
    date: "8 Jan 2022",
    comments: 0,
    links: 2,
    avatars: ["https://i.pravatar.cc/80?img=25", "https://i.pravatar.cc/80?img=53"],
    extraAvatars: 2,
    status: "done"
  }
];

export const STATUS_LABELS: Record<Status, string> = {
  todo: "To do",
  inprogress: "In progress",
  done: "Done"
};

export const STATUS_ORDER: Status[] = ["todo", "inprogress", "done"];

export function buildInitialBoard(): Board {
  return {
    todo: INITIAL_TASKS.filter((task) => task.status === "todo"),
    inprogress: INITIAL_TASKS.filter((task) => task.status === "inprogress"),
    done: INITIAL_TASKS.filter((task) => task.status === "done")
  };
}
