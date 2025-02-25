
interface TeamStanding {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  logo: string;
}

interface StandingsProps {
  teams: TeamStanding[];
}

export const Standings = ({ teams }: StandingsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#121b30] via-[#121b40] to-[#121b30] p-4">
        <h2 className="text-xl font-bold text-white">Premier League</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
          <tr className="text-xs uppercase border-b border-gray-100">
            <th className="px-4 py-3 text-left font-semibold">Pos</th>
            <th className="px-4 py-3 text-left font-semibold">Club</th>
            <th className="px-4 py-3 text-center font-semibold">Played</th>
            <th className="px-4 py-3 text-center font-semibold">Won</th>
            <th className="px-4 py-3 text-center font-semibold">Drawn</th>
            <th className="px-4 py-3 text-center font-semibold">Lost</th>
            <th className="px-4 py-3 text-center font-semibold">GF</th>
            <th className="px-4 py-3 text-center font-semibold">GA</th>
            <th className="px-4 py-3 text-center font-semibold">GD</th>
            <th className="px-4 py-3 text-center font-semibold">Pts</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {teams.map((team) => (
              <tr key={team.team} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm flex items-center gap-1">
                  {team.position}
                  <span className="text-gray-400">•</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={team.logo} 
                      alt={`${team.team} logo`} 
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-medium">{team.team}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-sm">{team.played}</td>
                <td className="px-4 py-3 text-center text-sm">{team.won}</td>
                <td className="px-4 py-3 text-center text-sm">{team.drawn}</td>
                <td className="px-4 py-3 text-center text-sm">{team.lost}</td>
                <td className="px-4 py-3 text-center text-sm">{team.gf}</td>
                <td className="px-4 py-3 text-center text-sm">{team.ga}</td>
                <td className="px-4 py-3 text-center text-sm">
                  {team.gd > 0 ? `+${team.gd}` : team.gd}
                </td>
                <td className="px-4 py-3 text-center font-semibold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
