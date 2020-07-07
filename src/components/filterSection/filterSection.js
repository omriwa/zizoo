import React from 'react';
import './filterSection.css';

export const FilterSection = ({ children }) => <div
    className="filter-section"
>
    {
        React.Children.map(children, (child) => <div
        >
            {
                child
        }
        </div>)
    }
</div>