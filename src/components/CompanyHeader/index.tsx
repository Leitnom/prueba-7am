'use client'; // si estás usando App Router en Next.js

import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface CompanyHeaderProps {
    total: number;
    companiesLoading: boolean;
    onCreateCompany: () => void;
}

export default function CompanyHeader({ total, companiesLoading, onCreateCompany }: CompanyHeaderProps) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Text style={{

                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 600,
                color: '#262626'
            }}>
                {companiesLoading ? 'Cargando...' : `${total} empresa${total !== 1 ? 's' : ''}`}
            </Text>

            <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={onCreateCompany}
                style={{
                    height: '40px',
                    borderRadius: '8px',

                    fontSize: '14px',
                    fontWeight: 600,
                    background: '#4f46e5',
                    borderColor: '#4f46e5',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                }}
            >
                Crear nueva empresa
            </Button>
        </div>
    );
}
