"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { PokemonObject } from "@/components/Card";

export default function Home() {
    const [data, setData] = useState<PokemonObject[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [copy, setCopy] = useState<PokemonObject[]>();
    const [query, setQuery] = useState("");
    const [sortOption, setSortOption] = useState("id");
    const [limit, setLimit] = useState(10);

    const search = (searchQuery: string) => {
        const dataCopy = data?.filter((pokemon: PokemonObject) =>
            pokemon.name.toLocaleLowerCase().includes(searchQuery)
        );

        setCopy(dataCopy);
    };

    const sortByName = (a: PokemonObject, b: PokemonObject) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        return nameA.localeCompare(nameB);
    };

    const sortByID = (a: PokemonObject, b: PokemonObject) => {
        const idA = Number(a.url.split("/").slice(-2)[0]);
        const idB = Number(b.url.split("/").slice(-2)[0]);

        return idA - idB;
    };

    const handleSortChange = (event: any) => {
        setSortOption(event.target.value);
    };

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
                setCopy(postsData.results);
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
        <div className="flex flex-col gap-10 pt-10 px-10 xl:px-20 2xl:px-80">
            <div className="flex justify-between">
                <div>
                    <p className="text-3xl font-bold">pokedex</p>
                </div>
                <div>
                    <input
                        name="query"
                        placeholder="Latios"
                        className="pl-6 py-1.5 rounded-lg border border-slate-300 bg-slate-900"
                        onChange={(e) => {
                            setQuery(e.target.value.toLocaleLowerCase());
                            search(e.target.value.toLocaleLowerCase());
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col items-end">
                    <div className="flex gap-1 w-min x">
                        <div>
                            <input
                                id="sortById"
                                type="radio"
                                name="sort"
                                value="id"
                                checked={sortOption === "id"}
                                onChange={handleSortChange}
                            />
                        </div>
                        <div>ID</div>
                    </div>
                    <div className="flex gap-1 w-min">
                        <div>
                            <input
                                id="sortByName"
                                type="radio"
                                name="sort"
                                value="name"
                                checked={sortOption === "name"}
                                onChange={handleSortChange}
                            />
                        </div>
                        <div>Name</div>
                    </div>
                </div>
                <div className="flex flex-wrap place-content-center gap-4">
                    {!loading && copy
                        ? copy
                              .sort(
                                  sortOption == "name" ? sortByName : sortByID
                              )
                              .slice(0, limit)
                              .map((pokemon: PokemonObject, index) => (
                                  <div className="flex justify-center">
                                      <Card
                                          name={pokemon.name}
                                          url={pokemon.url}
                                          key={index}
                                      ></Card>
                                  </div>
                              ))
                        : ""}
                </div>
            </div>
            {!loading && copy?.length ? (
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            setLimit((limit) => limit + 10);
                        }}
                        className="bg-slate-800 px-4 py-1 rounded-lg"
                    >
                        Load More
                    </button>
                </div>
            ) : null}
        </div>
    );
}
