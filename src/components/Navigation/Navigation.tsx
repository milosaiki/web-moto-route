'use client';
import React, { useState } from 'react';
import { NavigationUI } from '../../ui/Navigation/Navigation';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavigationUI 
      isMobileMenuOpen={isMobileMenuOpen} 
      toggleMobileMenu={toggleMobileMenu} 
    />
  );
}
