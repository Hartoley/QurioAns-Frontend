# QurioAns Blog Platform

QurioAns is a responsive, user-friendly blogging platform that allows writers to create, edit, and manage blogs, while users can discover, read, like, and comment on content in real-time.

## Live Demo

[https://qurio-ans-frontend.vercel.app](https://qurio-ans-frontend.vercel.app)

## Features

### For Users
- Register and log in securely
- Browse all published blog posts
- Read detailed blog articles
- Like blog posts
- Comment and reply on blog posts
- Responsive layout for all devices

### For Writers
- Register and log in as a writer
- Create new blog posts using a rich text editor
- Update or delete own blog posts
- View and manage all authored content

### Real-Time Capabilities
- Instant update of likes and comments using Socket.IO
- Dynamic content loading and UI feedback via Axios and Redux

## Tech Stack

### Frontend
- React (Functional Components and Hooks)
- Redux Toolkit for state management
- React Router DOM for navigation
- Tailwind CSS & Bootstrap for responsive UI
- React Quill for rich text editing
- Axios for API requests
- Formik & Yup for form management and validation
- React Toastify for user notifications
- Socket.IO Client for real-time interaction

### Additional Tools & Libraries
- Firebase (for authentication or optional backend services)
- HeroIcons, FontAwesome, Lucide for consistent iconography

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project (if Firebase is used for auth or storage)

### Installation

Clone the repository:

```bash
git clone https://github.com/Hartoley/QurioAns-Frontend.git
cd qurioans-frontend
````

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Folder Structure

```
src/
├── components/        # Shared components (Navbar, Footer, etc.)
├── pages/             # Page components (Login, BlogList, Dashboard, etc.)
├── redux/             # Redux slices and store setup
├── assets/            # Static files and images
├── App.js             # Route definitions and layout wrapper
├── index.js           # Entry point
```

## License

This project is licensed under the MIT License.

## Author

Jimoh Sekinat Tolani (Keena)

```
