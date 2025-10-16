import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

const ImageCarousel = React.memo(() => {
  const [imageLoadStates, setImageLoadStates] = useState({});
  const isInitialized = useRef(false);
  
  // Image data - ALL food images for comprehensive carousel
  // Each image can have custom width/height to override defaults
  const originalImages = [
    // Baklava Bourekas
    { src: '/images/food/baklava-boureka-birdseye-closeup.JPG', alt: 'Baklava Boureka Closeup', title: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-birdseye.JPG', alt: 'Baklava Boureka Birdseye', title: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-closeup-1.JPG', alt: 'Baklava Boureka Closeup', title: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-closeup-2.JPG', alt: 'Baklava Boureka Closeup', title: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-regular-1.JPG', alt: 'Baklava Boureka Regular', title: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-regular.JPG', alt: 'Baklava Boureka Regular', title: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-split-1.JPG', alt: 'Baklava Boureka Split', title: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-split-2.JPG', alt: 'Baklava Boureka Split', title: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-split-3.JPG', alt: 'Baklava Boureka Split', title: 'Baklava Boureka' },
    { src: '/images/food/baklava-boureka-split-birdseye.JPG', alt: 'Baklava Boureka Split Layers', title: 'Baklava Boureka' },
    
    // Cheese Bourekas
    { src: '/images/food/cheese-boureka-birdseye-closeup-1.JPG', alt: 'Cheese Boureka Closeup', title: 'Cheese Boureka' },
    { src: '/images/food/cheese-boureka-birdseye.JPG', alt: 'Cheese Boureka Birdseye', title: 'Cheese Boureka' },
    { src: '/images/food/cheese-boureka-regular-1.JPG', alt: 'Cheese Boureka Regular', title: 'Cheese Boureka' },
    { src: '/images/food/cheese-boureka-regular-2.JPG', alt: 'Cheese Boureka Regular', title: 'Cheese Boureka' },
    { src: '/images/food/cheese-boureka-split-1.JPG', alt: 'Cheese Boureka Split', title: 'Cheese Boureka' },
    { src: '/images/food/cheese-boureka-split-2.JPG', alt: 'Cheese Boureka Split', title: 'Cheese Boureka' },
    { src: '/images/food/cheese-boureka-split-birdseye-1.JPG', alt: 'Cheese Boureka Split Layers', title: 'Cheese Boureka' },
    
    // Potato Bourekas
    { src: '/images/food/potato-boureka-birdseye.JPG', alt: 'Potato Boureka Birdseye', title: 'Potato Boureka' },
    { src: '/images/food/potato-boureka-regular-1.JPG', alt: 'Potato Boureka Regular', title: 'Potato Boureka' },
    { src: '/images/food/potato-boureka-regular-2.JPG', alt: 'Potato Boureka Regular', title: 'Potato Boureka' },
    
    // Eggplant Bourekas
    { src: '/images/food/eggplant-boureka-1-birdseye.JPG', alt: 'Eggplant Boureka Birdseye', title: 'Eggplant Boureka' },
    { src: '/images/food/eggplant-boureka-regular-1.JPG', alt: 'Eggplant Boureka Regular', title: 'Eggplant Boureka' },
    { src: '/images/food/eggplant-boureka-regular-2.JPG', alt: 'Eggplant Boureka Regular', title: 'Eggplant Boureka' },
    { src: '/images/food/eggplant-boureka-split.JPG', alt: 'Eggplant Boureka Split', title: 'Eggplant Boureka' },
    
    // Nutella/Chocolate Bourekas
    { src: '/images/food/nutella-boureka-birdseye-closeup.JPG', alt: 'Nutella Boureka Closeup', title: 'Nutella Boureka' },
    { src: '/images/food/nutella-boureka-birdseye.JPG', alt: 'Nutella Boureka Birdseye', title: 'Nutella Boureka' },
    { src: '/images/food/nutella-boureka-closeup-1.JPG', alt: 'Nutella Boureka Closeup', title: 'Nutella Boureka' },
    { src: '/images/food/nutella-boureka-closeup-2.JPG', alt: 'Nutella Boureka Closeup', title: 'Nutella Boureka' },
    { src: '/images/food/nutella-boureka-regular-1.JPG', alt: 'Nutella Boureka Regular', title: 'Nutella Boureka' },
    { src: '/images/food/nutella-boureka-split-1.JPG', alt: 'Nutella Boureka Split', title: 'Nutella Boureka' },
    { src: '/images/food/nutella-boureka-split-birdseye.JPG', alt: 'Nutella Boureka Split Layers', title: 'Nutella Boureka' },
    { src: '/images/food/nutella-boureka-split-whippedcream-birdseye.JPG', alt: 'Nutella Boureka with Whipped Cream', title: 'Nutella Boureka' },
    
    // Packaging
    { src: '/images/food/cheese-boureka-packaging-birdseye.JPG', alt: 'Cheese Boureka Packaging', title: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-closeup-1.JPG', alt: 'Cheese Boureka Packaging Closeup', title: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-closeup-2.JPG', alt: 'Cheese Boureka Packaging Closeup', title: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-closeup-3.JPG', alt: 'Cheese Boureka Packaging Closeup', title: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-regular.JPG', alt: 'Cheese Boureka Packaging Regular', title: 'Packaging' },
    { src: '/images/food/eggplant-boureka-packaging-birdseye.JPG', alt: 'Eggplant Boureka Packaging', title: 'Packaging' },
    { src: '/images/food/eggplant-boureka-packaging-closeup.JPG', alt: 'Eggplant Boureka Packaging Closeup', title: 'Packaging' },
    { src: '/images/food/eggplant-boureka-pacakging-1.JPG', alt: 'Eggplant Boureka Packaging', title: 'Packaging' },
    { src: '/images/food/potato-boureka-packaging-birdseye.JPG', alt: 'Potato Boureka Packaging', title: 'Packaging' },
    { src: '/images/food/potato-boureka-packaging-regular.JPG', alt: 'Potato Boureka Packaging Regular', title: 'Packaging' },
    
    // Sides & Complements
    { src: '/images/food/israeli-salad.JPG', alt: 'Israeli Salad', title: 'Israeli Salad' },
    { src: '/images/food/pickles&olives.JPG', alt: 'Pickles & Olives', title: 'Pickles & Olives' },
    { src: '/images/food/resek.JPG', alt: 'Resek', title: 'Resek' },
    { src: '/images/food/schug.JPG', alt: 'Schug', title: 'Schug' },
    { src: '/images/food/tchina.JPG', alt: 'Tchina', title: 'Tchina' },
    { src: '/images/food/whipped-cream.JPG', alt: 'Whipped Cream', title: 'Whipped Cream' },
    { src: '/images/food/egg.JPG', alt: 'Egg', title: 'Egg' }
  ];

  // Shuffle function to randomize image order
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Use shuffled images for scattered arrangement - memoized to prevent reshuffling on every render
  const images = useMemo(() => shuffleArray(originalImages), []);

  // Duplicate once so first half == second half; enables seamless -50% scroll - also memoized
  const repeatedImages = useMemo(() => [...images, ...images], [images]);

  // Safety check
  if (!images || images.length === 0) {
    return (
      <div className="carousel-error-fallback">
        <p>No images available</p>
      </div>
    );
  }

  // Initialize image load states only once
  useEffect(() => {
    if (!isInitialized.current) {
      const initialStates = {};
      repeatedImages.forEach((_, index) => {
        initialStates[index] = 'loading';
      });
      setImageLoadStates(initialStates);
      isInitialized.current = true;
    }
  }, [repeatedImages]);

  // Error handler for images - memoized to prevent unnecessary re-renders
  const handleImageError = useCallback((e, index) => {
    try {
      console.warn(`Image failed to load: ${e.target.src}`);
      setImageLoadStates(prev => ({
        ...prev,
        [index]: 'error'
      }));
    } catch (error) {
      console.error('Error handling image load failure:', error);
    }
  }, []);

  // Error handler for image load - memoized to prevent unnecessary re-renders
  const handleImageLoad = useCallback((e, index) => {
    try {
      setImageLoadStates(prev => ({
        ...prev,
        [index]: 'loaded'
      }));
    } catch (error) {
      console.error('Error handling image load success:', error);
    }
  }, []);

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
});

export default ImageCarousel;
