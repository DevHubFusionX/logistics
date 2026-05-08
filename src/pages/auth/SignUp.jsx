import AuthLayout from '../../components/auth/AuthLayout'
import RegisterForm from '../../components/auth/RegisterForm'

export default function SignUp() {
  return (
    <AuthLayout 
      title="Start Your Logistics Journey"
      subtitle="Join thousands of businesses transforming their supply chain with our comprehensive logistics platform. Get instant access to real-time tracking and nationwide coverage."
    >
      <RegisterForm />
    </AuthLayout>
  )
}