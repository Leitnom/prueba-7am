'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    Button,
    Table,
    Badge,
    Pagination,
    Typography,
    Spin,
    Alert,
    Empty,
    Form,
    message
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useCompanies, Company } from '@/hooks/useCompanies';
import Search from '@/components/Search';
import CompanyHeader from '@/components/CompanyHeader';
import CreateCompanyModal from './components/CreateCompanyModal';
import DropdownItems from './components/DropdownItems';

const { Title, Text } = Typography;

// Hook para debounce
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default function PageLaunch() {
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useDebounce(searchValue, 500);

    const { companies, loading: companiesLoading, error, total, refetch } = useCompanies({
        search: debouncedSearch,
    });

    // Paginated data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return companies.slice(startIndex, endIndex);
    }, [companies, currentPage, pageSize]);

    const columns: ColumnsType<Company> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (text) => (
                <span style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 500,
                    color: '#262626'
                }}>
                    {text.padStart(2, '0')}
                </span>
            ),
        },
        {
            title: 'Nombre de empresa',
            dataIndex: 'name',
            key: 'name',
            width: 762,
            render: (text) => (
                <span style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 500,
                    color: '#262626'
                }}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Estado de oficina',
            dataIndex: 'status',
            key: 'status',
            width: 264,
            render: (status) => (
                <div>
                    <Badge
                        status={status === 'active' ? 'success' : 'error'}
                        text={
                            <span style={{
                                fontSize: '14px',
                                lineHeight: '20px',
                                fontWeight: 500,
                                color: '262626'
                            }}>
                                {status === 'active' ? 'Activo' : 'Inactivo'}
                            </span>
                        }
                    />
                </div>
            ),
        },
        {
            title: 'Acciones',
            key: 'actions',
            width: 168,
            render: (_, record) => (
                <DropdownItems record={record} />
            ),
        },
    ];

    const handleCreateCompany = () => {
        setIsModalOpen(true);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleModalOk = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            console.log('Crear empresa con datos:', values);

            // Aquí implementarías la llamada a la API para crear la empresa
            // const response = await fetch('/api/companies', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(values)
            // });

            message.success('Empresa creada exitosamente');
            setIsModalOpen(false);
            form.resetFields();
            refetch(); // Recargar la lista de empresas
        } catch (error) {
            console.error('Error al crear empresa:', error);
            message.error('Error al crear la empresa');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (error) {
        return (
            <div style={{
                padding: '30px',
                background: '#FFFFFF',
                minHeight: '100vh',
            }}>
                <Alert
                    message="Error al cargar empresas"
                    description={error}
                    type="error"
                    showIcon
                    action={
                        <Button size="small" onClick={refetch}>
                            Reintentar
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <div style={{
            padding: '30px',
            background: '#FFFFFF',
            minHeight: '100vh',
        }}>
            <div style={{ marginBottom: '32px' }}>
                <Text style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#262626',
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 400
                }}>
                    Lorem ipsum / <span style={{ color: '#262626' }}>Lista de empresas</span>
                </Text>

                <Title
                    level={1}
                    style={{
                        fontWeight: 700,
                        fontSize: '32px',
                        lineHeight: '40px',
                        letterSpacing: '-0.02em',
                        color: '#262626',
                        margin: 0
                    }}
                >
                    Lista de empresas
                </Title>
            </div>

            {/* Search and Actions Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '32px'
            }}>
                <Search
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <CompanyHeader
                    total={total}
                    companiesLoading={companiesLoading}
                    onCreateCompany={handleCreateCompany}
                />
            </div>

            {/* Table Section */}
            <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '32px',
                border: '1px solid #f3f4f6',
                background: '#ffffff'
            }}>
                {companiesLoading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '400px',
                        background: '#fafafa'
                    }}>
                        <Spin size="large" tip="Cargando empresas..." />
                    </div>
                ) : companies.length === 0 ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '400px',
                        background: '#fafafa'
                    }}>
                        <Empty
                            description={
                                <div style={{ textAlign: 'center' }}>
                                    <Text style={{
                                        fontSize: '16px',
                                        color: '#262626',
                                        fontWeight: 500,
                                        display: 'block',
                                        marginBottom: '8px'
                                    }}>
                                        {searchValue ? 'No se encontraron empresas' : 'No hay empresas registradas'}
                                    </Text>
                                    <Text style={{
                                        fontSize: '14px',
                                        color: '#9ca3af',
                                        fontWeight: 400
                                    }}>
                                        {searchValue ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primera empresa'}
                                    </Text>
                                </div>
                            }
                        />
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={paginatedData}
                        pagination={false}
                        size="middle"
                        rowKey="id"
                    />
                )}
            </div>

            {/* Pagination Section */}
            {total > pageSize && !companiesLoading && companies.length > 0 && (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: '24px',
                    padding: '0 20px',
                    width: '100%'
                }}>
                    <Pagination
                        current={currentPage}
                        total={total}
                        pageSize={pageSize}
                        showSizeChanger={false}
                        onChange={handlePageChange}
                    />
                </div>
            )}

            {/* Create Company Modal */}
            <CreateCompanyModal
                isModalOpen={isModalOpen}
                handleModalCancel={handleModalCancel}
                handleModalOk={handleModalOk}
                form={form}
                loading={loading}
            />
        </div>
    );
}