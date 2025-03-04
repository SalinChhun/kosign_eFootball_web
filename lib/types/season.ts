export interface SeasonResponse {
    id: number;
    name: string;
}

export interface UpdateSeasonRequest {
    season_id: string;
    season_name: string;
}