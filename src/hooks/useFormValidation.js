import { useState, useCallback } from 'react'
import { validateEmail as checkEmail, getPasswordStrength } from '../utils/validation'

/**
 * Custom hook for shared form validation logic across auth forms
 */
export const useFormValidation = (initialState = {}) => {
    const [fieldErrors, setFieldErrors] = useState(initialState)

    const validateEmail = (email) => {
        if (!email) return 'Email is required'
        if (!checkEmail(email)) return 'Invalid email format'
        return null
    }

    const validatePassword = (password, minLength = 8) => {
        if (!password) return 'Password is required'
        if (password.length < minLength) return `Password must be at least ${minLength} characters`
        return null
    }

    const validatePasswordStrength = (password) => {
        return getPasswordStrength(password).level
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
