import './SplinePlaceholder.css';

const SplinePlaceholder = () => {
  return (
    <div className="spline-placeholder">
      <div className="spline-placeholder__orb" />
      <div className="spline-placeholder__content">
        <div className="spline-placeholder__icon">
          <img 
            src="/images/studiva-quill-icon.svg" 
            alt="Studiva" 
            style={{ width: '32px', height: '32px', filter: 'invert(1)' }} 
          />
        </div>
        <div className="spline-placeholder__loading-text">
          Loading 3D Experience
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="spline-placeholder__dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplinePlaceholder;
