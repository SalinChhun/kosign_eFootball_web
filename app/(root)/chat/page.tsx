import ChatRoom from "@/app/(root)/chat/ChatRoom";
import {Suspense} from "react";

export default function ChatPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatRoom />
        </Suspense>

    );
}
