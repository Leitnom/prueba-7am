import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

export default function Search({
    searchValue,
    setSearchValue,
}: { 
    searchValue: string,
    setSearchValue: (value: string) => void,
}) {
    return (
        <Input
            placeholder="Buscar por nombre o ID..."
            prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
                width: '320px',
                height: '40px',
                background: '#FFFFFF',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',

                fontSize: '14px',
                fontWeight: 400
            }}
            allowClear
        />
    )
}