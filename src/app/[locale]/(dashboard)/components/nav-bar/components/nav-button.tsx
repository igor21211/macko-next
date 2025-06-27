import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavButtonProps {
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export const NavButton = ({ label, isActive, onClick }: NavButtonProps) => {
  return (
    <Button
      size="sm"
      variant="nav"
      className={cn(
        'font-sans text-body uppercase transition-all duration-300 w-full justify-between rounded-none border-none lg:w-auto',
        isActive ? 'text-accent font-bold' : 'text-primary font-medium',
        'hover:text-accent/60'
      )}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
