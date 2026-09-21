export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  tagline: string;
  features: string[];
  scopeNote: string;
}

export interface MaintenancePlan {
  name: string;
  monthly: number;
  annual: number;
  tagline: string;
  features: string[];
  featured: boolean;
}

/**
 * One line of the maintenance comparison table. `values` follows the order of MAINTENANCE_PLANS:
 * `true` is a check, `false` a cross, and a string is shown as text (a limit or a response time).
 */
export interface ComparisonRow {
  label: string;
  values: readonly (boolean | string)[];
}
