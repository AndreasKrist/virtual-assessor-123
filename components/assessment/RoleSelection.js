'use client';

import React from 'react';
import { useAssessment } from '../../contexts/AssessmentContext';
import Button from '../ui/Button';

export default function RoleSelection() {
  const { selectRole, nextStage, selectedRole } = useAssessment();
  
  const roles = [
    {
      id: 'networkAdmin',
      title: 'Network Administrator',
      description: 'Manage and maintain computer networks, ensuring they function efficiently and securely.',
      skills: ['Network configuration', 'Troubleshooting', 'Hardware management', 'User support']
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Specialist',
      description: 'Protect systems, networks, and data from digital attacks and unauthorized access.',
      skills: ['Threat detection', 'Security protocols', 'Risk assessment', 'Incident response']
    }
  ];

  const handleSelectRole = (roleId) => {
    selectRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      nextStage();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Choose Your IT Career Path</h2>
      <p className="text-gray-600 text-center mb-8">
        Select the role you're most interested in pursuing
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {roles.map((role) => (
          <div 
            key={role.id}
            onClick={() => handleSelectRole(role.id)}
            className={`
              cursor-pointer border-2 rounded-lg p-6 transition-colors
              ${selectedRole === role.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'}
            `}
          >
            <div className="text-center mb-4">
              {/* Simple colored box instead of SVG */}
              <div className={`
                w-16 h-16 mx-auto mb-3 rounded-lg flex items-center justify-center text-white font-bold text-xl
                ${role.id === 'networkAdmin' ? 'bg-blue-500' : 'bg-indigo-600'}
              `}>
                {role.id === 'networkAdmin' ? 'N' : 'S'}
              </div>
              <h3 className="text-xl font-semibold">{role.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-4 text-center">
              {role.description}
            </p>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Key skills:</p>
              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleContinue}
          disabled={!selectedRole}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}