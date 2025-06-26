import {
    ClipboardCheck,
    Bug,
    MessageSquareText,
  } from "lucide-react";
  
  export function RecentActivity() {
    const activities = [
      {
        icon: <ClipboardCheck className="h-4 w-4 text-green-600" />,
        message: "Test Case #101 marked as Passed",
      },
      {
        icon: <Bug className="h-4 w-4 text-red-600" />,
        message: "Bug #54 reported by QA team",
      },
      {
        icon: <MessageSquareText className="h-4 w-4 text-blue-600" />,
        message: "Feedback sent to Developer X",
      },
    ];
  
    return (
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div>{activity.icon}</div>
            <p className="text-sm text-gray-800 dark:text-gray-100">{activity.message}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default RecentActivity;
  