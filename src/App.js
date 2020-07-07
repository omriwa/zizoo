import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { GET_BOATS } from './graphql/GET_BOATS';
import { Card } from './components/card/card';
import Input from '@material-ui/core/Input';
import { Gallery } from './components/gallery/gallery';
import { GalleryIcon } from './components/icons/galleryIcon/galleryIcon';
import { SlideShowIcon } from './components/icons/slideshowIcon/slideShowIcon';
import { SlideShow } from './components/slideshow/slideshow';
import { FilterSection } from './components/filterSection/filterSection';

export const App = () => {
  const [boatLengthFrom, setBoatLengthFrom] = useState(NaN);
  const [boatYearFrom, setBoatYearFrom] = useState(NaN);
  const [boatLengthTo, setBoatLengthTo] = useState(NaN);
  const [boatYearTo, setBoatYearTo] = useState(NaN);
  const [isGallery, setIsGallery] = useState(true);
  const { loading, error, data } = useQuery(GET_BOATS);

  const inputNumberHandler = (e, callback) => callback(!isNaN(e.currentTarget.value) ? parseInt(e.currentTarget.value) : e.currentTarget.value)
  const onChangeBoatLengthFrom = e => inputNumberHandler(e, setBoatLengthFrom);
  const onChangeBoatYearFrom = e => inputNumberHandler(e, setBoatYearFrom);
  const onChangeBoatLengthTo = e => inputNumberHandler(e, setBoatLengthTo);
  const onChangeBoatYearTo = e => inputNumberHandler(e, setBoatYearTo);
  const onClickGalleryIcon = () => setIsGallery(true);
  const onClickSlideShowIcon = () => setIsGallery(false);
  const onCloseSlideShow = () => setIsGallery(true);

  const renderData = () => {
    if (data && data.getBoats) {
      const boats = data.getBoats;
      let renderData = boats.filter(boat => boat.active);

      if (!isNaN(boatLengthFrom)) {
        renderData = renderData.filter(boat => boatLengthFrom <= boat.length);
      }

      if (!isNaN(boatLengthTo)) {
        renderData = renderData.filter(boat => boatLengthTo >= boat.length);
      }

      if (!isNaN(boatYearFrom)) {
        renderData = renderData.filter(boat => boatYearFrom <= boat.year);
      }

      if (!isNaN(boatYearTo)) {
        renderData = renderData.filter(boat => boatYearTo >= boat.year);
      }
      renderData = renderData.map(boat => {
        const cardText = { ...boat };

        delete cardText.imageUrl;

        return <Card
          key={boat.id}
          imageUrl={boat.imageUrl}
          text={cardText}
        />
      });
      if (isGallery)
        return <Gallery
          cols={3}
          cellHeight={100}
        >
          {
            renderData
          }
        </Gallery>

      else
        return <SlideShow
          open={!isGallery}
          onClose={onCloseSlideShow}
          autoplay={false}
          mobile={false}
        >
          {
            renderData
          }
        </SlideShow>
    }
  }

    const renderView = () => {
      if (error) {
        return <div>Error fetching data</div>
      }
      else if (loading) {
        return <div>Loading</div>
      }
      else {
        return renderData();
      }
    }

    const renderFilterSection = () => <FilterSection>
      <div>
        <span>
          boat legnth
    </span>
        <Input
          type='number'
          title='title'
          onChange={onChangeBoatLengthFrom}
        />
    -
    <Input
          type='number'
          title='to'
          onChange={onChangeBoatLengthTo}
        />
      </div>

      <div>
        <span>
          boat year
    </span>
        <Input
          type='number'
          title='from'
          onChange={onChangeBoatYearFrom}
        />
    -
    <Input
          type='number'
          title='to'
          onChange={onChangeBoatYearTo}
        />
      </div>

      <div>
        <GalleryIcon
          width={24}
          height={24}
          onClick={onClickGalleryIcon}
        />
        <SlideShowIcon
          width={24}
          height={24}
          onClick={onClickSlideShowIcon}
        />
      </div>
    </FilterSection>

    return <>
      {
        renderFilterSection()
      }

      <div>
        {
          renderView()
        }
      </div>
    </>
  }