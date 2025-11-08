# Valentin Frappart - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio showcases my skills as a Software Engineer with interactive animations, optimized performance, and a beautiful dark theme design.

## ✨ Features

- **Modern Design**: Dark theme with purple accent colors and glass morphism effects
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Animations**: Smooth scroll animations, particle effects, and micro-interactions
- **Performance Optimized**: Lazy loading, code splitting, and optimized bundle size
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Meta tags, structured data, and optimized for search engines
- **TypeScript**: Fully typed for better development experience and fewer bugs

## 🚀 Live Demo

Visit the live portfolio: [valentinfrappart.dev](https://valentinfrappart.dev)

## 🛠 Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Fast build tool and development server

### Libraries & Tools
- **Lucide React** - Beautiful, customizable SVG icons
- **Intersection Observer API** - For scroll-triggered animations
- **Canvas API** - Interactive particle system
- **Web Vitals** - Performance monitoring

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ValentinFrp/my-portfolio.git
   cd my-portfolio/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🏗 Project Structure

```
project/
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable React components
│   │   ├── AnimatedStats.tsx
│   │   ├── ExpertiseCard.tsx
│   │   ├── InteractiveParticles.tsx
│   │   ├── Loading.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProjectCard.tsx
│   │   └── Testimonials.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAnimations.ts
│   │   └── useIntersectionObserver.ts
│   ├── utils/            # Utility functions
│   │   └── seo.ts
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles and animations
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🎨 Key Components

### Navigation
- Responsive navigation with mobile menu
- Active section highlighting
- Smooth scroll to sections

### Hero Section
- Animated typing effect
- Particle background
- Social links integration

### Expertise Cards
- Skill highlighting with icons
- Hover effects and animations
- Responsive grid layout

### Project Gallery
- Filterable project showcase
- Technology tags
- Live demo and code links

### Animated Statistics
- Counter animations
- Progress bars
- Achievement badges

### Testimonials
- Carousel with auto-play
- Star ratings
- Client information

### Interactive Particles
- Canvas-based particle system
- Mouse interaction
- Performance optimized

## ⚡ Performance Optimizations

- **Code Splitting**: Dynamic imports for better loading performance
- **Lazy Loading**: Images and components loaded on demand
- **Bundle Optimization**: Terser minification and tree shaking
- **Asset Optimization**: Optimized images and efficient caching
- **Intersection Observer**: Efficient scroll-based animations
- **Reduced Motion**: Respects user's motion preferences

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:
```env
VITE_ANALYTICS_ID=your_analytics_id
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### Customization

#### Personal Information
Update the `personalInfo` object in `src/App.tsx`:
```typescript
const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  location: "Your Location",
  email: "your.email@domain.com",
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
  },
};
```

#### Projects
Update the `projects` array in `src/App.tsx` with your own projects.

#### Color Theme
Modify the color scheme in `tailwind.config.js` and CSS custom properties.

## 🧪 Testing

```bash
# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Valentin Frappart**
- Email: valentinn.frappart@gmail.com
- LinkedIn: [Valentin Frappart](https://www.linkedin.com/in/valentin-frappart-a73b252b4/)
- GitHub: [ValentinFrp](https://github.com/ValentinFrp)
- Portfolio: [valentinfrappart.dev](https://valentinfrappart.dev)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Images from [Unsplash](https://unsplash.com/)

---

⭐ Don't forget to star this repository if you found it helpful!