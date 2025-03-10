import './button.css';

type ButtonProps = {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
};

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'demo-button--primary' : 'demo-button--secondary';
  return (
    <button
      className={['demo-button', `demo-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      type="button"
      {...props}
    >
      {label}
    </button>
  );
};
