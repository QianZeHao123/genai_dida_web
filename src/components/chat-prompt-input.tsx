// 'use client';

// import {
//   PromptInput,
//   PromptInputAttachment,
//   PromptInputAttachments,
//   PromptInputBody,
//   type PromptInputMessage,
//   PromptInputModelSelect,
//   PromptInputSpeechButton,
//   PromptInputSubmit,
//   PromptInputTextarea,
//   PromptInputToolbar,
//   PromptInputTools,
// } from '@/components/ai-elements/prompt-input';

// import { useRef, useState, forwardRef, useImperativeHandle } from 'react';

// export type ChatPromptInputHandle = {
//   setText: (text: string) => void;
// };

// const models = [
//   { id: 'gpt-4', name: 'GPT-4' },
//   { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
//   { id: 'claude-2', name: 'Claude 2' },
//   { id: 'claude-instant', name: 'Claude Instant' },
//   { id: 'palm-2', name: 'PaLM 2' },
//   { id: 'llama-2-70b', name: 'Llama 2 70B' },
//   { id: 'llama-2-13b', name: 'Llama 2 13B' },
//   { id: 'cohere-command', name: 'Command' },
//   { id: 'mistral-7b', name: 'Mistral 7B' },
// ];

// const SUBMITTING_TIMEOUT = 200;
// const STREAMING_TIMEOUT = 2000;

// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// const ChatPromptInput = forwardRef<ChatPromptInputHandle, {}>((_, ref) => {
//   const [text, setText] = useState<string>('');
//   const [model, setModel] = useState<string>(models[0].id);
//   const [status, setStatus] = useState<
//     'submitted' | 'streaming' | 'ready' | 'error'
//   >('ready');
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);


//   useImperativeHandle(ref, () => ({
//     setText: (newText: string) => {
//       setText(newText);
//       textareaRef.current?.focus();
//     },
//   }));

//   const stop = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//     }
//     setStatus('ready');
//   };

//   const handleSubmit = (message: PromptInputMessage) => {
//     if (status === 'streaming' || status === 'submitted') {
//       stop();
//       return;
//     }

//     const hasText = Boolean(message.text);
//     const hasAttachments = Boolean(message.files?.length);

//     if (!(hasText || hasAttachments)) {
//       return;
//     }

//     setStatus('submitted');
//     console.log('Submitting message:', message);

//     setTimeout(() => {
//       setStatus('streaming');
//     }, SUBMITTING_TIMEOUT);

//     timeoutRef.current = setTimeout(() => {
//       setStatus('ready');
//       timeoutRef.current = null;
//     }, STREAMING_TIMEOUT);
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto h-[230px]">
//       <PromptInput globalDrop multiple onSubmit={handleSubmit}>
//         <PromptInputBody>
//           <PromptInputAttachments>
//             {(attachment) => <PromptInputAttachment data={attachment} />}
//           </PromptInputAttachments>
//           <PromptInputTextarea
//             onChange={(e) => setText(e.target.value)}
//             ref={textareaRef}
//             value={text}
//           />
//         </PromptInputBody>
//         <PromptInputToolbar>
//           <PromptInputTools>
//             <PromptInputSpeechButton
//               onTranscriptionChange={setText}
//               textareaRef={textareaRef}
//             />
//             <PromptInputModelSelect onValueChange={setModel} value={model}>
//               {/* Model select UI remains commented as before */}
//             </PromptInputModelSelect>
//           </PromptInputTools>
//           <PromptInputSubmit status={status} />
//         </PromptInputToolbar>
//       </PromptInput>
//     </div>
//   );
// });

// ChatPromptInput.displayName = 'ChatPromptInput';

// export default ChatPromptInput;

'use client';

import {
  PromptInput,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';

import { useRef, useState, forwardRef, useImperativeHandle } from 'react';

export type ChatPromptInputHandle = {
  setText: (text: string) => void;
};

type ChatPromptInputProps = {
  onSubmit?: (text: string) => void;
};

const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'claude-instant', name: 'Claude Instant' },
  { id: 'palm-2', name: 'PaLM 2' },
  { id: 'llama-2-70b', name: 'Llama 2 70B' },
  { id: 'llama-2-13b', name: 'Llama 2 13B' },
  { id: 'cohere-command', name: 'Command' },
  { id: 'mistral-7b', name: 'Mistral 7B' },
];

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

const ChatPromptInput = forwardRef<ChatPromptInputHandle, ChatPromptInputProps>(
  ({ onSubmit }, ref) => {
    const [text, setText] = useState<string>('');
    const [model, setModel] = useState<string>(models[0].id);
    const [status, setStatus] = useState<
      'submitted' | 'streaming' | 'ready' | 'error'
    >('ready');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      setText: (newText: string) => {
        setText(newText);
        textareaRef.current?.focus();
      },
    }));

    const stop = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setStatus('ready');
    };

    const handleSubmit = (message: PromptInputMessage) => {
      if (status === 'streaming' || status === 'submitted') {
        stop();
        return;
      }

      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      // 触发父组件的 onSubmit 回调
      if (onSubmit && message.text) {
        onSubmit(message.text);
      }

      setStatus('submitted');
      console.log('Submitting message:', message);

      setTimeout(() => {
        setStatus('streaming');
      }, SUBMITTING_TIMEOUT);

      timeoutRef.current = setTimeout(() => {
        setStatus('ready');
        timeoutRef.current = null;
      }, STREAMING_TIMEOUT);
    };

    return (
      <div className="w-full max-w-3xl mx-auto h-[200px]">
        <PromptInput globalDrop multiple onSubmit={handleSubmit}>
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              onChange={(e) => setText(e.target.value)}
              ref={textareaRef}
              value={text}
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputSpeechButton
                onTranscriptionChange={setText}
                textareaRef={textareaRef}
              />
              <PromptInputModelSelect onValueChange={setModel} value={model}>
                {/* Model select UI remains commented as before */}
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    );
  }
);

ChatPromptInput.displayName = 'ChatPromptInput';

export default ChatPromptInput;