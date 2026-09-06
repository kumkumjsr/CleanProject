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
      className={`bg-white rounded-2xl shadow-lg border-l-8 ${color}
      p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex items-center justify-between">

        {/* Left Side */}
        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-2">
            {value}
          </h2>

          {change && (
            <div className="flex items-center gap-1 mt-3 text-green-600 text-sm font-semibold">
              <ArrowUpRight size={16} />
              <span>{change}</span>
            </div>
          )}

        </div>

        {/* Right Side */}
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
          <div className="text-4xl">
            {icon}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardCard;