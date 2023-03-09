
export interface Team extends Location {
    key: string;
    team_number: number;
    nickname?: string;
    name: string;
    school_name?: string;
    website?: string;
    rookie_year?: number;
    motto?: string;
}

export interface Location {
    city?: string;
    state_prov?: string;
    country?: string;
    address?: string;
    postal_code?: string;
    gmaps_place_id?: string;
    gmaps_url?: string;
    lat?: number;
    lng?: number;
    location_name?: string;
}