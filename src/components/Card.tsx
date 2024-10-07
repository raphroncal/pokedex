import { useState, useEffect } from "react";
import { PokemonObject } from "@/app/page";
import { PokemonType } from "./PokemonType";
import Modal from "./Modal";

export interface PokemonDetails {
    id: number;
    types: Type[];
    stats: Stat[];
}

export interface Type {
    slot: number;
    type: PokemonObject;
}

export interface StatDetails {
    name: string;
    url: string;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: StatDetails;
}

export const Card = ({ name, url }: PokemonObject) => {
    const [data, setData] = useState<PokemonDetails>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const paddedId = data?.id.toString().padStart(3, "0");

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
    }, [url, isModalOpen]);

    if (loading) {
        return null;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    /**
     * TODO: play around with the ff:
     * border
     * spacing
     * padding
     * no bg?
     * image size
     * alignment
     * typing positioning
     */
    return (
        <div
            className="flex flex-col h-72 w-52 p-6 rounded-3xl bg-slate-900"
            onClick={() => setIsModalOpen(true)}
        >
            <div className="flex justify-center items-center size-full">
                <img
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`}
                    alt="pokemon"
                    className="size-32"
                />
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

            {isModalOpen && (
                <Modal
                    name={name}
                    data={data}
                    paddedId={paddedId ? paddedId : ""}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    );
};
