import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import UploadPage from "./components/UploadPage";
import ResultsPage from "./components/ResultsPage";
import AudioUploadPage from "./components/AudioUploadPage";
import ImageUploadPage from "./components/ImageUploadPage";
import Blog from "./components/Blog";
import Profile from "./components/Profile"

const queryClient = new QueryClient();

const App = () => {
  const basename = import.meta.env.MODE === 'production' ? '/cryptoflow' : '/';
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/audioanalysis" element={<AudioUploadPage />} />
            <Route path="/imageupload" element={<ImageUploadPage />} />
            <Route path="/blogs" element={<Blog/>} />
            <Route path ="/profile" element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;