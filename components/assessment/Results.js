'use client';

import React, { useState } from 'react';
import { useAssessment } from '../../contexts/AssessmentContext';
import Button from '../ui/Button';
import { saveUserData } from '../../lib/saveUserData';

export default function Results() {
  const { results, biodata, selectedRole, resetAssessment } = useAssessment();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  
  // Map role IDs to readable names
  const roleNames = {
    networkAdmin: "Network Administrator",
    cybersecurity: "Cybersecurity Specialist"
  };
  
  // Determine success rate color and message
  const getSuccessRateInfo = (rate) => {
    if (rate >= 90) {
      return { color: 'green', message: 'Excellent! You have a very strong foundation for this role.' };
    } else if (rate >= 75) {
      return { color: 'blue', message: 'Good! You have a solid foundation but could benefit from specific courses.' };
    } else if (rate >= 60) {
      return { color: 'yellow', message: 'Fair. With some focused learning, you can improve your chances of success.' };
    } else {
      return { color: 'red', message: 'You may need more preparation before pursuing this role.' };
    }
  };
  
  const successRateInfo = getSuccessRateInfo(results.successRate);
  
  // Handle saving results
  const handleSaveResults = async () => {
    setIsSaving(true);
    
    try {
      // Create a results object with the most important data
      const resultsData = {
        role: selectedRole,
        roleName: roleNames[selectedRole],
        successRate: results.successRate,
        strengths: results.strengths,
        weaknesses: results.weaknesses,
        recommendations: results.recommendations.map(rec => rec.courseName)
      };
      
      // Save user data along with results
      const response = await saveUserData(biodata, resultsData);
      
      if (response.success) {
        setSaveStatus({ type: 'success', message: 'Results saved successfully!' });
      } else {
        setSaveStatus({ type: 'error', message: 'Error saving results. Please try again.' });
      }
    } catch (error) {
      console.error('Error saving results:', error);
      setSaveStatus({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="max-w-4xl w-full mx-auto card p-10 scale-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Assessment Results</h2>
        <p className="text-gray-600">
          Based on your responses, here&apos;s your potential career path analysis
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-4 border-b-2 font-medium text-sm ${
            activeTab === 'overview'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`py-3 px-4 border-b-2 font-medium text-sm ${
            activeTab === 'recommendations'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Course Recommendations
        </button>
      </div>
      
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          <div className="mb-8">
            <div className="mb-6 p-6 rounded-lg bg-gray-50">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Success Rate for {roleNames[selectedRole]}</h3>
                  <p className="text-gray-600 text-sm mb-4 md:mb-0">
                    {successRateInfo.message}
                  </p>
                </div>
                <div className="w-32 h-32 flex items-center justify-center rounded-full border-8 border-gray-200">
                  <div className={`text-3xl font-bold ${
                    successRateInfo.color === 'red' ? 'text-red-600' : 
                    successRateInfo.color === 'yellow' ? 'text-yellow-600' : 
                    successRateInfo.color === 'blue' ? 'text-primary-600' : 
                    'text-green-600'
                  }`}>
                    {results.successRate}%
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3 flex items-center text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Your Strengths
                </h3>
                
                {results.strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {results.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 mt-1.5 mr-2"></span>
                        <span className="capitalize">{strength.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No specific strengths identified.
                  </p>
                )}
              </div>
              
              {/* Areas for Improvement */}
              <div className="p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3 flex items-center text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Areas for Improvement
                </h3>
                
                {results.weaknesses.length > 0 ? (
                  <ul className="space-y-2">
                    {results.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary-400 mt-1.5 mr-2"></span>
                        <span className="capitalize">{weakness.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No specific areas for improvement identified.
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-primary-50 rounded-lg">
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Next Steps:</span> We recommend reviewing the Course Recommendations tab for specific courses that can help you succeed in your chosen career path.
            </p>
          </div>
        </div>
      )}
      
      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Recommended Courses</h3>
            <p className="text-gray-600 mb-4">
              Based on your assessment, we recommend the following courses to help you succeed as a {roleNames[selectedRole]}:
            </p>
            
            {results.recommendations.length > 0 ? (
              <div className="space-y-6">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-medium">{recommendation.courseDetails?.title || recommendation.courseName}</h4>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">
                        {recommendation.courseDetails?.description || "This course will help you develop essential skills in this area."}
                      </p>
                      
                      <div className="mt-4 text-sm">
                        <div className="flex items-center mb-2">
                          <span className="text-gray-700 font-medium w-24">Duration:</span>
                          <span>{recommendation.courseDetails?.duration || '4-6 weeks'}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <span className="text-gray-700 font-medium w-24">Difficulty:</span>
                          <span>{recommendation.courseDetails?.difficulty || 'Beginner'}</span>
                        </div>
                        
                        {recommendation.courseDetails?.topics && (
                          <div>
                            <p className="text-gray-700 font-medium mb-1">Key Topics:</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {recommendation.courseDetails.topics.map((topic, i) => (
                                <span key={i} className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  No specific course recommendations at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Status Message */}
      {saveStatus && (
        <div className={`mt-4 p-3 rounded-lg ${saveStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {saveStatus.message}
        </div>
      )}
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200">
        <Button 
          variant="secondary" 
          onClick={resetAssessment}
          className="mb-4 sm:mb-0 w-full sm:w-auto"
        >
          Start Over
        </Button>
        
        <Button 
          onClick={handleSaveResults}
          disabled={isSaving}
          className="w-full sm:w-auto"
        >
          {isSaving ? 'Saving...' : 'Save My Results'}
        </Button>
      </div>
    </div>
  );
}