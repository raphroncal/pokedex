export const PokemonType = ({ type }: { type: string }) => {
    interface ColorType {
        [key: string]: string;
    }

    const color: ColorType = {
        normal: "px-4 rounded-full bg-type-normal",
        fire: "px-4 rounded-full bg-type-fire",
        water: "px-4 rounded-full bg-type-water",
        electric: "px-4 rounded-full bg-type-electric",
        grass: "px-4 rounded-full bg-type-grass",
        ice: "px-4 rounded-full bg-type-ice",
        fighting: "px-4 rounded-full bg-type-fighting",
        poison: "px-4 rounded-full bg-type-poison",
        ground: "px-4 rounded-full bg-type-ground",
        flying: "px-4 rounded-full bg-type-flying",
        psychic: "px-4 rounded-full bg-type-psychic",
        bug: "px-4 rounded-full bg-type-bug",
        rock: "px-4 rounded-full bg-type-rock",
        ghost: "px-4 rounded-full bg-type-ghost",
        dragon: "px-4 rounded-full bg-type-dragon",
        dark: "px-4 rounded-full bg-type-dark",
        steel: "px-4 rounded-full bg-type-steel",
        fairy: "px-4 rounded-full bg-type-fairy",
    };

    return (
        <div className={`${color[type]}`}>
            <p className="font-mono text-xs">{type}</p>
        </div>
    );
};
