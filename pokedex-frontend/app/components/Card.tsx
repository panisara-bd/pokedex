import { PokemonType } from 'types';
import Pokeball from './Pokeball';

type Props = {
  pokemon: PokemonType;
};

export default function Card({ pokemon }: Props) {
  const { id, image } = pokemon;
  const formattedName = pokemon.name.replace(/-/g, ' ');

  return (
    <div className="flex flex-row w-80 mx-10 sm:mx-0 gap-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col flex-1">
        <h1 className="capitalize mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {formattedName}
        </h1>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          #<span className="font-bold">{id}</span>
        </p>
        <a href="" className="font-light text-xs underline text-blue-400">
          See full details
        </a>
      </div>
      {image ? (
        <img src={image} alt={formattedName} className="flex-1 w-1/2" />
      ) : (
        <Pokeball className="flex-1 w-1/2" />
      )}
    </div>
  );
}
