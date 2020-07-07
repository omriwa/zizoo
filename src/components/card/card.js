import React from 'react';
import './card.css';
import { CardMedia } from '@material-ui/core';

const printKeysAndValues = obj => typeof obj === 'object' && Object.keys(obj).map(key => <div
    key={`${key}-${obj[key]}`}
>
    <span
        className='card-text'
    >
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

export const Card = ({ text, imageUrl }) => <CardMedia
        className='card-container'
>
    <div>
        <img
            src={imageUrl}
            className='card-img'
        />
    </div>
    
    <div>
        {
            printKeysAndValues(text)
        }
    </div>
</CardMedia>  