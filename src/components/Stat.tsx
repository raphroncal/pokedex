interface StatProps {
    name: string;
    stat: number;
    index: number;
}

const StatBar: React.FC<StatProps> = ({ name, stat, index }) => {
    interface IStat {
        [key: string]: string;
    }

    let statDict: IStat = {
        hp: "HP",
        attack: "Attack",
        defense: "Defense",
        "special-attack": "Sp. Atk",
        "special-defense": "Sp. Def",
        speed: "Speed",
    };

    let formattedName = statDict[name];
    let statColor;

    switch (true) {
        case stat < 30:
            statColor = "bg-stat-red";
            break;
        case stat < 60:
            statColor = "bg-stat-orange";
            break;
        case stat < 100:
            statColor = "bg-stat-yellow";
            break;
        case stat < 150:
            statColor = "bg-stat-green";
            break;
        default:
            statColor = "bg-stat-blue";
    }

    return (
        <div className="flex gap-x-5" key={index}>
            <div className="w-[60px]">
                <p className="text-nowrap">{formattedName}</p>
            </div>
            <div className="w-[28px]">
                <p className="text-right">{stat}</p>
            </div>
            <div className="py-1.5">
                <div
                    className={`${"h-full rounded-sm " + statColor}`}
                    style={{ width: stat + "px" }}
                ></div>
            </div>
        </div>
    );
};

export default StatBar;
