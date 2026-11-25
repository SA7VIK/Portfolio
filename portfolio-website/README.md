# Satvik's Portfolio Website

A dark, startup-style portfolio built with React, TypeScript, Tailwind CSS and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth scroll animations and hover effects
- **Sections**: Hero, Symbian Health product showcase, side projects, experience, toolkit, writing (Medium) and contact
- **Live Medium feed**: the Writing section syncs from the backend `/medium-blogs` endpoint and falls back to a bundled snapshot
- **Performance**: Optimized with Vite for fast development and builds

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist, Geist Mono, Instrument Serif (Google Fonts)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎨 Customization

### Content
Almost all copy lives in `src/data/`:
- `profile.ts` — links, experience, side projects, skills, recognition
- `products.ts` — the Symbian Health products
- `blogs.ts` — Medium snapshot (add new posts at the top; the live feed fills in dates and read times)

### Styling
- Design tokens (colors, fonts, animations): `tailwind.config.js`
- Shared component classes (`card-surface`, `chip`, `btn-light`…): `src/styles/index.css`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 