export interface RoundRouletteFisic {
  _id: string;
  result: string;
  id_roulette: string;
  id_round: string;
  date: Date;
  error: string;
  rpm: string;
  spin: string;
  round: number;
  title: string;
  info: string;
  createdAt: Date;
  roundProvider: RoundProvider;
}

export interface RoundProvider {
  code: string;
  roulette: string;
  identifierNumber: number;
}

export interface Round {
  _id: string;
  result: number;
  open: boolean;
  code: string;
  start_date: Date;
  end_date: Date;
  jackpot_values: JackpotValue[];
  providerId: string;
  roulette: string;
  identifierNumber: number;
  createdAt: Date;
  updatedAt: Date;
  clientRoulettes: ClientRoulette[];
  client: Client[];
  clientRoulette: Client[];
  operator: Operator[];
  roulettecurrency: Roulettecurrency[];
  currency: Client[];
}

export interface Client {
  _id: string;
}

export interface ClientRoulette {
  client: string;
  roulette: string;
}

export interface JackpotValue {
  _id: string;
  multiplier: number;
  number: number;
}

export interface Operator {
  _id: string;
  client: string;
}

export interface Roulettecurrency {
  roulette: string;
  currency: string;
}

export interface RoundDto {
  ID_Ronda: string;
  ID_Ruleta: string;
}