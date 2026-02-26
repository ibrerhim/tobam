"use client";

import { useMemo, useState } from "react";
import { STATUS_LABELS, buildInitialBoard } from "./data";
import type { Board, Status, Task } from "./types";

function createTaskId() {
  return typeof globalThis.crypto?.randomUUID === "function"
    ? globalThis.crypto.randomUUID()
    : `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useBoardState() {
  const [board, setBoard] = useState<Board>(() => buildInitialBoard());

  const totalTasks = useMemo(() => board.todo.length + board.inprogress.length + board.done.length, [board]);

  const statusCounts = useMemo(
    () => ({
      todo: board.todo.length,
      inprogress: board.inprogress.length,
      done: board.done.length
    }),
    [board]
  );

  const doneRatio = useMemo(() => {
    if (!totalTasks) return 0;
    return board.done.length / totalTasks;
  }, [board.done.length, totalTasks]);

  const addTask = (status: Status) => {
    const title = window.prompt(`Task title for ${STATUS_LABELS[status]} column`);
    if (!title) return;

    setBoard((prev) => ({
      ...prev,
      [status]: [
        {
          id: createTaskId(),
          title: title.trim(),
          subtitle: "New personal task",
          progress: status === "done" ? 10 : 1,
          total: 10,
          date: new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
          comments: 0,
          links: 0,
          status
        },
        ...prev[status]
      ]
    }));
  };

  const advanceTask = (task: Task) => {
    const nextStatus: Status = task.status === "todo" ? "inprogress" : task.status === "inprogress" ? "done" : "todo";

    setBoard((prev) => {
      const source = [...prev[task.status]];
      const index = source.findIndex((item) => item.id === task.id);
      if (index === -1) return prev;

      const [moved] = source.splice(index, 1);
      const updated: Task =
        nextStatus === "done"
          ? { ...moved, status: nextStatus, progress: moved.total }
          : nextStatus === "inprogress"
            ? { ...moved, status: nextStatus, progress: Math.max(moved.progress, 3) }
            : {
                ...moved,
                status: nextStatus,
                progress: Math.min(moved.progress, Math.max(1, Math.ceil(moved.total * 0.3)))
              };

      return {
        ...prev,
        [task.status]: source,
        [nextStatus]: [updated, ...prev[nextStatus]]
      };
    });
  };

  const moveTask = (from: Status, id: string, to: Status, insertIndex: number) => {
    setBoard((prev) => {
      if (from === to) {
        const list = [...prev[from]];
        const fromIndex = list.findIndex((task) => task.id === id);
        if (fromIndex === -1) return prev;

        const [moved] = list.splice(fromIndex, 1);
        let nextIndex = insertIndex;
        if (fromIndex < insertIndex) nextIndex -= 1;
        const boundedIndex = Math.max(0, Math.min(nextIndex, list.length));
        list.splice(boundedIndex, 0, moved);

        return { ...prev, [from]: list };
      }

      const source = [...prev[from]];
      const sourceIndex = source.findIndex((task) => task.id === id);
      if (sourceIndex === -1) return prev;

      const [moved] = source.splice(sourceIndex, 1);
      const destination = [...prev[to]];
      const boundedIndex = Math.max(0, Math.min(insertIndex, destination.length));
      destination.splice(boundedIndex, 0, { ...moved, status: to });

      return {
        ...prev,
        [from]: source,
        [to]: destination
      };
    });
  };

  return {
    board,
    totalTasks,
    statusCounts,
    doneRatio,
    addTask,
    advanceTask,
    moveTask
  };
}
