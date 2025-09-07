import { useRef, useState } from "react";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { CrossIcon } from "./CrossIcon";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

// controlled component
export function CreateContentModal({open, onClose} : {open : boolean; onClose: ()=> void}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function addContent() {
        const title = titleRef.current?.value?.trim();
        const link = linkRef.current?.value?.trim();

        if (!title || !link) {
            setError("Please fill in all fields");
            return;
        }

        try {
            new URL(link);
        } catch {
            setError("Please enter a valid URL");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });

            if (titleRef.current) titleRef.current.value = "";
            if (linkRef.current) linkRef.current.value = "";
            onClose();
        } catch (err) {
            setError("Failed to add content. Please try again.");
            console.error("Error adding content:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {open && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={onClose}
                    />
                    
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Add New Content
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                >
                                    <CrossIcon />
                                </button>
                            </div>

                            <div className="px-6 py-6 space-y-6">
                                {error && (
                                    <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                                        <p className="text-sm text-red-600">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        ref={titleRef}
                                        type="text"
                                        placeholder="Enter content title"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors outline-none"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Link
                                    </label>
                                    <input
                                        ref={linkRef}
                                        type="url"
                                        placeholder="https://example.com"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors outline-none"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Content Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setType(ContentType.Youtube)}
                                            disabled={loading}
                                            className={`p-4 rounded-lg border-2 transition-all ${
                                                type === ContentType.Youtube
                                                    ? 'border-red-500 bg-red-50 text-red-700'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                </svg>
                                                <span className="text-sm font-medium">YouTube</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setType(ContentType.Twitter)}
                                            disabled={loading}
                                            className={`p-4 rounded-lg border-2 transition-all ${
                                                type === ContentType.Twitter
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                </svg>
                                                <span className="text-sm font-medium">Twitter</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <Button
                                    onClick={onClose}
                                    variant="secondary"
                                    text="Cancel"
                                    fullWidth
                                    loading={false}
                                />
                                <Button
                                    onClick={addContent}
                                    variant="primary"
                                    text="Add Content"
                                    fullWidth
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}