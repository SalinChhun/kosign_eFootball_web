export interface ClubResponse {
    "id": number,
    "name": string,
    "image": string,
    "seasons": SeasonResponse[]
}

export interface ClubRequest {
    "club_name": string,
    "club_logo": string,
    "season_ids": number[]
}


export interface SeasonResponse {
    "season_id": number,
    "season_name": string
}

export interface UpdateClubRequest {
    club_id: number,
    "club_name": string,
    "club_logo": string,
    "season_ids": number[]
}

