import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL, FRONTEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {contents, refresh} = useContent();
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);


  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const handleDelete = async (contentId : string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: { "Authorization": localStorage.getItem("token") },
        data: { contentId } // Axios requires data for DELETE requests
      });
      refresh(); // Refresh content list after deletion
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  return <div>
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
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      <div className="flex justify-end gap-4 mb-4">
        <Button onClick={() => {
          setModalOpen(true)
        }} variant="primary" text="Add content" startIcon={<PlusIcon />}></Button>
        <Button onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            const shareUrl = `${FRONTEND_URL}/share/${response.data.hash}`;
            alert(shareUrl);
        }} variant="secondary" text="Share brain" startIcon={<ShareIcon />}></Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        {contents.map(({type, link, title, _id}) => <Card 
            key={_id}
            type={type}
            link={link}
            title={title}
            contentId={_id}
            onDelete={handleDelete}
        />)}
      </div>
    </div>
  </div>
}
