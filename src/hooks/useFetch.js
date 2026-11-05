import { useEffect, useState } from "react";

function useFetch(url){
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [data,setData] = useState(null);

    useEffect(()=>{
        const controller = new AbortController();

        async function fetchData(){
            try{
                setLoading(true);
                setError(null);
                const response = await fetch(url,{ signal: controller.signal });
                if(!response.ok){
                    setError("Something went wrong... Please try again later!");
                    return
                }
                const responseData = await response.json();

                if(responseData === null || typeof responseData !== "object"){
                    setError("Something went wrong... Please try again later!");
                    return
                }

                setData(responseData);

            }catch(e){
                if(controller.signal.aborted || e.name === "AbortError"){
                    return;
                }
                setError("Something went wrong... Please try again later!");
            }finally{
                if(!controller.signal.aborted){
                    setLoading(false);
                }
            }
        }

        fetchData();

        return ()=> controller.abort();
    },[url])

    return {
        loading,
        error,
        data
    }
}

export default useFetch;