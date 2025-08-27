# 🌟 Joonhyung Park - Personal Portfolio

A modern, responsive personal portfolio website built with React, showcasing my journey as a Computer Science student and Software Engineer.

## 🚀 Live Demo

[View Live Portfolio](https://joonhyungpark.netlify.app) 

## ✨ Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Smooth Animations**: Interactive animations using Framer Motion
- **Modern UI**: Clean design with glassmorphism effects and hover interactions
- **Smooth Scrolling**: Navigation with active section highlighting
- **Contact Form**: Integrated contact form for easy communication

## 🛠️ Built With

- **React** - Frontend library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful & customizable icons
- **React Icons** - Popular icons library
- **React Scroll** - Smooth scrolling navigation

## 🎨 Sections

- **Home** - Introduction and quick access to resume/contact
- **About** - Personal introduction and core values
- **Skills** - Technical skills categorized by type
- **Experience** - Work experience and responsibilities
- **Projects** - Featured projects with technologies used
- **Contact** - Contact form and social media links

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/pjh0314/portfolio.git
```

2. Navigate to the project directory
```bash
cd portfolio
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## 📁 Project Structure

```
src/
├── components/
│   ├── About.jsx          # About section component
│   ├── ContactMe.jsx      # Contact section with form
│   ├── Experience.jsx     # Work experience timeline
│   ├── Home.jsx           # Hero section
│   ├── Navigation.jsx     # Navigation bar with theme toggle
│   ├── ProjectCard.jsx    # Individual project card
│   ├── Projects.jsx       # Projects showcase
│   ├── Section.jsx        # Reusable section wrapper
│   └── Skills.jsx         # Skills with categories
├── App.js                 # Main app component
├── index.css             # Global styles
└── index.js              # App entry point
```

## 🎯 Key Features Breakdown

### Theme Switching
- Seamless dark/light mode toggle
- Persistent theme state during session
- Smooth color transitions

### Interactive Navigation
- Active section highlighting
- Smooth scroll to sections
- Mobile-responsive hamburger menu
- Animated active indicator

### Animations
- Scroll-triggered animations
- Hover effects on cards and buttons
- Smooth page transitions
- Interactive icon animations

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interfaces

## 🌐 Deployment

This project can be easily deployed to various platforms:

### Netlify
```bash
npm run build
# Drag and drop the build folder to Netlify
```

### Vercel
```bash
npm run build
# Import project from GitHub on Vercel dashboard
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 💻 Code Highlights

### Theme Toggle Implementation
```jsx
function App() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark(!dark);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-gray-100 
                      transition-colors duration-700 min-h-screen">
        <Navbar toggleTheme={toggleTheme} dark={dark} />
        {/* content */}
      </div>
    </div>
  );
}
```

### Smooth Scroll Navigation with Active Section Detection
```jsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    },
    { threshold: 0.3 }
  );

  navItems.forEach((item) => {
    const el = document.getElementById(item.id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);
```

### Animated Section Transitions
```jsx
export default function Section({ id, children }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    controls.start({
      opacity: inView ? 1 : 0,
      y: inView ? 0 : 30,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
    >
      {children}
    </motion.section>
  );
}
```

### Dynamic Skills Category Filtering
```jsx
const [activeCategory, setActiveCategory] = useState("Programming");

return (
  <div>
    {Object.keys(categories).map((cat) => (
      <button
        key={cat}
        onClick={() => setActiveCategory(cat)}
        className={`px-6 py-2 rounded-full transition-all duration-300
          ${activeCategory === cat 
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" 
            : "bg-gray-200 dark:bg-gray-700"}`}
      >
        {cat}
      </button>
    ))}
    
    {/* Render filtered skills */}
    {categories[activeCategory].map((skill) => (
      <motion.div key={skill.name} layout>
        {skill.icon}
        <p>{skill.name}</p>
      </motion.div>
    ))}
  </div>
);
```

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio! If you have suggestions for improvements, please open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: 0314pjh@gmail.com
- **LinkedIn**: [linkedin.com/in/joonhyung-park-716b9b266](https://linkedin.com/in/joonhyung-park-716b9b266)
- **GitHub**: [github.com/pjh0314](https://github.com/pjh0314)

---

⭐ If you found this portfolio inspiring, please give it a star!

## 🙏 Acknowledgments

- Icons from [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)