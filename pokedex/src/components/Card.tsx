import { useState, useEffect } from "react";
import { PokemonType } from "./PokemonType";

export interface PokemonObject {
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    stats: number[];
    types: Type[];
}

export interface Type {
    slot: number;
    type: PokemonObject;
}

export const Card = ({ name, url }: PokemonObject) => {
    const [data, setData] = useState<PokemonDetails>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

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
                setData(data);
            } finally {
                setLoading(false);
            }
        };

        fetchDataForPosts();
    }, [url]);

    const paddedId = data?.id.toString().padStart(3, "0");

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    if (loading) {
        return <div>""</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <div className="flex flex-col h-72 w-52 p-6 rounded-3xl bg-slate-900">
            <div className="flex justify-center items-center size-full">
                {/* {imageLoaded ? ( */}
                <img
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`}
                    alt="pokemon"
                    className="size-32"
                    onLoad={handleImageLoad}
                />
                {/* // ) : null} */}
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <p className="font-semibold text-xl">{name}</p>
                    <p className="text-sm text-slate-500">#{paddedId}</p>
                </div>
                <div className="flex justify-end gap-1">
                    {!loading && data
                        ? data.types.map((pokemon: Type, index: number) => (
                              <PokemonType
                                  type={pokemon.type.name}
                                  key={index}
                              ></PokemonType>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
};
