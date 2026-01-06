'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Order, RoutePoint } from 'lib/demo/orders';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
};

export default function OrderMap({ order, isOpen, onClose }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const leafletLoadedRef = useRef(false);
  const route = order.tracking?.route;

  useEffect(() => {
    if (!isOpen || !route || !mapRef.current) return;

    // Check if Leaflet is already loaded
    if ((window as any).L && leafletLoadedRef.current) {
      initializeMap();
      return;
    }

    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => {
        leafletLoadedRef.current = true;
        initializeMap();
      };
      document.body.appendChild(script);
    } else {
      leafletLoadedRef.current = true;
      initializeMap();
    }

    function initializeMap() {
      if (!mapRef.current || !(window as any).L || !route) return;

      // Clean up existing map if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const L = (window as any).L;

      // Calculate center point (between pickup and delivery)
      const centerLat = (route.pickup.lat + route.delivery.lat) / 2;
      const centerLng = (route.pickup.lng + route.delivery.lng) / 2;

      // Initialize map
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true
      }).setView([centerLat, centerLng], 12);

      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Create route points array
      const routePoints: RoutePoint[] = [
        route.pickup,
        ...(route.waypoints || []),
        route.delivery
      ];

      // Draw route polyline
      const routeCoordinates = routePoints.map(point => [point.lat, point.lng] as [number, number]);
      L.polyline(routeCoordinates, {
        color: '#3b82f6',
        weight: 4,
        opacity: 0.7
      }).addTo(map);

      // Add markers for each point
      routePoints.forEach((point, index) => {
        let iconColor = '#3b82f6'; // Blue for waypoints

        if (index === 0) {
          // Pickup point - green
          iconColor = '#10b981';
        } else if (index === routePoints.length - 1) {
          // Delivery point - red
          iconColor = '#ef4444';
        }

        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            background-color: ${iconColor};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        L.marker([point.lat, point.lng], { icon })
          .addTo(map)
          .bindPopup(`<strong>${point.label}</strong>${point.timestamp ? `<br><small>${new Date(point.timestamp).toLocaleTimeString()}</small>` : ''}`);
      });

      // Add current courier location with pulsing animation
      if (route.currentLocation) {
        const courierIcon = L.divIcon({
          className: 'custom-marker courier-marker',
          html: `<div style="
            background-color: #f59e0b;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(245, 158, 11, 0.6);
          "></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const courierMarker = L.marker(
          [route.currentLocation.lat, route.currentLocation.lng],
          { icon: courierIcon }
        )
          .addTo(map)
          .bindPopup(`<strong>${route.currentLocation.label}</strong><br><small>Live tracking</small>`)
          .openPopup();

        // Add pulsing circle around courier
        L.circle([route.currentLocation.lat, route.currentLocation.lng], {
          radius: 200,
          color: '#f59e0b',
          fillColor: '#f59e0b',
          fillOpacity: 0.2,
          weight: 2
        }).addTo(map);
      }

      // Fit map to show all points
      const bounds = L.latLngBounds(routePoints.map(p => [p.lat, p.lng] as [number, number]));
      if (route.currentLocation) {
        bounds.extend([route.currentLocation.lat, route.currentLocation.lng]);
      }
      map.fitBounds(bounds, { padding: [50, 50] });

      // Trigger resize after a short delay to ensure map renders correctly
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }

    return () => {
      // Cleanup map when component unmounts or modal closes
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, route]);

  if (!route) {
    return null;
  }

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all dark:bg-neutral-900">
                <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-700">
                  <Dialog.Title className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Track Order {order.orderNumber}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="relative h-[600px] w-full">
                  <div ref={mapRef} className="h-full w-full" />
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 z-[1000] rounded-lg bg-white/95 p-3 shadow-lg dark:bg-neutral-800/95">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Pickup Location</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500 border-2 border-white animate-pulse"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Courier (Live)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500 border-2 border-white"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Waypoint</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500 border-2 border-white"></div>
                        <span className="text-neutral-700 dark:text-neutral-300">Delivery Address</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 px-6 py-4 dark:border-neutral-700">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400">Tracking ID:</span>{' '}
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {order.tracking?.trackingId}
                      </span>
                    </div>
                    {route.currentLocation && (
                      <div>
                        <span className="text-neutral-500 dark:text-neutral-400">Courier Status:</span>{' '}
                        <span className="font-medium text-green-600 dark:text-green-400">
                          In Transit
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

