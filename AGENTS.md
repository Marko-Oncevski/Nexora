# Repository Guide

## Project Overview

- Project name: Nexora (React-Online-Shop).
- Built with React, Vite, React Router, and Context API.
- Uses DummyJSON API for product data.
- Follow the existing architecture and coding conventions.
- Keep the code clean, maintainable, and scalable.

## Commands

- Install dependencies with `npm ci`.
- Start the development server with `npm run dev`.
- Build production assets with `npm run build`.
- Run `npm run lint` (Oxlint) to check code quality.
- Run `npm run build` to validate production builds.
- No automated test or typecheck script is currently configured.

## Application Structure

- `src/main.jsx` is the application entry point.
- It wraps `App` with `BrowserRouter` and the cart, search, favorites, and theme providers.
- `src/App.jsx` manages route definitions and the cart drawer's open state.
- `src/layouts/Layout.jsx` renders the shared header, outlet, cart drawer, and footer.
- Reusable components belong in `src/components/`.
- Page components belong in `src/pages/`.
- Custom React hooks belong in `src/hooks/`.
- API-related functions belong in `src/api/`.
- Context-consuming components must remain inside their corresponding providers.

## API & Environment

- The application uses `https://dummyjson.com` for product data.
- Copy `.env.example` to `.env` when configuring the search API.
- `VITE_API_URL` is required by `apiClient`.
- Example: `VITE_API_URL=https://dummyjson.com`
- Environment variables are accessed using `import.meta.env`.
- Search uses `src/api/client.js` and `src/api/products.js`.
- Product listings and details currently fetch data through `useFetch` using direct DummyJSON URLs.
- Changing `VITE_API_URL` currently affects search only.
- Never commit private credentials, tokens, or sensitive environment files.
- Variables prefixed with `VITE_` are exposed in the frontend build and must not contain secrets.

## State Management

- Use React Context API for shared application state.
- Preserve the existing cart, search, favorites, and theme providers.
- Favorites persist in localStorage using the `nexora-favorites` key.
- Cart and theme state are currently stored in memory.
- Avoid introducing additional state management libraries unless necessary.
- Keep state close to the components that need it when global state is unnecessary.

## Coding Guidelines

- Use functional React components and React hooks.
- Follow the existing naming conventions and folder structure.
- Prefer simple, readable, and maintainable solutions.
- Reuse existing components, hooks, and utilities.
- Avoid duplicated logic.
- Keep components focused and reasonably sized.
- Handle loading, error, and empty states when fetching data.
- Use stable and unique keys when rendering lists.
- Avoid unnecessary dependencies.
- Preserve existing functionality when refactoring.

## Code Changes

- Review relevant files before making changes.
- Keep changes focused on the requested task.
- Avoid modifying unrelated components.
- Maintain consistency with the existing architecture.
- Do not introduce breaking changes without justification.
- Explain significant architectural modifications.
- Update relevant documentation when necessary.

## Validation

Before finalizing code changes:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Check for console errors.
4. Verify affected routes and components.
5. Test relevant user interactions.
6. Review the Git diff for unintended changes.

## Git Guidelines

- Use descriptive commit messages.
- Prefer Conventional Commits:
  - `feat:` New functionality.
  - `fix:` Bug fixes.
  - `refactor:` Code restructuring.
  - `style:` Styling changes.
  - `docs:` Documentation updates.
  - `chore:` Maintenance tasks.
- Avoid committing `node_modules`, build artifacts, or sensitive environment files.
- Do not overwrite or discard unrelated changes.
- Review changes before committing.

## Project Goals

- Maintain a responsive React e-commerce application.
- Keep routing and shared state consistent.
- Ensure reliable integration with DummyJSON.
- Prioritize code readability and maintainability.
- Preserve existing functionality while introducing improvements.