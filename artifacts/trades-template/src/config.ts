// ============================================================
//  TEMPLATE CONFIG — Edit this file to fully rebrand the site
//  Every section below maps directly to what appears on screen
// ============================================================

export const BUSINESS = {
  name: "Palm Beach Plumbing Contractor Inc",
  shortName: "Palm Beach Plumbing",
  trade: "Plumbing",
  location: "Lake Worth Beach, FL",
  serviceArea: "Palm Beach County and surrounding areas",

  phone: "(561) 685-5153",
  phoneRaw: "+15616855153",

  email: "palmbeachplumbing@yahoo.com",

  hours: "Mon–Fri 8:00 AM – 5:00 PM · 24/7 Emergency Service",

  yearsInBusiness: "Serving South Florida since 2015",

  // Trade type — must match a key in placeholders.ts (or "default").
  // Lowercase, hyphen-separated. Examples: "softwash", "roofing", "lawn-care",
  // "fencing", "auto-detailing", "junk-removal", "hvac", "plumbing",
  // "electrical", "painting", "tree-services", "cleaning".
  // Used to pick trade-appropriate placeholder photos until the client sends real ones.
  tradeType: "plumbing",
};

export const HERO = {
  headline1: "Reliable Plumbing",
  headline2: "Done Right the First Time",
  subheading: "Licensed and insured plumbing contractors serving Lake Worth and the greater Palm Beach area. Fast response, honest pricing, quality workmanship.",
  cta1: "Call (561) 685-5153",
  cta2: "Get a Free Quote",
};

export const ABOUT = {
  headline: "Your Local Palm Beach Plumbers",
  body1: "Palm Beach Plumbing Contractor Inc is a family-owned, fully licensed plumbing company proudly serving Lake Worth Beach and all of Palm Beach County. From small leaks to full repipes, we treat every job like it's in our own home.",
  body2: "We show up when we say we will, give you a clear price up front, and back our work with the kind of warranty you'd expect from a contractor who plans to be your plumber for years to come.",
  teamPhotoAlt: "Palm Beach Plumbing team in Lake Worth",
};

export const CTA_BANNER = {
  headline: "Need a Plumber Now?",
  body: "Burst pipe, slab leak, clogged main, no hot water — call us and we'll be there fast. 24/7 emergency service across Palm Beach County.",
};

export const BADGES = [
  "Licensed & Insured",
  "Free Estimates",
  "24/7 Emergency Service",
  "Upfront Pricing",
];

export const SERVICES = [
  {
    name: "Emergency Plumbing",
    desc: "Burst pipes, overflowing toilets, no hot water, sewer backups — we answer the phone day or night and dispatch a licensed plumber fast.",
  },
  {
    name: "Drain Cleaning",
    desc: "Slow drains, clogged kitchen sinks, backed-up showers, and main line stoppages cleared with professional cabling and hydro jetting.",
  },
  {
    name: "Water Heater Repair & Installation",
    desc: "Tank and tankless water heater repair, replacement, and new installations. All major brands serviced — gas and electric.",
  },
  {
    name: "Leak Detection & Repair",
    desc: "Slab leaks, pinhole leaks, hidden pipe leaks behind walls — we find the source without tearing up your home and repair it right.",
  },
  {
    name: "Repipes & Pipe Replacement",
    desc: "Full-home repipes for older Florida homes with failing galvanized or polybutylene plumbing. Copper and PEX options, permitted and inspected.",
  },
  {
    name: "Toilets, Faucets & Fixtures",
    desc: "Repair or replace toilets, faucets, garbage disposals, shower valves, and water-saving fixtures. Quality parts, clean installs.",
  },
];

// NOTE: Reviews below are placeholder examples for the pitch preview only.
// Replace with real Google / Facebook / BBB reviews before going live.
export const REVIEWS = [
  {
    text: "Called Palm Beach Plumbing on a Sunday morning when our water heater went out. Tech was at the house within two hours, had us up and running by lunchtime. Fair price, no upsell. Highly recommend.",
    author: "Jennifer K.",
    source: "Google Review",
  },
  {
    text: "These guys repiped our 1960s Lake Worth bungalow start to finish. Crew was professional, kept the job site clean, and finished a day ahead of schedule. House passes inspection with no issues.",
    author: "Mark D.",
    source: "Google Review",
  },
  {
    text: "Had a slab leak under the kitchen and was dreading the call. They found it with no jackhammering all over the floor, fixed it the same day, and the price was exactly what they quoted. Trustworthy company.",
    author: "Sandra P.",
    source: "Google Review",
  },
];

// ============================================================
//  THEME — HSL values only (no "hsl()" wrapper)
//  primary        = brand accent color (buttons, highlights)
//  background     = page background
//  card           = card / panel background
//  accent         = secondary highlight
// ============================================================

export const THEME = {
  primary: "210 68% 37%",      // Plumbing blue (#1E5F9F)
  primaryFg: "0 0% 100%",
  background: "215 35% 8%",    // Deep navy
  foreground: "35 30% 96%",
  card: "215 28% 13%",
  cardFg: "35 30% 96%",
  accent: "210 68% 45%",       // Lighter plumbing blue
  accentFg: "215 35% 8%",
  mutedFg: "35 15% 70%",
  border: "215 25% 20%",
};

// ============================================================
//  PITCH_MODE — Set to `true` when you're shipping a design pitch
//  without a backend deployed yet. The quote form will hide its
//  submit button and show a "We'll call you back at <phone>"
//  message instead of trying to POST to /api/quote.
//  Flip to `false` when the backend is live.
// ============================================================

export const PITCH_MODE = true;
