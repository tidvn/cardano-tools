import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/styled/button';
import { Sheet, SheetHeader, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/utils';
import { SheetMenuList } from './menu-list';

export function SheetMenu() {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button
                    className={cn(
                        'flex h-16 w-full flex-col items-center justify-center gap-1 border-none bg-transparent text-xs',
                        'text-muted-foreground',
                    )}
                    variant="outline"
                >
                    <MenuIcon size={20} />
                    More
                </Button>
            </SheetTrigger>
            <SheetContent className="h-[75vh]" side="bottom">
                <SheetHeader>
                    <div className="flex items-center justify-start px-3">
                        <SheetTitle className="text-lg font-bold">More</SheetTitle>
                    </div>
                </SheetHeader>
                <SheetMenuList />
            </SheetContent>
        </Sheet>
    );
}
