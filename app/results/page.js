'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '../../contexts/AssessmentContext';
import Layout from '../../components/layout/Layout';
import Results from '../../components/assessment/Results';

export default function ResultsPage() {
  const router = useRouter();
  const { stage, results } = useAssessment();
  
  // Redirect to home if results aren't available yet
  useEffect(() => {
    if (stage !== 'results' || !results.successRate) {
      router.push('/');
    }
  }, [stage, results, router]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Results />
      </div>
    </Layout>
  );
}