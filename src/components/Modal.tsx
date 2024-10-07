import { Stat, PokemonDetails } from "./Card";
import StatBar from "./Stat";

interface ModalProps {
    name: string;
    data: PokemonDetails;
    paddedId: string;
    setIsModalOpen: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
    name,
    data,
    paddedId,
    setIsModalOpen,
}) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50"
            onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
            }}
        >
            <div className="relative rounded-lg w-[440px] space-y-5 px-6 py-4 z-10 bg-slate-900 border border-slate-700">
                {/* Header */}
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold capitalize">{name}</h2>
                    <button onClick={() => setIsModalOpen(false)}>
                        <svg
                            className="w-5 h-5 fill-current fill-slate-500 hover:fill-slate-400"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                                fillRule="nonzero"
                            />
                        </svg>
                    </button>
                </div>
                {/* Content */}
                <div className="flex flex-col gap-5">
                    <img
                        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`}
                        alt="pokemon"
                        className="size-32 self-center"
                    />
                    <div>
                        {data.stats.map((stat: Stat, index: number) => (
                            <StatBar
                                name={stat.stat.name}
                                stat={stat.base_stat}
                                key={index}
                            ></StatBar>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
