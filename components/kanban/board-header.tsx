"use client";

import { ProgressCube } from "@/components/progress-cube";
import { BellIcon, BoardViewIcon, HeaderCalendarIcon, SearchIcon } from "./icons";

export function BoardHeader({ doneRatio }: { doneRatio: number }) {
  return (
    <header className="mb-6 border-b border-[var(--border)] pb-3">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">Welcome back, Vincent</h2>
          <span className="text-2xl">👋</span>
          <ProgressCube ratio={doneRatio} />
        </div>

        <div className="flex items-center gap-6 text-[var(--text-primary)]">
          <button className="transition hover:opacity-80" type="button" aria-label="Search">
            <SearchIcon />
          </button>
          <button className="relative transition hover:opacity-80" type="button" aria-label="Notifications">
            <BellIcon />
            <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-[#eea34d]" />
          </button>
          <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
            <HeaderCalendarIcon />
            <span className="text-sm font-semibold leading-none">19 May 2022</span>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#6eb5be] to-[#2f6679] text-sm font-bold text-white">
            V
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-9">
          <button className="flex items-center gap-2 border-b-[3px] border-[var(--text-primary)] pb-3 text-base font-medium text-[var(--text-primary)]" type="button">
            <BoardViewIcon />
            <span>Board view</span>
          </button>
          <button className="flex items-center gap-2 text-base font-medium text-[var(--text-secondary)]" type="button">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--border)] text-sm leading-none">+</span>
            <span>Add view</span>
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button className="text-base font-medium text-[var(--text-primary)]" type="button">
            Filter
          </button>
          <button className="text-base font-medium text-[var(--text-secondary)]" type="button">
            Sort
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] text-base font-semibold text-[var(--text-secondary)]"
            type="button"
            aria-label="More options"
          >
            ...
          </button>
          <button className="rounded-full bg-[#181a24] px-7 py-2.5 text-sm font-medium text-white">New template</button>
        </div>
      </div>
    </header>
  );
}
