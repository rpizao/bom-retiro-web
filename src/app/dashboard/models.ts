export interface Indicator {
  code: string;
  title: string;
  classifier: string
  description: string;
  configuration: Configuration;
  source1d?: SerieIndicator[];
  source2d?: DataIndicator[];
}

export interface DataIndicator {
  name: string;
  series: SerieIndicator[];
}

export interface SerieIndicator {
  name: string;
  value: number;
}

export interface Configuration {
  dimension: string;
  maxY: string;
}
