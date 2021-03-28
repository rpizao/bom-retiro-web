export interface HealthIndicator {
  code: string;
  title: string;
  classifier: string
  description: string;
  source?: DataIndicator[];
}

export interface DataIndicator {
  name: string;
  series: SerieIndicator[];
}

export interface SerieIndicator {
  name: string;
  value: number;
}
