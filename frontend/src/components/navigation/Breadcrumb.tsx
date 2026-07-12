'use client';

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbProps {
  customLabels?: Record<string, string>;
}

export function Breadcrumb({ customLabels = {} }: BreadcrumbProps) {
  const pathname = usePathname();
  
  if (pathname === '/' || pathname === '/login') return null;

  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-muted-foreground py-2 select-none">
      <ol className="flex items-center gap-1.5 list-none m-0 p-0">
        <li className="flex items-center">
          <Link
            href="/dashboard"
            className="flex items-center hover:text-foreground transition-colors py-1"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          
          // Format label (capitalized, remove hyphens) or check custom label
          const label = customLabels[segment] || 
            segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

          // Skip showing 'Dashboard' twice if it's the home dashboard segment
          if (segment.toLowerCase() === 'dashboard' && index === 0 && pathSegments.length > 1) {
            return null;
          }

          return (
            <React.Fragment key={href}>
              <li className="flex items-center text-muted-foreground/50">
                <ChevronRight className="h-3 w-3 stroke-[2.5]" />
              </li>
              <li className="flex items-center">
                {isLast ? (
                  <span className="text-foreground font-semibold px-0.5 py-1">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-foreground transition-colors px-0.5 py-1"
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
export default Breadcrumb;
