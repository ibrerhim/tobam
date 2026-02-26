"use client";

import type { DragEvent } from "react";
import { useState } from "react";
import type { Status, Task } from "./types";

type UseTaskDndParams = {
  moveTask: (from: Status, id: string, to: Status, insertIndex: number) => void;
  getColumnLength: (status: Status) => number;
};

export function useTaskDnd({ moveTask, getColumnLength }: UseTaskDndParams) {
  const [dragState, setDragState] = useState<{ id: string; from: Status } | null>(null);
  const [dropHint, setDropHint] = useState<{ status: Status; index: number } | null>(null);
  const [columnDropHint, setColumnDropHint] = useState<Status | null>(null);

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

  const onDragStart = (event: DragEvent<HTMLElement>, task: Task) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", task.id);
    createDragPreview(event);
    setDragState({ id: task.id, from: task.status });
  };

  const onDragEnd = () => {
    setDragState(null);
    clearDragUI();
  };

  const onCardDragOver = (status: Status, index: number) => (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDropHint({ status, index });
    setColumnDropHint(null);
  };

  const onCardDrop = (status: Status, index: number) => (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!dragState) return;
    moveTask(dragState.from, dragState.id, status, index);
    onDragEnd();
  };

  const onColumnDragOver = (status: Status) => (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setColumnDropHint(status);
    setDropHint(null);
  };

  const onColumnDrop = (status: Status) => (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    if (!dragState) return;
    moveTask(dragState.from, dragState.id, status, getColumnLength(status));
    onDragEnd();
  };

  return {
    dragState,
    dropHint,
    columnDropHint,
    onDragStart,
    onDragEnd,
    onCardDragOver,
    onCardDrop,
    onColumnDragOver,
    onColumnDrop
  };
}
