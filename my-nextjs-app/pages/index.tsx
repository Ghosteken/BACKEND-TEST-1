import socket from '../socket';
import { useEffect, useState } from 'react';
import React from 'react';

interface Task {
  description: string;
}

interface User {
  name: string;
}

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const handleTaskCreated = (task: Task) => {
      setMessages((prevMessages) => [...prevMessages, `Task Created: ${task.description}`]);
    };

    const handleTaskUpdated = (task: Task) => {
      setMessages((prevMessages) => [...prevMessages, `Task Updated: ${task.description}`]);
    };

    const handleTaskDeleted = (task: Task) => {
      setMessages((prevMessages) => [...prevMessages, `Task Deleted: ${task.description}`]);
    };

    const handleUserRegistered = (user: User) => {
      setMessages((prevMessages) => [...prevMessages, `User Registered: ${user.name}`]);
    };

    const handleUserLoggedIn = (user: User) => {
      setMessages((prevMessages) => [...prevMessages, `User Logged In: ${user.name}`]);
    };

    socket.on('taskCreated', handleTaskCreated);
    socket.on('taskUpdated', handleTaskUpdated);
    socket.on('taskDeleted', handleTaskDeleted);
    socket.on('userRegistered', handleUserRegistered);
    socket.on('userLoggedIn', handleUserLoggedIn);

    return () => {
      socket.off('taskCreated', handleTaskCreated);
      socket.off('taskUpdated', handleTaskUpdated);
      socket.off('taskDeleted', handleTaskDeleted);
      socket.off('userRegistered', handleUserRegistered);
      socket.off('userLoggedIn', handleUserLoggedIn);
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Data Streaming with Socket.IO</h1>
      <div id="data">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}
