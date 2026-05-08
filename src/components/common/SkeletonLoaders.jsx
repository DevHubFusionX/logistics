/**
 * Reusable skeleton loading components for consistent loading states
 * across all user-facing pages.
 */

const shimmer = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded'

function SkeletonBlock({ className = '' }) {
    return <div className={`${shimmer} ${className}`} />
}

// ── Booking Card Skeleton ──────────────────────────────────────────────
export function BookingCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <SkeletonBlock className="h-5 w-32" />
                <SkeletonBlock className="h-6 w-20 rounded-full" />
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <SkeletonBlock className="h-10 w-10 rounded-xl" />
                    <div className="flex-1 space-y-2">
                        <SkeletonBlock className="h-4 w-3/4" />
                        <SkeletonBlock className="h-3 w-1/2" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <SkeletonBlock className="h-10 w-10 rounded-xl" />
                    <div className="flex-1 space-y-2">
                        <SkeletonBlock className="h-4 w-2/3" />
                        <SkeletonBlock className="h-3 w-1/3" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-9 w-28 rounded-xl" />
            </div>
        </div>
    )
}

// ── Stat Card Skeleton ─────────────────────────────────────────────────
export function StatCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
                <SkeletonBlock className="h-10 w-10 rounded-xl" />
                <SkeletonBlock className="h-3 w-20" />
            </div>
            <SkeletonBlock className="h-8 w-16" />
            <SkeletonBlock className="h-3 w-32" />
        </div>
    )
}

// ── Metric Card Skeleton ───────────────────────────────────────────────
export function MetricSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
                <SkeletonBlock className="h-4 w-24" />
                <SkeletonBlock className="h-8 w-8 rounded-lg" />
            </div>
            <SkeletonBlock className="h-9 w-20" />
            <SkeletonBlock className="h-16 w-full rounded-lg" />
        </div>
    )
}

// ── Table Row Skeleton ─────────────────────────────────────────────────
export function TableRowSkeleton({ columns = 6 }) {
    return (
        <tr className="border-b border-gray-50">
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} className="px-6 py-4">
                    <SkeletonBlock className={`h-4 ${i === 0 ? 'w-24' : i === columns - 1 ? 'w-10' : 'w-20'}`} />
                </td>
            ))}
        </tr>
    )
}

export function TableSkeleton({ rows = 5, columns = 6 }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <SkeletonBlock className="h-5 w-40" />
                <SkeletonBlock className="h-4 w-24 rounded-full" />
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50">
                        {Array.from({ length: columns }).map((_, i) => (
                            <th key={i} className="px-6 py-3">
                                <SkeletonBlock className="h-3 w-16" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <TableRowSkeleton key={i} columns={columns} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// ── Ticket Card Skeleton ───────────────────────────────────────────────
export function TicketSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <SkeletonBlock className="h-14 w-14 rounded-2xl" />
                    <div className="space-y-2">
                        <SkeletonBlock className="h-5 w-48" />
                        <SkeletonBlock className="h-3 w-32" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <SkeletonBlock className="h-6 w-16 rounded-full" />
                    <SkeletonBlock className="h-6 w-16 rounded-full" />
                </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex gap-6">
                    <SkeletonBlock className="h-3 w-28" />
                    <SkeletonBlock className="h-3 w-28" />
                </div>
                <SkeletonBlock className="h-10 w-36 rounded-xl" />
            </div>
        </div>
    )
}

// ── Address Card Skeleton ──────────────────────────────────────────────
export function AddressCardSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
                <SkeletonBlock className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                    <SkeletonBlock className="h-4 w-24" />
                    <SkeletonBlock className="h-3 w-20" />
                </div>
            </div>
            <div className="space-y-2 pl-1">
                <SkeletonBlock className="h-3 w-full" />
                <SkeletonBlock className="h-3 w-2/3" />
                <SkeletonBlock className="h-3 w-1/3" />
            </div>
            <div className="pt-3 border-t border-gray-100">
                <SkeletonBlock className="h-4 w-24" />
            </div>
        </div>
    )
}

// ── Page Skeleton (full-page loading) ──────────────────────────────────
export function PageSkeleton({ title = true, stats = 3, cards = 4 }) {
    return (
        <div className="space-y-6 pb-6">
            {title && (
                <div className="space-y-2">
                    <SkeletonBlock className="h-7 w-48" />
                    <SkeletonBlock className="h-4 w-72" />
                </div>
            )}
            {stats > 0 && (
                <div className={`grid grid-cols-1 sm:grid-cols-${stats} gap-4`}>
                    {Array.from({ length: stats }).map((_, i) => (
                        <StatCardSkeleton key={i} />
                    ))}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: cards }).map((_, i) => (
                    <BookingCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}
