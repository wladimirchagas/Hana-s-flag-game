/**
 * FIFA World Cup titles per association, for the Football-crests grid's two
 * World-Cup groupings ("FIFA Men's World Cups" / "FIFA Women's World Cups").
 *
 * SOURCED, never from memory (same discipline as every count in this repo). Keyed
 * by the grid card's id — an ISO 3166-1 alpha-2 country code, except England's
 * 1966 men's title, which belongs to the England home-nation card
 * (`gb-eng-football-crest`), not to the United Kingdom.
 *
 * Men's — as of the 2026 FIFA World Cup, won by Spain (their 2nd title, defeating
 * holders Argentina): eight winners, 23 titles.
 *   Source: https://en.wikipedia.org/wiki/FIFA_World_Cup
 * Women's — as of the 2023 FIFA Women's World Cup (won by Spain, their 1st):
 * five winners, nine titles.
 *   Source: https://en.wikipedia.org/wiki/FIFA_Women%27s_World_Cup
 */

/** Men's FIFA World Cup titles. Sum = 23 across eight associations. */
export const MENS_WORLD_CUP_TITLES: Readonly<Record<string, number>> = {
  BR: 5, // Brazil — 1958, 1962, 1970, 1994, 2002
  DE: 4, // Germany — 1954, 1974, 1990, 2014
  IT: 4, // Italy — 1934, 1938, 1982, 2006
  AR: 3, // Argentina — 1978, 1986, 2022
  ES: 2, // Spain — 2010, 2026
  UY: 2, // Uruguay — 1930, 1950
  FR: 2, // France — 1998, 2018
  "gb-eng-football-crest": 1, // England — 1966
};

/** Women's FIFA World Cup titles. Sum = 9 across five associations. */
export const WOMENS_WORLD_CUP_TITLES: Readonly<Record<string, number>> = {
  US: 4, // United States — 1991, 1999, 2015, 2019
  DE: 2, // Germany — 2003, 2007
  NO: 1, // Norway — 1995
  JP: 1, // Japan — 2011
  ES: 1, // Spain — 2023
};
