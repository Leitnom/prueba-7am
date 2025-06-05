import { Button, Modal, Form, Input, Typography, FormInstance, message, UploadProps } from "antd";
import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
const { Title } = Typography;

interface CreateCompanyModalProps {
    isModalOpen: boolean;
    handleModalCancel: () => void;
    handleModalOk: () => void;
    loading: boolean;
    form: FormInstance;
}

export default function CreateCompanyModal({ isModalOpen, handleModalCancel, handleModalOk, form, loading }: CreateCompanyModalProps) {

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        accept: '.jpg,.jpeg,.png',
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('Solo puedes subir archivos JPG/PNG!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('La imagen debe ser menor a 2MB!');
            }
            return false;
        },
        onChange(info) {
            console.log('Upload info:', info);
        },
    };
    return (
        <Modal
            title={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px 8px',
                    margin: '-16px -24px 0'
                }}>
                    <span style={{

                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: 'rgba(38, 38, 38, 0.88)'
                    }}>
                        Crear empresa
                    </span>
                </div>
            }
            open={isModalOpen}
            onCancel={handleModalCancel}
            footer={null}
            width={667}
            centered
            closeIcon={<CloseOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />}
            styles={{
                body: { padding: 0 },
                header: { padding: 0, border: 'none' }
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px 24px',
                gap: '24px',
                minHeight: '512px'
            }}>
                {/* Title */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '20px'
                }}>
                    <Title
                        level={3}
                        style={{

                            fontWeight: 600,
                            fontSize: '24px',
                            lineHeight: '32px',
                            textAlign: 'center',
                            color: '#262626',
                            margin: 0
                        }}
                    >
                        Nueva sucursal
                    </Title>
                </div>

                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    style={{ width: '476px' }}
                    requiredMark={(label, { required }) => (
                        <>
                            {required && <span style={{ color: '#FF7875', marginRight: '4px' }}>*</span>}
                            {label}
                        </>
                    )}
                >
                    {/* Name */}
                    <Form.Item
                        label="Nombre"
                        name="name"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de la empresa' }]}
                        style={{ marginBottom: '24px' }}
                    >
                        <Input
                            placeholder="Escribir nombre"
                            style={{
                                height: '32px',

                                fontSize: '14px',
                                borderRadius: '6px',
                                border: '1px solid rgba(0, 0, 0, 0.15)'
                            }}
                        />
                    </Form.Item>

                    {/* Full Logo */}
                    <Form.Item
                        label="Adjuntar logo completo"
                        name="fullLogo"
                        rules={[{ required: true, message: 'Por favor adjunta el logo completo' }]}
                        style={{ marginBottom: '24px' }}
                    >
                        <Dragger
                            {...uploadProps}
                            style={{
                                background: 'rgba(0, 0, 0, 0.02)',
                                border: '1px dashed rgba(0, 0, 0, 0.15)',
                                borderRadius: '6px',
                                height: '146px'
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined style={{ fontSize: '48px', color: '#1677FF' }} />
                            </p>
                            <p className="ant-upload-text" style={{

                                fontSize: '16px',
                                lineHeight: '24px',
                                color: 'rgba(38, 38, 38, 0.88)',
                                margin: '0 0 4px 0'
                            }}>
                                Haz clic o arrastra para subir tu archivo
                            </p>
                            <p className="ant-upload-hint" style={{

                                fontSize: '14px',
                                lineHeight: '22px',
                                color: 'rgba(0, 0, 0, 0.45)',
                                margin: 0
                            }}>
                                JPG, PNG
                            </p>
                        </Dragger>
                    </Form.Item>

                    {/* Isotipo */}
                    <Form.Item
                        label="Adjuntar isotipo"
                        name="isotipo"
                        rules={[{ required: true, message: 'Por favor adjunta el isotipo' }]}
                        style={{ marginBottom: '24px' }}
                    >
                        <Dragger
                            {...uploadProps}
                            style={{
                                background: 'rgba(0, 0, 0, 0.02)',
                                border: '1px dashed rgba(0, 0, 0, 0.15)',
                                borderRadius: '6px',
                                height: '146px'
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined style={{ fontSize: '48px', color: '#1677FF' }} />
                            </p>
                            <p className="ant-upload-text" style={{

                                fontSize: '16px',
                                lineHeight: '24px',
                                color: 'rgba(38, 38, 38, 0.88)',
                                margin: '0 0 4px 0'
                            }}>
                                Haz clic o arrastra para subir tu archivo
                            </p>
                            <p className="ant-upload-hint" style={{

                                fontSize: '14px',
                                lineHeight: '22px',
                                color: 'rgba(0, 0, 0, 0.45)',
                                margin: 0
                            }}>
                                JPG, PNG
                            </p>
                        </Dragger>
                    </Form.Item>
                </Form>
            </div>

            {/* Footer */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '0px 24px 24px',
                gap: '8px',
                borderTop: 'none'
            }}>
                <Button
                    onClick={handleModalCancel}
                    style={{
                        height: '32px',

                        fontSize: '14px',
                        borderRadius: '6px',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        background: '#FFFFFF'
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    type="primary"
                    loading={loading}
                    onClick={handleModalOk}
                    disabled={loading}
                    style={{
                        height: '32px',

                        fontSize: '14px',
                        borderRadius: '6px',
                        background: loading ? 'rgba(0, 0, 0, 0.04)' : '#4f46e5',
                        borderColor: loading ? 'rgba(0, 0, 0, 0.15)' : '#4f46e5',
                        color: loading ? 'rgba(0, 0, 0, 0.25)' : '#ffffff'
                    }}
                >
                    Crear empresa
                </Button>
            </div>
        </Modal>
    )
}