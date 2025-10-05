"use client";

import { useEffect, useState } from "react";
import { RequestTTE } from "@/app/types/RequestTTE";
import Link from "next/link";
import { statusTicket } from "@/constants/statusTicket";

export default function RequestTTEPage() {
  const [tteDatas, setTteDatas] = useState<RequestTTE[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  async function fetchData(page: number) {
    const res = await fetch(
      `/api/requestForm?page=${page}&limit=${itemsPerPage}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    setTteDatas(json.data);
    setTotalItems(json.total);
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      try {
        const res = await fetch(`/api/requestForm/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("Request deleted successfully.");
          fetchData(currentPage); // Refresh data after deletion
        } else {
          alert("Failed to delete request.");
        }
      } catch (error) {
        console.error("Error deleting request:", error);
        alert("An error occurred while deleting the request.");
      }
    }
  }

  return (
    <div className="w-full">
        <Link
            href={`/admin/request-tte/create`} 
            className="btn-beta text-white text-xs p-2 rounded">
                Tambah
        </Link>
      <table className="border border-slate-300 text-xs border-m rounded shadow-md text-center w-full p-4 my-4">
        <thead className="bg-slate-200">
          <tr className="py-2 my-2 border-b border-slate-300">
            <th className="p-2">#</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Position</th>
            <th className="p-2">Email</th>
            <th className="p-2">Description</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tteDatas.map((tteData, index) => (
            <tr key={tteData.id} className="hover:bg-gray-100 border-b border-slate-200">
              <td className="p-1">{index+1}</td>
              <td className="p-1">{tteData.fullName}</td>
              <td className="p-1">{tteData.position}</td>
              <td className="p-1">{tteData.email}</td>
              <td>{tteData.description}</td>
              <td className="p-1 ">
                {statusTicket.map((status) =>
                  status.id === tteData.status_request ? (
                    <p
                      key={status.id}
                      className="bg-slate-200 rounded-full text-blues text-[10px] px-2 py-1"
                    >
                      {status.label}
                    </p>
                  ) : null
                )}
              </td>
              <td className="flex justify-center p-2">
                <Link
                    href={`/admin/request-tte/${tteData.id}`}
                    className="bg-green-500 px-2 py-1 m-1 rounded text-white hover:cursor-pointer">
                        Lihat
                </Link>
                <Link 
                    href={`/admin/request-tte/${tteData.id}/edit`}
                    className="bg-yellow-500 px-2 py-1 m-1 rounded text-white hover:cursor-pointer">
                  Edit
                </Link>
                <button 
                    onClick={() => handleDelete(tteData.id)}
                    className="bg-red-500 px-2 py-1 m-1 rounded text-white hover:cursor-pointer">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2 mt-4 text-xs">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:cursor-pointer"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 hover:cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
