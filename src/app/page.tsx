"use client";

import { useRef, useState } from 'react';
import ChatPromptInput, { ChatPromptInputHandle } from '@/components/chat-prompt-input';
import HotQuestions from "@/components/hot-questions";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageAvatar,
  MessageContent,
} from '@/components/ai-elements/message';
import { nanoid } from 'nanoid';

export type MessageData = {
  id: string;
  value: string;
  sender: 'user' | 'assistant';
  name: string;
  avatar: string;
};

// 模拟 AI 回复（可替换为 API 调用）
const generateAIResponse = (input: string): string => {
  const responses: Record<string, string> = {
    "how do i get started with next.js?": "To get started with Next.js, run: `npx create-next-app@latest`. Then follow the prompts!",
    "what is typescript used for?": "TypeScript adds static typing to JavaScript, improving code quality and developer experience.",
    "how can i deploy my app?": "You can deploy your Next.js app using Vercel, Netlify, or any Node.js hosting service.",
    "explain ai agents in simple terms": "AI agents are programs that perceive their environment and take actions to achieve goals, like chatbots or robots.",
  };
  const key = input.toLowerCase().trim();
  return responses[key] || "I'm not sure about that. Can you ask something else?";
};


export default function Home() {
  const inputRef = useRef<ChatPromptInputHandle>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [hasStartedConversation, setHasStartedConversation] = useState(false); // 新增状态

  const handleQuestionClick = (question: string) => {
    inputRef.current?.setText(question);
  };

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;

    // 标记已开始对话
    setHasStartedConversation(true);

    const userMessage: MessageData = {
      id: nanoid(),
      value: text,
      sender: 'user',
      name: 'Alex Johnson',
      avatar: 'https://github.com/haydenbleasel.png',
    };

    const aiMessage: MessageData = {
      id: nanoid(),
      value: generateAIResponse(text),
      sender: 'assistant',
      name: 'AI Assistant',
      avatar: 'https://github.com/openai.png',
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
  };

  return (
    <div className="flex flex-col h-screen max-w-full mx-auto px-6 pt-2">
      {/* Header */}
      <header className="flex items-center pb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Cyber AI Assistant
        </h2>
      </header>

      {/* Conversation Area - 始终存在，只改变内容 */}
    <Conversation className="flex-1 mt-4 mb-4 conversation-scrollbar">
      <ConversationContent>
        {messages.length === 0 ? (
          // 没有消息时：居中显示 HotQuestions
          <div className="flex items-center justify-center h-full">
            <div className="text-center w-full max-w-4xl pt-6">
              <HotQuestions onQuestionClick={handleQuestionClick} />
            </div>
          </div>
        ) : (
          // 有消息时：显示聊天记录
          messages.map((msg) => (
            <Message key={msg.id} from={msg.sender}>
              <MessageContent>{msg.value}</MessageContent>
              <MessageAvatar name={msg.name} src={msg.avatar} />
            </Message>
          ))
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>

      {/* Input Box */}
      <div className="mt-auto">
        <ChatPromptInput
          ref={inputRef}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}