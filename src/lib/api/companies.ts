import { Company } from '@/app/api/companies/route';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message: string;
  total?: number;
}

export interface CreateCompanyData {
  name: string;
  fullLogo?: string | null;
  isotipo?: string | null;
}

export interface UpdateCompanyData {
  name?: string;
  status?: 'active' | 'inactive';
  fullLogo?: string | null;
  isotipo?: string | null;
}

export interface CompanyFilters {
  search?: string;
  status?: 'active' | 'inactive';
}

class CompaniesAPI {
  private baseUrl = '/api/companies';

  // Obtener todas las empresas
  async getCompanies(filters?: CompanyFilters): Promise<ApiResponse<Company[]>> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.search) {
        params.append('search', filters.search);
      }
      
      if (filters?.status) {
        params.append('status', filters.status);
      }

      const url = `${this.baseUrl}${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener empresas:', error);
      return {
        success: false,
        error: 'Error de conexión',
        message: 'No se pudieron obtener las empresas'
      };
    }
  }

  // Obtener empresa por ID
  async getCompany(id: string): Promise<ApiResponse<Company>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener empresa:', error);
      return {
        success: false,
        error: 'Error de conexión',
        message: 'No se pudo obtener la empresa'
      };
    }
  }

  // Crear nueva empresa
  async createCompany(data: CreateCompanyData): Promise<ApiResponse<Company>> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      return await response.json();
    } catch (error) {
      console.error('Error al crear empresa:', error);
      return {
        success: false,
        error: 'Error de conexión',
        message: 'No se pudo crear la empresa'
      };
    }
  }

  // Actualizar empresa completa
  async updateCompany(id: string, data: UpdateCompanyData): Promise<ApiResponse<Company>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      return await response.json();
    } catch (error) {
      console.error('Error al actualizar empresa:', error);
      return {
        success: false,
        error: 'Error de conexión',
        message: 'No se pudo actualizar la empresa'
      };
    }
  }

  // Cambiar estado de empresa (activar/desactivar)
  async toggleCompanyStatus(id: string, status: 'active' | 'inactive'): Promise<ApiResponse<Company>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      return await response.json();
    } catch (error) {
      console.error('Error al cambiar estado de empresa:', error);
      return {
        success: false,
        error: 'Error de conexión',
        message: 'No se pudo cambiar el estado de la empresa'
      };
    }
  }

  // Eliminar empresa
  async deleteCompany(id: string): Promise<ApiResponse<Company>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }

      return await response.json();
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
      return {
        success: false,
        error: 'Error de conexión',
        message: 'No se pudo eliminar la empresa'
      };
    }
  }
}

// Exportar instancia singleton
export const companiesAPI = new CompaniesAPI();

// Exportar la clase para casos donde se necesite una nueva instancia
export default CompaniesAPI; 