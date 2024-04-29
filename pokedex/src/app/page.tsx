"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { PokemonProps } from "@/components/Card";

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.log(postsData.results);
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
        <div>
            {data &&
                data.map((pokemon: PokemonProps, index) => (
                    <Card
                        id={index + 1}
                        name={pokemon.name}
                        url={pokemon.url}
                        key={index}
                    ></Card>
                ))}
        </div>
    );
}
