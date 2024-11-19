interface AdminControlsProps {
    searchQuery: string;
    filteredUsers: any[];
    handleUserSelect: (email: string, name: string) => void;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
    setStatsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
    view: string;
    setView: React.Dispatch<React.SetStateAction<string>>;
    setSelectedUserStats: React.Dispatch<React.SetStateAction<any>>;
  }
  
  const AdminControls: React.FC<AdminControlsProps> = ({
    searchQuery,
    filteredUsers,
    handleUserSelect,
    handleSearchChange,
    setRefresh,
    setSelectedUserEmail,
    setStatsLoaded,
    view,
    setView,
    setSelectedUserStats,
  }) => {
    return (
      <div className="mb-4 border-b pb-5 pt-5 z-[20] translate-y-[-1rem] sticky top-[5.05rem] bg-gray-50 bg-opacity-80 backdrop-blur m-auto flex gap-2 align-middle">
        <button
          onClick={() => {
            if (view !== "all") {
              setStatsLoaded(false);
              setTimeout(() => {
                setStatsLoaded(true);
              }, 300);
              setSelectedUserEmail(null);
              setView("all");
              setRefresh((prev) => !prev);
              setSelectedUserStats(null);
            }
          }}
          className={`self-center cursor-pointer duration-100 border-[black] border ${
            view === "all" ? "bg-[#261f1d] text-white" : "bg-[white] hover:opacity-50 text-black"
          } p-2`}
        >
          All Referrals
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a user by name or email"
          className={`border p-2 ${
            view !== "all" ? "bg-[#261f1d] border-black text-white" : "bg-gray-50"
          } w-[15.5rem]`}
        />
        {searchQuery.length > 2 && filteredUsers.length > 0 && (
          <div className="absolute bg-white border shadow-md mt-1 w-[20rem] translate-x-[3.1rem] translate-y-[2.2rem] max-h-40 overflow-y-auto z-50">
            {filteredUsers.map((user) => (
              <div
                key={user.email}
                onClick={() => handleUserSelect(user.email, user.name)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {user.name} ({user.email})
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default AdminControls;
  