
export interface PokemonData {
    name: string;
    url: string;
}
export interface DataPayload {
    count: number;
    next: string;
    previous: string;
    results: PokemonData[];
}