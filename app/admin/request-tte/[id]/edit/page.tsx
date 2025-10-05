'use client';

import FormRequestEditTTE from '@/components/forms/FormRequestEditTTE';
import React, { useEffect, useState } from 'react';
import { RequestTTE } from "@/app/types/RequestTTE";

  export default function RequestEditTTEPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // ✅ unwrap Promise params

  const [tteData, setTteData] = useState<RequestTTE | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(`/api/requestForm/${id}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      
      const json = await res.json();
      console.log('Fetched data:', json);

      // Cek beberapa kemungkinan struktur respons
      if (json.data) {
        setTteData(json.data);
      } else if (json) {
        // Jika respons langsung berisi data (tanpa properti 'data')
        setTteData(json);
      } else {
        throw new Error('Invalid data structure');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!tteData) {
    return <p>No data found</p>;
  }

  return (
    <FormRequestEditTTE 
      id={tteData.id} 
      fullName={tteData.fullName} 
      nik={tteData.nik} 
      nip={tteData.nip} 
      unit={tteData.unit} 
      position={tteData.position} 
      email={tteData.email}
      phoneNumber={tteData.phoneNumber}
      certificateNumber={tteData.certificateNumber}
      description={tteData.description}
      identityImage={tteData.identityImage}
      ticket={tteData.ticket}
      status_request={tteData.status_request}
      createdAt={tteData.createdAt}
      updatedAt={tteData.updatedAt}
    />
  );
}