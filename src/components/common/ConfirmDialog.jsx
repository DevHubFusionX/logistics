import { useEffect, useRef } from 'react'
import { AlertTriangle, Trash2, X } from 'lucide-react'

const variants = {
    danger: {
        icon: Trash2,
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        confirmBg: 'bg-red-600 hover:bg-red-700 shadow-red-100',
        confirmText: 'text-white'
    },
    warning: {
        icon: AlertTriangle,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        confirmBg: 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-100',
        confirmText: 'text-white'
    }
}

/**
 * Reusable confirmation dialog to replace window.confirm().
 * 
 * @param {Object} props
 * @param {boolean} props.open - Whether the dialog is visible
 * @param {string} props.title - Dialog title
 * @param {string} props.message - Dialog message
 * @param {string} [props.confirmLabel='Confirm'] - Confirm button text
 * @param {string} [props.cancelLabel='Cancel'] - Cancel button text
 * @param {'danger'|'warning'} [props.variant='danger'] - Visual variant
 * @param {boolean} [props.loading=false] - Whether the confirm action is loading
 * @param {function} props.onConfirm - Called when confirm is clicked
 * @param {function} props.onCancel - Called when cancel is clicked or dialog is dismissed
 */
export default function ConfirmDialog({
    open,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger',
    loading = false,
    onConfirm,
    onCancel
}) {
    const confirmRef = useRef(null)
    const style = variants[variant] || variants.danger
    const Icon = style.icon

    // Focus confirm on open & handle Escape key
    useEffect(() => {
        if (!open) return

        const timer = setTimeout(() => confirmRef.current?.focus(), 100)

        const handleEsc = (e) => {
            if (e.key === 'Escape') onCancel?.()
        }
        document.addEventListener('keydown', handleEsc)

        return () => {
            clearTimeout(timer)
            document.removeEventListener('keydown', handleEsc)
        }
    }, [open, onCancel])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onCancel}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Close button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="p-6 text-center">
                    {/* Icon */}
                    <div className={`w-14 h-14 ${style.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-7 h-7 ${style.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

                    {/* Message */}
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{message}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 px-6 pb-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        ref={confirmRef}
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 px-4 py-2.5 rounded-xl font-bold ${style.confirmBg} ${style.confirmText} shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2`}
                    >
                        {loading && (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        )}
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
