import { useState, useEffect, useCallback } from 'react';

export interface Company {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  fullLogo: string | null;
  isotipo: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Company[];
  total: number;
  message: string;
}

interface UseCompaniesParams {
  search?: string;
  status?: string;
}

export const useCompanies = (params: UseCompaniesParams = {}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      
      if (params.search && params.search.trim()) {
        searchParams.append('search', params.search.trim());
      }
      
      if (params.status && (params.status === 'active' || params.status === 'inactive')) {
        searchParams.append('status', params.status);
      }

      const url = `/api/companies${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result: ApiResponse = await response.json();

      if (result.success) {
        setCompanies(result.data);
        setTotal(result.total);
      } else {
        throw new Error(result.message || 'Error al obtener las empresas');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  }, [params.search, params.status]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const refetch = useCallback(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    error,
    total,
    refetch,
  };
}; 