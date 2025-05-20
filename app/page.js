'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '../contexts/AssessmentContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

export default function Home() {
  const router = useRouter();
  const { nextStage } = useAssessment();
  
  const handleStartAssessment = () => {
    nextStage();
    router.push('/assessment');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">IT Career Assessment</h1>
            <p className="text-xl text-gray-600">
              Discover your potential success rate in IT roles and get personalized course recommendations.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
                <h2 className="text-xl font-semibold mb-3 text-blue-700">
                  How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ol className="space-y-3">
                      <li className="flex">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium">Choose Your Career Interest</h3>
                          <p className="text-gray-600 text-sm">
                            Select between Network Administration or Cybersecurity
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium">Answer Simple Questions</h3>
                          <p className="text-gray-600 text-sm">
                            Answer yes/no questions about your current knowledge
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                  <div>
                    <ol className="space-y-3" start="3">
                      <li className="flex">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium">Get Your Success Rate</h3>
                          <p className="text-gray-600 text-sm">
                            See your estimated success rate in your chosen path
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                          4
                        </div>
                        <div>
                          <h3 className="font-medium">Receive Course Recommendations</h3>
                          <p className="text-gray-600 text-sm">
                            Get personalized course suggestions to improve your skills
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  {/* Use a colored box instead of SVG */}
                  <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded mx-auto mb-3">
                    <span className="font-bold">N</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Network Administration</h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    Set up, maintain, and troubleshoot network systems to keep organizations connected.
                  </p>
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      Network Configuration
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      Troubleshooting
                    </span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  {/* Use a colored box instead of SVG */}
                  <div className="w-12 h-12 bg-indigo-600 text-white flex items-center justify-center rounded mx-auto mb-3">
                    <span className="font-bold">S</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Cybersecurity Specialist</h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    Protect systems and data from digital attacks and security threats.
                  </p>
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      Threat Detection
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      Security Protocols
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={handleStartAssessment}
                  className="px-6 py-2"
                >
                  Start Your Assessment
                </Button>
                <p className="mt-3 text-sm text-gray-500">
                  Takes only 5-10 minutes to complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}