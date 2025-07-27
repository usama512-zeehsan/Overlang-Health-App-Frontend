# Overang AI Health Platform – Frontend

This is the frontend of the **Overang AI Health Platform**, a responsive and interactive web application that guides users through an AI-powered health quiz. The platform provides wellness suggestions based on user input and enhances the experience with animations, visual feedback, and a modern UI.

---

## Project Structure

```
src/
│
├── app/           # App Router structure
├── components/    # UI components and layout elements
├── data/          # Static and mock data
├── hooks/         # Custom hooks
├── lib/           # Utilities and helper functions
├── types/         # TypeScript types and interfaces
```

---

## Key Features

* **Next.js 15** with App Router
* **Tailwind CSS** for utility-first styling
* **Radix UI** components and accessibility patterns
* **Animated Daily Health Tip Card**
* **Responsive layout**, fully mobile-friendly
* **Clean architecture** and component-based structure

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/usamazeeshan5/Overang-AI-Health-Platform.git
cd Overang-AI-Health-Platform
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser to view the application.

---

## Data Flow

* Quiz responses are submitted to the backend via API.
* Based on user input (e.g., age group), personalized health **Recommendations** are retrieved and rendered dynamically.

---

## Scripts

| Script          | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Run the production build     |
| `npm run lint`  | Run ESLint checks            |

---

## Backend Integration

This frontend works with a FastAPI-powered backend:
**Backend Repository:**
[https://github.com/usamazeeshan5/overang-ai-health-backend](https://github.com/usamazeeshan5/overang-ai-health-backend)

Thank you!

# Overlang-Health-App-Frontend-
Overlang APP
