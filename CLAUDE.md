# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server with hot reload
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint check
npm run preview  # Preview production build locally
```

## Architecture

**State Management**: Uses Immer's `useImmerReducer` for immutable state updates with undo/redo capability. The reducer (`src/reducer/todoReducer.ts`) maintains `history` (past states) and `future` (undone states) stacks alongside `todos`.

**Data Flow**: `ToDoContainer` holds all state via `useImmerReducer` and passes dispatch/actions down to child components. No external state library.

**Key Types** (`src/types/todo.ts`):
- `TodoState`: `{ todos, history, future }`
- `TodoAction`: Discriminated union - `LOAD | ADD | TOGGLE | DELETE | CLEAR_COMPLETED | UNDO | REDO`

**Dependencies**:
- `immer` + `use-immer` for immutable updates
- `react-window` for virtualized list rendering
- Tailwind CSS v4 for styling

## Project Structure

```
src/
├── types/todo.ts          # Type definitions and initial state
├── reducer/todoReducer.ts # Reducer logic (all state mutations)
├── components/
│   ├── ToDoContainer.tsx  # Main stateful container
│   ├── ToDoList.tsx        # Virtualized list (react-window)
│   ├── TodoItem.tsx        # Individual todo row
│   ├── TodoInput.tsx       # Add todo input
│   ├── TodoHeader.tsx      # App header
│   ├── ProgressBar.tsx     # Completion progress
│   ├── FilterButtons.tsx   # All/Active/Completed filter
│   └── ActionButtons.tsx   # Undo/Redo/Clear actions
└── App.tsx
```
