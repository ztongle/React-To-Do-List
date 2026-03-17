# React Todo List

A todo list application built with React + TypeScript + Vite, featuring undo/redo functionality.

## Features

- Add, delete, and toggle todo items
- Undo / Redo operations
- Filter by status (All / Active / Completed)
- Progress indicator
- Dark mode support
- Keyboard shortcuts (Press Enter to add quickly)

## Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS v4** - Styling
- **Immer** - Immutable Data Handling

## Project Structure

```
src/
├── types/
│   └── todo.ts           # Type definitions
├── reducer/
│   └── todoReducer.ts    # Reducer logic
├── components/
│   ├── ToDoList.tsx      # Main container component
│   ├── ToDoItem.tsx      # Single todo item
│   ├── TodoHeader.tsx    # Header section
│   ├── TodoInput.tsx     # Input area
│   ├── ProgressBar.tsx   # Progress bar
│   ├── FilterButtons.tsx # Filter buttons
│   └── ActionButtons.tsx # Action buttons
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Code Style

```bash
npm run lint
```

## License

MIT
