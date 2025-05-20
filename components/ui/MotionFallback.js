import React from 'react';

// This is a fallback component to use when framer-motion isn't available
// It simply renders the children without animations

export const Motion = ({ children, ...props }) => {
  // Just pass through any className props
  return React.cloneElement(children, {
    className: `${children.props.className || ''} ${props.className || ''}`.trim()
  });
};

export default { 
  div: Motion,
  main: Motion,
  h1: Motion,
  h2: Motion,
  p: Motion,
  span: Motion,
  section: Motion
};