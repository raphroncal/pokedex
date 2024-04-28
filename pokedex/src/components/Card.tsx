interface Type {

}

export interface Pokemon {
    id: number;
    name: string;
    types: Type[];
}

export const Card = () => {
    const name = "Cyndaquil"
    const id = 155;
    return (
        <div className="flex flex-col h-96 w-80 p-8 rounded-3xl bg-slate-900">
            <div className="flex justify-center items-center size-full">
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`} alt="pokemon" className="size-56"/>
            </div>
            <div>
                <div>
                    <p className="font-bold text-3xl">{name}</p>
                    <p className="text-slate-500">#{id}</p>
                </div>
                <div className="flex justify-end">
                    Grass
                </div>
            </div>
        </div>
    );
};