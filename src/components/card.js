import React from 'react';

const printKeysAndValues = obj => Object.keys(obj).map(key => <div>
    <span>
        { 
            key + ':'
        }
    </span>

    <span>
        {
            typeof obj[key] !== 'object' ? obj[key] : printKeysAndValues(obj[key])
        }
    </span>
</div>)

export const Card = ({ text, imageUrl }) => <div>
    <div>
        <img src={imageUrl} />
    </div>
    
    <div>
        {
            printKeysAndValues(text)
        }
    </div>
</div>  