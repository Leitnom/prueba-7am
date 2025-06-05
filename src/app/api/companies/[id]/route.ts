import { NextRequest, NextResponse } from 'next/server';
import { Company } from '../route';

// Importar el array de empresas (en una aplicación real esto vendría de una base de datos)
// Para este ejemplo, vamos a replicar el array aquí
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
];

interface RouteParams {
  params: {
    id: string;
  };
}

// GET - Obtener empresa específica por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    const company = companies.find(c => c.id === id);

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: 'Empresa no encontrada',
          message: 'No se encontró la empresa especificada'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: company,
      message: 'Empresa obtenida exitosamente'
    });

  } catch (error) {
    console.error('Error al obtener empresa:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudo obtener la empresa'
      },
      { status: 500 }
    );
  }
}

// PUT - Actualizar empresa específica
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, status, fullLogo, isotipo } = body;

    const companyIndex = companies.findIndex(c => c.id === id);

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

    // Validar status si se proporciona
    if (status && status !== 'active' && status !== 'inactive') {
      return NextResponse.json(
        {
          success: false,
          error: 'Estado inválido',
          message: 'El estado debe ser "active" o "inactive"'
        },
        { status: 400 }
      );
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

// DELETE - Eliminar empresa específica
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    const companyIndex = companies.findIndex(c => c.id === id);

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

// PATCH - Actualizar estado de empresa (activar/desactivar)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status || (status !== 'active' && status !== 'inactive')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Estado requerido',
          message: 'El estado debe ser "active" o "inactive"'
        },
        { status: 400 }
      );
    }

    const companyIndex = companies.findIndex(c => c.id === id);

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

    // Actualizar solo el estado
    companies[companyIndex] = {
      ...companies[companyIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    const action = status === 'active' ? 'activada' : 'desactivada';

    return NextResponse.json({
      success: true,
      data: companies[companyIndex],
      message: `Empresa ${action} exitosamente`
    });

  } catch (error) {
    console.error('Error al cambiar estado de empresa:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        message: 'No se pudo cambiar el estado de la empresa'
      },
      { status: 500 }
    );
  }
} 