import { useState, useEffect } from "react";
import { PokemonType } from "./PokemonType";

export interface PokemonObject {
    name: string;
    url: string;
}

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

    useEffect(() => {
        const fetchDataForPosts = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                let postsData = await response.json();
                setData(postsData);
                console.log(postsData);
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

    const paddedId = data?.id.toString().padStart(3, "0");

    const openModal = () => {
        setIsModalOpen(true);
        console.log("please");
        console.log(data?.stats);
    };

    const closeModal = () => {
        console.log("here!!!", isModalOpen);
        setIsModalOpen(false);
        console.log("bsih...", isModalOpen);
    };

    if (loading) {
        return <div>""</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return (
        <div
            className="flex flex-col h-72 w-52 p-6 rounded-3xl bg-slate-900"
            onClick={openModal}
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
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-slate-900 opacity-50"></div>
                    <div
                        className="relative bg-slate-950 rounded-lg p-8 w-[30rem]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => {
                                closeModal();
                            }}
                            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-900"
                        >
                            <svg
                                className="w-6 h-6 fill-current fill-slate-50"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                                    fillRule="nonzero"
                                />
                            </svg>
                        </button>
                        <div className="flex justify-between mt-4 items-end">
                            <div className="flex flex-col">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">
                                        {name}
                                    </h2>
                                </div>
                                <div>
                                    <img
                                        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`}
                                        alt="pokemon"
                                        className="size-32"
                                    />
                                </div>
                            </div>
                            <div className="w-6/12">
                                {data
                                    ? data.stats.map(
                                          (stat: Stat, index: number) => (
                                              <div className="flex justify-between">
                                                  <div>
                                                      <p>{stat?.stat.name}</p>
                                                  </div>
                                                  <div>
                                                      <p>{stat.base_stat}</p>
                                                  </div>
                                              </div>
                                          )
                                      )
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
