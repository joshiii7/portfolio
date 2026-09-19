export interface Role {
  title: string;
  org: string;
  date: string;
}

export interface Achievement {
  /** Bold lead-in. */
  title: string;
  /** Rest of the line after the comma. */
  detail: string;
  icon: 'medal' | 'badge-shield';
}
