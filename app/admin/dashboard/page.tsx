"use client";
import { RequestTTE } from "@/app/types/RequestTTE";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [tteDatas, setTteDatas] = useState<RequestTTE[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const [queue, setQueue] = useState(0);
  const [validation, setValidation] = useState(0);
  const [calling, setCalling] = useState(0);
  const [verification, setVerification] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  async function fetchData(page: number) {
    const res = await fetch(`/api/requestForm/all`, { cache: "no-store" });
    const json = await res.json();
    const datas = json.data;

    // hitung manual berdasarkan value
    const queueCount = datas.filter(
      (d: { status_request: string }) => d.status_request === "1"
    ).length;

    const validationCount = datas.filter(
      (d: { status_request: string }) => d.status_request === "2"
    ).length;

    const callingCount = datas.filter(
      (d: { status_request: string }) => d.status_request === "3"
    ).length;

    const verificationCount = datas.filter(
      (d: { status_request: string }) => d.status_request === "4"
    ).length;

    const doneCount = datas.filter(
      (d: { status_request: string }) => d.status_request === "5"
    ).length;

    setQueue(queueCount);
    setValidation(validationCount);
    setCalling(callingCount);
    setVerification(verificationCount);
    setDone(doneCount);

    setTteDatas(datas);
    setTotalItems(json.total);
  }

  // 🔹 Grouping data by date
  const dailyData = (() => {
    const grouped: Record<string, number> = {};

    tteDatas.forEach((d) => {
      const date = new Date(d.createdAt).toLocaleDateString("id-ID"); // contoh: 30/09/2025
      grouped[date] = (grouped[date] || 0) + 1;
    });

    return Object.entries(grouped).map(([date, count]) => ({
      date,
      count,
    }));
  })();

  return (
    <div className="flex flex-col gap-4">
      {/* Statistik jumlah */}
      <div className="flex w-full gap-4">
        <div className="border border-slate-200 shadow-md rounded p-4 text-center w-full">
          <p className="text-4xl font-black">{totalItems}</p>
          <h1 className="text-sm">Jumlah Semua Data</h1>
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="border border-slate-200 shadow-md rounded p-4 text-center w-full">
          <p className="text-4xl font-black">{queue}</p>
          <h1 className="text-sm">ANTRIAN</h1>
        </div>
        <div className="border border-slate-200 shadow-md rounded p-4 text-center w-full">
          <p className="text-4xl font-black">{validation}</p>
          <h1 className="text-sm">VALIDATION</h1>
        </div>
        <div className="border border-slate-200 shadow-md rounded p-4 text-center w-full">
          <p className="text-4xl font-black">{calling}</p>
          <h1 className="text-sm">CALLING</h1>
        </div>
        <div className="border border-slate-200 shadow-md rounded p-4 text-center w-full">
          <p className="text-4xl font-black">{verification}</p>
          <h1 className="text-sm">VERIFICATION</h1>
        </div>
        <div className="border border-slate-200 shadow-md rounded p-4 text-center w-full">
          <p className="text-4xl font-black">{done}</p>
          <h1 className="text-sm">DONE</h1>
        </div>
      </div>

      {/* 🔹 Chart per hari */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Tracking Request Per Hari</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
