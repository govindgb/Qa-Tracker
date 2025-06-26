export function DashboardChart() {
    return (
      <div className="p-4 bg-white dark:bg-[#272727] rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Test Execution Summary
        </h3>
  
        <div className="space-y-4">
          {/* Test Case Progress */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Test Cases Passed</span>
              <span className="text-green-600 font-medium">72%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[72%]"></div>
            </div>
          </div>
  
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Test Cases Failed</span>
              <span className="text-red-600 font-medium">18%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-[18%]"></div>
            </div>
          </div>
  
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Test Cases Skipped</span>
              <span className="text-yellow-600 font-medium">10%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 w-[10%]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  