"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { DragEvent } from "react";
import { BoardHeader } from "@/components/kanban/board-header";
import { STATUS_LABELS, STATUS_ORDER, buildInitialBoard } from "@/components/kanban/data";
import { MenuPanel } from "@/components/kanban/menu-panel";
import { SideRail } from "@/components/kanban/side-rail";
import { TaskCard } from "@/components/kanban/task-card";
import type { Board, Status, Task, Theme } from "@/components/kanban/types";

export default function Page() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [board, setBoard] = useState<Board>(() => buildInitialBoard());
  const [menuOpen, setMenuOpen] = useState(false);
  const [dragState, setDragState] = useState<{ id: string; from: Status } | null>(null);
  const [dropHint, setDropHint] = useState<{ status: Status; index: number } | null>(null);
  const [columnDropHint, setColumnDropHint] = useState<Status | null>(null);

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
          id: crypto.randomUUID(),
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

  const clearDragUI = () => {
    setDropHint(null);
    setColumnDropHint(null);
  };

  const createDragPreview = (event: DragEvent<HTMLElement>) => {
    const source = event.currentTarget as HTMLElement;
    const preview = source.cloneNode(true) as HTMLElement;
    preview.style.position = "fixed";
    preview.style.top = "-1000px";
    preview.style.left = "-1000px";
    preview.style.width = `${source.clientWidth}px`;
    preview.style.pointerEvents = "none";
    preview.style.opacity = "0.96";
    preview.style.transform = "rotate(0.001deg)";
    preview.style.boxShadow = "0 18px 36px rgba(0, 0, 0, 0.2)";
    document.body.appendChild(preview);
    event.dataTransfer.setDragImage(preview, 28, 24);
    requestAnimationFrame(() => preview.remove());
  };

  const handleCardDragOver = (event: DragEvent<HTMLElement>, status: Status, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    setDropHint({ status, index });
    setColumnDropHint(null);
  };

  const handleCardDrop = (event: DragEvent<HTMLElement>, status: Status, index: number) => {
    event.preventDefault();
    event.stopPropagation();
    if (!dragState) return;

    moveTask(dragState.from, dragState.id, status, index);
    setDragState(null);
    clearDragUI();
  };

  const handleColumnDragOver = (event: DragEvent<HTMLElement>, status: Status) => {
    event.preventDefault();
    setColumnDropHint(status);
    setDropHint(null);
  };

  const handleColumnDrop = (event: DragEvent<HTMLElement>, status: Status) => {
    event.preventDefault();
    if (!dragState) return;

    moveTask(dragState.from, dragState.id, status, board[status].length);
    setDragState(null);
    clearDragUI();
  };

  return (
    <main className={`${theme === "dark" ? "dark" : ""} h-screen overflow-hidden text-[var(--text-primary)]`}>
      <div className="grid h-full grid-cols-1 lg:grid-cols-[70px_246px_1fr]">
        <SideRail />

        <aside className="hidden h-full border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] px-5 py-4 lg:block">
          <MenuPanel theme={theme} totalTasks={totalTasks} statusCounts={statusCounts} onThemeChange={setTheme} />
        </aside>

        <section className="panel flex h-full min-h-0 flex-col overflow-hidden px-4 py-5 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between rounded-2xl border px-3 py-2 lg:hidden">
            <div className="flex items-center gap-3">
              <Image src="/logo-mark.svg" alt="Projects logo" width={24} height={24} />
              <p className="text-sm font-semibold">Projects</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full border px-3 py-1 text-xs font-semibold"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "Light" : "Dark"}
              </button>
              <button
                onClick={() => setMenuOpen((value) => !value)}
                className="rounded-full border px-3 py-1 text-xs font-semibold"
                aria-label="Toggle menu"
              >
                Menu
              </button>
            </div>
          </div>

          <BoardHeader doneRatio={doneRatio} />

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 xl:grid-cols-3">
              {STATUS_ORDER.map((status) => (
                <section
                  key={status}
                  className={`soft w-[85vw] shrink-0 snap-start rounded-2xl border p-3 sm:w-auto sm:shrink ${columnDropHint === status ? "ring-2 ring-[var(--accent)]" : ""}`}
                  onDragOver={(event) => handleColumnDragOver(event, status)}
                  onDrop={(event) => handleColumnDrop(event, status)}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-semibold">
                      {STATUS_LABELS[status]} ({board[status].length})
                    </p>
                    <button onClick={() => addTask(status)} className="text-sm muted hover:text-[var(--text-primary)]">
                      + Add new task
                    </button>
                  </div>

                  <div className="space-y-3">
                    {board[status].map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onAdvance={advanceTask}
                        onDragStart={(event, item) => {
                          event.dataTransfer.effectAllowed = "move";
                          event.dataTransfer.setData("text/plain", item.id);
                          createDragPreview(event);
                          setDragState({ id: item.id, from: item.status });
                        }}
                        onDragEnd={() => {
                          setDragState(null);
                          clearDragUI();
                        }}
                        onDragOver={(event) => handleCardDragOver(event, status, index)}
                        onDrop={(event) => handleCardDrop(event, status, index)}
                        isDragging={dragState?.id === task.id}
                        isDropTarget={dropHint?.status === status && dropHint.index === index}
                      />
                    ))}

                    {status === "done" && board.done.length === 0 && (
                      <div className="grid h-36 place-items-center rounded-2xl border border-dashed text-lg font-semibold muted">Drag your task here...</div>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-20 lg:hidden">
          <button onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-black/35" aria-label="Close menu" />
          <aside className="panel absolute left-0 top-0 h-full w-[82vw] max-w-[320px] border-r px-5 py-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <Image src="/logo-mark.svg" alt="Projects logo" width={24} height={24} />
              <button onClick={() => setMenuOpen(false)} className="rounded-full border px-2 py-1 text-xs font-semibold">
                Close
              </button>
            </div>
            <MenuPanel theme={theme} totalTasks={totalTasks} statusCounts={statusCounts} onThemeChange={setTheme} />
          </aside>
        </div>
      )}
    </main>
  );
}
