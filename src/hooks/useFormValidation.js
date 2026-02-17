import { useState, useCallback } from 'react'

/**
 * Custom hook for shared form validation logic across auth forms
 */
export const useFormValidation = (initialState = {}) => {
    const [fieldErrors, setFieldErrors] = useState(initialState)

    const validateEmail = (email) => {
        if (!email) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format'
        return null
    }

    const validatePassword = (password, minLength = 8) => {
        if (!password) return 'Password is required'
        if (password.length < minLength) return `Password must be at least ${minLength} characters`
        return null
    }

    const validatePasswordStrength = (password) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[0-9]/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++
        return strength
    }

    const validateRequired = (value, fieldName) => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            return `${fieldName} is required`
        }
        return null
    }

    const clearErrors = useCallback(() => {
        setFieldErrors({})
    }, [])

    const clearFieldError = useCallback((field) => {
        setFieldErrors(prev => ({ ...prev, [field]: '' }))
    }, [])

    const setFieldError = useCallback((field, error) => {
        setFieldErrors(prev => ({ ...prev, [field]: error }))
    }, [])

    return {
        fieldErrors,
        setFieldErrors,
        setFieldError,
        clearErrors,
        clearFieldError,
        validateEmail,
        validatePassword,
        validatePasswordStrength,
        validateRequired
    }
}
