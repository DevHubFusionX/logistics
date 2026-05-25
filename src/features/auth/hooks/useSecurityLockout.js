import { useState, useEffect, useCallback } from 'react'

/**
 * Reusable hook to handle rate-limiting and security lockout states for authentication forms.
 * @param {string} storageKeyPrefix Prefix for local storage lockout keys.
 * @param {number} maxAttempts Maximum failed attempts allowed before lockout.
 * @param {number} lockoutDuration Lockout duration in milliseconds.
 */
export function useSecurityLockout(storageKeyPrefix, maxAttempts = 5, lockoutDuration = 60000) {
    const attemptsKey = `${storageKeyPrefix}_login_attempts`
    const lockoutUntilKey = `${storageKeyPrefix}_lockout_until`

    const [attempts, setAttempts] = useState(() => {
        return parseInt(localStorage.getItem(attemptsKey) || '0', 10)
    })

    const [lockoutTime, setLockoutTime] = useState(() => {
        const until = parseInt(localStorage.getItem(lockoutUntilKey) || '0', 10)
        const remaining = until - Date.now()
        return remaining > 0 ? remaining : 0
    })

    // Tick the lockout time down
    useEffect(() => {
        if (lockoutTime > 0) {
            const timer = setInterval(() => {
                const until = parseInt(localStorage.getItem(lockoutUntilKey) || '0', 10)
                const remaining = until - Date.now()
                if (remaining <= 0) {
                    setLockoutTime(0)
                    localStorage.removeItem(lockoutUntilKey)
                    localStorage.setItem(attemptsKey, '0')
                    setAttempts(0)
                } else {
                    setLockoutTime(remaining)
                }
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [lockoutTime, attemptsKey, lockoutUntilKey])

    const registerFailure = useCallback(() => {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        localStorage.setItem(attemptsKey, newAttempts.toString())

        if (newAttempts >= maxAttempts) {
            const until = Date.now() + lockoutDuration
            localStorage.setItem(lockoutUntilKey, until.toString())
            setLockoutTime(lockoutDuration)
            localStorage.removeItem(attemptsKey)
            setAttempts(0)
            return true // Indicated lockout triggered
        }
        return false
    }, [attempts, maxAttempts, lockoutDuration, attemptsKey, lockoutUntilKey])

    const resetAttempts = useCallback(() => {
        setAttempts(0)
        setLockoutTime(0)
        localStorage.removeItem(attemptsKey)
        localStorage.removeItem(lockoutUntilKey)
    }, [attemptsKey, lockoutUntilKey])

    const isLocked = lockoutTime > 0

    return {
        attempts,
        lockoutTime,
        isLocked,
        registerFailure,
        resetAttempts
    }
}
