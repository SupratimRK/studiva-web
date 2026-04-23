import './HeroVisual.css';

const HeroVisual = () => {
  return (
    <div className="hero-visual">
      <div className="hero-visual__orb-container">
        <div className="hero-visual__orb hero-visual__orb--1" />
        <div className="hero-visual__orb hero-visual__orb--2" />
        <div className="hero-visual__orb hero-visual__orb--3" />
      </div>
      <div className="hero-visual__content">
        <div className="hero-visual__icon-wrapper">
          <img 
            src="/images/studiva-quill-icon.svg" 
            alt="Studiva" 
            className="hero-visual__icon"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
