"use client";

import type { DragEvent } from "react";
import { STATUS_LABELS, STATUS_ORDER } from "./data";
import { TaskCard } from "./task-card";
import type { Board, Status, Task } from "./types";

type BoardColumnsProps = {
  board: Board;
  addTask: (status: Status) => void;
  onAdvanceTask: (task: Task) => void;
  dragState: { id: string; from: Status } | null;
  dropHint: { status: Status; index: number } | null;
  columnDropHint: Status | null;
  onDragStart: (event: DragEvent<HTMLElement>, task: Task) => void;
  onDragEnd: () => void;
  onCardDragOver: (status: Status, index: number) => (event: DragEvent<HTMLElement>) => void;
  onCardDrop: (status: Status, index: number) => (event: DragEvent<HTMLElement>) => void;
  onColumnDragOver: (status: Status) => (event: DragEvent<HTMLElement>) => void;
  onColumnDrop: (status: Status) => (event: DragEvent<HTMLElement>) => void;
};

export function BoardColumns({
  board,
  addTask,
  onAdvanceTask,
  dragState,
  dropHint,
  columnDropHint,
  onDragStart,
  onDragEnd,
  onCardDragOver,
  onCardDrop,
  onColumnDragOver,
  onColumnDrop
}: BoardColumnsProps) {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 xl:grid-cols-3">
      {STATUS_ORDER.map((status) => (
        <section
          key={status}
          className={`soft w-[85vw] shrink-0 snap-start rounded-2xl border p-3 sm:w-auto sm:shrink ${columnDropHint === status ? "ring-2 ring-[var(--accent)]" : ""}`}
          onDragOver={onColumnDragOver(status)}
          onDrop={onColumnDrop(status)}
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
                onAdvance={onAdvanceTask}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onCardDragOver(status, index)}
                onDrop={onCardDrop(status, index)}
                isDragging={dragState?.id === task.id}
                isDropTarget={dropHint?.status === status && dropHint.index === index}
              />
            ))}

            {status === "done" && board.done.length === 0 && (
              <div className="grid h-36 place-items-center rounded-2xl border border-dashed text-lg font-semibold muted">
                Drag your task here...
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
