import { Outlet } from 'react-router-dom'
import AppLayout from '../dashboard/layout/AppLayout'

export default function DashboardLayout() {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    )
}
