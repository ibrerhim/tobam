"use client";

import { ChevronDownIcon, ChevronRightIcon, MoonIcon, SunIcon } from "./icons";
import type { Status, Theme } from "./types";

type MenuPanelProps = {
  theme: Theme;
  totalTasks: number;
  statusCounts: Record<Status, number>;
  onThemeChange: (value: Theme) => void;
};

function TreeItem({ text, active = false }: { text: string; active?: boolean }) {
  return (
    <div className="relative pl-7 text-sm leading-none">
      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[var(--sidebar-line)]" />
      <span
        className={
          active
            ? "inline-flex rounded-full bg-[var(--sidebar-pill-bg)] px-3 py-2 font-semibold text-[var(--sidebar-pill-text)]"
            : "text-[var(--sidebar-muted)]"
        }
      >
        {text}
      </span>
    </div>
  );
}

export function MenuPanel({ theme, totalTasks, statusCounts, onThemeChange }: MenuPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-7 flex items-center justify-between">
        <h1 className="text-[31px] font-semibold tracking-[-0.03em] text-[var(--sidebar-strong)]">Projects</h1>
        <button className="grid h-8 w-8 place-items-center rounded-full bg-[var(--sidebar-pill-bg)] text-[var(--sidebar-muted)]" type="button">
          +
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-6 pr-1">
        <button className="flex w-full items-center justify-between text-left text-base font-medium text-[var(--sidebar-muted)]" type="button">
          <span>Team</span>
          <span className="text-[var(--sidebar-muted)]">
            <ChevronRightIcon />
          </span>
        </button>

        <div>
          <button className="mb-4 flex w-full items-center justify-between text-left text-lg font-medium text-[var(--sidebar-strong)]" type="button">
            <span>Projects</span>
            <span className="text-[var(--sidebar-strong)]">
              <ChevronDownIcon />
            </span>
          </button>
          <div className="relative space-y-3.5 pl-1">
            <span className="absolute left-[6px] top-[2px] h-[134px] w-px bg-[var(--sidebar-line)]" />
            <TreeItem text="All projects (3)" />
            <TreeItem text="Design system" active />
            <TreeItem text="User flow" />
            <TreeItem text="Ux research" />
          </div>
        </div>

        <div>
          <button className="mb-4 flex w-full items-center justify-between text-left text-lg font-medium text-[var(--sidebar-strong)]" type="button">
            <span>Tasks</span>
            <span className="text-[var(--sidebar-strong)]">
              <ChevronDownIcon />
            </span>
          </button>
          <div className="relative space-y-3.5 pl-1">
            <span className="absolute left-[6px] top-[2px] h-[134px] w-px bg-[var(--sidebar-line)]" />
            <TreeItem text={`All tasks (${totalTasks})`} />
            <TreeItem text={`To do (${statusCounts.todo})`} />
            <TreeItem text={`In progress (${statusCounts.inprogress})`} active />
            <TreeItem text={`Done (${statusCounts.done})`} />
          </div>
        </div>

        <button className="flex w-full items-center justify-between text-left text-base font-medium text-[var(--sidebar-muted)]" type="button">
          <span>Reminders</span>
          <span className="text-[var(--sidebar-muted)]">
            <ChevronRightIcon />
          </span>
        </button>

        <button className="flex w-full items-center justify-between text-left text-base font-medium text-[var(--sidebar-muted)]" type="button">
          <span>Messengers</span>
          <span className="text-[var(--sidebar-muted)]">
            <ChevronRightIcon />
          </span>
        </button>
      </div>

      <div className="mt-3 shrink-0 border-t border-[var(--sidebar-line)] pt-3">
        <div className="flex rounded-full bg-[var(--sidebar-toggle-bg)] p-1 text-xs font-semibold">
          <button
            className={`flex w-1/2 items-center justify-center gap-1.5 rounded-full py-2 transition ${
              theme === "light"
                ? "bg-[var(--sidebar-toggle-active-bg)] text-[var(--sidebar-toggle-active-text)]"
                : "text-[var(--sidebar-toggle-inactive)]"
            }`}
            onClick={() => onThemeChange("light")}
            type="button"
          >
            <SunIcon />
            <span>Light</span>
          </button>
          <button
            className={`flex w-1/2 items-center justify-center gap-1.5 rounded-full py-2 transition ${
              theme === "dark"
                ? "bg-[var(--sidebar-toggle-active-bg)] text-[var(--sidebar-toggle-active-text)]"
                : "text-[var(--sidebar-toggle-inactive)]"
            }`}
            onClick={() => onThemeChange("dark")}
            type="button"
          >
            <MoonIcon />
            <span>Dark</span>
          </button>
        </div>
      </div>
    </div>
  );
}
