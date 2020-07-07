import React, { useState } from 'react';
import {ApolloProvider,Query} from 'react-apollo';
import {client} from './graphql/apollo.config'
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
  
  const inputNumberHandler = (e,callback) => callback(parseInt(e.currentTarget.value))
  const onChangeBoatLengthFrom = e => inputNumberHandler(e,setBoatLengthFrom);
  const onChangeBoatYearFrom = e => inputNumberHandler(e, setBoatYearFrom);
  const onChangeBoatLengthTo = e => inputNumberHandler(e,setBoatLengthTo);
  const onChangeBoatYearTo = e => inputNumberHandler(e, setBoatYearTo);
  const onClickGalleryIcon = () => setIsGallery(true);
  const onClickSlideShowIcon = () => setIsGallery(false);
  const onCloseSlideShow = () => setIsGallery(true);


  return <ApolloProvider
    client={client}
  >
    <FilterSection>
      <div>
        <span>
          boat legnth
        </span>
        <Input
          type='number'
          title='title'
          value={boatLengthFrom}
          onChange={onChangeBoatLengthFrom}
        />
        -
        <Input
          type='number'
          title='to'
          value={boatLengthTo}
          onChange={onChangeBoatLengthTo}
        />
      </div>

      <div>
        <span>
          boat year
        </span>
        <Input
          type='number'
          value={boatYearFrom}
          title='from'
          onChange={onChangeBoatYearFrom}
        />
        -
        <Input
          type='number'
          title='to'
          value={boatYearTo}
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

    <div>
      <Query query={GET_BOATS}>
        {
          ({ loading, error, data }) => {
            if (error) {
              return <div>Error fetching data</div>
            }
            else if (loading) {
              return <div>Loading</div>
            }
            else {
              if (data && data.getBoats) {
                const boats = data.getBoats;
                let renderData = boats.filter(boat => boat.active);

                console.log({boats})
                if (boatLengthFrom !== NaN) {
                  renderData = renderData.filter(boat => boat.length === boatLengthFrom)
                }

                if (boatYearFrom !== NaN) {
                  renderData = renderData.filter(boat => boat.year === boatYearFrom)
                }

                renderData = data.getBoats.map(boat => {
                    const cardText = { ...boat };

                    delete cardText.imageUrl;

                    return <Card
                      key={boat.id}
                      imageUrl={boat.imageUrl}
                      text={cardText}
                    />
                  });
                
                if(isGallery)
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
          }
          }
      </Query>
    </div>
  </ApolloProvider>
}
