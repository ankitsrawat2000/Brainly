import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";

export function SharePage() {
  const { shareId } = useParams(); // Extract share link from URL
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <Sidebar />
        <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        

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
