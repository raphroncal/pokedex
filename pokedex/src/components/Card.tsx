import { PokemonType } from "./PokemonType";

interface Stat {

}

interface Type {

}

export interface PokemonProps {
    id: number;
    name: string;
    // stats: Stat[];
    // types: Type[];
}

export const Card = ({
    id,
    name,
    // stats,
    // types
}: PokemonProps) => {

    const types = ["fire", "fighting"];
    return (
        <div className="flex flex-col h-[28rem] w-80 p-8 rounded-3xl bg-slate-900">
            <div className="flex justify-center items-center size-full">
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`} alt="pokemon" className="size-56"/>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="font-semibold text-3xl">{name}</p>
                    <p className="text-slate-500">#{id}</p>
                </div>
                <div className="flex justify-end gap-2">
                    {types.map((type) => 
                        <PokemonType type={type}></PokemonType>
                    )}
                </div>
            </div>
        </div>
    );
};