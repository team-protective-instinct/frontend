# AI Agent Instructions for capstone-frontend

> **Workspace context**: This is part of a multi-project workspace. See root [AGENTS.md](../AGENTS.md) for overall architecture, data flow, and startup order.

## Role

Expo React Native SOC dashboard for viewing overview metrics, incidents, playbooks, and response-plan data from the backend.

## Repo snapshot

- Expo React Native app using Expo Router; runtime entry is `expo-router/entry`, not `App.tsx`.
- Root routing starts at `app/_layout.tsx`; tab routing is generated from `constants/navigation.ts` in `app/(tabs)/_layout.tsx`.
- Desktop and mobile navigation differ structurally: desktop renders `Sidebar`, mobile renders `MobileHeader` and bottom tabs. Breakpoint is `useIsDesktop()` at `width >= 768`.
- Settings is routable through `SETTINGS_NAV_ITEM`, but it is separate from `NAVIGATION_ITEMS` and not shown as a normal bottom tab.

## Commands

- Install with npm; `package-lock.json` is the lockfile.
- Volta pins Node `24.15.0` in `package.json`.
- `npm start` / `npm run android` / `npm run ios` / `npm run web` start Expo targets.
- `npm run lint` runs ESLint then Prettier check over JS/TS/JSON only.
- `npm run format` runs ESLint `--fix` then Prettier write over JS/TS/JSON only.
- No `test`, `typecheck`, CI workflow, or workspace runner is configured.

## API data flow

- API base URL is `process.env.EXPO_PUBLIC_API_BASE_URL`, defaulting to `http://localhost:8000`.
- Mobile devices cannot use `localhost`/`127.0.0.1` for the backend; use the development machine's LAN IP, e.g. `http://<local-ip>:8000`.
- Backend CORS currently allows Expo web only on `http://localhost:8081` and `http://127.0.0.1:8081`.
- API-backed areas include:
  - `hooks/useIncidents.ts` -> `services/incidents.ts`
  - `hooks/useOverview.ts` -> `services/overview.ts`
  - `hooks/usePlaybooks.ts` -> `services/playbooks.ts`
- Some UI data can still come from `data/mock.ts`; verify the target screen before replacing mock data.
- Domain types are centralized in `types/index.ts`.
- When converting a mock screen to real API data, follow the existing `services/*` + `hooks/*` React Query pattern.

## Styling and config traps

- NativeWind is wired through `app/_layout.tsx` importing `global.css`, `metro.config.js` using `withNativeWind`, and `babel.config.js` using `nativewind/babel` plus `react-native-worklets/plugin`.
- Prefer existing Tailwind tokens in `tailwind.config.js` (`bg`, `threat`, `accent`, `border`, `text`) over new hard-coded colors when touching themed UI.
- `tailwind.config.js` content currently covers `app/`, `components/`, and `App.*`; update it if adding Tailwind className usage under new top-level source directories.
- Prettier uses `prettier-plugin-tailwindcss`; class order changes after `npm run format` are expected.
- Prettier settings include print width 100, single quotes, `bracketSameLine`, and trailing commas `es5`.
- TypeScript is strict, but `tsconfig.json` maps `@/*` to `src/*` even though this repo currently has no `src/` directory. Do not introduce `@/` imports unless the alias is fixed.
- One existing import uses bare `components/common/Table`; most source uses relative imports. Check resolution before copying that pattern.

## Verification notes

- Run `npm run lint` after frontend code changes.
- There is no configured test or typecheck script; do not claim those checks passed unless you add/run an explicit command.

## Generated/native artifacts

- `ios/`, `android/`, `.expo/`, `dist/`, and `web-build/` are ignored.
- `npm run prebuild` may generate native directories, but they are not tracked in the current repo setup.
