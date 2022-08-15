import PropTypes from 'prop-types';

const Button = ({ label, styleClass, onClick }) => {
  return (
    <button 
      className={`button ${styleClass}`}
      onClick={(e) => onClick(e)}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  styleClass: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  styleClass: 'button-primary',
};

export default Button;