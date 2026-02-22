# Julianna Gharibyan | Sales Manager - Personal Portfolio

This repository contains the source code for the personal portfolio website of Julianna Gharibyan. It is a high-performance, aesthetically driven web application built with a modern tech stack, ensuring smooth animations, responsive design, and engaging 3D visual effects.

## 🛠 Tech Stack

The project relies on a powerful modern frontend stack centered around **Nuxt 4** and **Vue 3**:

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3 Composition API)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **Animations & Motion**:
    - [GSAP](https://gsap.com/) (GreenSock Animation Platform) for high-performance timeline and scroll animations.
    - [Lenis](https://lenis.studiofreight.com/) for smooth, frictionless custom scrolling experiences.
- **3D Graphics**: [Three.js](https://threejs.org/) for rendering WebGL/Canvas effects and custom shaders.
- **Typography & Assets**:
    - `@nuxt/fonts` and `@nuxt/icon` for optimized font delivery and SVG iconography.
    - `@nuxt/image` for automatic image optimization and WebP conversion.
- **Utilities**: [VueUse](https://vueuse.org/) for robust composition functions and utilities.

## ✨ Functional Features

The website boasts a comprehensive suite of custom components and interactive features tailored for a premium user experience:

### 1. Global Preloader & Page Transitions

- A custom `<Loading />` component handles global page transitions gracefully.
- Coordinated via a `useLoading` composable, it ensures assets and fonts are ready before seamlessly revealing the page content with custom entry animations.

### 2. Advanced Scroll & UI Animations

- Broad use of **GSAP** allows for intricate component reveals, parallax scrolling phenomena, and dynamic interactions (`SplitText`, `RollText`, `PulseButtonText`, `GradientText`).
- **Lenis Smooth Scroll** unifies the scroll behavior across all devices, eliminating native jarring scroll jumps format.

### 3. Interactive 3D Backgrounds

- A dedicated `<BackgroundLines />` component leverages **Three.js** to run custom fragment shaders, providing a dynamic, reactive, and visually arresting WebGL background canvas.

### 4. Page Routing & Architecture

- **Pages**:
    - **Home** (`/`) — Features a multi-sectioned landing (Hero, About Summary, Testimonials Carousel).
    - **About** (`/about`) — Detailed background information and profile sections.
    - **Contact** (`/contact`) — Interactive communication channels.
- **Error Handling**: A customized custom `error.vue` view handles 404 fallbacks robustly, maintaining the site's aesthetic integrity even on broken links.
- **Global Layouts**: `default.vue` layout enforcing consistent `<NavigationBar />` and responsive `<NavigationFooter />` presence across all routes.

---

## 🚀 Setup & Installation

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 💻 Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏗 Production Build

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview the production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```
