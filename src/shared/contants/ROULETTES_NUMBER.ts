export interface RouletteNumber {
  text: string
  value: number
  color: Colors
  class?: string
}

type Colors = "green" | "red" | "dark" | "yellow" | "purple" | "blue" | "light" | "primary" | "none" | "alternative" | undefined

export const ROULETTE_SINGLE_ZERO_NUMBER: RouletteNumber[] = [
  {
    text: '0',
    value: 0,
    color: 'green',
    class: 'row-1/3'
  },
  {
    text: '1',
    value: 1,
    color: 'red',
  },
  {
    text: '2',
    value: 2,
    color: 'dark',
  },
  {
    text: '3',
    value: 3,
    color: 'red',
  },
  {
    text: '4',
    value: 4,
    color: 'dark',
  },
  {
    text: '5',
    value: 5,
    color: 'red',
  },
  {
    text: '6',
    value: 6,
    color: 'dark',
  },
  {
    text: '7',
    value: 7,
    color: 'red',
  },
  {
    text: '8',
    value: 8,
    color: 'dark',
  },
  {
    text: '9',
    value: 9,
    color: 'red',
  },
  {
    text: '10',
    value: 10,
    color: 'dark',
  },
  {
    text: '11',
    value: 11,
    color: 'dark',
  },
  {
    text: '12',
    value: 12,
    color: 'red',
  },
  {
    text: '13',
    value: 13,
    color: 'dark',
  },
  {
    text: '14',
    value: 14,
    color: 'red',
  },
  {
    text: '15',
    value: 15,
    color: 'dark',
  },
  {
    text: '16',
    value: 16,
    color: 'red',
  },
  {
    text: '17',
    value: 17,
    color: 'dark',
  },
  {
    text: '18',
    value: 18,
    color: 'red',
  },
  {
    text: '19',
    value: 19,
    color: 'red',
  },
  {
    text: '20',
    value: 20,
    color: 'dark',
  },
  {
    text: '21',
    value: 21,
    color: 'red',
  },
  {
    text: '22',
    value: 22,
    color: 'dark',
  },
  {
    text: '23',
    value: 23,
    color: 'red',
  },
  {
    text: '24',
    value: 24,
    color: 'dark',
  },
  {
    text: '25',
    value: 25,
    color: 'red',
  },
  {
    text: '26',
    value: 26,
    color: 'dark',
  },
  {
    text: '27',
    value: 27,
    color: 'red',
  },
  {
    text: '28',
    value: 28,
    color: 'dark',
  },
  {
    text: '29',
    value: 29,
    color: 'dark',
  },
  {
    text: '30',
    value: 30,
    color: 'red',
  },
  {
    text: '31',
    value: 31,
    color: 'dark',
  },
  {
    text: '32',
    value: 32,
    color: 'red',
  },
  {
    text: '33',
    value: 33,
    color: 'dark',
  },
  {
    text: '34',
    value: 34,
    color: 'red',
  },
  {
    text: '35',
    value: 35,
    color: 'dark',
  },
  {
    text: '36',
    value: 36,
    color: 'red',
  },
]

export const ROULETTE_DOUBLE_ZERO_NUMBER: RouletteNumber[] = [
  {
    text: '0',
    value: 0,
    color: 'green',
    class: 'row-1/3'
  },
  {
    text: '00',
    value: 37,
    color: 'green',
    class: 'row-1/3'
  },
  {
    text: '1',
    value: 1,
    color: 'red',
  },
  {
    text: '2',
    value: 2,
    color: 'dark',
  },
  {
    text: '3',
    value: 3,
    color: 'red',
  },
  {
    text: '4',
    value: 4,
    color: 'dark',
  },
  {
    text: '5',
    value: 5,
    color: 'red',
  },
  {
    text: '6',
    value: 6,
    color: 'dark',
  },
  {
    text: '7',
    value: 7,
    color: 'red',
  },
  {
    text: '8',
    value: 8,
    color: 'dark',
  },
  {
    text: '9',
    value: 9,
    color: 'red',
  },
  {
    text: '10',
    value: 10,
    color: 'dark',
  },
  {
    text: '11',
    value: 11,
    color: 'dark',
  },
  {
    text: '12',
    value: 12,
    color: 'red',
  },
  {
    text: '13',
    value: 13,
    color: 'dark',
  },
  {
    text: '14',
    value: 14,
    color: 'red',
  },
  {
    text: '15',
    value: 15,
    color: 'dark',
  },
  {
    text: '16',
    value: 16,
    color: 'red',
  },
  {
    text: '17',
    value: 17,
    color: 'dark',
  },
  {
    text: '18',
    value: 18,
    color: 'red',
  },
  {
    text: '19',
    value: 19,
    color: 'red',
  },
  {
    text: '20',
    value: 20,
    color: 'dark',
  },
  {
    text: '21',
    value: 21,
    color: 'red',
  },
  {
    text: '22',
    value: 22,
    color: 'dark',
  },
  {
    text: '23',
    value: 23,
    color: 'red',
  },
  {
    text: '24',
    value: 24,
    color: 'dark',
  },
  {
    text: '25',
    value: 25,
    color: 'red',
  },
  {
    text: '26',
    value: 26,
    color: 'dark',
  },
  {
    text: '27',
    value: 27,
    color: 'red',
  },
  {
    text: '28',
    value: 28,
    color: 'dark',
  },
  {
    text: '29',
    value: 29,
    color: 'dark',
  },
  {
    text: '30',
    value: 30,
    color: 'red',
  },
  {
    text: '31',
    value: 31,
    color: 'dark',
  },
  {
    text: '32',
    value: 32,
    color: 'red',
  },
  {
    text: '33',
    value: 33,
    color: 'dark',
  },
  {
    text: '34',
    value: 34,
    color: 'red',
  },
  {
    text: '35',
    value: 35,
    color: 'dark',
  },
  {
    text: '36',
    value: 36,
    color: 'red',
  },
]