import { writable } from "svelte/store";
import type { Roulette } from "../services/games/roulettes/domain/interfaces";

export const roulettes = writable<Roulette[]>([]);