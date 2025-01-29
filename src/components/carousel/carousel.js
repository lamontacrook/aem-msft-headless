import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../image';
import { mapJsonRichText } from '../../utils/renderRichText';
import { editorProps } from '../../utils/ue-definitions';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import LinkManager from '../../utils/link-manager';


import './carousel.css';

const Slides = ({ content, references }) => {
  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content?._variation}`,
    'data-aue-type': 'container',
    'data-aue-model': content?._model?._path,
    'data-aue-behavior': 'component',
    'data-aue-label': 'Slides'
  };
  let inFrame = false;
  if (window.location !== window.parent.location) {
    inFrame = true;
  }
  return (
    <div {...editorProps} className={inFrame ? ' iframe' : ''}>
      <Carousel showArrows={true} showThumbs={true} showIndicators={true}>

        {content.cards && content.cards.map((card, i) => (
          <div key={i} className='slide' data-aue-type='reference' data-aue-model={card?._model?._path} data-aue-behavior='component' data-aue-resource={`urn:aemconnection:${card._path}/jcr:content/data/${card?._variation}`} data-aue-label={card?.cardName}>
            <Image asset={card.backgroundAsset} alt='Banner Image' />
            <div className='carousel-teaser'>
              <div className='carousel-body'>
                <div className='content-layer'>
                  <span data-aue-prop='headline' data-aue-type='richtext' data-aue-label='Headline'>{mapJsonRichText(card.headline.json)}</span>
                  <span data-aue-prop='description' data-aue-type='richtext' data-aue-label='Description'></span>{mapJsonRichText(card.description.json)}
                </div>
                <div className='asset-layer'>
                  <Image asset={card.asset} alt='Banner Image' />
                </div>
              </div>
              {card.callToAction && (
                <LinkManager item={card} className='button'>{card.callToAction.screenTitle}</LinkManager>
              )}
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