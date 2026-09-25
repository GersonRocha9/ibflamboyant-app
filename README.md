# IBF App

A volunteer, open-source, non-profit mobile app for the **Igreja Batista do Flamboyant** (IBF), a Baptist church in Brazil. It gives church members one place to see upcoming events, watch sermons, send prayer requests, sign up for baby dedications and find giving details, instead of scattered social media posts and group chats.

![Expo](https://img.shields.io/badge/Expo-SDK%2048-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.71-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white)

![IBF App banner](./src/assets/banner.png)

## Features

- **Home / Events**: upcoming events pulled from the church's Instagram posts, with a highlighted featured event and a carousel.
- **Sermons and missions**: two YouTube playlists (current sermons and mission trips). The latest sermon is featured, and a "live now" badge appears when a stream is on air. Videos open in YouTube.
- **Giving**: bank account details for tithes and offerings, plus a one-tap button that copies the PIX key to the clipboard.
- **Location**: Google Maps view with the church marker, address and service times.
- **Prayer requests**: validated form that posts to the church's backend API.
- **Baby dedication sign-up**: validated form (parents, baby, phone, birth date) that posts to the same API.
- **Downloads**: grid of Bible reading plan PDFs opened in the in-app browser.
- **Menu**: shortcuts to every section. Unfinished sections fall back to a "coming soon" catch-all route.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Expo SDK 48, React Native 0.71, React 18, TypeScript |
| Navigation | Expo Router v1 (file-based, tabs + stack) |
| Server state | TanStack Query v4, Axios |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) |
| Styling | NativeWind (Tailwind CSS for React Native), Poppins via `@expo-google-fonts` |
| Native | react-native-maps (Google provider), expo-clipboard, expo-web-browser, expo-updates |
| UI | phosphor-react-native icons, react-native-toast-message |
| Tooling | ESLint (`@rocketseat/eslint-config`), EAS Build |

## Architecture

```
app/                  # Expo Router routes
  (tabs)/             # Home, Playlist, Tithes, Map, Menu
  prayerRequest.tsx   # stack screens
  babyPresentation.tsx
  downloads.tsx
  [...missing].tsx    # "coming soon" fallback
src/
  components/         # carousels, form inputs, menu items
  services/           # Axios clients: church API, Instagram, YouTube
  schemas/            # Zod form schemas
  models/             # static data (giving accounts, downloads)
  routes/             # root stack navigator
  utils/
```

- **Three data sources behind one service layer**: a REST API for form submissions, and Instagram and YouTube data fetched through RapidAPI. Screens only call functions exported from `@services`.
- **Query caching** with TanStack Query for the events feed and playlists, with loading states on every remote screen.
- **Input normalization in the schema**: Zod transforms capitalize names and turn phone numbers into `+55` E.164 format before the payload reaches the API.
- **Path aliases** (`@components`, `@services`, `@schemas`, ...) configured in both `tsconfig.json` and Babel `module-resolver`.
- **Secrets out of the code**: RapidAPI keys and hosts load from `.env` through `react-native-dotenv`.
- **OTA-ready**: `expo-updates` with an SDK-based runtime version and EAS build profiles for APK previews, dev client and production.

The UI was designed by the author in Figma: [IB Flamboyant - App Mobile](https://www.figma.com/file/bWta4TAucJRQph1fuIo6yb/IB-Flamboyant---App-Mobile?type=design&node-id=0%3A1&t=2Kf3wSKhLfjIFYdO-1).

## Getting started

Requirements: Node.js, npm, and either an iOS Simulator, an Android emulator or the Expo Go app.

```bash
git clone https://github.com/GersonRocha9/ibflamboyant-app.git
cd ibflamboyant-app
npm install
cp .env.example .env   # then fill in the values below
npm start              # or: npm run ios | npm run android | npm run web
```

Environment variables (`.env.example`):

| Variable | Used for |
| --- | --- |
| `ENV_RAPIDAPI_URL`, `ENV_RAPIDAPI_HOST` | YouTube playlist API (RapidAPI) |
| `ENV_RAPIDAPI_KEY` | RapidAPI key, shared by the YouTube and Instagram clients |
| `ENV_INSTAGRAM_RAPIDAPI_URL`, `ENV_INSTAGRAM_RAPIDAPI_HOST` | Instagram posts API (RapidAPI) |
| `ENV_GOOGLEMAPS_APIKEY` | Google Maps |

## Contributing

This is a community project and contributions are welcome. Open an issue to discuss a bug or idea, or fork the repo and send a pull request. Please run ESLint before submitting.

## Author

Built and maintained by [Gerson Rocha](https://github.com/GersonRocha9), React Native / Expo mobile engineer.
