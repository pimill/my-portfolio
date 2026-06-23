import { FC } from 'react';

interface MushroomIconProps {
  className?: string;
}

export const MushroomIcon: FC<MushroomIconProps> = ({ className = "w-8 h-8 text-current" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="currentColor" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M40 50v38a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V50H40z" />
      <path d="M50 10c-25 0-40 20-40 40 0 5.523 4.477 10 10 10h60c5.523 0 10-4.477 10-10 0-20-15-40-40-40z" transform="translate(0, 12)" />
    </svg>
  );
};
