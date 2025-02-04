import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchbar.css';


const SearchBar = ()=>{
    const [query,setQuery] = useState("");
    const [result,setResult] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query); // Set the debounced query after a delay
        }, 300); // Adjust debounce delay if necessary (300ms)

        return () => clearTimeout(timer); // Cleanup the timer when query changes
    }, [query]);

    useEffect(()=>{
        if (debouncedQuery.trim().length === 0) {
            setResult([]); // Clear results when query is empty
            return;
        }

        const fetchDetail = async()=>{
            const resp = await fetch(`http://localhost:8000/dashboard/search?query=${query}`,{
                method: "GET",
            });
            if(!resp.ok){
                throw new Error("Failed to fetch data");
            }
            const course = await resp.json();
            console.log(course.data);
            setResult(course.data);
        };
        if(query.trim().length > 2){
            fetchDetail();
        }
        else{
            setResult([]);
        }
    },[debouncedQuery]);

    useEffect(() => {
        console.log("Updated Result:", result);
    }, [result]);



    const handleNavigation = (courseId) => {
        navigate(`/coursedetails/${courseId}`);
    };

    return <div className="search-container2">
    
            <input type="text" 
            placeholder="Search courses..." 
            value = {query} 
            onChange={(e)=>setQuery(e.target.value)}
            className="search-input" />
     
            {result.length > 0 && (
                <ul className="search-results">
                    {result.map((item) => (
                        <li key={item._id} onClick={() => handleNavigation(item._id)}>{item.title}</li>
                    ))}
                </ul>
            )}
     
    </div>  
}

export default SearchBar;