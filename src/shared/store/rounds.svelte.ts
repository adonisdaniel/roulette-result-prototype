import { writable } from "svelte/store";
import type { Round, RoundRouletteFisic } from "../services/games/rounds/domain/rounds.interfaces";

export const roundsFisics = writable<RoundRouletteFisic[]>([]);

export const rounds = writable<Round[]>([]);