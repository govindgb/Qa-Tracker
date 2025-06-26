"use client";

import { motion } from "framer-motion";
import { ClipboardList, Bug, CheckCircle, MessageSquare } from "lucide-react";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { DashboardChart } from "@/app/components/dashboard-chart";
import { RecentActivity } from "@/app/components/recent-activity";

export default function DashboardPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout>
      <motion.div className="p-6 md:p-8" initial="hidden" animate="show" variants={container}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">QA Monitor Dashboard</h1>
          <p className="text-muted-foreground">Overview of your test cases, bug reports, and feedback loops.</p>
        </div>

        <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={item}>
            <Card className="dark:bg-[#272727]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Test Cases</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">132</div>
                <p className="text-xs text-muted-foreground">+10 new cases this week</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dark:bg-[#272727]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Bugs</CardTitle>
                <Bug className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27</div>
                <p className="text-xs text-muted-foreground">+5 reported today</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dark:bg-[#272727]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Passed Tests</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">Test pass rate this cycle</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dark:bg-[#272727]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedback</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">Responses from developers</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <motion.div variants={item}>
            <Card className="dark:bg-[#272727]">
              <CardHeader>
                <CardTitle>Test Execution Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="dark:bg-[#272727]">
              <CardHeader>
                <CardTitle>Recent Test Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
