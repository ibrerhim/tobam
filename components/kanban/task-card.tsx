"use client";

import Image from "next/image";
import type { DragEvent } from "react";
import type { Task } from "./types";

type TaskCardProps = {
  task: Task;
  isDragging: boolean;
  isDropTarget: boolean;
  onAdvance: (task: Task) => void;
  onDragStart: (event: DragEvent<HTMLElement>, task: Task) => void;
  onDragEnd: () => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
};

export function TaskCard({
  task,
  isDragging,
  isDropTarget,
  onAdvance,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop
}: TaskCardProps) {
  const ratio = Math.max(0, Math.min(100, Math.round((task.progress / task.total) * 100)));
  const barColor = task.status === "done" ? "var(--success)" : task.status === "inprogress" ? "var(--warning)" : "var(--danger)";
  const hasAvatars = Boolean(task.avatars?.length);

  return (
    <article
      draggable
      onDragStart={(event) => onDragStart(event, task)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`task-card card rounded-2xl border p-4 transition ${isDragging ? "dragging opacity-40" : "opacity-100"} ${isDropTarget ? "ring-2 ring-[var(--accent)]" : ""}`}
      style={{ color: "var(--text-primary)" }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold leading-5" style={{ color: "var(--text-primary)" }}>
            {task.title}
          </h3>
          <p className="mt-1 text-sm muted">{task.subtitle}</p>
        </div>
        <button
          onClick={() => onAdvance(task)}
          className="rounded-full border px-2 py-0.5 text-xs muted hover:text-[var(--text-primary)]"
          aria-label={`Advance ${task.title}`}
        >
          ...
        </button>
      </div>

      <p className="mb-2 text-sm font-semibold muted">Progress</p>
      <div className="mb-4 h-1.5 rounded-full bg-[var(--border)]">
        <div className="h-full rounded-full" style={{ width: `${ratio}%`, background: barColor }} />
      </div>

      <div className="flex items-center justify-between text-xs muted">
        <span className="rounded-full soft px-3 py-1 font-semibold">{task.date}</span>

        {hasAvatars ? (
          <div className="flex items-center">
            <div className="flex items-center">
              {task.avatars?.map((avatar, index) => (
                <div
                  key={`${task.id}-avatar-${index}`}
                  className={`relative h-7 w-7 overflow-hidden rounded-full border-2 border-[var(--bg-card)] ${index === 0 ? "" : "-ml-2.5"}`}
                >
                  <Image src={avatar} alt={`Assignee ${index + 1}`} fill sizes="28px" className="object-cover" />
                </div>
              ))}
            </div>
            {task.extraAvatars ? (
              <span className="-ml-1.5 inline-flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-[var(--bg-card)] bg-[var(--bg-soft)] px-1 text-[11px] font-semibold text-[var(--text-primary)]">
                +{task.extraAvatars}
              </span>
            ) : null}
          </div>
        ) : (
          <span className="font-semibold text-[var(--text-primary)]">
            {task.progress}/{task.total}
          </span>
        )}
      </div>
    </article>
  );
}
