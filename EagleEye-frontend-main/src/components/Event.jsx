import { useState, useEffect } from 'react'
export default function Event(){

    const [eventName, setEventName] = useState();
    const [allevents, setAllEvents] = useState();

    const changeEventName = (event)=>setEventName(event.target.value);

    function handleSubmit(event){
        event.preventDefault();

        async function addevent(){
            let response = await fetch("http://localhost:3000/user/add-event", {
                method: 'POST',
                headers: {
                    'auth': localStorage.getItem('auth_token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'eventName': eventName})
            })

            let data = await response.json();
            console.log(data);
        }
        addevent();
        getAllevents();
    }

    async function subscribeToEvent(event){
        let response = await fetch('http://localhost:3000/user/subscribe', {
            method: 'POST',
            headers:{
                'auth': localStorage.getItem('auth_token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'eventId': event.target.id})
        })

        let data = await response.json();
        console.log(data);
    }

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
            return <p onClick={subscribeToEvent} key={index} id={item._id}>{item.eventName}</p>
        }));
        console.log(data);
    }
    useEffect(()=>{
        
        getAllevents();
    }, [])

    return (
        <>
            <div>
                <h1>Add Event</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={changeEventName}/>
                    <button>Submit</button>
                </form>
                <div>
                    {allevents}
                </div>
            </div>
        </>
    )
}