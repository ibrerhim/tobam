"use client";

import Image from "next/image";
import { useState } from "react";
import { BoardColumns } from "@/components/kanban/board-columns";
import { BoardHeader } from "@/components/kanban/board-header";
import { MenuPanel } from "@/components/kanban/menu-panel";
import { SideRail } from "@/components/kanban/side-rail";
import { useBoardState } from "@/components/kanban/use-board-state";
import { useTaskDnd } from "@/components/kanban/use-task-dnd";
import type { Theme } from "@/components/kanban/types";

export default function Page() {
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const { board, totalTasks, statusCounts, doneRatio, addTask, advanceTask, moveTask } = useBoardState();

  const dnd = useTaskDnd({
    moveTask,
    getColumnLength: (status) => board[status].length
  });

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
            <BoardColumns
              board={board}
              addTask={addTask}
              onAdvanceTask={advanceTask}
              dragState={dnd.dragState}
              dropHint={dnd.dropHint}
              columnDropHint={dnd.columnDropHint}
              onDragStart={dnd.onDragStart}
              onDragEnd={dnd.onDragEnd}
              onCardDragOver={dnd.onCardDragOver}
              onCardDrop={dnd.onCardDrop}
              onColumnDragOver={dnd.onColumnDragOver}
              onColumnDrop={dnd.onColumnDrop}
            />
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
