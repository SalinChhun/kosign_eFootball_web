'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";

const ChatRoom = () => {
    const searchParams = useSearchParams();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        setUserName(searchParams.get("userName") || ""); // Ensure reactivity
    }, [searchParams]);

    const [userData, setUserData] = useState({
        username: userName, // Use state instead
        receiverName: '',
        connected: false,
        message: ''
    });

    return (
        <div>
            <p>Welcome, {userData.username}!</p>
            {/* Rest of your component */}
        </div>
    );
};

export default ChatRoom;
