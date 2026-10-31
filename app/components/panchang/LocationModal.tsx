'use client';

import { useEffect } from 'react';
import { GeoLocation } from '@/app/lib/panchang/types';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';
import PanchangLocationForm from './PanchangLocationForm';

interface LocationModalProps {
  location: GeoLocation;
  ayanamsa: AyanamsaSystem;
  onLocationChange: (loc: GeoLocation) => void;
  onAyanamsaChange: (ayan: AyanamsaSystem) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({
  location,
  ayanamsa,
  onLocationChange,
  onAyanamsaChange,
  isOpen,
  onClose,
}: LocationModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (updatedLoc: GeoLocation, selectedAyan: AyanamsaSystem) => {
    onLocationChange(updatedLoc);
    onAyanamsaChange(selectedAyan);

    try {
      localStorage.setItem('panchang_custom_location', JSON.stringify(updatedLoc));
      localStorage.setItem('panchang_ayanamsa', selectedAyan);
    } catch {}

    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-dialog-title"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          aria-label="Close"
        >
          ✕
        </button>

        <PanchangLocationForm
          key={`${location.name}_${location.latitude}_${location.longitude}_${ayanamsa}`}
          initialLocation={location}
          initialAyanamsa={ayanamsa}
          onSubmit={handleSubmit}
          onCancel={onClose}
          className="border-0 shadow-none bg-transparent"
        />
      </div>
    </div>
  );
}
