// Settings to change when moving the quiz to the lawyer's domain.
window.QUIZ_CONFIG = {
  // Public address of the quiz, no trailing slash. Used for share links
  // and by tools/gen_share_pages.mjs (run it again after changing this).
  SITE_URL: "https://quiz.kallistesoft.ca",

  // Result-page buttons. "utm_source=quiz&utm_content=<province slug>" is
  // added to each link, so Calendly and systeme.io show where a visitor came from.
  // Empty = placeholder (the button stays visible but goes nowhere).
  BOOKING_URL: "https://calendly.com/vanessa-poughon-avocat/consultation-immigration-canadienne-60-mn",
  AUDIT_URL: "https://a5c6-contact.systeme.io/ec75652d",

  // Ebook per province id (see js/data.js). The button only appears for
  // provinces listed here.
  EBOOK_URLS: {
    ab: "https://a5c6-contact.systeme.io/guidealberta"
  },

  // Google AdSense. Leave empty to hide the ad slots.
  // A cookie-consent banner (Google-certified CMP) is required before going live for EU visitors.
  ADSENSE_CLIENT: "", // e.g. "ca-pub-1234567890123456"
  ADSENSE_SLOT: ""    // ad unit id for the question pages
};
