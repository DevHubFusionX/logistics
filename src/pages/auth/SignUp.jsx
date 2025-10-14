import AuthLayout from '../../components/auth/AuthLayout'
import RegisterForm from '../../components/auth/RegisterForm'

export default function SignUp() {
  return (
    <AuthLayout 
      title="Join Nigeria's Leading Logistics Platform"
      subtitle="Transform your business with our comprehensive cold chain solutions. Get access to real-time tracking, competitive pricing, and nationwide coverage from day one."
    >
      <RegisterForm />
    </AuthLayout>
  )
}