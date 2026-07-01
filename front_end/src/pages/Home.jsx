import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import heroImage from '../assets/dairy_hero_banner.png';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const saleProducts = [
    {
      id: 1,
      name: "Organic Whole Milk",
      description: "1L Glass Bottle - Pure pasture-raised creamtop milk.",
      originalPrice: "$5.49",
      salePrice: "$3.99",
      discount: "27% OFF",
      rating: 5,
      tag: "Best Seller",
      image: "🥛"
    },
    {
      id: 2,
      name: "Aged Grass-Fed Cheddar",
      description: "250g block - Sharp, rich flavor aged for 12 months.",
      originalPrice: "$8.99",
      salePrice: "$6.49",
      discount: "28% OFF",
      rating: 5,
      tag: "Limited Offer",
      image: "🧀"
    },
    {
      id: 3,
      name: "Golden Sweet Cream Butter",
      description: "200g tub - Churned from fresh organic sweet cream.",
      originalPrice: "$5.99",
      salePrice: "$4.29",
      discount: "28% OFF",
      rating: 4,
      tag: "Freshly Churned",
      image: "🧈"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="badge-promo">🥛 Freshness Guaranteed</div>
            <h1 className="hero-title">
              Pure Dairy Delights, <br />
              <span className="accent-text">Delivered Fresh</span> Daily.
            </h1>
            <p className="hero-subtitle">
              Savor the rich taste of 100% organic, grass-fed milk, artisan cheeses, and freshly churned butter, sourced directly from local ethical farms.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn-hero btn-hero-primary">
                Shop Our Sale <ArrowRight className="btn-icon" />
              </a>
              <a href="#about" className="btn-hero btn-hero-secondary">
                Learn Our Story
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="image-wrapper">
              <img src={heroImage} alt="Premium Dairy Products" className="hero-img" />
              <div className="glass-card floating-card-1">
                <div className="card-emoji">🐄</div>
                <div>
                  <h4>100% Organic</h4>
                  <p>Pure pasture-raised</p>
                </div>
              </div>
              <div className="glass-card floating-card-2">
                <div className="card-emoji">🚚</div>
                <div>
                  <h4>Fast Delivery</h4>
                  <p>Farm to table in 6 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust & Features Section */}
      <section id="about" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Why Dairy Hub?</span>
            <h2 className="section-title">Crafting Pure Goodness, Honoring Nature</h2>
            <p className="section-subtitle">
              We connect local dairy farmers directly with your household, removing middlemen to ensure the freshest quality and fair farm pricing.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck className="feature-icon" />
              </div>
              <h3>Microbiology Tested</h3>
              <p>Every batch undergoes strict quality checks to guarantee safety and pasteurization excellence before bottling.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Truck className="feature-icon" />
              </div>
              <h3>Cold-Chain Delivery</h3>
              <p>Refrigerated vans transport your products to maintain nutrient profiles and optimal chilling temperatures.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <RefreshCw className="feature-icon" />
              </div>
              <h3>Eco-Friendly Cycle</h3>
              <p>We deliver in reusable glass bottles and compostable boxes, helping reduce landfill waste by up to 80%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sale / Featured Products Section */}
      <section id="sales" className="sales-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag-sale">Special Promotions</span>
            <h2 className="section-title" id="products">Weekly Flash Sales</h2>
            <p className="section-subtitle">
              Don't miss out on these exclusive, limited-time discounts on our signature premium dairy items.
            </p>
          </div>

          <div className="products-grid">
            {saleProducts.map((product) => (
              <div key={product.id} className="product-card">
                <span className="product-tag">{product.tag}</span>
                <span className="product-discount">{product.discount}</span>
                <div className="product-image-placeholder">
                  <span className="dairy-emoji" role="img" aria-label={product.name}>
                    {product.image}
                  </span>
                </div>
                <div className="product-info">
                  <div className="product-stars">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="star-icon" />
                    ))}
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-pricing">
                    <span className="sale-price">{product.salePrice}</span>
                    <span className="original-price">{product.originalPrice}</span>
                  </div>
                  <button className="add-to-cart-btn">
                    <ShoppingBag className="btn-icon-sm" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-box">
            <h2 className="cta-title">Unlock 20% Off Your First Subscription</h2>
            <p className="cta-subtitle">
              Register an account today, customize your daily milk delivery schedule, and start your morning with pure, fresh farm goodness.
            </p>
            <div className="cta-buttons">
              <button onClick={() => navigate('/register')} className="btn-cta btn-cta-primary">
                Create Account
              </button>
              <button onClick={() => navigate('/login')} className="btn-cta btn-cta-secondary">
                Login Instead
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>Dairy<span className="logo-accent">Hub</span></span>
            </div>
            <p>Bringing premium, organic, locally-sourced dairy products directly to your doorstep with love and care.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Our Farms</a></li>
              <li><a href="#sales">Current Offers</a></li>
              <li><a href="#products">Product Catalog</a></li>
              <li><a href="#about">Eco-Commitment</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@dairyhub.com</p>
            <p>Phone: +1 (555) 019-2834</p>
            <p>Address: 45 Farmfield Road, Green Valley</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DairyHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
