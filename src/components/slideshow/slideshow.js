import React from 'react';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from '@material-ui/core';
import './slideshow.css';

export const SlideShow = ({ children,open,onClose,onStart,autoplay,mobile }) => <AutoRotatingCarousel
open={open}
        onClose={onClose}
        onStart={onStart}
        autoplay={autoplay}
        mobile={mobile}>
    {
        React.Children.map(children, (child) => <Slide
            key={child}
        >
            {
                child
            }
        </Slide>)
    }
</AutoRotatingCarousel>