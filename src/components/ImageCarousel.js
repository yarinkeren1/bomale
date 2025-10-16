import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [imageLoadStates, setImageLoadStates] = useState({});
  
  // Image data - staggered by type to avoid grouping
  // Each image can have custom width/height to override defaults
  const images = [
    {
      src: '/images/food/baklava-boureka-birdseye-closeup.JPG',
      alt: 'Golden baklava boureka with flaky pastry and syrup',
      title: 'Baklava Boureka',
      customWidth: null,
      customHeight: null
    },
    {
      src: '/images/food/cheese-boureka-birdseye-closeup-1.JPG',
      alt: 'Golden cheese boureka with sesame seeds',
      title: 'Cheese Boureka',
      customWidth: null,
      customHeight: null
    },
    {
      src: '/images/food/potato-boureka-birdseye.JPG',
      alt: 'Golden potato boureka with flaky pastry',
      title: 'Potato Boureka',
      customWidth: null,
      customHeight: null
    },
    {
      src: '/images/food/nutella-boureka-birdseye-closeup.JPG',
      alt: 'Nutella boureka with chocolate filling',
      title: 'Nutella Boureka',
      customWidth: null,
      customHeight: null
    },
    {
      src: '/images/food/eggplant-boureka-1-birdseye.JPG',
      alt: 'Eggplant boureka with savory filling',
      title: 'Eggplant Boureka',
      customWidth: null,
      customHeight: null
    },
    {
      src: '/images/food/cheese-boureka-regular-1.JPG',
      alt: 'Cheese boureka with golden crust',
      title: 'Cheese Boureka Classic',
      customWidth: null,
      customHeight: null
    },
    {
      src: '/images/food/baklava-boureka-split-birdseye.JPG',
      alt: 'Split baklava boureka showing layers',
      title: 'Baklava Layers',
      customWidth: null,
      customHeight: null
    },
    {
      src: '/images/food/nutella-boureka-split-birdseye.JPG',
      alt: 'Split nutella boureka showing chocolate filling',
      title: 'Nutella Layers',
      customWidth: null,
      customHeight: null
    },
    {
      src: '/images/food/cheese-boureka-split-birdseye-1.JPG',
      alt: 'Split cheese boureka showing cheesy layers',
      title: 'Cheese Layers',
      customWidth: null,
      customHeight: null
    }
  ];

  // Safety check
  if (!images || images.length === 0) {
    return (
      <div className="carousel-error-fallback">
        <p>No images available</p>
      </div>
    );
  }

  // Duplicate once so first half == second half; enables seamless -50% scroll
  const repeatedImages = [...images, ...images];

  // Initialize image load states
  useEffect(() => {
    const initialStates = {};
    repeatedImages.forEach((_, index) => {
      initialStates[index] = 'loading';
    });
    setImageLoadStates(initialStates);
  }, []);

  // Error handler for images
  const handleImageError = (e, index) => {
    try {
      console.warn(`Image failed to load: ${e.target.src}`);
      setImageLoadStates(prev => ({
        ...prev,
        [index]: 'error'
      }));
    } catch (error) {
      console.error('Error handling image load failure:', error);
    }
  };

  // Error handler for image load
  const handleImageLoad = (e, index) => {
    try {
      setImageLoadStates(prev => ({
        ...prev,
        [index]: 'loaded'
      }));
    } catch (error) {
      console.error('Error handling image load success:', error);
    }
  };

  try {
    return (
      <div className="image-carousel">
        <div className="carousel-container">
          <div className="carousel-track">
            {repeatedImages.map((image, index) => {
              const loadState = imageLoadStates[index];
              const showPlaceholder = loadState === 'error' || loadState === undefined;
              const isBourekas = /bourekas/i.test(image.title) || /bourekas/i.test(image.alt) || /bourekas/i.test(image.src);
              const isPistachioBaklava = /baklava-2\.JPG$/i.test(image.src);
              
              // Build custom style object for this image
              const customStyle = {};
              if (image.customWidth !== null) {
                customStyle.width = `${image.customWidth}px`;
              }
              if (image.customHeight !== null) {
                customStyle.height = `${image.customHeight}px`;
              }
              
              return (
                <div key={`${image.src}-${index}`} className="carousel-slide">
                  {!showPlaceholder && (
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={5568}
                      height={3712}
                      className={`carousel-image ${isBourekas ? 'bourekas' : ''} ${isPistachioBaklava ? 'pistachio-baklava-cover' : ''}`}
                      style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
                      onError={(e) => handleImageError(e, index)}
                      onLoad={(e) => handleImageLoad(e, index)}
                      loading="lazy"
                    />
                  )}
                  {showPlaceholder && (
                    <div className="carousel-image-placeholder">
                      <div className="placeholder-content">
                        <h3>{image.title}</h3>
                        <p>{loadState === 'error' ? 'Image unavailable' : 'Image loading...'}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering ImageCarousel:', error);
    return (
      <div className="carousel-error-fallback">
        <p>Error loading carousel</p>
      </div>
    );
  }
};

export default ImageCarousel;
