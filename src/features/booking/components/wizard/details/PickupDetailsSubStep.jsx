import { MapPin, UserCheck, LocateFixed, Loader2, Search } from 'lucide-react'
import FormSection from '../FormSection'
import FormInput from '../FormInput'
import AddressBookSelector from '../AddressBookSelector'
import DateTimePicker from './DateTimePicker'
import { useState, useEffect, useRef } from 'react'

export default function PickupDetailsSubStep({
  formData,
  onChange,
  onNestedChange,
  errors,
  touched,
  onBlur
}) {
  const [showAutofillAlert, setShowAutofillAlert] = useState(false)
  const [locationStatus, setLocationStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [locationError, setLocationError] = useState('')

  // Autocomplete / Search States
  const [addressInput, setAddressInput] = useState(formData.pickupLocation.address || '')
  const [suggestions, setSuggestions] = useState([])
  const [searching, setSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionRef = useRef(null)

  // Keep internal address input in sync if store value changes externally (e.g. via profile/autofill)
  useEffect(() => {
    setAddressInput(formData.pickupLocation.address || '')
  }, [formData.pickupLocation.address])

  // Click outside listener to hide suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search for address suggestions
  useEffect(() => {
    if (!addressInput || addressInput.length < 3) {
      setSuggestions([])
      return
    }

    // Skip query if it matches the already selected/populated address
    if (addressInput === formData.pickupLocation.address) {
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setSearching(true)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressInput)}&format=json&limit=5&countrycodes=ng`,
          { headers: { 'Accept-Language': 'en' } }
        )
        const data = await res.json()
        setSuggestions(data || [])
        setShowSuggestions(true)
      } catch (err) {
        console.warn('Address search failed:', err)
      } finally {
        setSearching(false)
      }
    }, 600)

    return () => clearTimeout(delayDebounceFn)
  }, [addressInput, formData.pickupLocation.address])

  const handleAutofill = () => {
    onNestedChange('pickupPerson', 'name', formData.fullNameOrBusiness || '')
    onNestedChange('pickupPerson', 'phone', formData.contactPhone || '')
    onNestedChange('pickupPerson', 'email', formData.email || '')
    onBlur('pickupPersonName')
    onBlur('pickupPersonPhone')
    onBlur('pickupPersonEmail')
    setShowAutofillAlert(true)
    setTimeout(() => setShowAutofillAlert(false), 3000)
  }

  const handleAddressSelect = (addr) => {
    onNestedChange('pickupPerson', 'name', addr.contact_name)
    onNestedChange('pickupPerson', 'phone', addr.phone)
    onNestedChange('pickupLocation', 'address', addr.street)
    onBlur('pickupPersonName')
    onBlur('pickupPersonPhone')
    onBlur('pickupAddress')
    setShowAutofillAlert(true)
    setTimeout(() => setShowAutofillAlert(false), 3000)
  }

  const handleSuggestionClick = (item) => {
    const lat = parseFloat(item.lat)
    const lng = parseFloat(item.lon)
    const displayName = item.display_name

    // Parse city & state from address details if possible
    const addrDetails = item.address || {}
    const city = addrDetails.city || addrDetails.town || addrDetails.village || addrDetails.county || ''
    const state = addrDetails.state || 'Nigeria'

    // Update state & store
    setAddressInput(displayName)
    onNestedChange('pickupLocation', 'address', displayName)
    onNestedChange('pickupLocation', 'city', city || formData.pickupLocation.city)
    onNestedChange('pickupLocation', 'state', state)
    onNestedChange('pickupLocation', 'lat', lat)
    onNestedChange('pickupLocation', 'lng', lng)

    onBlur('pickupAddress')
    setShowSuggestions(false)
  }

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error')
      setLocationError('Geolocation is not supported by your browser.')
      return
    }

    setLocationStatus('loading')
    setLocationError('')

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const geo = await res.json()
          const addr = geo.address || {}

          const street = [
            addr.house_number,
            addr.road || addr.street || addr.pedestrian
          ].filter(Boolean).join(' ')

          const city =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.county ||
            addr.state_district ||
            ''

          const state = addr.state || addr.region || 'Nigeria'

          // Populate pickupLocation
          onNestedChange('pickupLocation', 'address', street || geo.display_name || '')
          onNestedChange('pickupLocation', 'city', city)
          onNestedChange('pickupLocation', 'state', state)
          onNestedChange('pickupLocation', 'lat', latitude)
          onNestedChange('pickupLocation', 'lng', longitude)

          onBlur('pickupAddress')
          setLocationStatus('success')
          setTimeout(() => setLocationStatus(null), 4000)
        } catch {
          onNestedChange('pickupLocation', 'lat', latitude)
          onNestedChange('pickupLocation', 'lng', longitude)
          onNestedChange('pickupLocation', 'address', `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
          setLocationStatus('success')
          setTimeout(() => setLocationStatus(null), 4000)
        }
      },
      (err) => {
        setLocationStatus('error')
        setLocationError(
          err.code === 1
            ? 'Location permission denied. Please allow access in your browser settings.'
            : err.code === 2
              ? 'Location unavailable. Check your GPS or network.'
              : 'Location request timed out. Please try again.'
        )
        setTimeout(() => setLocationStatus(null), 5000)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  const minDateTime = new Date().toISOString().slice(0, 16)

  return (
    <FormSection icon={MapPin} title="Pickup details">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <AddressBookSelector
          currentCity={formData.pickupLocation.city}
          onSelect={handleAddressSelect}
        />

        <div className="flex items-center gap-2">
          {/* Use Active GPS Location */}
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={locationStatus === 'loading'}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-60 disabled:cursor-not-allowed px-3 py-1.5 rounded-xl transition-all border border-emerald-100/60 mb-2 shadow-sm duration-200 cursor-pointer"
          >
            {locationStatus === 'loading'
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <LocateFixed className="w-3.5 h-3.5" />
            }
            {locationStatus === 'loading' ? 'Locating...' : 'Use My Location'}
          </button>

          {/* Autofill contact */}
          <button
            type="button"
            onClick={handleAutofill}
            className="flex items-center gap-1.5 text-xs font-bold text-sky-750 hover:text-sky-850 bg-sky-50 px-3 py-1.5 rounded-xl transition-all border border-sky-100/40 mb-2 shadow-sm duration-200 cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5" />
            Use My Profile Details
          </button>
        </div>
      </div>

      {/* Status feedback */}
      {(showAutofillAlert || locationStatus === 'success') && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl animate-in fade-in duration-200">
          <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            {locationStatus === 'success'
              ? 'Pickup location set from your GPS position!'
              : 'Contact information successfully autofilled!'}
          </p>
        </div>
      )}

      {locationStatus === 'error' && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl animate-in fade-in duration-200">
          <p className="text-xs text-rose-700 font-semibold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {locationError}
          </p>
        </div>
      )}

      {/* Coordinates badge — shows when GPS coords are set */}
      {formData.pickupLocation.lat && formData.pickupLocation.lng && (
        <div className="mb-4 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-xl w-fit">
          <LocateFixed className="w-3 h-3 text-emerald-600" />
          <span className="text-[11px] font-bold text-emerald-700">
            GPS locked: {Number(formData.pickupLocation.lat).toFixed(5)}, {Number(formData.pickupLocation.lng).toFixed(5)}
          </span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <FormInput
          label="Pickup contact name *"
          value={formData.pickupPerson.name}
          onChange={e => {
            onNestedChange('pickupPerson', 'name', e.target.value)
            if (touched.pickupPersonName) onBlur('pickupPersonName')
          }}
          onBlur={() => onBlur('pickupPersonName')}
          error={touched.pickupPersonName && errors.pickupPersonName}
          placeholder="Enter pickup contact name"
        />

        <FormInput
          label="Phone *"
          type="tel"
          value={formData.pickupPerson.phone}
          onChange={e => {
            onNestedChange('pickupPerson', 'phone', e.target.value)
            if (touched.pickupPersonPhone) onBlur('pickupPersonPhone')
          }}
          onBlur={() => onBlur('pickupPersonPhone')}
          error={touched.pickupPersonPhone && errors.pickupPersonPhone}
          placeholder="+234XXXXXXXXXX"
        />

        <FormInput
          label="Email *"
          type="email"
          value={formData.pickupPerson.email}
          onChange={e => {
            onNestedChange('pickupPerson', 'email', e.target.value)
            if (touched.pickupPersonEmail) onBlur('pickupPersonEmail')
          }}
          onBlur={() => onBlur('pickupPersonEmail')}
          error={touched.pickupPersonEmail && errors.pickupPersonEmail}
          placeholder="Enter email address"
        />

        <DateTimePicker
          label="Pickup date & time *"
          value={formData.estimatedPickupDate}
          min={minDateTime}
          onChange={val => {
            onChange('estimatedPickupDate', val)
            if (touched.estimatedPickupDate) onBlur('estimatedPickupDate')
          }}
          onBlur={() => onBlur('estimatedPickupDate')}
          error={touched.estimatedPickupDate && errors.estimatedPickupDate}
        />

        {/* Pickup address autocompleter */}
        <div className="sm:col-span-2 relative" ref={suggestionRef}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Pickup address *
            </label>
            <div className="relative">
              <input
                type="text"
                value={addressInput}
                onChange={e => setAddressInput(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true)
                }}
                placeholder="Type to search e.g. Ogun State, Onigbongbo"
                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all ${touched.pickupAddress && errors.pickupAddress
                    ? 'border border-red-300 bg-red-50 text-red-900 focus:ring-2 focus:ring-red-100'
                    : 'border border-gray-200 bg-white text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100'
                  }`}
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-450">
                {searching ? (
                  <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                ) : (
                  <Search className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
            {touched.pickupAddress && errors.pickupAddress && (
              <p className="text-xs text-red-500 font-medium">{errors.pickupAddress}</p>
            )}
          </div>

          {/* Autocomplete Dropdown List */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-55 max-h-60 overflow-y-auto divide-y divide-gray-55">
              {suggestions.map((item) => (
                <button
                  key={item.place_id}
                  type="button"
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full text-left px-4 py-3 text-xs font-medium text-gray-700 hover:bg-sky-50 transition-colors flex items-start gap-2.5"
                >
                  <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.display_name.split(',')[0]}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-full">
                      {item.display_name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </FormSection>
  )
}
