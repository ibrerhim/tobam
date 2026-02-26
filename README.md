# To-Do List App (Assessment)

A single-page task board built with Next.js App Router, Tailwind CSS, and React Three Fiber.

The UI follows the provided Figma light/dark references and includes a small 3D element tied to task progress.

## What you can do

- Switch between light and dark mode
- Add a task to any column
- Move tasks across columns (`To do -> In progress -> Done`)
- See a rotating 3D cube in the header that changes color based on completion progress

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- React Three Fiber / Drei / Three.js

## Run locally (npm)

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

Production check:

```bash
npm run build
npm run start
```

## Testing checklist (technical expectations)

1. Next.js App Router  
Check that `app/layout.tsx` and `app/page.tsx` exist, then run:

```bash
npm run build
```

Build should pass.

2. Tailwind CSS UI  
Run the app and confirm the layout/styles are applied (sidebar, board cards, spacing, colors, responsive behavior).  
Config file: `tailwind.config.ts`.

3. React Server/Client usage  
Interactive features (theme toggle, task actions, 3D canvas) run in client components.  
Main interactive page: `app/page.tsx`.

4. State management  
Click `+ Add new task` in any column.  
Click `...` on a card to move it to the next status.

5. Local state behavior  
Add/move tasks, then refresh the page.  
The board resets to seeded data, showing in-memory state behavior.

6. React Three Fiber integration  
Confirm the header cube is visible and rotating.  
Move more tasks into `Done` and confirm cube color changes with completion ratio.

## npm scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - lint project
