export interface ClubResponse {
    "id": number,
    "name": string,
    "image": string,
    "seasons": SeasonResponse[]
}

export interface SeasonResponse {
    "season_id": number,
    "season_name": string
}

