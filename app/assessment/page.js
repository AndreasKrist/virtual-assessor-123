'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '../../contexts/AssessmentContext';
import Layout from '../../components/layout/Layout';
import BiodataForm from '../../components/assessment/BiodataForm';
import RoleSelection from '../../components/assessment/RoleSelection';
import QuestionCard from '../../components/assessment/QuestionCard';

export default function Assessment() {
  const router = useRouter();
  const { stage } = useAssessment();
  
  // Redirect to results page when assessment is complete
  useEffect(() => {
    if (stage === 'results') {
      router.push('/results');
    } else if (stage === 'welcome') {
      router.push('/');
    }
  }, [stage, router]);
  
  // Determine which component to render based on current stage
  const renderStageComponent = () => {
    switch (stage) {
      case 'biodata':
        return <BiodataForm />;
      case 'roleSelection':
        return <RoleSelection />;
      case 'generalQuestions':
      case 'roleQuestions':
        return <QuestionCard />;
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          {renderStageComponent()}
        </div>
      </div>
    </Layout>
  );
}