import React from 'react';
import './Button.css'; // Import the CSS file for styling

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'danger' | 'yellow';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button', variant = 'primary', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`btn btn-${variant} ${disabled ? 'btn-disabled' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
