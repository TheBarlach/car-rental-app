This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **React Navigation** (`@react-navigation/native` + `@react-navigation/native-stack`). `src/navigation/RootNavigator.tsx` holds the single navigator and the `RootStackParamList` route type. Screens live in `src/features/<feature>/screens/`.
- Declare a route in `RootStackParamList` **only if a `<Stack.Screen>` registers it.** An unregistered route throws at runtime when navigated to. Keep the two lists identical.
- Type screen props with `NativeStackScreenProps<RootStackParamList, 'Route'>`. The prop may be wrapped in `Partial<>` so a screen can be unit-tested without a `NavigationContainer`.
- Every screen renders our own `BottomNavigation`; navigate with `navigation.navigate(...)` from the screen, not a nested navigator.
- The team branches (`feat/admin-page`, `feat/settings-page`, `feat/car-setting-page`, `feature/auth-screens`) all use this pattern. Match it — deviating here creates merge conflicts.
- `react-native-screens` is native code, so the app needs a development build (`npx expo run:android`) rather than Expo Go.

## Project structure

- `src/components/` — shared, reusable components with a barrel `index.ts`.
- `src/features/<feature>/` — feature code: `screens/`, `components/`, plus feature-local `types.ts` and a reducer where state logic warrants it.
- Every component keeps its styles in a co-located `<Name>.styles.ts`. Never inline `StyleSheet` inside a component.
- Design tokens live in `src/theme/` and must be referenced, never hardcoded.

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
