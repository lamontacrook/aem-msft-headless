import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../image';
import { mapJsonRichText } from '../../utils/renderRichText';
import { editorProps } from '../../utils/ue-definitions';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader


import './carousel.css';

const Slides = ({ content, references }) => {
  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content?._variation}`,
    'data-aue-type': 'container',
    'data-aue-model': content?._model?._path,
    'data-aue-behavior': 'component',
    'data-aue-label': 'Slides'
  };
  return (
    <div {...editorProps}>
      <Carousel showArrows={true} showThumbs={true} showIndicators={true}>

        {content.cards && content.cards.map((card, i) => (
          <div key={i} className='slide' data-aue-type='reference' data-aue-model={card?._model?._path} data-aue-behavior='component' data-aue-resource={`urn:aemconnection:${card._path}/jcr:content/data/${card?._variation}`} data-aue-label={card?.cardName}>
            <Image asset={card.backgroundAsset} alt='Banner Image' />
            <div className='carousel-teaser'>
              <div className='content-layer'>
                {mapJsonRichText(card.headline.json)}
                {mapJsonRichText(card.description.json)}
              </div>
              <div className='asset-layer'>
                <Image asset={card.asset} alt='Banner Image' />
              </div>
            </div>

          </div>
        )

        )}
      </Carousel>
    </div>
  );
};

Slides.propTypes = {
  content: Proptypes.object,
  references: Proptypes.oneOfType([Proptypes.object, Proptypes.array])
};

export default Slides;