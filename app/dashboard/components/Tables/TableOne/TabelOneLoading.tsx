function TableOneLoading() {
  return (

      <div className="overflow-x-auto min-h-[16.5rem]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-meta-4 animate-pulse">
              {[
                "Name",
                "Email",
                "Toured",
                "Applied",
                "Accepted",
                "Enrolled",
              ].map((header, index) => (
                <th
                  key={index}
                  className="p-2.5 xl:p-5 text-sm font-medium uppercase text-left xsm:text-base"
                >
                  <div className="h-4 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(3)
              .fill("")
              .map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                  <td className="p-2.5 xl:p-5">
                    <div className="h-4 bg-gray-200 rounded-md w-full mx-auto"></div>
                  </td>
                  <td className="p-2.5 xl:p-5">
                    <div className="h-4 bg-gray-200 rounded-md w-full mx-auto"></div>
                  </td>
                  <td className="p-2.5 xl:p-5 text-center">
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 mx-auto"></div>
                  </td>
                  <td className="p-2.5 xl:p-5 text-center">
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 mx-auto"></div>
                  </td>
                  <td className="p-2.5 xl:p-5 text-center">
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 mx-auto"></div>
                  </td>
                  <td className="p-2.5 xl:p-5 text-center">
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 mx-auto"></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

  );
}

export default TableOneLoading;
