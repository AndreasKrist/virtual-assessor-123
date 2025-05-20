'use client';

import React, { useState } from 'react';
import { useAssessment } from '../../contexts/AssessmentContext';
import Button from '../ui/Button';
import { biodataQuestions } from '../../data/questions';

export default function BiodataForm() {
  const { biodata, updateBiodata, nextStage } = useAssessment();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateBiodata({ [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    biodataQuestions.forEach(question => {
      if (question.required && !biodata[question.id]) {
        newErrors[question.id] = `${question.label} is required`;
        isValid = false;
      }
    });

    // Validate email format if provided
    if (biodata.email && !/\S+@\S+\.\S+/.test(biodata.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStage();
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Tell Us About Yourself</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {biodataQuestions.map((question) => (
          <div key={question.id} className="mb-4">
            <label 
              htmlFor={question.id} 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {question.label}{question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {question.type === 'select' ? (
              <select
                id={question.id}
                name={question.id}
                value={biodata[question.id] || ''}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors[question.id] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              >
                <option value="">Select an option</option>
                {question.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={question.type}
                id={question.id}
                name={question.id}
                value={biodata[question.id] || ''}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors[question.id] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              />
            )}
            
            {errors[question.id] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[question.id]}
              </p>
            )}
          </div>
        ))}
        
        <div className="flex justify-end pt-4">
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </div>
  );
}