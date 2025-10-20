import React, { useEffect, useState } from 'react';

const Menu = () => {
  const menuData = {
    savoryBourekas: [
      {
        name: "Double Dairy",
        description: "A delicious mix of creamy ricotta and savory feta, lightly seasoned, baked in golden, crunchy pastry and topped with toasted sesame seeds",
        servedWith: "",
        sauceOptions: "Tahini, Garlic aioli",
        tagline: "Flaky, savory, filling. The classic done right.",
        price: "15.95",
        icons: ["sesame"]
      },
      {
        name: "Golden Mash",
        description: "Creamy mashed potato mixed with golden sautéed onions and a dash of black pepper, sealed in crisp pastry and topped with nigella seeds.",
        servedWith: "",
        sauceOptions: "Tahini, Garlic aioli",
        tagline: "Soft inside, bold outside.",
        price: "15.95",
        icons: ["sesame"]
      },
      {
        name: "Roasted Za'atar",
        description: "Roasted eggplant mashed with tahini, lemon, and garlic, spiced with za'atar and chili flakes. Topped with za'atar spices and a drizzle of tahini.",
        servedWith: "",
        sauceOptions: "Tahini, Garlic aioli",
        tagline: "Smoky, tangy, herby — loaded with flavor.",
        price: "16.95",
        icons: ["sesame"]
      }
    ],
    sweetBourekas: [
      {
        name: "Baklava Boureka",
        description: "A sweet blend of toasted nuts, honey, cinnamon, and a touch of orange zest. Topped with honey, crushed pistachios, and a side of rose water",
        servedWith: "",
        sauceOptions: "Rose water",
        tagline: "Sweet and crunchy — like baklava in a bourekas suit.",
        price: "13.95",
        icons: ["nuts"]
      },
      {
        name: "Chocolate Crunch",
        description: "Warm, creamy Nutella packed into flaky pastry. Topped with a decadent chocolate sauce and powdered sugar. Served with a side of whipped cream.",
        servedWith: "",
        sauceOptions: "Chocolate or vanilla",
        tagline: "Nutty and rich — a flavor we all know and love, delivered in a new way.",
        price: "12.95",
        icons: ["nuts"]
      },
      {
        name: "More flavors in the works",
        description: "We're constantly experimenting with new flavors and combinations. Stay tuned for exciting additions to our menu!",
        servedWith: "",
        sauceOptions: "",
        tagline: "",
        price: null,
        icons: []
      }
    ],
    savoryComplements: [
      { name: "Green Schug", description: "A bright cilantro–jalapeño Yemeni sauce layered with garlic, lemon, and warm spices. Fresh herbs keep it vibrant, while jalapeños bring a clean, fiery heat", price: "0.95", icons: ["spicy"] },
      { name: "Resek Agvaniyot", description: "Freshly grated tomato, juicy and pulpy.", price: "0.95", icons: [] },
      { name: "Tahini", description: "Creamy sesame paste, rich and nutty, with a lemony tang.", price: "0.95", icons: ["sesame"] }
    ],
    sweetComplements: [
      { name: "Rose Water", description: "Elegant and fragrant, with a subtle floral essence.", price: "0.95", icons: [] },
      { name: "Whipped Cream", description: "Light and airy, cooling, the perfect soft contrast to pastry.", price: "0.95", icons: ["dairy"] }
    ],
    additionalSides: [
      { name: "Hard-Boiled Egg", description: "Gently steam-cooked and served as a classic side", price: "0.95", icons: ["egg"] },
      { name: "Israeli salad", description: "Diced mix of juicy tomatoes, crisp cucumbers, sharp onions, and fresh parsley — tossed in lemon juice, olive oil, salt, and pepper.", price: "1.95", icons: [] },
      { name: "Pickles & Olives", description: "Mix of briny olives and traditional Israeli-style pickles.", price: "1.95", icons: [] }
    ],
    specialtyDrinks: [
      { name: "Limonana", description: "Frozen lemon–mint slush with a bold citrus kick and a cool, herbal finish. Sweet, sour, and wildly refreshing", price: "6.95", icons: [] }
    ],
    regularDrinks: [
      { 
        name: "Espresso", 
        icons: [],
        options: [
          { name: "Single", price: "2.95", icons: [] },
          { name: "Double", price: "3.95", icons: [] }
        ]
      },
      { 
        name: "Latte", 
        icons: [],
        options: [
          { name: "Whole Milk", price: "5.95", icons: ["dairy"] },
          { name: "Skim Milk", price: "5.95", icons: ["dairy"] },
          { name: "Almond Milk", price: "6.95", icons: ["nuts"] }
        ]
      },
      { name: "Green Tea", price: "1.95", icons: [] },
      { name: "Raspberry Iced Tea", price: "3.95", icons: [] },
      { name: "Coca Cola", price: "1.95", icons: [] },
      { name: "Sprite", price: "1.95", icons: [] },
      { name: "Fiji Water", price: "2.95", icons: [] },
      { name: "Sparkling Water", price: "2.95", icons: [] }
    ]
  };

  // Image data from Reviews component
  const images = [
    // Baklava Bourekas
    { src: '/images/food/baklava-boureka-split-1.JPG', alt: 'Baklava Boureka Split', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-birdseye-closeup.JPG', alt: 'Baklava Boureka Closeup', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-birdseye.JPG', alt: 'Baklava Boureka Birdseye', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-closeup-1.JPG', alt: 'Baklava Boureka Closeup', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-closeup-2.JPG', alt: 'Baklava Boureka Closeup', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-regular-1.JPG', alt: 'Baklava Boureka Regular', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-regular.JPG', alt: 'Baklava Boureka Regular', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-split-2.JPG', alt: 'Baklava Boureka Split', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-split-3.JPG', alt: 'Baklava Boureka Split', category: 'Baklava' },
    { src: '/images/food/baklava-boureka-split-birdseye.JPG', alt: 'Baklava Boureka Split Layers', category: 'Baklava' },
    
    // Cheese Bourekas
    { src: '/images/food/cheese-boureka-packaging-birdseye.JPG', alt: 'Feta + Cheese Boureka Packaging', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-birdseye-closeup-1.JPG', alt: 'Cheese Boureka Closeup', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-birdseye.JPG', alt: 'Cheese Boureka Birdseye', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-regular-1.JPG', alt: 'Cheese Boureka Regular', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-regular-2.JPG', alt: 'Cheese Boureka Regular', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-split-1.JPG', alt: 'Cheese Boureka Split', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-split-2.JPG', alt: 'Cheese Boureka Split', category: 'Cheese' },
    { src: '/images/food/cheese-boureka-split-birdseye-1.JPG', alt: 'Cheese Boureka Split Layers', category: 'Cheese' },
    
    // Potato Bourekas
    { src: '/images/food/potato-boureka-packaging-birdseye.JPG', alt: 'Potato Boureka Packaging', category: 'Potato' },
    { src: '/images/food/potato-boureka-birdseye.JPG', alt: 'Potato Boureka Birdseye', category: 'Potato' },
    { src: '/images/food/potato-boureka-regular-1.JPG', alt: 'Potato Boureka Regular', category: 'Potato' },
    { src: '/images/food/potato-boureka-regular-2.JPG', alt: 'Potato Boureka Regular', category: 'Potato' },
    
    // Eggplant Bourekas
    { src: '/images/food/eggplant-boureka-packaging-birdseye.JPG', alt: 'Eggplant Boureka Packaging', category: 'Eggplant' },
    { src: '/images/food/eggplant-boureka-1-birdseye.JPG', alt: 'Eggplant Boureka Birdseye', category: 'Eggplant' },
    { src: '/images/food/eggplant-boureka-regular-1.JPG', alt: 'Eggplant Boureka Regular', category: 'Eggplant' },
    { src: '/images/food/eggplant-boureka-regular-2.JPG', alt: 'Eggplant Boureka Regular', category: 'Eggplant' },
    { src: '/images/food/eggplant-boureka-split.JPG', alt: 'Eggplant Boureka Split', category: 'Eggplant' },
    
    // Nutella/Chocolate Bourekas
    { src: '/images/food/nutella-boureka-split-1.JPG', alt: 'Nutella Boureka Split', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-regular-1.JPG', alt: 'Nutella Boureka Regular', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-birdseye.JPG', alt: 'Nutella Boureka Birdseye', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-birdseye-closeup.JPG', alt: 'Nutella Boureka Closeup', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-closeup-1.JPG', alt: 'Nutella Boureka Closeup', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-closeup-2.JPG', alt: 'Nutella Boureka Closeup', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-split-birdseye.JPG', alt: 'Nutella Boureka Split Layers', category: 'Chocolate' },
    { src: '/images/food/nutella-boureka-split-whippedcream-birdseye.JPG', alt: 'Nutella Boureka with Whipped Cream', category: 'Chocolate' },
    
    // Sides & Complements
    { src: '/images/food/israeli-salad.JPG', alt: 'Israeli Salad', category: 'Sides' },
    { src: '/images/food/pickles&olives.JPG', alt: 'Pickles & Olives', category: 'Sides' },
    { src: '/images/food/resek.JPG', alt: 'Resek', category: 'Sides' },
    { src: '/images/food/schug.JPG', alt: 'Schug', category: 'Sides' },
    { src: '/images/food/tchina.JPG', alt: 'Tchina', category: 'Sides' },
    { src: '/images/food/whipped-cream.JPG', alt: 'Whipped Cream', category: 'Sides' },
    { src: '/images/food/egg.JPG', alt: 'Egg', category: 'Sides' }
  ];

  // State for lightbox
  const [selectedImage, setSelectedImage] = useState(null);

  // Icon mapping for dietary/allergen information using actual image files
  const getIcon = (iconType) => {
    const iconMap = {
      dairy: "/images/allergens/dairy.png",
      nuts: "/images/allergens/nuts.png", 
      sesame: "/images/allergens/sesame.png",
      gluten: "/images/allergens/gluten.png",
      egg: "/images/allergens/eggs.png",
      spicy: "/images/allergens/spicy.png"
    };
    return iconMap[iconType] || "";
  };

  // Render icons for a menu item
  const renderIcons = (icons) => {
    if (!icons || icons.length === 0) return null;
    return (
      <div className="menu-item-icons">
        {icons.map((icon, index) => (
          <span key={index} className="menu-icon" title={getIconTitle(icon)}>
            <img 
              src={getIcon(icon)} 
              alt={getIconTitle(icon)} 
              className="allergen-icon"
            />
          </span>
        ))}
      </div>
    );
  };

  // Get tooltip title for icons
  const getIconTitle = (iconType) => {
    const titleMap = {
      dairy: "Contains Dairy",
      nuts: "Contains Nuts",
      sesame: "Contains Sesame/Nigella", 
      gluten: "Contains Gluten",
      egg: "Contains Egg",
      spicy: "Spicy"
    };
    return titleMap[iconType] || "";
  };

  // Function to get menu item name from image filename
  const getMenuItemName = (imageSrc) => {
    const filename = imageSrc.split('/').pop().toLowerCase();
    
    if (filename.includes('cheese-boureka')) {
      return 'Feta + Ricotta';
    } else if (filename.includes('baklava-boureka')) {
      return 'Baklava';
    } else if (filename.includes('potato-boureka')) {
      return 'Mashed Potatoes + Caramelized Onions';
    } else if (filename.includes('eggplant-boureka')) {
      return 'Roasted Eggplant + Za\'atar and Tahini';
    } else if (filename.includes('nutella-boureka')) {
      return 'Nutella';
    } else if (filename.includes('egg')) {
      return 'Hard-Boiled Egg';
    } else if (filename.includes('israeli-salad')) {
      return 'Israeli salad';
    } else if (filename.includes('pickles') || filename.includes('olives')) {
      return 'Pickles & Olives';
    } else if (filename.includes('resek')) {
      return 'Resek Agvaniyot';
    } else if (filename.includes('schug')) {
      return 'Green Schug';
    } else if (filename.includes('tchina')) {
      return 'Tahini';
    } else if (filename.includes('whipped-cream')) {
      return 'Whipped Cream';
    }
    
    return 'Bourekas';
  };

  // Function to find images by menu item name (reverse mapping)
  const findImagesByMenuItemName = (menuItemName) => {
    return images.filter(image => getMenuItemName(image.src) === menuItemName);
  };

  // Function to open lightbox with first matching image
  const openImageForMenuItem = (menuItemName) => {
    const matchingImages = findImagesByMenuItemName(menuItemName);
    if (matchingImages.length > 0) {
      setSelectedImage(matchingImages[0]);
    }
  };

  // Lightbox functions
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const getCurrentImageIndex = () => {
    return images.findIndex(img => img.src === selectedImage.src);
  };

  const goToPreviousImage = () => {
    const currentIndex = getCurrentImageIndex();
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setSelectedImage(images[previousIndex]);
  };

  const goToNextImage = () => {
    const currentIndex = getCurrentImageIndex();
    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(images[nextIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (selectedImage) {
      if (e.key === 'ArrowLeft') {
        goToPreviousImage();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      }
    }
  };

  useEffect(() => {
    // Simplified animation setup without IntersectionObserver to prevent errors
    const timeoutId = setTimeout(() => {
      try {
        const menuItems = document.querySelectorAll('.menu-item, .complement-item, .side-item, .drink-item');
        menuItems.forEach(item => {
          if (item) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          }
        });
      } catch (error) {
        console.warn('Error setting up menu animations:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Keyboard event listener for lightbox
  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImage]);

  const MenuCategory = ({ title, items, isSimple = false }) => {
    if (!items || !Array.isArray(items)) {
      return null;
    }
    
    return (
      <div className="menu-category">
        <h3>{title}</h3>
        <div className="menu-items">
          {items.map((item, index) => (
            <div key={index} className="menu-item">
              <div className="menu-item-header">
                <h4>{item.name || 'Unnamed Item'}</h4>
              </div>
              {!isSimple && item.description && (
                <p className="menu-description coming-soon-text">{item.description}</p>
              )}
              {!isSimple && item.servedWith && (
                <p className="served-with coming-soon-text"><strong className="coming-soon-text">Served with:</strong> {item.servedWith}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="menu" className="menu">
      <div className="container">
        <h2>Menu</h2>
        <div className="menu-hint">pssst... click the menu items to see the food</div>
        <div className="bourekas-section">
          <div className="boureka-column">
            <h3 className="boureka-category-title">Savory Bourekas</h3>
            <div className="menu-items">
              {menuData?.savoryBourekas && menuData.savoryBourekas.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="menu-item-header">
                    <h4 
                      className="menu-item-name clickable"
                      onClick={() => openImageForMenuItem(item.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.name || 'Unnamed Item'}
                    </h4>
                    {renderIcons(item.icons)}
                  </div>
                  {item.description && (
                    <p className="menu-description coming-soon-text">{item.description}</p>
                  )}
                  {item.servedWith && (
                    <p className="served-with coming-soon-text"><strong className="coming-soon-text">Served with:</strong> {item.servedWith}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="boureka-column">
            <h3 className="boureka-category-title">Sweet Bourekas</h3>
            <div className="menu-items">
              {menuData?.sweetBourekas && menuData.sweetBourekas.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="menu-item-header">
                    <h4 
                      className="menu-item-name clickable"
                      onClick={() => openImageForMenuItem(item.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item.name || 'Unnamed Item'}
                    </h4>
                    {renderIcons(item.icons)}
                  </div>
                  {item.description && (
                    <p className="menu-description coming-soon-text">{item.description}</p>
                  )}
                  {item.servedWith && (
                    <p className="served-with coming-soon-text"><strong className="coming-soon-text">Served with:</strong> {item.servedWith}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="menu-note">
          <p>All savory bourekas are served with a hard-boiled egg, pickles & olives, resek agvaniyot, green schug and tahini.</p>
        </div>
        <div className="complements-sections">
          <div className="savory-complements">
            <h3>Savory Complements</h3>
            <div className="complements-list">
              {menuData?.savoryComplements && menuData.savoryComplements.length > 0 && menuData.savoryComplements.map((item, index) => (
                <div key={index} className="complement-item">
                  <div className="menu-item-header">
                    <h4 
                      className="menu-item-name clickable"
                      onClick={() => openImageForMenuItem(item.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item?.name || 'Unnamed Item'}
                    </h4>
                    {renderIcons(item.icons)}
                  </div>
                  {item?.description && <p className="coming-soon-text">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="sweet-complements">
            <h3>Sweet Complements</h3>
            <div className="complements-list">
              {menuData?.sweetComplements && menuData.sweetComplements.length > 0 && menuData.sweetComplements.map((item, index) => (
                <div key={index} className="complement-item">
                  <div className="menu-item-header">
                    <h4 
                      className="menu-item-name clickable"
                      onClick={() => openImageForMenuItem(item.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item?.name || 'Unnamed Item'}
                    </h4>
                    {renderIcons(item.icons)}
                  </div>
                  {item?.description && <p className="coming-soon-text">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="additional-sections">
          <div className="additional-sides">
            <h3>Sides</h3>
            <div className="sides-list">
              {menuData.additionalSides && menuData.additionalSides.map((side, index) => (
                <div key={index} className="side-item">
                  <div className="menu-item-header">
                    <h4 
                      className="menu-item-name clickable"
                      onClick={() => openImageForMenuItem(side.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {side.name}
                    </h4>
                    {renderIcons(side.icons)}
                  </div>
                  {side.description && <p className="coming-soon-text">{side.description}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="drinks-section">
            <h3>Drinks</h3>
            <div className="drinks-list">
              {menuData.specialtyDrinks && menuData.specialtyDrinks.map((drink, index) => (
                <div key={`specialty-${index}`} className="drink-item">
                  <div className="menu-item-header">
                    <h5 
                      className="menu-item-name clickable"
                      onClick={() => openImageForMenuItem(drink.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {drink.name}
                    </h5>
                    {renderIcons(drink.icons)}
                  </div>
                  {drink.description && <p className="coming-soon-text">{drink.description}</p>}
                </div>
              ))}
              {menuData.regularDrinks && menuData.regularDrinks.map((drink, index) => (
                <div key={`regular-${index}`} className="drink-item">
                  <div className="menu-item-header">
                    <h5 
                      className="menu-item-name clickable"
                      onClick={() => openImageForMenuItem(drink.name)}
                      style={{ cursor: 'pointer' }}
                    >
                      {drink.name}
                    </h5>
                    {renderIcons(drink.icons)}
                  </div>
                  {drink.options && (
                    <div className="drink-options">
                      {drink.options.map((option, optIndex) => (
                        <div key={optIndex} className="drink-option-item">
                          <div className="drink-option-header">
                            <span className="drink-option coming-soon-text">{typeof option === 'string' ? option : option.name}</span>
                            {typeof option === 'object' && option.icons && renderIcons(option.icons)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Allergen Disclaimer Section */}
          <div className="allergen-disclaimer">
            <h3 className="disclaimer-title">Allergen Info</h3>
            <div className="icon-legend">
              <div className="legend-items">
                <div className="legend-item">
                  <img src="/images/allergens/dairy.png" alt="Dairy" className="legend-icon" />
                  <span>= Contains Dairy</span>
                </div>
                <div className="legend-item">
                  <img src="/images/allergens/nuts.png" alt="Nuts" className="legend-icon" />
                  <span>= Contains Nuts</span>
                </div>
                <div className="legend-item">
                  <img src="/images/allergens/sesame.png" alt="Sesame" className="legend-icon" />
                  <span>= Contains Sesame/Nigella</span>
                </div>
                <div className="legend-item">
                  <img src="/images/allergens/gluten.png" alt="Gluten" className="legend-icon" />
                  <span>= Contains Gluten</span>
                </div>
                <div className="legend-item">
                  <img src="/images/allergens/eggs.png" alt="Eggs" className="legend-icon" />
                  <span>= Contains Egg</span>
                </div>
                <div className="legend-item">
                  <img src="/images/allergens/spicy.png" alt="Spicy" className="legend-icon" />
                  <span>= Spicy</span>
                </div>
              </div>
            </div>
            
            <div className="bourekas-allergen-info">
              <div className="bourekas-contains-line">
                <h4>All Bourekas Contain</h4>
                <div className="bourekas-icons">
                  <img src="/images/allergens/dairy.png" alt="Dairy" className="allergen-icon" />
                  <img src="/images/allergens/gluten.png" alt="Gluten" className="allergen-icon" />
                  <img src="/images/allergens/eggs.png" alt="Eggs" className="allergen-icon" />
                </div>
              </div>
            </div>
            
            <div className="allergy-notice">
              <p><strong>Please notify us of any food allergies before ordering.</strong> Our products may contain or come into contact with milk, eggs, wheat, nuts, and sesame.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-nav lightbox-prev" onClick={goToPreviousImage}>‹</button>
            <button className="lightbox-nav lightbox-next" onClick={goToNextImage}>›</button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="lightbox-menu-item">
              {getMenuItemName(selectedImage.src)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
