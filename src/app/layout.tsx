import "@ant-design/v5-patch-for-react-19";
import { Layout } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=SF+Pro+Text:wght@400;500;600;700&family=SF+Pro+Display:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0,
        fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}>
        <AntdRegistry>
          <Layout>
            <Sidebar />
            <Layout style={{ marginLeft: 58, minHeight: '100vh', background: '#FFFFFF' }}>
              {children}
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
