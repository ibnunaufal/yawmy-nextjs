// components/ConditionalAnalytics.jsx
'use client';
import { usePathname } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react"

export default function ConditionalAnalytics() {
    const pathname = usePathname();
    
    // Check if the current path matches any of the excluded routes
    const isExcludedRoute = 
      pathname.startsWith('/quran/') || 
      pathname.startsWith('/qris/') || 
      pathname.startsWith('/mutabaah/');
    
    // Only render analytics if not on an excluded route
    if (isExcludedRoute) {
      return null;
    }
    
    return <Analytics />;
  }