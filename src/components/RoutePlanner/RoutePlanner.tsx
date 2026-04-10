'use client';
import React, { useState } from 'react';
import { useRouteStore } from '../../stores/route.store';
import { RoutePlannerUI } from '../../ui/RoutePlanner/RoutePlanner';

export function RoutePlanner() {
  const { startPoint, destination, routeType } = useRouteStore();
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <RoutePlannerUI 
      startPoint={startPoint} 
      destination={destination} 
      routeType={routeType}
      isCalculating={isCalculating}
      onCalculate={handleCalculate}
    />
  );
}
