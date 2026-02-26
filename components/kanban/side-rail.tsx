"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {
  AppGridIcon,
  BookIcon,
  CalendarIcon,
  ChartIcon,
  DotIcon,
  ExitIcon,
  SliderIcon,
  UploadIcon,
  UserIcon
} from "./icons";

function RailButton({ active = false, children }: { active?: boolean; children: ReactNode }) {
  return (
    <button
      className={`grid h-10 w-10 place-items-center rounded-full transition ${
        active ? "bg-white/10 text-[var(--rail-icon-strong)]" : "text-[var(--rail-icon)] hover:bg-white/5 hover:text-[var(--rail-icon-hover)]"
      }`}
      aria-label="rail action"
      type="button"
    >
      {children}
    </button>
  );
}

export function SideRail() {
  return (
    <aside className="hidden h-full flex-col items-center justify-between bg-[var(--rail)] py-4 lg:flex">
      <div className="flex w-full flex-col items-center gap-4">
        <button className="grid h-8 w-8 place-items-center text-[var(--rail-icon)]" type="button" aria-label="more">
          <DotIcon />
        </button>
        <button className="grid h-10 w-10 place-items-center text-[var(--rail-icon-strong)]" type="button" aria-label="logo">
          <Image src="/logo-mark.svg" alt="Projects logo" width={24} height={24} priority />
        </button>
        <RailButton active>
          <AppGridIcon />
        </RailButton>
        <div className="flex flex-col gap-3 pt-1">
          <RailButton>
            <UserIcon />
          </RailButton>
          <RailButton>
            <CalendarIcon />
          </RailButton>
          <RailButton>
            <ChartIcon />
          </RailButton>
          <RailButton>
            <UploadIcon />
          </RailButton>
          <RailButton>
            <BookIcon />
          </RailButton>
          <RailButton>
            <SliderIcon />
          </RailButton>
        </div>
      </div>

      <button className="grid h-10 w-10 place-items-center rounded-full text-[var(--rail-icon)] hover:bg-white/5 hover:text-[var(--rail-icon-hover)]" type="button" aria-label="logout">
        <ExitIcon />
      </button>
    </aside>
  );
}
