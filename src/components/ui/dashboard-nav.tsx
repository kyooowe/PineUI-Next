'use client';

//#region Import
import type { Dispatch, SetStateAction } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { useSidebar } from '@/hooks/useSideBar';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip';

import type { NavItem } from '@/constant/nav';
//#endregion

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {
          items.map((item, index) => {
            return (
              item.href && (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md py-2 w-full text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                        path === item.href ? 'bg-accent' : 'transparent'
                      )}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                      }}
                    >
                      {item.icon}
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ''
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    side="right"
                    sideOffset={8}
                    className={!isMinimized ? 'hidden' : 'inline-block'}
                  >
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              )
            );
          }
          )
        }
      </TooltipProvider>
    </nav>
  );
}
