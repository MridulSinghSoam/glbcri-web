// Small inline icon set (stroke icons, 24x24) so the site has no icon dependency.
const paths = {
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  rocket: <><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M9 15l-3-3c2-6 7-9 13-9 0 6-3 11-9 13l-1-1Z" /><circle cx="14.5" cy="9.5" r="1.5" /></>,
  cap: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.8 3 2.6 3.5 5.2" /></>,
  rupee: <><path d="M6 4h12M6 9h12M6 4h3a5 5 0 0 1 0 10H6l8 6" /></>,
  shield: <><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  lab: <><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7 15h10" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" /></>,
  network: <><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M10.8 7.2 6.2 15.8M13.2 7.2l4.6 8.6M7.5 18h9" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12.5 3 3 5-6" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevLeft: <path d="m15 5-7 7 7 7" />,
  chevRight: <path d="m9 5 7 7-7 7" />,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m3 17 5-4 4 3 3-2 6 5" /></>,
  news: <><path d="M4 5h13v14a1 1 0 0 0 1 1H6a2 2 0 0 1-2-2V5Z" /><path d="M17 9h3v9a2 2 0 0 1-2 2M8 9h5M8 13h5M8 17h3" /></>,
  download: <path d="M12 4v11M7 10l5 5 5-5M4 20h16" />,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  pin: <><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
  facebook: <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H7v3.5h2V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15V3Z" />,
  youtube:<><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9 5 3-5 3V9Z" /></>,
  whatsapp: <><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19l-4 1Z" /><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1.2 2 .8c-.2 1.2-1.2 2-2.4 1.8C11 15 9 13 8.6 10.4 8.4 9.2 9.2 8.2 10.4 8l.8 2-1.2.9" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  desk: <><path d="M3 10h18M5 10v10M19 10v10M8 6h8v4H8z" /></>,
  play: <path d="m8 5 11 7-11 7V5Z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  quote: <path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H4c0 3 2 4.5 4 4.5M16 6h4c0 3-2 4.5-4 4.5M12 13v4M8 21h8M9 17h6" /></>,
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.8, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
      {paths[name] || paths.spark}
    </svg>
  )
}
