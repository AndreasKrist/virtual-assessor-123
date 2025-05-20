'use client';

import React, { useState } from 'react';
import { useAssessment } from '../../contexts/AssessmentContext';
import Button from '../ui/Button';

export default function QuestionCard() {
  const { 
    getCurrentQuestion, 
    recordAnswer, 
    nextStage, 
    prevStage, 
    answers,
    currentQuestionSet,
    getProgress
  } = useAssessment();
  
  const question = getCurrentQuestion();
  const progress = getProgress();
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Check if this question has been answered
  const currentAnswer = currentQuestionSet === 'general' 
    ? answers.general[question.id] 
    : answers.roleSpecific[question.id];
  
  const handleAnswer = (value) => {
    recordAnswer(question.id, value);
  };
  
  const handleNext = () => {
    // Only proceed if an answer has been selected
    if (currentAnswer !== undefined) {
      nextStage();
    }
  };

  // Calculate progress percentage
  const percentage = Math.round(((progress.current + 1) / progress.total) * 100) || 0;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Question {progress.current + 1} of {progress.total}</span>
          <span>{percentage}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6">{question.text}</h2>
        
        {/* Answer buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className={`
              py-3 px-4 rounded-md font-medium text-center transition-colors
              ${currentAnswer === true 
                ? 'bg-blue-600 text-white' 
                : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}
            `}
          >
            Yes
          </button>
          
          <button
            onClick={() => handleAnswer(false)}
            className={`
              py-3 px-4 rounded-md font-medium text-center transition-colors
              ${currentAnswer === false 
                ? 'bg-blue-600 text-white' 
                : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}
            `}
          >
            No
          </button>
        </div>
        
        {/* Explanation for "No" answers */}
        {currentAnswer === false && (
          <div className="mt-6">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-blue-600 text-sm font-medium flex items-center"
            >
              {showExplanation ? '- Hide explanation' : '+ Learn more about this topic'}
            </button>
            
            {showExplanation && (
              <div className="mt-3 p-4 bg-blue-50 rounded-md text-sm">
                <p className="text-gray-700">
                  This skill is covered in our <span className="font-semibold">{question.courseRecommendation}</span> course,
                  which helps you understand {question.category} concepts and practical applications.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button 
          variant="secondary" 
          onClick={prevStage}
        >
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={currentAnswer === undefined}
        >
          {progress.current + 1 === progress.total ? 'See Results' : 'Next'}
        </Button>
      </div>
    </div>
  );
}