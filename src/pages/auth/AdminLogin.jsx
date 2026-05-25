import { AuthLayout, AdminLoginForm } from '@/features/auth'

export default function AdminLogin() {
    return (
        <AuthLayout
            title="Administrator Portal"
            subtitle="Authorized personnel only. Access the logistics command center and manage operations with high-level administrative tools."
        >
            <AdminLoginForm />
        </AuthLayout>
    )
}
