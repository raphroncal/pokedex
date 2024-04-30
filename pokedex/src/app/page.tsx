"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { PokemonObject } from "@/components/Card";

export default function Home() {
    const [data, setData] = useState<PokemonObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState<PokemonObject[]>();
    const [sort, setSort] = useState("id");

    useEffect(() => {
        const fetchDataForPosts = async () => {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/?limit=1010&offset=0`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                let postsData = await response.json();
                setData(postsData.results);
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
        <div className="flex flex-col gap-10">
            <div>
                <p className="text-3xl">Pokedex</p>
            </div>
            <div className="flex flex-col gap-10 md:px-10 xl:px-20 2xl:px-80">
                <div className="flex justify-between items-center">
                    <div>
                        <form action="search">
                            <input
                                name="query"
                                placeholder="Latios"
                                className="pl-6 py-1.5 rounded-lg border border-slate-300 bg-slate-900"
                            />
                        </form>
                    </div>
                    <div>
                        <form action="">
                            <fieldset className="flex gap-2">
                                <label className="flex gap-1">
                                    <div>
                                        <input
                                            type="radio"
                                            name="sort"
                                            value="id"
                                            checked={true}
                                        />
                                    </div>
                                    <div>ID</div>
                                </label>
                                <label className="flex gap-1">
                                    <div>
                                        <input
                                            type="radio"
                                            name="sort"
                                            value="name"
                                        />
                                    </div>
                                    <div>Name</div>
                                </label>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-y-4">
                    {data.map((pokemon: PokemonObject, index) => (
                        <div className="flex justify-center">
                            <Card
                                name={pokemon.name}
                                url={pokemon.url}
                                key={index}
                            ></Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
