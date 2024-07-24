import { useState, useEffect } from "react"

export default function MyEvent(){
    const [allevents, setAllEvents] = useState("");

    async function getAllevents(){
        let response = await fetch("http://localhost:3000/user/all-events", {
            method: "GET",
            headers: {
                'auth': localStorage.getItem('auth_token'),
                'Content-Type': 'application/json'
            }
        })

        let data = await response.json();
        setAllEvents(data.data.map((item, index)=>{
            return <div key={index}>
                <p id={item._id}>{item.eventName}</p>
                <button onClick="addZone">Add Zone</button>
                <button onClick="deleteZone">Delete Zone</button>
                <button onClick="addConnection">Add Connection</button>
                <button onClick="deleteConnection">Delete Connection</button>
            </div>
        }));
        console.log(data);
    }

    useEffect(()=>{
        getAllevents();
    }, [])
    return (
        <>
            <div>
                <h1>My Event</h1>
                <div>
                    {allevents}
                </div>
            </div>
        </>
    )
}