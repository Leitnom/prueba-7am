"use client";

import React from 'react';
import { Layout } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logoBeex from '@/assets/images/logo-beex.svg';
import ActivityIcon from '@/components/icons/ActivityIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import RocketIcon from '@/components/icons/RocketIcon';
import GearIcon from '@/components/icons/GearIcon';

const { Sider } = Layout;

interface MenuButtonProps {
    href: string;
    icon: React.ReactNode;
    isActive: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ href, icon, isActive }) => {
    const buttonStyle = {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 8px',
        gap: '10px',
        width: '40px',
        height: '36px',
        background: isActive ? '#262776' : '#FFFFFF',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
        border: 'none',
    };

    return (
        <Link href={href} style={buttonStyle}>
            {icon}
        </Link>
    );
};

const Sidebar = () => {
    const pathname = usePathname();

    const MENU_ITEMS = [
        {
            href: '/activity',
            icon: <ActivityIcon color={pathname === '/activity' ? '#FFFFFF' : '#8C8C8C'} width={22} height={20} />,
            isActive: pathname === '/activity',
        },
        {
            href: '/view',
            icon: <EyeIcon color={pathname === '/view' ? '#FFFFFF' : '#8C8C8C'} width={22} height={16} />,
            isActive: pathname === '/view',
        },
        {
            href: '/launch',
            icon: <RocketIcon color={pathname === '/launch' ? '#FFFFFF' : '#8C8C8C'} width={20} height={20} />,
            isActive: pathname === '/launch',
        },
        {
            href: '/settings',
            icon: <GearIcon color={pathname === '/settings' ? '#FFFFFF' : '#8C8C8C'} width={22} height={22} />,
            isActive: pathname === '/settings',
        },
    ];

    return (
        <Sider
            theme="light"
            width={58}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '14px 9px',
                gap: '12px',
                position: 'absolute',
                width: '58px',
                height: '100vh',
                left: '0px',
                top: '0px',
                background: '#FFFFFF',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                borderRadius: '0px 10px 10px 0px',
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '4.93px',
                width: '44.85px',
                height: '48.85px',
                marginBottom: '12px',
            }}>
                <Image
                    src={logoBeex}
                    alt="Logo Beex"
                    width={35}
                    height={39}
                />
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '5px',
                width: '40px',
                height: '80vh',
            }}>

                {MENU_ITEMS.filter((item) => item.href !== '/settings').map((item) => (
                    <div key={item.href} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '40px',
                        height: '36px',
                    }}>
                        <MenuButton
                            href={item.href}
                            icon={item.icon}
                            isActive={item.isActive}
                        />
                    </div>
                ))}
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderTop: '2px solid #F0F0F0',
                justifyContent: 'end',
                width: '40px',
                height: '44px',
            }}> 
                <MenuButton
                    href="/settings"
                    icon={<GearIcon color={pathname === '/settings' ? '#FFFFFF' : '#8C8C8C'} />}
                    isActive={pathname === '/settings'}
                />
            </div>
        </Sider>
    );
};

export default Sidebar; 