import { useEffect, useState } from "react";
import { PokemonDetails, PokemonObject } from "./Card";

export const Modal = ({ name, url }: PokemonObject) => {
    const [data, setData] = useState<PokemonDetails>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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

    return (
        <div className="flex">
            <div>
                <img
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`}
                    alt={name}
                    onClick={openModal}
                    className="cursor-pointer"
                />
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="relative bg-white rounded-lg p-8 max-w-md">
                        <button
                            onClick={closeModal}
                            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-900"
                        >
                            <svg
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                                    fillRule="nonzero"
                                />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{name}</h2>
                        {/* <p className="mb-2">Height: {pokemon.height}</p>
                        <p className="mb-2">Weight: {pokemon.weight}</p> */}
                        {/* Add more details about the Pokémon as needed */}
                    </div>
                </div>
            )}
        </div>
    );
};
