# To-Do List App (Assessment)

A single-page task board built with Next.js App Router, Tailwind CSS, and React Three Fiber.

The UI follows the provided Figma light/dark references and includes a small 3D element tied to task progress.

## What you can do

- Switch between light and dark mode
- Add a task to any column
- Move tasks across columns (`To do -> In progress -> Done`)
- See a 3D progress visualization in the header that updates with completion progress
- Drag and drop task cards to reorder or move them across columns (bonus)

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
Confirm the 3D progress widget is visible in the header.  
Move more tasks into `Done` and confirm the visualization updates with completion ratio.

Color thresholds (with seeded data):

- Initial state is `3/11` done, so the widget starts in the low-progress color.
- First color change happens at `5/11` done (`45%`), so move **2 tasks** into `Done`.
- Next color change happens at `9/11` done (`75%`), so move **6 tasks** into `Done` from the initial state.

## Bonus: Draggable task cards

Drag and drop is implemented as an extra feature on top of the assessment requirements.

- You can drag a card within the same column to reorder it.
- You can drag a card to a different column to move it there.
- If you hover directly over a card while dropping, the dragged card is inserted at that exact position.
- If you drop on empty area in a column, the dragged card is placed at the end.

Quick test:

1. Drag a card within `To do` and place it between two existing cards.  
2. Drag a card from `To do` to `In progress` and drop on a specific card.  
3. Drag a card into empty space at the bottom of a column and confirm it moves to the end.

## npm scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - lint project
