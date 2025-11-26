import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Consistent Button Component for Zelora
 * 
 * @param {Object} props
 * @param {string} props.variant - 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
 * @param {string} props.size - 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} props.fullWidth - Makes button full width
 * @param {boolean} props.loading - Shows loading state
 * @param {boolean} props.disabled - Disables the button
 * @param {string} props.to - If provided, renders as Link
 * @param {string} props.href - If provided, renders as anchor tag
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {React.ReactNode} props.leftIcon - Icon to show on left
 * @param {React.ReactNode} props.rightIcon - Icon to show on right
 * @param {string} props.className - Additional classes
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  to,
  href,
  type = 'button',
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  children,
  ...rest
}) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'md' && `btn-${size}`,
    fullWidth && 'btn-full',
    loading && 'btn-loading',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && (
        <span className="btn-spinner">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="10">
              <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </span>
      )}
      {!loading && leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      <span className="btn-text">{children}</span>
      {!loading && rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </>
  );

  // Render as Link (internal navigation)
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  // Render as anchor (external link)
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
