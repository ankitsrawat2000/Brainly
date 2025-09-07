import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";

export function SharePage() {
  const { shareId } = useParams();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchSharedContent() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching shared content:", error);
      }
      setLoading(false);
    }
    fetchSharedContent();
  }, [shareId]);

  if (loading) return <p>Loading...</p>;
  if (!content.length) return <p>No content found.</p>;

  return (<div>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md border"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="p-4 lg:ml-72 min-h-screen bg-gray-100 border-2">
        

            <div className="flex gap-4 flex-wrap">
            {content.map(({type, link, title, _id}) => <Card 
                        key={_id}
                        type={type}
                        link={link}
                        title={title}
                        contentId={_id}
                    />)}
            </div>
        </div>
    </div>
  );
}
