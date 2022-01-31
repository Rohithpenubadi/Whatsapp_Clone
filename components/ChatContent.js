import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachmentIcon from '@mui/icons-material/Attachment';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Message from './Message';
import getFriendData from '../utils/getFriendData';
import { setDoc , addDoc, collection, doc, serverTimestamp, query, where, orderBy, onSnapshot} from 'firebase/firestore';
import { useAuth } from '../Auth';
import { db } from '../firebase';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
const ChatContent = ({ chat, id, messagesProps}) => {
    const [friend, setFriend] = useState({})
    const chatParse = JSON.parse(chat)
    const [input, setInput] = useState("");
    const {currentUser} = useAuth();
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"})
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])
    useEffect(() => {
        setMessages(JSON.parse(messagesProps))
    },[])

    useEffect(() => {
        const messagesRef = collection(db, "chats", id, "messages");
        const q= query(messagesRef, orderBy("timestamp","asc"))
        const unsubscribe = onSnapshot(q , (querySnapshot) => {
            setMessages(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
        })
        return unsubscribe;
    }, [id])

    useEffect(() => {
        if(chatParse?.users?.length >0) {
            getFriendData(chatParse?.users).then(data => {
                setFriend(data)
            })
        } else {
            console.log("without chatParse")
        }
    }, [id])

    const sendMessage = async (e) => {
        e.preventDefault()

        const userRef = doc(db, "users", currentUser.uid)
        setDoc(userRef, {
            lastSeen: serverTimestamp()
        },
        {
            merge: true,
        }
        )
        const messagesRef = collection(db, "chats", id, "messages");
        await addDoc(messagesRef, {
            timestamp: serverTimestamp(),
            message: input,
            user: currentUser.email,
            photoURL: currentUser.photoURL
        })

        const chatRef = doc(db, "chats", id)
        setDoc(chatRef, {
            latestMessage: input,
            timestamp: serverTimestamp(),
        }, { merge: true });
        setInput('')
    }

    return (
        <Container>
            <Header>
                <Avatar src={friend.photoURL}/>
                <HeaderInfo>
                    <h3>{friend.displayName}</h3>
                    <div>Last Active : {moment(friend.lastSeen?.toDate()).fromNow()}</div>
                </HeaderInfo>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Header>
            <MessageContainer>
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message.message}
                        user={message.user}
                        timestamp={message.timestamp}
                    />
                ))}
                <div style={{marginBottom: 100}} ref={messagesEndRef} />
            </MessageContainer>
            <InputContainer>
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton>
                    <AttachmentIcon />
                </IconButton>
                <Input
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message"
                    value={input}
                />
                <IconButton  disabled={!input} type="submit"
                    onClick={sendMessage}
                >
                    <SendIcon/>
                </IconButton>
                <IconButton>
                    <KeyboardVoiceIcon />
                </IconButton>
            </InputContainer>
        </Container>
    );
};

export default ChatContent;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
    margin-left: 15px;
    flex: 1;
    >h3 {
        margin-bottom: 3px;
    }

    >div {
        font-size: 14px;
        color: gray;
    }
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: #f0f0f0;
    z-index: 100;
`;

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 30px;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`;

const MessageContainer = styled.div`
    padding: 20px;
    background-color: #e5ded8;
    flex: 1;
`;