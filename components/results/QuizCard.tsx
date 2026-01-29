'use client';

import { useState } from 'react';
import { Brain, CheckCircle, XCircle, Download } from 'lucide-react';
import { QuizQuestion } from '@/types';

interface QuizCardProps {
  questions: QuizQuestion[];
  onDownload?: () => void;
}

export const QuizCard = ({ questions, onDownload }: QuizCardProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correct++;
    });
    return correct;
  };

  const score = calculateScore();
  const total = questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="bg-cream-100 dark:bg-dark-card border border-sage-500/15 rounded-2xl p-8 hover:shadow-lg dark:hover:shadow-black/30 transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <Brain className="text-sage-500" size={24} />
          <div>
            <h2 className="font-heading font-bold text-2xl text-sage-800 dark:text-cream-50">
              Knowledge Quiz
            </h2>
            <p className="font-sans text-sm text-sage-600 dark:text-dark-muted">
              {questions.length} questions • Test your understanding
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {Object.keys(selectedAnswers).length === questions.length && !showResults && (
            <button
              onClick={() => setShowResults(true)}
              className="px-4 py-2 bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-xl transition-colors font-medium text-sm"
            >
              Show Results
            </button>
          )}
          {onDownload && (
            <button
              onClick={onDownload}
              className="p-2 hover:bg-sage-200 dark:hover:bg-sage-800 rounded-full transition-colors text-sage-600 dark:text-sage-300"
            >
              <Download size={20} />
            </button>
          )}
        </div>
      </div>

      {showResults && (
        <div className="mb-6 p-6 bg-gradient-to-r from-sage-500/10 to-terracotta-500/10 rounded-xl border border-sage-500/20">
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-sage-800 dark:text-cream-50 mb-2">
              {percentage}%
            </div>
            <p className="text-lg text-sage-600 dark:text-sage-300">
              You got {score} out of {total} questions correct
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((question, idx) => {
          const selectedIdx = selectedAnswers[question.id];
          const isAnswered = selectedIdx !== undefined;
          const isCorrect = selectedIdx === question.correctIndex;

          return (
            <div key={question.id} className="bg-white dark:bg-sage-800/30 rounded-xl p-6 border border-sage-200 dark:border-sage-700">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-sage-500/10 dark:bg-sage-500/20 flex items-center justify-center shrink-0">
                  <span className="font-heading font-semibold text-sage-700 dark:text-sage-300">
                    {idx + 1}
                  </span>
                </div>
                <p className="font-heading font-semibold text-lg text-sage-800 dark:text-cream-50">
                  {question.text}
                </p>
              </div>

              <div className="space-y-3 pl-11">
                {question.options.map((option, optIdx) => {
                  const isSelected = selectedIdx === optIdx;
                  const isCorrectOption = optIdx === question.correctIndex;

                  let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all ';

                  if (showResults) {
                    if (isCorrectOption) {
                      buttonClass += 'border-sage-500 bg-sage-50 dark:bg-sage-800/50 ';
                    } else if (isSelected && !isCorrect) {
                      buttonClass += 'border-red-500 bg-red-50 dark:bg-red-900/20 ';
                    } else {
                      buttonClass += 'border-sage-200 dark:border-sage-700 opacity-60 ';
                    }
                  } else {
                    if (isSelected) {
                      buttonClass += 'border-sage-500 bg-sage-50 dark:bg-sage-800/50 ';
                    } else {
                      buttonClass += 'border-sage-200 dark:border-sage-700 hover:border-sage-400 dark:hover:border-sage-600 cursor-pointer ';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswer(question.id, optIdx)}
                      disabled={showResults}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-base text-sage-800 dark:text-cream-100">
                          {option}
                        </span>
                        {showResults && isCorrectOption && (
                          <CheckCircle className="text-sage-500 shrink-0" size={20} />
                        )}
                        {showResults && isSelected && !isCorrect && (
                          <XCircle className="text-red-500 shrink-0" size={20} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-4 pl-11 p-4 bg-cream-50 dark:bg-sage-900/30 rounded-lg">
                  <p className="text-sm font-medium text-sage-700 dark:text-sage-300 mb-1">
                    Explanation:
                  </p>
                  <p className="text-sm text-sage-600 dark:text-sage-200">
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showResults && (
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setSelectedAnswers({});
              setShowResults(false);
            }}
            className="px-6 py-3 border-2 border-sage-500 text-sage-700 dark:text-sage-200 rounded-xl font-medium hover:bg-sage-50 dark:hover:bg-sage-800 transition-all"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};
