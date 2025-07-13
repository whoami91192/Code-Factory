import React from 'react';

// App Store Badge (Official Apple Source)
export const AppStoreBadge: React.FC<{ width?: number; height?: number; style?: React.CSSProperties }> = ({ width = 120, height = 40, style }) => (
  <img
    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
    alt="Download on the App Store"
    width={width}
    height={height}
    style={{ display: 'inline-block', borderRadius: 8, ...style }}
    loading="lazy"
    draggable={false}
  />
);

// Google Play Badge (Official Google Source)
export const GooglePlayBadge: React.FC<{ width?: number; height?: number; style?: React.CSSProperties }> = ({ width = 120, height = 40, style }) => (
  <img
    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    alt="Get it on Google Play"
    width={width}
    height={height}
    style={{ display: 'inline-block', borderRadius: 8, background: '#fff', ...style }}
    loading="lazy"
    draggable={false}
  />
);

// Visa Logo (Official Source)
export const VisaLogo: React.FC<{ width?: number; height?: number; style?: React.CSSProperties }> = ({ width = 60, height = 20, style }) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
    alt="Visa"
    width={width}
    height={height}
    style={{ display: 'inline-block', background: '#fff', borderRadius: 4, objectFit: 'contain', ...style }}
    loading="lazy"
    draggable={false}
  />
);

// Mastercard Logo (Official Source)
export const MastercardLogo: React.FC<{ width?: number; height?: number; style?: React.CSSProperties }> = ({ width = 60, height = 20, style }) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
    alt="Mastercard"
    width={width}
    height={height}
    style={{ display: 'inline-block', background: '#fff', borderRadius: 4, objectFit: 'contain', ...style }}
    loading="lazy"
    draggable={false}
  />
);

// Skrill Logo (Official Source)
export const SkrillLogo: React.FC<{ width?: number; height?: number; style?: React.CSSProperties }> = ({ width = 60, height = 20, style }) => (
  <img
    src="https://www.skrill.com/typo3conf/ext/sitepackage/Resources/Public/images/Skrill-Logo.svg"
    alt="Skrill"
    width={width}
    height={height}
    style={{ display: 'inline-block', background: '#fff', borderRadius: 4, objectFit: 'contain', ...style }}
    loading="lazy"
    draggable={false}
  />
);

// PayPal Logo (Official Source)
export const PayPalLogo: React.FC<{ width?: number; height?: number; style?: React.CSSProperties }> = ({ width = 60, height = 20, style }) => (
  <img
    src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
    alt="PayPal"
    width={width}
    height={height}
    style={{ display: 'inline-block', background: '#fff', borderRadius: 4, objectFit: 'contain', ...style }}
    loading="lazy"
    draggable={false}
  />
); 