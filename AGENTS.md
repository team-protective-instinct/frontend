# AGENTS.md

## Repo snapshot

- Expo React Native app using Expo Router; runtime entry is `expo-router/entry`, not `App.tsx`.
- Root routing starts at `app/_layout.tsx`; tab routing is generated from `constants/navigation.ts` in `app/(tabs)/_layout.tsx`.
- Desktop and mobile navigation differ structurally: desktop renders `Sidebar`, mobile renders `MobileHeader` and bottom tabs. Breakpoint is `useIsDesktop()` at `width >= 768`.
- `settings` is routable but intentionally hidden from the bottom tab bar with `href: null`.

## Commands

- Install with npm; `package-lock.json` is the lockfile.
- `npm start` / `npm run android` / `npm run ios` / `npm run web` start Expo targets.
- `npm run lint` runs ESLint then Prettier check over JS/TS/JSON only.
- `npm run format` runs ESLint `--fix` then Prettier write over JS/TS/JSON only.
- No `test`, `typecheck`, CI workflow, or workspace runner is configured.

## Data flow

- Incidents list is the only API-backed screen: `app/(tabs)/incidents.tsx` -> `hooks/useIncidents.ts` -> `services/incidents.ts`.
- Incident API base URL is `process.env.EXPO_PUBLIC_API_BASE_URL`, defaulting to `http://localhost:8000`; no repo `.env` file is present.
- Overview, assets, playbooks, sidebar badges, and the tab pending badge still use `data/mock.ts`.
- Domain types are centralized in `types/index.ts`.

## Styling and config traps

- NativeWind is wired through `app/_layout.tsx` importing `global.css`, `metro.config.js` using `withNativeWind`, and `babel.config.js` using `nativewind/babel`.
- Prefer existing Tailwind tokens in `tailwind.config.js` (`bg`, `threat`, `accent`, `border`, `text`) over new hard-coded colors when touching themed UI.
- Prettier uses `prettier-plugin-tailwindcss`; class order changes after `npm run format` are expected.
- TypeScript is strict, but `tsconfig.json` maps `@/*` to `src/*` even though this repo currently has no `src/` directory. Do not introduce `@/` imports unless the alias is fixed.
- One existing import uses bare `components/common/Table`; most source uses relative imports. Check resolution before copying that pattern.

## Generated/native artifacts

- `ios/`, `android/`, `.expo/`, `dist/`, and `web-build/` are ignored. `npm run prebuild` may generate native directories, but they are not tracked in the current repo setup.
