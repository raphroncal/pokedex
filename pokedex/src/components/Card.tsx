import { useState, useEffect } from "react";
import { PokemonType } from "./PokemonType";

export interface Object {
    name: string;
    url: string;
}

export interface Type {
    slot: number;
    type: Object;
}

export interface PokemonProps {
    id: number;
    name: string;
    stats?: number[];
    types?: Type[];
    url: string;
}

export const Card = ({ id, name, url }: PokemonProps) => {
    // const types = ["fire", "fighting"];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const paddedId = id.toString().padStart(3, "0");

    useEffect(() => {
        const fetchDataForPosts = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                let postsData = await response.json();
                setData(postsData);
                setError(null);
            } catch (err: any) {
                setError(err.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDataForPosts();
    }, []);

    return (
        <div className="flex flex-col h-[28rem] w-80 p-8 rounded-3xl bg-slate-900">
            <div className="flex justify-center items-center size-full">
                <img
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`}
                    alt="pokemon"
                    className="size-56"
                />
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="font-semibold text-3xl">{name}</p>
                    <p className="text-slate-500">#{paddedId}</p>
                </div>
                <div className="flex justify-end gap-2">
                    {data &&
                        data?.types?.map((pokemon: Type, index: number) => (
                            <PokemonType
                                type={pokemon.type.name}
                                key={index}
                            ></PokemonType>
                        ))}
                </div>
            </div>
        </div>
    );
};
