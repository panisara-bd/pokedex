export type PaginatedResponse<Collection> = {
  docs: Collection[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type PokemonType = {
  id: number;
  name: string;
  image: string;
};

export type UserType = {
  id: string;
  username: string;
};

export type PokemonLikeType = {
  id: string;
  pokemon: PokemonType;
  user: UserType;
};
