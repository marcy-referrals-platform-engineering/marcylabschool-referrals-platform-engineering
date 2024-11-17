function TableOneLoading() {
  return (
    <div className="col-span-12  xl:col-span-8  rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default sm:px-7.5 ">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        YOUR REFERRALS
      </h4>

      <div className="overflow-x-auto">
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
    </div>
  );
}

export default TableOneLoading;
