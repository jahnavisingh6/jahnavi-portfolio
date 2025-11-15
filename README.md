# Jahnavi Singh's Portfolio

A beautiful, modern portfolio website showcasing data science, machine learning, and AI projects. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ Responsive design with beautiful animations
- 📊 Project showcase with detailed descriptions
- 🎯 Skills section organized by category
- 💼 Professional experience timeline
- 📧 **Working contact form** with EmailJS integration
- 📄 Resume download button
- 📱 Mobile-friendly navigation
- 🎨 Gradient color scheme with smooth transitions

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- EmailJS (for contact form)
- React Icons
- Framer Motion

## Getting Started

### 1. Clone the repository:
```bash
git clone <repository-url>
cd jahnavi-portfolio
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Set up EmailJS for contact form:
See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for detailed instructions.

Quick setup:
```bash
# Copy environment template
cp .env.local.example .env.local

# Edit .env.local and add your EmailJS credentials
# Get credentials from https://www.emailjs.com/
```

### 4. Add your resume (optional):
Place your resume as `resume.pdf` in the `/public` folder for the download button to work.

### 5. Run the development server:
```bash
npm run dev
```

### 6. Open your browser:
Visit [http://localhost:3000](http://localhost:3000) to see the portfolio.

## Project Structure

```
portfolio/
├── app/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── ProjectCard.tsx
│   │   └── CertificationCard.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── public/
│   └── projects/
├── package.json
└── README.md
```

## Customization

1. Update the content in `app/page.tsx` with your personal information
2. Add your project images to the `public/projects` directory
3. Modify the color scheme in `tailwind.config.ts`
4. Update the fonts and styles in `app/globals.css`

## Deployment

The site can be easily deployed to Vercel:

```bash
npm run build
```

## License

MIT License - feel free to use this template for your own portfolio!
