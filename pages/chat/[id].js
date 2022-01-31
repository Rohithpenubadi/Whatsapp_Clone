import { collection, doc, getDoc, getDocs, orderBy, query } from '@firebase/firestore';
import React from 'react';
import styled from 'styled-components';
import ChatContent from '../../components/ChatContent';
import { db } from '../../firebase';

const ChatBox = ({ chat, id, messages}) => {
    return (
        <Container>
            <ChatContainer>
                <ChatContent chat = {chat} id={id} messagesProps = {messages} />
            </ChatContainer>
        </Container>
    );
};

export default ChatBox;

export async function getServerSideProps(context) {
    const messagesRef = collection(db, "chats", context.query.id, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() }))
    const docRef = doc(db, "chats", context.query.id);
    console.log(context.query.id, "id");
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data(), "ROhith");
    return {
        props: {
            chat: JSON.stringify(docSnap.data()),
            id: context.query.id,
            messages:JSON.stringify(messages)
        }
    }
}

const Container = styled.div`
    display: flex;
    background-color: #f8fafc;
    width: 100%;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    max-height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;