import { useEffect } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";

declare global {
    interface Window {
      twttr?: {
        widgets: {
          load: () => void;
        };
      };
    }
  }

interface CardProps{
    title: string;
    link : string; 
    type : "twitter" | "youtube";
    contentId : string;
    onDelete ?: (id: string) => void;
}

export function Card({title, link, type, contentId, onDelete} : CardProps){

    const getYouTubeEmbedUrl = (link : string) => {
        const videoIdMatch = link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
    };
    
    useEffect(() => {
        if (type === "twitter" && window.twttr) {
          window.twttr.widgets.load(); // Trigger Twitter embed processing
        }
      }, [type, link]);

    return <div>
            <div className="p-4 bg-white rounded-md border-gray-200 max-w-72
                border min-h-48 min-w-72">
                <div className="flex justify-between">
                    <div className="flex items-center text-md">
                        {/* <div className="text-gray-500 pr-2">
                            <ShareIcon/>
                        </div> */}
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <a href={link} target="_blank">
                                <ShareIcon/>
                            </a>
                        </div>
                        <div className="text-gray-500 curson-pointer hover:text-red-500" onClick={() => onDelete && onDelete(contentId)}>
                            <DeleteIcon/>
                        </div>
                    </div>
                </div>
                <div className="pt-4">
                    { type === "youtube" && <iframe className="w-full" src={getYouTubeEmbedUrl(link)} title="YouTube video player"
                    frameBorder="0" allow="accelerometer; autoplay; 
                    clipboard-write; encrypted-media; gyroscope;
                    picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe> }

                    {type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a> 
                    </blockquote>
                    }

                    
                </div>

            </div>
        </div>
}