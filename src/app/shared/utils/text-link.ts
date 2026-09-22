/** A single inline router link embedded in a longer piece of copy. */
export interface TextLink {
  text: string;
  route: string;
}

/**
 * Splits body copy on a `{link}` placeholder, so the two halves can sit around an inline
 * `routerLink` in the template. Shared by anything that embeds one link in a longer string this
 * way (FAQ answers, project screenshot captions) instead of each reimplementing the split.
 */
export function splitOnLinkPlaceholder(text: string): [string, string] {
  const [before, after = ''] = text.split('{link}');
  return [before, after];
}
