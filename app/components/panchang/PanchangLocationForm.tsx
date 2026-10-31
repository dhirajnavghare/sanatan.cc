'use client';

import { useState, useId } from 'react';
import { GeoLocation } from '@/app/lib/panchang/types';
import { PRESET_CITIES } from '@/app/lib/panchang/constants';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';

export interface LocationFormValues {
  name: string;
  latitude: string;
  longitude: string;
  altitude: string;
  timezone: string;
  ayanamsa: AyanamsaSystem;
  useElevationDip: boolean;
}

export interface LocationFormErrors {
  name?: string;
  latitude?: string;
  longitude?: string;
  altitude?: string;
  timezone?: string;
}

export interface PanchangLocationFormProps {
  initialLocation?: GeoLocation;
  initialAyanamsa?: AyanamsaSystem;
  onSubmit: (location: GeoLocation, ayanamsa: AyanamsaSystem) => void;
  onCancel?: () => void;
  className?: string;
}

export default function PanchangLocationForm({
  initialLocation = PRESET_CITIES[0],
  initialAyanamsa = 'Lahiri',
  onSubmit,
  onCancel,
  className = '',
}: PanchangLocationFormProps) {
  const formId = useId();

  const [values, setValues] = useState<LocationFormValues>({
    name: initialLocation.name,
    latitude: String(initialLocation.latitude),
    longitude: String(initialLocation.longitude),
    altitude: String(initialLocation.altitude ?? 0),
    timezone: initialLocation.timezone,
    ayanamsa: initialAyanamsa,
    useElevationDip: initialLocation.useElevationDip ?? false,
  });

  const [errors, setErrors] = useState<LocationFormErrors>({});
  const [isLocating, setIsLocating] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: LocationFormErrors = {};

    if (!values.name.trim()) {
      newErrors.name = 'Location name is required.';
    }

    const latTrim = values.latitude.trim();
    const latNum = parseFloat(latTrim);
    if (latTrim === '' || isNaN(latNum)) {
      newErrors.latitude = 'Latitude is required.';
    } else if (latNum < -90 || latNum > 90) {
      newErrors.latitude = 'Latitude must be between -90° and +90°.';
    }

    const lonTrim = values.longitude.trim();
    const lonNum = parseFloat(lonTrim);
    if (lonTrim === '' || isNaN(lonNum)) {
      newErrors.longitude = 'Longitude is required.';
    } else if (lonNum < -180 || lonNum > 180) {
      newErrors.longitude = 'Longitude must be between -180° and +180°.';
    }

    const altTrim = values.altitude.trim();
    const altNum = parseFloat(altTrim);
    if (altTrim !== '' && (isNaN(altNum) || altNum < 0)) {
      newErrors.altitude = 'Altitude cannot be negative.';
    }

    if (!values.timezone.trim()) {
      newErrors.timezone = 'Timezone is required.';
    } else {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: values.timezone.trim() });
      } catch {
        newErrors.timezone = 'Invalid IANA timezone identifier (e.g., Asia/Kolkata, Europe/London).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = <K extends keyof LocationFormValues>(
    field: K,
    val: LocationFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field as keyof LocationFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setSubmitSuccess(false);
  };

  const handleSelectPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = parseInt(e.target.value, 10);
    if (!isNaN(idx) && PRESET_CITIES[idx]) {
      const city = PRESET_CITIES[idx];
      setValues((prev) => ({
        ...prev,
        name: city.name,
        latitude: String(city.latitude),
        longitude: String(city.longitude),
        altitude: String(city.altitude ?? 0),
        timezone: city.timezone,
        useElevationDip: city.useElevationDip ?? false,
      }));
      setErrors({});
    }
  };

  const handleGpsDetect = () => {
    if (!navigator.geolocation) {
      setErrors((prev) => ({
        ...prev,
        name: 'Geolocation is not supported by your browser.',
      }));
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude, altitude } = pos.coords;
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';

        setValues((prev) => ({
          ...prev,
          name: `GPS Location (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°)`,
          latitude: latitude.toFixed(5),
          longitude: longitude.toFixed(5),
          altitude: altitude ? altitude.toFixed(1) : '0',
          timezone: tz,
        }));
        setErrors({});
      },
      (err) => {
        setIsLocating(false);
        setErrors((prev) => ({
          ...prev,
          name: `GPS detection failed: ${err.message}. Please enter coordinates manually.`,
        }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const latNum = parseFloat(values.latitude.trim());
    const lonNum = parseFloat(values.longitude.trim());
    const altTrim = values.altitude.trim();
    const altNum = altTrim === '' ? 0 : parseFloat(altTrim);

    const validatedLocation: GeoLocation = {
      name: values.name.trim(),
      latitude: latNum,
      longitude: lonNum,
      altitude: altNum,
      timezone: values.timezone.trim(),
      useElevationDip: values.useElevationDip,
    };

    onSubmit(validatedLocation, values.ayanamsa);
    setSubmitSuccess(true);
  };

  const currentPresetIdx = PRESET_CITIES.findIndex(
    (c) =>
      Math.abs(c.latitude - parseFloat(values.latitude)) < 0.005 &&
      Math.abs(c.longitude - parseFloat(values.longitude)) < 0.005
  );

  return (
    <form
      id={`${formId}-location-form`}
      data-testid="panchang-location-form"
      onSubmit={handleSubmit}
      noValidate
      className={`space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      {/* Header */}
      <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-50">
          Location &amp; Ephemeris Parameters
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Input exact geographical coordinates and computation options for astronomical calculation.
        </p>
      </div>

      {submitSuccess && (
        <div
          role="status"
          data-testid="form-success-banner"
          className="rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
        >
          ✓ Calculation parameters updated successfully.
        </div>
      )}

      {/* Quick Assist Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          data-testid="gps-detect-button"
          onClick={handleGpsDetect}
          disabled={isLocating}
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600 disabled:opacity-50"
        >
          <span>📍</span>
          <span>{isLocating ? 'Detecting GPS...' : 'Use GPS Coordinates'}</span>
        </button>

        <div className="flex-1 min-w-[200px]">
          <select
            data-testid="preset-city-select"
            aria-label="Preset City"
            onChange={handleSelectPreset}
            value={currentPresetIdx >= 0 ? currentPresetIdx : ''}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-800 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          >
            <option value="" disabled={currentPresetIdx >= 0}>
              {currentPresetIdx >= 0 ? '-- Change Predefined City --' : '-- Choose from Predefined City Coordinates --'}
            </option>
            {PRESET_CITIES.map((city, idx) => (
              <option key={city.name} value={idx}>
                {city.name} ({city.latitude}°, {city.longitude}°)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Location Label */}
      <div>
        <label
          htmlFor={`${formId}-name`}
          className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200"
        >
          Location Label / City Name <span className="text-rose-500">*</span>
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          data-testid="input-location-name"
          type="text"
          value={values.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          placeholder="e.g. Ujjain, India"
          className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs text-zinc-900 focus:outline-none dark:text-zinc-100 ${
            errors.name
              ? 'border-rose-400 bg-rose-50/50 dark:border-rose-700 dark:bg-rose-950/20'
              : 'border-zinc-200 bg-zinc-50 focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-800'
          }`}
        />
        {errors.name && (
          <p
            id={`${formId}-name-error`}
            role="alert"
            data-testid="error-location-name"
            className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Coordinates Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Latitude */}
        <div>
          <label
            htmlFor={`${formId}-latitude`}
            className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            Latitude (Decimal Degrees) <span className="text-rose-500">*</span>
          </label>
          <input
            id={`${formId}-latitude`}
            name="latitude"
            data-testid="input-latitude"
            type="number"
            step="any"
            value={values.latitude}
            onChange={(e) => handleFieldChange('latitude', e.target.value)}
            aria-invalid={!!errors.latitude}
            aria-describedby={errors.latitude ? `${formId}-latitude-error` : undefined}
            placeholder="e.g. 23.1765"
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-mono text-zinc-900 focus:outline-none dark:text-zinc-100 ${
              errors.latitude
                ? 'border-rose-400 bg-rose-50/50 dark:border-rose-700 dark:bg-rose-950/20'
                : 'border-zinc-200 bg-zinc-50 focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-800'
            }`}
          />
          <span className="text-[10px] text-zinc-400">-90.0° (South) to +90.0° (North)</span>
          {errors.latitude && (
            <p
              id={`${formId}-latitude-error`}
              role="alert"
              data-testid="error-latitude"
              className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400"
            >
              {errors.latitude}
            </p>
          )}
        </div>

        {/* Longitude */}
        <div>
          <label
            htmlFor={`${formId}-longitude`}
            className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            Longitude (Decimal Degrees) <span className="text-rose-500">*</span>
          </label>
          <input
            id={`${formId}-longitude`}
            name="longitude"
            data-testid="input-longitude"
            type="number"
            step="any"
            value={values.longitude}
            onChange={(e) => handleFieldChange('longitude', e.target.value)}
            aria-invalid={!!errors.longitude}
            aria-describedby={errors.longitude ? `${formId}-longitude-error` : undefined}
            placeholder="e.g. 75.7885"
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-mono text-zinc-900 focus:outline-none dark:text-zinc-100 ${
              errors.longitude
                ? 'border-rose-400 bg-rose-50/50 dark:border-rose-700 dark:bg-rose-950/20'
                : 'border-zinc-200 bg-zinc-50 focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-800'
            }`}
          />
          <span className="text-[10px] text-zinc-400">-180.0° (West) to +180.0° (East)</span>
          {errors.longitude && (
            <p
              id={`${formId}-longitude-error`}
              role="alert"
              data-testid="error-longitude"
              className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400"
            >
              {errors.longitude}
            </p>
          )}
        </div>
      </div>

      {/* Altitude & Timezone Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Altitude */}
        <div>
          <label
            htmlFor={`${formId}-altitude`}
            className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            Altitude (Meters above Sea Level)
          </label>
          <input
            id={`${formId}-altitude`}
            name="altitude"
            data-testid="input-altitude"
            type="number"
            step="any"
            value={values.altitude}
            onChange={(e) => handleFieldChange('altitude', e.target.value)}
            aria-invalid={!!errors.altitude}
            aria-describedby={errors.altitude ? `${formId}-altitude-error` : undefined}
            placeholder="e.g. 491"
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-mono text-zinc-900 focus:outline-none dark:text-zinc-100 ${
              errors.altitude
                ? 'border-rose-400 bg-rose-50/50 dark:border-rose-700 dark:bg-rose-950/20'
                : 'border-zinc-200 bg-zinc-50 focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-800'
            }`}
          />
          <span className="text-[10px] text-zinc-400">Used for geometric horizon dip calculation</span>
          {errors.altitude && (
            <p
              id={`${formId}-altitude-error`}
              role="alert"
              data-testid="error-altitude"
              className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400"
            >
              {errors.altitude}
            </p>
          )}
        </div>

        {/* Timezone */}
        <div>
          <label
            htmlFor={`${formId}-timezone`}
            className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200"
          >
            Timezone (IANA Identifier) <span className="text-rose-500">*</span>
          </label>
          <input
            id={`${formId}-timezone`}
            name="timezone"
            data-testid="input-timezone"
            type="text"
            value={values.timezone}
            onChange={(e) => handleFieldChange('timezone', e.target.value)}
            aria-invalid={!!errors.timezone}
            aria-describedby={errors.timezone ? `${formId}-timezone-error` : undefined}
            placeholder="e.g. Asia/Kolkata"
            className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-mono text-zinc-900 focus:outline-none dark:text-zinc-100 ${
              errors.timezone
                ? 'border-rose-400 bg-rose-50/50 dark:border-rose-700 dark:bg-rose-950/20'
                : 'border-zinc-200 bg-zinc-50 focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-800'
            }`}
          />
          <span className="text-[10px] text-zinc-400">e.g. Asia/Kolkata, Europe/London, America/New_York</span>
          {errors.timezone && (
            <p
              id={`${formId}-timezone-error`}
              role="alert"
              data-testid="error-timezone"
              className="mt-1 text-[11px] font-medium text-rose-600 dark:text-rose-400"
            >
              {errors.timezone}
            </p>
          )}
        </div>
      </div>

      {/* Elevation Dip Toggle */}
      <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/40">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            id={`${formId}-elevation-dip`}
            data-testid="checkbox-elevation-dip"
            name="useElevationDip"
            type="checkbox"
            checked={values.useElevationDip}
            onChange={(e) => handleFieldChange('useElevationDip', e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500 dark:border-zinc-700"
          />
          <div>
            <span className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              Apply Horizon Elevation Dip to Sunrise / Sunset
            </span>
            <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">
              Disabled by default to conform to standard civil almanac tables (sea-level 0m baseline).
            </span>
          </div>
        </label>
      </div>

      {/* Ayanamsa Selection */}
      <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200">
          Ayanamsa System
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {(
            [
              { id: 'Lahiri', label: 'Lahiri (Official NCAC)', desc: 'Indian Ephemeris Standard' },
              { id: 'TrueChitra', label: 'True Chitra', desc: 'Spica at 180°' },
              { id: 'KP', label: 'Krishnamurti (KP)', desc: 'KP System' },
              { id: 'Raman', label: 'B.V. Raman', desc: 'Raman Ayanamsa' },
              { id: 'Sayana', label: 'Sayana (Tropical)', desc: '0° Ayanamsa' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              data-testid={`ayanamsa-option-${item.id}`}
              onClick={() => handleFieldChange('ayanamsa', item.id)}
              className={`rounded-xl border p-2.5 text-left text-xs transition ${
                values.ayanamsa === item.id
                  ? 'border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500 dark:bg-amber-950/60 dark:text-amber-200'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300'
              }`}
            >
              <div className="font-semibold">{item.label}</div>
              <div className="text-[10px] opacity-75">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        {onCancel && (
          <button
            type="button"
            data-testid="form-cancel-button"
            onClick={onCancel}
            className="rounded-xl px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          data-testid="form-submit-button"
          className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-amber-600 focus:outline-none"
        >
          Save &amp; Recalculate
        </button>
      </div>
    </form>
  );
}
