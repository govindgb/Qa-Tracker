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
    id?: string | null;
    project_name: string;
    userName: string;
    feedback: string;
    bugDetails: Bug[];
    status: string;
  };
}

interface ReportContextType {
  submitReport: (data: ReportPayload) => Promise<void>;
  getProjectDetails: (id: string) => Promise<any>;
  updateReport: (id: string, data: ReportPayload) => Promise<any>; // ✅ New
}


interface ReportContextType {
  submitReport: (data: ReportPayload) => Promise<void>;
  getProjectDetails: (id: string) => Promise<any>; // You can replace `any` with a proper type
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

  const getProjectDetails = async (id: string) => {
    try {
      const res = await axios.get(`/api/bug?id=${id}`);
      console.log("Project details fetched:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching project details:", err);
      throw err;
    }
  };

  const updateReport = async (id: string, data: ReportPayload) => {
    try {
      const res = await axios.put(`/api/bug?id=${id}`, data);
      console.log("Report updated:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error updating report:", err);
      throw new Error("Failed to update report. Please try again.");
    }
  };
  

  return (
    <ReportContext.Provider value={{ submitReport, getProjectDetails , updateReport }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("useReport must be used within ReportProvider");
  return ctx;
};
