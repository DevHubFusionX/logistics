import { Outlet } from 'react-router-dom'
import { AppLayout } from '@/features/dashboard'

export default function DashboardLayout() {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    )
}
