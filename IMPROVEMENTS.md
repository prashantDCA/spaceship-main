# Recommended Codebase Improvements

## 1. Structure: Separate "UI" from "Features"
**Current Issue:**
The `src/components/ui` folder contains both simple elements (Buttons, Inputs) and complex business logic (Kanban Board, Modals). This makes the library hard to maintain and reuse.

**Recommendation:**
Create a new directory `src/components/features` for complex components.
- **Keep in `ui`**: `button.tsx`, `input.tsx`, `card.tsx` (Reusable, "dumb" components).
- **Move to `features`**:
    - `src/components/features/kanban/KanbanBoard.tsx`
    - `src/components/features/modals/TaskModal.tsx`
    - `src/components/features/modals/EventModal.tsx`

## 2. Code Quality: Decompose Large Components
**Current Issue:**
Components like `kanban-board.tsx` are very large (~11KB) and handle too many responsibilities: data fetching, drag-and-drop logic, state management, and rendering.

**Recommendation:**
Break these down into smaller, focused sub-components and hooks:
- `KanbanColumn.tsx`: Handles rendering a single column.
- `KanbanCard.tsx`: Handles rendering a single task card.
- `useKanban.ts`: A custom hook to encapsulate the drag-and-drop and data fetching logic.

## 3. Performance: Optimize Lazy Loading
**Current Issue:**
`LazyComponents.tsx` manually handles dynamic imports, which can be brittle.

**Recommendation:**
Ensure this pattern is used consistently or leverage Next.js `dynamic()` imports directly in page files for better automatic code splitting and easier maintenance.
