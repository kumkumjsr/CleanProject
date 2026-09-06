import { ArrowUpRight } from "lucide-react";


function DashboardCard({
    title,
    value,
    icon,
    color = "border-green-500",
    change = "",
}) {

    return (

        <div
            className={`
                bg-white
                rounded-2xl
                border
                border-gray-100
                border-l-4
                ${color}
                p-6
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
            `}
        >

            <div className="flex items-center justify-between gap-4">


                {/* ========================= */}
                {/* CARD CONTENT */}
                {/* ========================= */}

                <div className="min-w-0">

                    <p className="text-gray-500 text-sm font-medium">
                        {title}
                    </p>


                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {value}
                    </h2>


                    {change && (

                        <div
                            className="
                                flex
                                items-center
                                gap-1
                                mt-3
                                text-green-600
                                text-sm
                                font-semibold
                            "
                        >

                            <ArrowUpRight size={16} />

                            <span>
                                {change}
                            </span>

                        </div>

                    )}

                </div>


                {/* ========================= */}
                {/* ICON */}
                {/* ========================= */}

                <div
                    className="
                        w-14
                        h-14
                        flex-shrink-0
                        rounded-2xl
                        bg-green-50
                        text-green-700
                        flex
                        items-center
                        justify-center
                        text-3xl
                        transition-all
                        duration-300
                        group-hover:bg-green-100
                    "
                >

                    {icon}

                </div>


            </div>

        </div>

    );

}


export default DashboardCard;
