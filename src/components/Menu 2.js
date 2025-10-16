import React, { useEffect } from 'react';

const Menu = () => {
  const menuData = {
    savoryBourekas: [
      {
        name: "Feta + Ricotta",
        description: "A delicious mix of creamy ricotta and savory feta, lightly seasoned, baked in golden, crunchy pastry and topped with toasted sesame seeds",
        servedWith: "",
        sauceOptions: "Tahini, Garlic aioli",
        tagline: "Flaky, savory, filling. The classic done right.",
        price: "15.95"
      },
      {
        name: "Mashed Potatoes + Caramelized Onions",
        description: "Creamy mashed potato mixed with golden sautéed onions and a dash of black pepper, sealed in crisp pastry and topped with nigella seeds.",
        servedWith: "",
        sauceOptions: "Tahini, Garlic aioli",
        tagline: "Soft inside, bold outside.",
        price: "15.95"
      },
      {
        name: "Roasted Eggplant + Za'atar and Tahini",
        description: "Roasted eggplant mashed with tahini, lemon, and garlic, spiced with za'atar and chili flakes. Topped with za'atar spices and a drizzle of tahini.",
        servedWith: "",
        sauceOptions: "Tahini, Garlic aioli",
        tagline: "Smoky, tangy, herby — loaded with flavor.",
        price: "16.95"
      }
    ],
    sweetBourekas: [
      {
        name: "Baklava",
        description: "A sweet blend of toasted nuts, honey, cinnamon, and a touch of orange zest. Topped with honey, crushed pistachios, and a side of rose water",
        servedWith: "",
        sauceOptions: "Rose water",
        tagline: "Sweet and crunchy — like baklava in a bourekas suit.",
        price: "13.95"
      },
      {
        name: "Nutella",
        description: "Warm, creamy Nutella packed into flaky pastry. Topped with a decadent chocolate sauce and hazelnut. Served with a side of whipped cream.",
        servedWith: "",
        sauceOptions: "Chocolate or vanilla",
        tagline: "Nutty and rich — a flavor we all know and love, delivered in a new way.",
        price: "12.95"
      },
      {
        name: "More flavors in the works",
        description: "We're constantly experimenting with new flavors and combinations. Stay tuned for exciting additions to our menu!",
        servedWith: "",
        sauceOptions: "",
        tagline: "",
        price: null
      }
    ],
    savoryComplements: [
      { name: "Green Schug", description: "A bright cilantro–jalapeño Yemeni sauce layered with garlic, lemon, and warm spices. Fresh herbs keep it vibrant, while jalapeños bring a clean, fiery heat", price: "0.95" },
      { name: "Resek Agvaniyot", description: "Freshly grated tomato, juicy and pulpy.\nPairs best with: Cheese boureka", price: "0.95" },
      { name: "Tahini", description: "Creamy sesame paste, rich and nutty, with a lemony tang.\nPairs best with: Eggplant boureka", price: "0.95" }
    ],
    sweetComplements: [
      { name: "Rose Water Syrup", description: "Elegant and fragrant, with a subtle floral essence.\nPairs best with: Baklava boureka", price: "0.95" },
      { name: "Whipped Cream", description: "Light and airy, cooling, the perfect soft contrast to pastry.\nPairs best with: Nutella + hazelnut boureka", price: "0.95" }
    ],
    additionalSides: [
      { name: "Hard-Boiled Egg", description: "Gently steam-cooked and served as a classic side", price: "0.95" },
      { name: "Israeli salad", description: "Diced mix of juicy tomatoes, crisp cucumbers, sharp onions, and fresh parsley — tossed in lemon juice, olive oil, salt, and pepper.", price: "1.95" },
      { name: "Pickles & Olives", description: "Mix of briny olives and traditional Israeli-style pickles.", price: "1.95" }
    ],
    specialtyDrinks: [
      { name: "Limonana", description: "Frozen lemon–mint slush with a bold citrus kick and a cool, herbal finish. Sweet, sour, and wildly refreshing", price: "6.95" }
    ],
    regularDrinks: [
      { 
        name: "Espresso", 
        options: [
          { name: "Single", price: "2.95" },
          { name: "Double", price: "3.95" }
        ]
      },
      { 
        name: "Latte", 
        options: [
          { name: "Whole Milk", price: "5.95" },
          { name: "Skim Milk", price: "5.95" },
          { name: "Almond Milk", price: "6.95" }
        ]
      },
      { name: "Green Tea", price: "1.95" },
      { name: "Raspberry Iced Tea", price: "3.95" },
      { name: "Coca Cola", price: "1.95" },
      { name: "Sprite", price: "1.95" },
      { name: "Fiji Water", price: "2.95" },
      { name: "Sparkling Water", price: "2.95" }
    ]
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
                {item.price && <span className="menu-item-price">${item.price}</span>}
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
        <div className="bourekas-section">
          <div className="boureka-column">
            <h3 className="boureka-category-title">Savory Bourekas</h3>
            <div className="menu-items">
              {menuData?.savoryBourekas && menuData.savoryBourekas.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="menu-item-header">
                    <h4>{item.name || 'Unnamed Item'}</h4>
                    {item.price && <span className="menu-item-price">${item.price}</span>}
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
                    <h4>{item.name || 'Unnamed Item'}</h4>
                    {item.price && <span className="menu-item-price">${item.price}</span>}
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
                    <h4>{item?.name || 'Unnamed Item'}</h4>
                    {item?.price && <span className="menu-item-price">${item.price}</span>}
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
                    <h4>{item?.name || 'Unnamed Item'}</h4>
                    {item?.price && <span className="menu-item-price">${item.price}</span>}
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
                    <h4>{side.name}</h4>
                    {side.price && <span className="menu-item-price">${side.price}</span>}
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
                    <h5>{drink.name}</h5>
                    {drink.price && <span className="menu-item-price">${drink.price}</span>}
                  </div>
                  {drink.description && <p className="coming-soon-text">{drink.description}</p>}
                </div>
              ))}
              {menuData.regularDrinks && menuData.regularDrinks.map((drink, index) => (
                <div key={`regular-${index}`} className="drink-item">
                  <div className="menu-item-header">
                    <h5>{drink.name}</h5>
                    {drink.price && <span className="menu-item-price">${drink.price}</span>}
                  </div>
                  {drink.options && (
                    <div className="drink-options">
                      {drink.options.map((option, optIndex) => (
                        <div key={optIndex} className="drink-option-item">
                          <span className="drink-option coming-soon-text">{typeof option === 'string' ? option : option.name}</span>
                          {typeof option === 'object' && option.price && (
                            <span className="drink-option-price">${option.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
