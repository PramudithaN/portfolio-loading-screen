# portfolio-loading-screen

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFDF00)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> A premium, highly responsive loop loading screen for portfolio websites featuring smooth color-morphing spinning logos and animated ambient backgrounds.

---

## 📖 About This Project

This single-page loading experience is designed as an interactive entrance animation for portfolios. Built on **React 19**, **Vite 8**, and **Framer Motion**, it implements a hardware-accelerated animated gradient backdrop (dark red and dark grey), custom rotating orbit rings, and a seamless cross-fade overlay blending technique for a continuous logo color transition. It includes performance configuration overrides for edge CDN caching headers, optimizing load speeds when deployed on Vercel.

---

## ✨ Features

- 🌀 **Continuous Logo Spin** - Infinite rotation of AP logos at a smooth, constant velocity.
- 🎨 **Seamless Color Morph** - Cross-fades the red and gray logo layers smoothly while rotating so users see a visible color transition.
- 🔴 **Volumetric Background Glows** - Drifting radial ambient blobs of dark red and dark gray styled using CSS keyframes.
- 📐 **Responsive Scaling** - Proportional variable-based system scaling all orbits, SVG outlines, and rings flawlessly on mobile.
- ⏳ **Orbiting Dot Ring** - An outer dashed mechanical orbit rotating in the opposite direction.
- ⚡ **High Performance** - Lightweight code bundle with optimized builds compiling in milliseconds.
- 🚀 **Vercel Integration** - Configuration file including Edge CDN static cache headers for near-instant loads.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React v19.2.7](https://react.dev/) |
| Language | [TypeScript v6.0.2](https://www.typescriptlang.org/) |
| Build Tool | [Vite v8.1.1](https://vite.dev/) |
| Animations | [Framer Motion v12.42.2](https://www.framer.com/motion/) |
| Styling | [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) **v18.0.0 or higher**
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PramudithaN/portfolio-loading-screen.git
cd portfolio-loading-screen
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Launches the local dev server at localhost. |
| `npm run build` | Compiles and packages the optimized build files into the `dist/` directory. |
| `npm run lint` | Runs code checks using Oxlint. |
| `npm run preview` | Spins up a local web server to preview your production build. |

---

## 📁 Project Structure

```
portfolio-loading-screen/
├── public/                    # Static public assets served by Vite
│   ├── favicon.png            # Red logo tab icon
│   ├── favicon.svg            # Default fallback svg favicon
│   └── icons.svg              # SVG icons dictionary
├── src/                       # React application source code
│   ├── assets/                # Creative logo and image assets
│   │   ├── GRAY-AP.png        # Grey logo file
│   │   └── RED-AP.png         # Red logo file
│   ├── App.css                # Loading screen component styles
│   ├── App.tsx                # Main looping loading screen logic
│   ├── index.css              # Volumetric backgrounds and design variables
│   └── main.tsx               # Client entry script
├── index.html                 # HTML main template
├── package.json               # Package manifests and scripts
├── tsconfig.json              # TypeScript compilation setup
└── vercel.json                # Vercel deployment cache control headers
```

---

## 🙋‍♂️ Connect with Me

- **GitHub**: [github.com/PramudithaN](https://github.com/PramudithaN)
- **LinkedIn**: [linkedin.com/in/pramuditha-nadun-612b1b204](https://linkedin.com/in/pramuditha-nadun-612b1b204)
- **Email**: pramudithanadun@gmail.com

---

*Developed with ❤️ by Pramuditha Nadun.*
