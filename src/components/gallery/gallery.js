import React from 'react';
import { GridList } from '@material-ui/core';

export const Gallery = ({ children,cellHeight,cols }) => <GridList
    cellHeight={cellHeight}
    cols={cols}
>
    {
        children
    }
</GridList>