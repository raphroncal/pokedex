import { Stat, PokemonDetails } from "./Card";

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
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-slate-900 opacity-50"></div>
            <div
                className="relative bg-slate-950 rounded-lg p-8 w-[30rem]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setIsModalOpen(false)}
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
                            <h2 className="text-2xl font-bold mb-4">{name}</h2>
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
                            ? data.stats.map((stat: Stat, index: number) => (
                                  <div
                                      className="flex justify-between"
                                      key={index}
                                  >
                                      <div>
                                          <p>{stat?.stat.name}</p>
                                      </div>
                                      <div>
                                          <p>{stat.base_stat}</p>
                                      </div>
                                  </div>
                              ))
                            : undefined}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
