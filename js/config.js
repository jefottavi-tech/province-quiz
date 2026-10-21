// Settings to change when moving the quiz to the lawyer's domain.
window.QUIZ_CONFIG = {
  // Public address of the quiz, no trailing slash. Used for share links
  // and by tools/gen_share_pages.mjs (run it again after changing this).
  SITE_URL: "https://quiz.kallistesoft.ca",

  // Result-page buttons. "?province=<slug>" is added to each link.
  // Empty = placeholder (the button stays visible but goes nowhere).
  BOOKING_URL: "",
  AUDIT_URL: "",
  EBOOK_URL: "",

  // Google AdSense. Leave empty to hide the ad slots.
  // A cookie-consent banner (Google-certified CMP) is required before going live for EU visitors.
  ADSENSE_CLIENT: "", // e.g. "ca-pub-1234567890123456"
  ADSENSE_SLOT: ""    // ad unit id for the question pages
};
