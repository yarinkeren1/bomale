import React, { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    // Baklava Bourekas
    { src: '/images/food/baklava-boureka-birdseye-closeup.JPG', alt: 'Baklava Boureka Closeup', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-birdseye.JPG', alt: 'Baklava Boureka Birdseye', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-closeup-1.JPG', alt: 'Baklava Boureka Closeup', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-closeup-2.JPG', alt: 'Baklava Boureka Closeup', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-regular-1.JPG', alt: 'Baklava Boureka Regular', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-regular.JPG', alt: 'Baklava Boureka Regular', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-split-1.JPG', alt: 'Baklava Boureka Split', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-split-2.JPG', alt: 'Baklava Boureka Split', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-split-3.JPG', alt: 'Baklava Boureka Split', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-split-birdseye.JPG', alt: 'Baklava Boureka Split Layers', category: 'Baklava' },
    
    // Cheese Bourekas
    { src: '/images/food/cheese-boureka-birdseye-closeup-1.JPG', alt: 'Cheese Boureka Closeup', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-birdseye.JPG', alt: 'Cheese Boureka Birdseye', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-regular-1.JPG', alt: 'Cheese Boureka Regular', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-regular-2.JPG', alt: 'Cheese Boureka Regular', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-split-1.JPG', alt: 'Cheese Boureka Split', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-split-2.JPG', alt: 'Cheese Boureka Split', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-split-birdseye-1.JPG', alt: 'Cheese Boureka Split Layers', category: 'Cheese' },
    
    // Potato Bourekas
    { src: '/images/food/potato-boureka-birdseye.JPG', alt: 'Potato Boureka Birdseye', category: 'Potato' },
    { src: '/images/food/potato-boureka-regular-1.JPG', alt: 'Potato Boureka Regular', category: 'Potato' },
    { src: '/images/food/potato-boureka-regular-2.JPG', alt: 'Potato Boureka Regular', category: 'Potato' },
    
    // Eggplant Bourekas
    { src: '/images/food/eggplant-boureka-1-birdseye.JPG', alt: 'Eggplant Boureka Birdseye', category: 'Eggplant' },
    { src: '/images/food/eggplant-boureka-regular-1.JPG', alt: 'Eggplant Boureka Regular', category: 'Eggplant' },
    { src: '/images/food/eggplant-boureka-regular-2.JPG', alt: 'Eggplant Boureka Regular', category: 'Eggplant' },
    { src: '/images/food/eggplant-boureka-split.JPG', alt: 'Eggplant Boureka Split', category: 'Eggplant' },
    
    // Nutella/Chocolate Bourekas
    { src: '/images/food/nutella-boureka-birdseye-closeup.JPG', alt: 'Nutella Boureka Closeup', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-birdseye.JPG', alt: 'Nutella Boureka Birdseye', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-closeup-1.JPG', alt: 'Nutella Boureka Closeup', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-closeup-2.JPG', alt: 'Nutella Boureka Closeup', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-regular-1.JPG', alt: 'Nutella Boureka Regular', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-split-1.JPG', alt: 'Nutella Boureka Split', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-split-birdseye.JPG', alt: 'Nutella Boureka Split Layers', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-split-whippedcream-birdseye.JPG', alt: 'Nutella Boureka with Whipped Cream', category: 'Chocolate' },
    
    // Packaging
    { src: '/images/food/cheese-boureka-packaging-birdseye.JPG', alt: 'Cheese Boureka Packaging', category: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-closeup-1.JPG', alt: 'Cheese Boureka Packaging Closeup', category: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-closeup-2.JPG', alt: 'Cheese Boureka Packaging Closeup', category: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-closeup-3.JPG', alt: 'Cheese Boureka Packaging Closeup', category: 'Packaging' },
    { src: '/images/food/cheese-boureka-packaging-regular.JPG', alt: 'Cheese Boureka Packaging Regular', category: 'Packaging' },
    { src: '/images/food/eggplant-boureka-packaging-birdseye.JPG', alt: 'Eggplant Boureka Packaging', category: 'Packaging' },
    { src: '/images/food/eggplant-boureka-packaging-closeup.JPG', alt: 'Eggplant Boureka Packaging Closeup', category: 'Packaging' },
    { src: '/images/food/eggplant-boureka-pacakging-1.JPG', alt: 'Eggplant Boureka Packaging', category: 'Packaging' },
    { src: '/images/food/potato-boureka-packaging-birdseye.JPG', alt: 'Potato Boureka Packaging', category: 'Packaging' },
    { src: '/images/food/potato-boureka-packaging-regular.JPG', alt: 'Potato Boureka Packaging Regular', category: 'Packaging' },
    
    // Sides & Complements
    { src: '/images/food/israeli-salad.JPG', alt: 'Israeli Salad', category: 'Sides' },
    { src: '/images/food/pickles&olives.JPG', alt: 'Pickles & Olives', category: 'Sides' },
    { src: '/images/food/resek.JPG', alt: 'Resek', category: 'Sides' },
    { src: '/images/food/schug.JPG', alt: 'Schug', category: 'Sides' },
    { src: '/images/food/tchina.JPG', alt: 'Tchina', category: 'Sides' },
    { src: '/images/food/whipped-cream.JPG', alt: 'Whipped Cream', category: 'Sides' },
    { src: '/images/food/egg.JPG', alt: 'Egg', category: 'Sides' }
  ];

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage]);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2>Gallery</h2>
        <p className="gallery-subtitle">Explore our delicious bourekas and fresh sides</p>
        
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => openLightbox(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span className="gallery-category">{image.category}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>×</button>
              <img src={selectedImage.src} alt={selectedImage.alt} />
              <p className="lightbox-caption">{selectedImage.alt}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

