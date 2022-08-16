import PropTypes from 'prop-types';

const Button = ({ label, styleClass, type, onClick }) => {
  return (
    <button 
      className={`button ${styleClass}`}
      type={type}
      onClick={(e) => onClick(e)}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  styleClass: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  styleClass: 'button-primary',
  type: 'button',
};

export default Button;