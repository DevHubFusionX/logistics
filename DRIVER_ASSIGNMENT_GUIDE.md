# Driver Assignment - Complete Guide

## 📍 Where Driver Assignment Happens

**Page:** `/bookings-management` - **Manage Bookings**

**Access:** Sidebar → "Manage Bookings" (under Main section)

---

## 🎯 Quick Answer

After a customer books and pays, the booking appears in the **Bookings Management** page with status "Pending Assignment". Admin clicks "Assign Driver" button, selects a driver from the list, and confirms the assignment.

---

## 📋 Step-by-Step Process

### 1️⃣ Customer Completes Booking
- Customer fills booking form
- Gets quote
- Pays
- Receives confirmation

**Result:** Booking created with status `pending_assignment`

---

### 2️⃣ Admin Receives Notification
- Dashboard shows notification: "New Booking"
- Email alert sent to operations team
- Badge appears on "Manage Bookings" in sidebar

---

### 3️⃣ Admin Opens Bookings Management
**Navigate to:** `/bookings-management`

**What Admin Sees:**
- Summary cards showing:
  - Pending Assignment (orange) - 3 bookings
  - Driver Assigned (blue) - 5 bookings
  - In Transit (purple) - 8 bookings
  - Completed (green) - 24 bookings

- Search bar to find bookings
- Status filter dropdown
- Grid of booking cards

---

### 4️⃣ Admin Views Booking Details
**Each booking card shows:**
- Booking ID (e.g., BK-1705234567)
- Status badge (Pending Assignment)
- Customer name and email
- Route (Lagos → Abuja)
- Weight, cargo type, service type
- Pickup date
- Total amount
- **"Assign Driver" button** (orange/red for pending)

---

### 5️⃣ Admin Clicks "Assign Driver"
**Modal Opens with:**

**Booking Summary:**
- Customer name
- Route
- Weight
- Service type

**Available Drivers List:**
Each driver card shows:
- Driver photo/avatar
- Name (e.g., Ahmed Ibrahim)
- Rating (4.8★) and trip count (523 trips)
- Vehicle (Toyota Hiace - ABC-123-XY)
- Distance from pickup (5 km away)
- Phone number
- Status (Available)

**System Suggests Best Drivers Based On:**
- Proximity to pickup location
- Vehicle capacity
- Driver availability
- Rating and experience
- Service type requirements

---

### 6️⃣ Admin Selects Driver
- Click on driver card
- Card highlights in blue
- Checkmark appears
- "Assign Driver" button becomes active

---

### 7️⃣ Admin Confirms Assignment
- Click "Assign Driver" button
- Loading state: "Assigning..."
- Success toast: "Driver assigned - Ahmed Ibrahim assigned to BK-1705234567"
- Modal closes

---

### 8️⃣ System Updates
**Booking Status Changes:**
- `pending_assignment` → `driver_assigned`

**Database Updates:**
```javascript
{
  bookingId: 'BK-1705234567',
  driverId: 'DRV-001',
  driverName: 'Ahmed Ibrahim',
  status: 'driver_assigned',
  assignedAt: '2025-01-15 11:00:00',
  assignedBy: 'admin@daraexpress.com'
}
```

**Notifications Sent:**
1. **To Customer (SMS + Email):**
   ```
   Your shipment BK-1705234567 has been assigned!
   
   Driver: Ahmed Ibrahim (4.8★)
   Vehicle: Toyota Hiace - ABC-123-XY
   Phone: +234-801-234-5678
   Pickup: Tomorrow 9:00 AM
   
   Track: https://dara.com/track/BK-1705234567
   ```

2. **To Driver (App Notification + SMS):**
   ```
   New Assignment: BK-1705234567
   
   Customer: John Doe
   Pickup: 123 Main St, Lagos
   Delivery: 456 Oak Ave, Abuja
   Weight: 100 kg
   Pickup Time: Tomorrow 9:00 AM
   
   Accept assignment in app
   ```

---

## 🖥️ Bookings Management Page Features

### Summary Cards (Top)
```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Pending         │ Driver          │ In Transit      │ Completed       │
│ Assignment      │ Assigned        │                 │                 │
│                 │                 │                 │                 │
│    3            │    5            │    8            │    24           │
│ 🕐 Orange       │ 👤 Blue         │ 🚚 Purple       │ ✅ Green        │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

### Search & Filter Bar
- Search by booking ID or customer name
- Filter by status (All, Pending, Assigned, In Transit, Delivered)

### Booking Cards Grid
- Responsive grid (1-3 columns)
- Color-coded status badges
- Action buttons based on status
- Hover effects for better UX

---

## 🎨 Visual Flow

```
CUSTOMER BOOKS & PAYS
        ↓
BOOKING CREATED (pending_assignment)
        ↓
ADMIN NOTIFIED
        ↓
┌─────────────────────────────────────────┐
│   ADMIN OPENS /bookings-management      │
│                                         │
│   Sees: 3 Pending Assignment            │
│   Clicks: "Assign Driver" button        │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│   ASSIGN DRIVER MODAL OPENS             │
│                                         │
│   Shows:                                │
│   • Booking details                     │
│   • Available drivers list              │
│   • Driver ratings & vehicles           │
│                                         │
│   Admin selects: Ahmed Ibrahim          │
│   Clicks: "Assign Driver"               │
└─────────────────────────────────────────┘
        ↓
DRIVER ASSIGNED (driver_assigned)
        ↓
NOTIFICATIONS SENT
        ↓
┌─────────────────────────────────────────┐
│   CUSTOMER RECEIVES:                    │
│   • SMS with driver details             │
│   • Email with driver info              │
│   • Tracking link                       │
│                                         │
│   DRIVER RECEIVES:                      │
│   • App notification                    │
│   • Job details                         │
│   • Customer contact                    │
└─────────────────────────────────────────┘
        ↓
DRIVER ACCEPTS & PREPARES FOR PICKUP
```

---

## 🔍 Booking Card States

### Pending Assignment (Orange)
```
┌────────────────────────────────────────┐
│ BK-1705234567        [Pending]         │
│ 2025-01-15 10:30:00                    │
│                                        │
│ 👤 John Doe                            │
│    john@example.com                    │
│                                        │
│ 📍 Lagos → Abuja                       │
│ 📦 100 kg • general • standard         │
│ 📅 Pickup: 2025-01-16                  │
│                                        │
│ ⚠️ Action Required                     │
│                                        │
│ $302.40        [Assign Driver] 👤      │
└────────────────────────────────────────┘
```

### Driver Assigned (Blue)
```
┌────────────────────────────────────────┐
│ BK-1705234568    [Driver Assigned]     │
│ 2025-01-15 09:15:00                    │
│                                        │
│ 👤 Jane Smith                          │
│    jane@example.com                    │
│                                        │
│ 📍 Kano → Port Harcourt                │
│ 📦 150 kg • perishable • express       │
│ 📅 Pickup: 2025-01-16                  │
│                                        │
│ ✅ Driver: Ahmed Ibrahim               │
│                                        │
│ $450.50                                │
└────────────────────────────────────────┘
```

---

## 🚀 Quick Actions

### For Admin:
1. **View All Bookings** - `/bookings-management`
2. **Filter Pending** - Select "Pending Assignment" from dropdown
3. **Assign Driver** - Click button on booking card
4. **Search Booking** - Use search bar with booking ID or customer name

### For Operations Team:
- Monitor pending assignments
- Assign drivers based on location and availability
- Track assignment completion rate
- Handle reassignments if needed

---

## 📊 Key Metrics Tracked

### On Bookings Management Page:
- **Pending Assignment Count** - Bookings waiting for driver
- **Driver Assigned Count** - Bookings with assigned driver
- **In Transit Count** - Active deliveries
- **Completed Count** - Delivered today

### Performance Metrics:
- Average assignment time (target: < 24 hours)
- Driver utilization rate
- On-time pickup rate
- Customer satisfaction after assignment

---

## 🎯 Best Practices

### For Quick Assignment:
1. Check pending bookings every hour
2. Assign drivers based on proximity
3. Consider driver ratings and experience
4. Match vehicle capacity to cargo weight
5. Verify driver availability before assigning

### For Optimal Operations:
- Assign express bookings first
- Group nearby pickups for same driver
- Monitor driver workload
- Keep backup drivers ready
- Track assignment-to-pickup time

---

## 🔔 Notification Timeline

```
Payment Completed
       ↓
Immediate: Admin notified
       ↓
0-24 hours: Driver assigned
       ↓
Immediate: Customer & driver notified
       ↓
Next day: Pickup scheduled
       ↓
30 min before: Pickup reminder
       ↓
On arrival: Pickup completed
       ↓
In transit: Live tracking
       ↓
On delivery: Delivery completed
```

---

## 📱 Mobile Responsive

The Bookings Management page is fully responsive:
- **Desktop:** 3-column grid
- **Tablet:** 2-column grid
- **Mobile:** 1-column stack

All features accessible on any device.

---

## 🎉 Summary

**Driver assignment happens in:**
- **Page:** `/bookings-management` (Manage Bookings)
- **Action:** Click "Assign Driver" button on booking card
- **Process:** Select driver from modal → Confirm assignment
- **Result:** Customer and driver notified, pickup scheduled

**The entire process takes less than 2 minutes!** 🚀

Admin has full control over driver assignments with an intuitive interface showing all relevant information for making the best assignment decision.
