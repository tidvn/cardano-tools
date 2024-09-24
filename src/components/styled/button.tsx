import * as React from 'react';
import { cn } from '@/utils';
import { Button as Base, buttonVariants, ButtonProps } from '@/components/ui/button';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, ...props }, ref) => {
        const effectiveVariant = variant ?? 'default';
        return (
            <Base
                ref={ref}
                className={cn(
                    buttonVariants({ variant: effectiveVariant, size: props.size }),
                    effectiveVariant === 'default'
                        ? 'hover:bg-gradient/90 bg-gradient text-primary-foreground'
                        : '',
                    className,
                )}
                variant={effectiveVariant}
                {...props}
            />
        );
    },
);

Button.displayName = 'Button';

export { Button };
