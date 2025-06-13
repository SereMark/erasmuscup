// import React, { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/layout/Layout";

// // Lazy load page components for better initial load performance
// const LandingPage = lazy(() => import("./pages/LandingPage"));
// const ScoreboardPage = lazy(() => import("./pages/ScoreboardPage"));
// const EventsPage = lazy(() => import("./pages/EventsPage"));
// const RulesPage = lazy(() => import("./pages/RulesPage"));

// // Loading fallback component
// const PageLoader = () => (
//   <div className="min-h-screen flex items-center justify-center">
//     <div className="flex flex-col items-center space-y-4">
//       <div className="w-16 h-16 border-4 border-brand-300 border-t-brand-600 rounded-full animate-spin"></div>
//       <p className="text-lg text-brand-300">Loading...</p>
//     </div>
//   </div>
// );

// /**
//  * Main application component
//  * Defines the routes and handles lazy loading
//  */
// export default function App() {
//   return (
//     <Suspense fallback={<PageLoader />}>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<LandingPage />} />
//           <Route path="scoreboard" element={<ScoreboardPage />} />
//           <Route path="events" element={<EventsPage />} />
//           <Route path="rules" element={<RulesPage />} />
//           {/* Catch-all route for 404 pages */}
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// }

// // 404 page component
// function NotFound() {
//   return (
//     <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
//       <h1 className="text-4xl md:text-6xl font-bold mb-4 text-brand-400">404</h1>
//       <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
//       <p className="text-dark-200 max-w-md mb-8">
//         The page you're looking for doesn't exist or has been moved.
//       </p>
//       <a 
//         href="/"
//         className="btn-primary transition-transform hover:scale-105"
//       >
//         Back to Home
//       </a>
//     </div>
//   );
// }


import React from "react";
import GoodbyePage from "./pages/GoodbyePage";

export default function App() {
  return <GoodbyePage />;
}