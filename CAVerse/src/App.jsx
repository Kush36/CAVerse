import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import OfferBar from "./components/OfferBar"; // ← Import your OfferBar component

// Pages
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import FoundationLevel from "./components/FoundationLevel";
import IntermediateLevel from "./components/IntermediateLevel";
import FinalLevel from "./components/FinalLevel";
import PaymentPage from "./components/PaymentPage";
import Blogs from "./components/Blogs";
import AdminPanel from './components/AdminPanel';


// import TestPaper from "./pages/TestPaper";
// import Results from "./pages/Results";
// import Schedule from "./pages/Schedule";
// import Mentorship from "./pages/Mentorship";



function App() {
  return (
    <div className="relative min-h-screen">
      {/* Always visible elements */}
      <OfferBar />
      <Navbar />

      {/* Main content with top padding to prevent overlap */}
      <main className="pt-14 md:pt-16">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Course Pages */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/foundation" element={<FoundationLevel />} />
          <Route path="/intermediate" element={<IntermediateLevel />} />
          <Route path="/final" element={<FinalLevel />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Other Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          {/* <Route path="/testpaper" element={<TestPaper />} /> */}
          {/* <Route path="/results" element={<Results />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/mentorship" element={<Mentorship />} /> */}

          {/* Payment Route */}
          <Route path="/payment" element={<PaymentPage />} />
          // Add route
<Route path="/admin" element={<AdminPanel />} />

          {/* 404 Page (Optional but recommended) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

// Optional: 404 Not Found Component
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <a
          href="/"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export default App;