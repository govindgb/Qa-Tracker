"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "@/lib/axios";

interface Bug {
  bugTitle: string;
  description: string;
  priority: string;
}

interface ReportPayload {
  testing_report: {
    project_name: string;
    userName: string;
    feedback: string;
    bugDetails: Bug[];
    status: string;
  };
}

interface ReportContextType {
  submitReport: (data: ReportPayload) => Promise<void>;
}

const ReportContext = createContext<ReportContextType | null>(null);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const submitReport = async (data: ReportPayload) => {
    try {
      const res = await axios.post("/api/bug", data);
      console.log("Report submitted:", res.data);
    } catch (err) {
      console.error("Error submitting report:", err);
    }
  };

  return (
    <ReportContext.Provider value={{ submitReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("useReport must be used within ReportProvider");
  return ctx;
};
