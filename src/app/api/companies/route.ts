import { NextRequest, NextResponse } from 'next/server';

export interface Company {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  fullLogo: string | null;
  isotipo: string | null;
  createdAt: string;
  updatedAt: string;
}

// Simulación de base de datos en memoria
let companies: Company[] = [
  {
    id: '1',
    name: 'Empresa Tecnológica ABC',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    name: 'Corporación XYZ',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: '3',
    name: 'Empresa Innovadora DEF',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString(),
  },
  {
    id: '4',
    name: 'Compañía Global GHI',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-03-20').toISOString(),
    updatedAt: new Date('2024-03-20').toISOString(),
  },
  {
    id: '5',
    name: 'Empresa Suspendida JKL',
    status: 'inactive',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-01-30').toISOString(),
    updatedAt: new Date('2024-04-01').toISOString(),
  },
  {
    id: '6',
    name: 'Soluciones Integrales MNO',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-04-05').toISOString(),
    updatedAt: new Date('2024-04-05').toISOString(),
  },
  {
    id: '7',
    name: 'Consultora PQR',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-04-10').toISOString(),
    updatedAt: new Date('2024-04-10').toISOString(),
  },
  {
    id: '8',
    name: 'Desarrollos STU',
    status: 'inactive',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-04-15').toISOString(),
    updatedAt: new Date('2024-04-15').toISOString(),
  },
  {
    id: '9',
    name: 'Servicios VWX',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-04-20').toISOString(),
    updatedAt: new Date('2024-04-20').toISOString(),
  },
  {
    id: '10',
    name: 'Grupo YZA',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-04-25').toISOString(),
    updatedAt: new Date('2024-04-25').toISOString(),
  },
  {
    id: '11',
    name: 'Innovación Digital BCD',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-05-01').toISOString(),
    updatedAt: new Date('2024-05-01').toISOString(),
  },
  {
    id: '12',
    name: 'Tecnología Avanzada EFG',
    status: 'inactive',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-05-05').toISOString(),
    updatedAt: new Date('2024-05-05').toISOString(),
  },
  {
    id: '13',
    name: 'Soluciones Móviles HIJ',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-05-10').toISOString(),
    updatedAt: new Date('2024-05-10').toISOString(),
  },
  {
    id: '14',
    name: 'Empresa de Datos KLM',
    status: 'active',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-05-15').toISOString(),
    updatedAt: new Date('2024-05-15').toISOString(),
  },
  {
    id: '15',
    name: 'Redes y Comunicaciones NOP',
    status: 'inactive',
    fullLogo: null,
    isotipo: null,
    createdAt: new Date('2024-05-20').toISOString(),
    updatedAt: new Date('2024-05-20').toISOString(),
  },
];

// GET - Obtener todas las empresas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let filteredCompanies = [...companies];

    // Filtrar por búsqueda
    if (search) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.id.includes(search)
      );
    }

    // Filtrar por estado
    if (status && (status === 'active' || status === 'inactive')) {
      filteredCompanies = filteredCompanies.filter(company => company.status === status);
    }

    // Ordenar por fecha de creación (más recientes primero)
    filteredCompanies.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      data: filteredCompanies,
      total: filteredCompanies.length,
      message: 'Empresas obtenidas exitosamente'
    });
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudieron obtener las empresas'
      },
      { status: 500 }
    );
  }
}

// POST - Crear nueva empresa
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, fullLogo, isotipo } = body;

    // Validaciones
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Nombre requerido',
          message: 'El nombre de la empresa es obligatorio'
        },
        { status: 400 }
      );
    }

    // Verificar si ya existe una empresa con el mismo nombre
    const existingCompany = companies.find(
      company => company.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (existingCompany) {
      return NextResponse.json(
        {
          success: false,
          error: 'Empresa duplicada',
          message: 'Ya existe una empresa con este nombre'
        },
        { status: 409 }
      );
    }

    // Generar nuevo ID
    const newId = (Math.max(...companies.map(c => parseInt(c.id))) + 1).toString();

    // Crear nueva empresa
    const newCompany: Company = {
      id: newId,
      name: name.trim(),
      status: 'active',
      fullLogo: fullLogo || null,
      isotipo: isotipo || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    companies.push(newCompany);

    return NextResponse.json({
      success: true,
      data: newCompany,
      message: 'Empresa creada exitosamente'
    }, { status: 201 });

  } catch (error) {
    console.error('Error al crear empresa:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudo crear la empresa'
      },
      { status: 500 }
    );
  }
}

// PUT - Actualizar empresa completa
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, status, fullLogo, isotipo } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID requerido',
          message: 'El ID de la empresa es obligatorio'
        },
        { status: 400 }
      );
    }

    const companyIndex = companies.findIndex(company => company.id === id);

    if (companyIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Empresa no encontrada',
          message: 'No se encontró la empresa especificada'
        },
        { status: 404 }
      );
    }

    // Validar nombre si se proporciona
    if (name && typeof name === 'string' && name.trim().length > 0) {
      // Verificar duplicados (excluyendo la empresa actual)
      const existingCompany = companies.find(
        company => company.id !== id && company.name.toLowerCase() === name.trim().toLowerCase()
      );

      if (existingCompany) {
        return NextResponse.json(
          {
            success: false,
            error: 'Empresa duplicada',
            message: 'Ya existe otra empresa con este nombre'
          },
          { status: 409 }
        );
      }
    }

    // Actualizar empresa
    const updatedCompany: Company = {
      ...companies[companyIndex],
      name: name?.trim() || companies[companyIndex].name,
      status: status || companies[companyIndex].status,
      fullLogo: fullLogo !== undefined ? fullLogo : companies[companyIndex].fullLogo,
      isotipo: isotipo !== undefined ? isotipo : companies[companyIndex].isotipo,
      updatedAt: new Date().toISOString(),
    };

    companies[companyIndex] = updatedCompany;

    return NextResponse.json({
      success: true,
      data: updatedCompany,
      message: 'Empresa actualizada exitosamente'
    });

  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudo actualizar la empresa'
      },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar empresa
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'ID requerido',
          message: 'El ID de la empresa es obligatorio'
        },
        { status: 400 }
      );
    }

    const companyIndex = companies.findIndex(company => company.id === id);

    if (companyIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Empresa no encontrada',
          message: 'No se encontró la empresa especificada'
        },
        { status: 404 }
      );
    }

    const deletedCompany = companies[companyIndex];
    companies.splice(companyIndex, 1);

    return NextResponse.json({
      success: true,
      data: deletedCompany,
      message: 'Empresa eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar empresa:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudo eliminar la empresa'
      },
      { status: 500 }
    );
  }
} 