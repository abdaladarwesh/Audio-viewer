"use client";

import { useParams } from "next/navigation";

interface params{
    url : string,
    [key: string]: string | string[]
}


export default function Play() : React.ReactNode{
    
    const Params = useParams<params> ()
    const { url } : {url : string} = Params; 


    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <audio
                controls
                src={`/api/sound?url=${(url)}`}
            />
        </div>
    );
}