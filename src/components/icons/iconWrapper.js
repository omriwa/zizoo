import React from 'react';

export const IconWrapper = ({ width, height, onClick,children }) => < svg
onClick={onClick}
xmlns="http://www.w3.org/2000/svg"
width={width || 25}
height={height ||25}
    viewBox="0 0 24 24">
    {
        children
    }
    </svg>