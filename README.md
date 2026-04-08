<<<<<<< HEAD
# Interactive Calendar Component

A beautiful, interactive calendar component built with Next.js, TypeScript, and Tailwind CSS. Features a wall calendar aesthetic with date range selection and integrated notes functionality.

## Features

### Core Requirements
- **Wall Calendar Aesthetic**: Features a prominent hero image that changes based on the current month, creating a visual anchor for the calendar
- **Day Range Selector**: Click to select start and end dates with clear visual feedback
- **Integrated Notes Section**: Add, view, and delete notes with localStorage persistence
- **Fully Responsive Design**: Adapts seamlessly between desktop and mobile layouts

### Creative Features
- **Dynamic Monthly Images**: Each month displays a unique, beautiful image
- **Smooth Animations**: Hover effects and transitions for enhanced user experience
- **Dark Mode Support**: Automatic dark mode styling
- **Visual Date States**: Clear indicators for today, selected dates, and date ranges
- **LocalStorage Integration**: Notes persist between sessions

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **LocalStorage** - Client-side data persistence

## Getting Started

### Prerequisites
- Node.js 18+ installed on your machine

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd interactive-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Date Range Selection
1. Click on any date to select the start date
2. Click on another date to select the end date
3. The calendar will highlight the selected range
4. Use the "Clear" button to reset your selection

### Adding Notes
1. Select a date range (optional)
2. Type your note in the textarea
3. Click "Add Note" to save it
4. Notes are automatically saved to localStorage

### Navigation
- Use the arrow buttons to navigate between months
- The hero image and description change based on the current month

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── components/
│   └── Calendar.tsx         # Main calendar component
├── lib/
│   └── calendar-utils.ts    # Calendar utility functions
└── types/
    └── calendar.ts          # TypeScript type definitions
```

## Key Components

### Calendar Component
The main component that handles:
- Date range selection logic
- Month navigation
- Integration with notes system
- Responsive layout

### Calendar Utils
Utility functions for:
- Generating calendar days
- Date comparisons and formatting
- Managing calendar state

### Type Definitions
TypeScript interfaces for:
- CalendarDay structure
- DateRange handling
- Note management

## Responsive Design

### Desktop Layout
- Side-by-side layout with calendar and notes
- Larger hero image
- More spacious calendar grid

### Mobile Layout
- Stacked vertical layout
- Compact calendar grid
- Touch-friendly interface

## Browser Support

This project supports all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Demo

A live demo of this project is available at [your-demo-url](https://your-demo-url.vercel.app).

## Video Walkthrough

For a detailed walkthrough of all features, check out the [video demonstration](https://your-video-url).

---

Built with ❤️ using Next.js and Tailwind CSS
=======
# calender
Feature-Rich: Integrated a dynamic frontend calendar using Node.js to manage and display real-time events.  Modern Stack: Built with a responsive UI and a robust Node.js backend for seamless scheduling and data persistence.  Automated Updates: Utilized GitHub Actions to keep calendar metrics and project milestones synchronized daily.  
>>>>>>> 1e76ea9524267ada0cf9db7f82ab2b2320fe1243
