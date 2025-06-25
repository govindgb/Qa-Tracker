import DashboardLayout from "@/app/layouts/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[calc(100vh-4rem-3rem)]"> {/* Adjust height for header/footer */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard 👋</h2>
          <p className="mt-2 text-gray-600">Monitor your testing workflows.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
