declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CALENDLY_URL = "https://calendly.com/healinglanguage/1-1-15-min-consultation";

export function openCalendlyPopup() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, "_blank");
  }
}

export function useCalendly() {
  return {
    openPopup: openCalendlyPopup,
    calendlyUrl: CALENDLY_URL,
  };
}
