export interface NavItem {
  href: string;
  label: string;
  /** Home only: chapter index the link scrolls to (-1 is the top). */
  go?: number;
}

/** Desktop nav on the project, path and skills pages. */
export const pagesNav: NavItem[] = [
  { href: '/projects', label: 'Projects' },
  { href: '/path', label: 'Path' },
  { href: '/skills', label: 'Skills' },
  { href: '/', label: 'Index' },
];

/** Phone nav on a project page: back to the list and on to the next project. */
export const projectFloat = (next: string): NavItem[] => [
  { href: '/projects', label: '← Projects' },
  { href: next, label: 'Next →' },
];
