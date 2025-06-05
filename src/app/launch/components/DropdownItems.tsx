import { CloseCircleOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Company } from "@/hooks/useCompanies";
import { Button, Divider, Dropdown, MenuProps, Space } from "antd";

export default function DropdownItems({ record }: { record: Company }) {
    const getDropdownItems = (record: Company): MenuProps['items'] => [
        {
            key: 'edit',
            icon: <EditOutlined style={{ color: '#262626' }} size={16} />,
            label: <span style={{ color: '#262626', fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Editar empresa</span>,
            onClick: () => {
                console.log('Editar empresa:', record.id);
            },
        },
        {
            key: 'deactivate',
            icon: <CloseCircleOutlined style={{ color: '#262626' }} size={16} />,
            label: <span style={{ color: '#262626', fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>{record.status === 'active' ? 'Desactivar empresa' : 'Activar empresa'}</span>,
            onClick: () => {
                console.log('Cambiar estado empresa:', record.id);
            },
        },
        {
            type: 'divider',
        },
        {
            key: 'delete',
            icon: <DeleteOutlined style={{ color: '#FF6062' }} size={16} />,
            label: <span style={{ color: '#FF6062', fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>Eliminar empresa</span>,
            danger: true,
            onClick: () => {
                console.log('Eliminar empresa:', record.id);
            },
        },
    ];

    return (
        <Space wrap>
            <Dropdown
                menu={{ items: getDropdownItems(record) }}
                trigger={['click']}
                placement="bottomRight"
            >
                <Button style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    height: '40px',
                    gap: '0',
                }}>
                    <span style={{ color: '#262626', fontWeight: 500, fontSize: '14px', marginRight: '4px' }}>Acciones</span>
                    <Divider type="vertical" style={{ height: '38px', backgroundColor: '#E5E7EB' }} />
                    <EllipsisOutlined style={{ color: '#262626', marginLeft: '4px' }} />
                </Button>
            </Dropdown>
        </Space>
    )
}