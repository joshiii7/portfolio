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
