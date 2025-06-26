import DashboardLayout from "@/app/layouts/DashboardLayout";

export default function CheckProjectStatusPage() {
  return (
    <DashboardLayout>
      <div className="p-8 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Project Status</h1>
        <p className="text-gray-600">
          This is where you can monitor the current QA project progress.
        </p>
      </div>
    </DashboardLayout>
  );
}
