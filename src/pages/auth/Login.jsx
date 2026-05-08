import AuthLayout from '../../components/auth/AuthLayout'
import LoginForm from '../../components/auth/LoginForm'

export default function Login() {
  return (
    <AuthLayout 
      title="Secure Access Portal"
      subtitle="Sign in to manage your shipments, track deliveries in real-time, and access powerful logistics analytics from your personalized dashboard."
    >
      <LoginForm />
    </AuthLayout>
  )
}