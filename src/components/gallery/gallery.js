import React, { memo } from 'react';
import { GridList } from '@material-ui/core';

export const Gallery = memo(({ children, cellHeight, cols }) => {
    return <GridList
        cellHeight={cellHeight}
        cols={cols}
    >
        {
            children
        }
    </GridList>
})