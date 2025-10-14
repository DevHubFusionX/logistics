import AuthLayout from '../../components/auth/AuthLayout'
import LoginForm from '../../components/auth/LoginForm'

export default function Login() {
  return (
    <AuthLayout 
      title="Welcome Back to Your Logistics Command Center"
      subtitle="Access your comprehensive dashboard to manage shipments, track deliveries, and optimize your supply chain operations with real-time insights and analytics."
    >
      <LoginForm />
    </AuthLayout>
  )
}