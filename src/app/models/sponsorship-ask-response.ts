export interface SponsorshipMatch {
  organisation_name: string;
  town: string;
  route: string;
  rating: string;
  row_index: number;
}

export interface SponsorshipAskResponse {
  query: string;
  sponsored: boolean;
  status: string;
  summary: string;
  matches: SponsorshipMatch[];
  total_matches_found: number;
  data_source: string;
  disclaimer: string;
}
