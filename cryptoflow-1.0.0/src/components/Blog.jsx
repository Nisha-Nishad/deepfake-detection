import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";

const API_KEY = "a97a48206f8a482ca7fb07fd8f9e1270";

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const fetchNews = async (pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=("deepfake" OR "identity theft")&language=en&sortBy=publishedAt&page=${pageNum}&pageSize=12&apiKey=${API_KEY}`
      );
      setArticles((prev) => [...prev, ...response.data.articles]);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.disconnect();
    };
  }, [loading]);

  return (
   
       <div className="bg-gradient-hero hero-glow">
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-6 py-20">
        <div className="text-center mb-10 animate-fade-in-down">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Latest on Deepfakes 
          </h2>
          <p className="text-lg text-white-600 mt-4 max-w-2xl mx-auto">
            Stay updated with cutting-edge news on digital security threats.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((item, idx) => (
            <Card
              key={idx}
              className="overflow-hidden flex flex-col transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2 border border-gray-200 bg-white animate-slide-up group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {item.urlToImage ? (
                <div className="relative overflow-hidden group">
                  <img
                    src={item.urlToImage}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center animate-pulse">
                  <span className="text-gray-500 text-sm">No Image Available</span>
                </div>
              )}
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
  {item.title}
</CardTitle>

                <CardDescription className="text-sm text-muted-foreground line-clamp-3 mt-2">
                  {item.description || "No description available."}
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-2 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs text-gray-500 font-medium">
                    {item.source?.name || "Unknown Source"}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs  transition-all duration-300 hover:scale-105"
                    onClick={() => window.open(item.url, "_blank")}
                  >
                    Read Full Article
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Infinite Scroll Loader Indicator */}
        <div ref={loaderRef} className="text-center py-6">
          {loading && (
            <div className="flex flex-col items-center space-y-2 animate-fade-in">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-500">Loading more news...</span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}