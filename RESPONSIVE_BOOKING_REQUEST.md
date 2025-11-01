# Responsive Changes for BookingRequest.jsx

Apply these changes to make the booking request page responsive:

## Main Container
```jsx
// Line ~120
<div className="space-y-4 sm:space-y-6 pb-6 px-4 sm:px-0">
```

## Progress Steps
```jsx
// Line ~127
<div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 overflow-x-auto">
  <div className="flex items-center justify-between min-w-max sm:min-w-0">
```

## Step Icons
```jsx
// Line ~131
<div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full...`}>
  <s.icon className="w-5 h-5 sm:w-6 sm:h-6" />
</div>
<span className={`text-xs sm:text-sm mt-2 font-medium whitespace-nowrap...`}>
```

## Form Sections
Replace all section containers:
```jsx
<div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
```

## Grid Layouts
Replace all `grid md:grid-cols-3`:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
```

Replace `md:col-span-3`:
```jsx
<div className="sm:col-span-2 md:col-span-3">
```

## Buttons
Replace all button containers:
```jsx
<div className="flex flex-col sm:flex-row gap-3">
  <button className="...text-sm sm:text-base">
```

## Step 2 - Review
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
```

## Price Quote
```jsx
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
  <p className="text-2xl sm:text-3xl font-bold text-blue-600">
  <Package className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 flex-shrink-0" />
```

## Step 3 - Payment
```jsx
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
  <p className="text-lg sm:text-xl font-bold text-blue-600 break-all">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
```

## Step 4 - Confirmation
```jsx
<div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100...">
  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
<h3 className="text-xl sm:text-2xl font-bold mb-2">
<p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4 break-all">
```

## Key Responsive Features:
- Mobile: Single column layouts, smaller text/icons
- Tablet: 2 columns for most grids
- Desktop: 3-4 columns as designed
- Horizontal scroll for progress steps on mobile
- Stacked buttons on mobile
- Reduced padding on mobile (p-4 vs p-6)
- Smaller font sizes (text-xs/sm on mobile)
