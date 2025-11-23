// Tooltip.jsx
import React, { useEffect } from 'react';

const Tooltip = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-abg-tooltip]');
    elements.forEach(el => {
      if (!el.querySelector('.ABG-tooltip')) {
        const content = el.getAttribute('data-abg-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'ABG-tooltip';
        tooltip.textContent = content;
        el.appendChild(tooltip);
      }
    });
  }, []);

  return null;
};

export default Tooltip;