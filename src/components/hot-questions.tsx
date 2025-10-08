// "use client";

// import { type FunctionComponent } from 'react';

// const hotQuestions = [
//     "How do I get started with Next.js?",
//     "What is TypeScript used for?",
//     "How can I deploy my app?",
//     "Explain AI agents in simple terms",
//     "How do I get started with Next.js?",
//     "What is TypeScript used for?",
//     "How can I deploy my app?",
//     "Explain AI agents in simple terms",
//     "How can I deploy my app?",
//     "Explain AI agents in simple terms",
// ];

// type HotQuestionsProps = {
//     onQuestionClick?: (question: string) => void;
// };

// const HotQuestions: FunctionComponent<HotQuestionsProps> = ({ onQuestionClick }) => {
//     return (
//         <section className="flex-1 flex flex-col justify-center">
//             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {hotQuestions.map((question, index) => (
//                     <li key={index} className="h-full">
//                         <div className="h-full">
//                             <button
//                                 type="button"
//                                 className="w-full h-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
//                                 onClick={() => {
//                                     onQuestionClick?.(question);
//                                 }}
//                             >
//                                 {question}
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </section>
//     );
// };

// export default HotQuestions;


"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";

type HotQuestionsProps = {
    onQuestionClick?: (question: string) => void;
};

const HotQuestions: React.FunctionComponent<HotQuestionsProps> = ({
    onQuestionClick,
}) => {
    const [hotQuestions, setHotQuestions] = useState<string[]>([]);

    useEffect(() => {
        Papa.parse("/hot-questions.csv", {
            download: true,
            header: true,
            complete: (result) => {
                const questions = result.data
                    .map((row: any) => row.question)
                    .filter(Boolean);
                setHotQuestions(questions);
            },
            error: (error) => {
                console.error("Error loading CSV:", error);
                // Fallback static data
                setHotQuestions([
                    "How do I get started with Next.js?",
                    "What is TypeScript used for?",
                    "How can I deploy my app?",
                    "Explain AI agents in simple terms",
                ]);
            },
        });
    }, []);

    return (
        <section className="flex-1 flex flex-col justify-center">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {hotQuestions.map((question, index) => (
                    <li key={index} className="h-full">
                        <button
                            type="button"
                            className="w-full h-full text-left px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
                            onClick={() => onQuestionClick?.(question)}
                        >
                            {question}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default HotQuestions;