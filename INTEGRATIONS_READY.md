# Integration Services - API Ready

## ✅ Services Created

### 1. notificationService.js
**Email Notifications:**
- `sendBookingConfirmation(bookingId, email)`
- `sendPaymentConfirmation(paymentId, email)`
- `sendDeliveryNotification(bookingId, email)`

**SMS Notifications:**
- `sendBookingSMS(bookingId, phone)`
- `sendDeliverySMS(bookingId, phone)`
- `sendDriverAssignedSMS(bookingId, phone)`

**Preferences:**
- `getPreferences()`
- `updatePreferences(preferences)`

### 2. uploadService.js
**File Uploads:**
- `uploadDocument(file, type, bookingId)`
- `uploadPaymentProof(file, paymentId)`
- `uploadProfilePicture(file)`
- `getDocuments(bookingId)`
- `deleteDocument(documentId)`

### 3. validationService.js
**Address Validation:**
- `validateAddress(address)`
- `geocodeAddress(address)`
- `calculateDistance(origin, destination)`

**Data Validation:**
- `validatePhone(phone, country)`
- `validateEmail(email)`

### 4. pdfService.js
**PDF Generation:**
- `generateReceipt(paymentId)`
- `generateInvoice(bookingId)`
- `generateBookingConfirmation(bookingId)`
- `generateDeliveryNote(bookingId)`
- `generateManifest(tripId)`
- `downloadPDF(blob, filename)` - Helper

### 5. FileUpload Component
Reusable file upload with:
- Drag & drop support
- File type validation
- Size validation
- Image preview
- Upload progress

## 📋 API Endpoints Required

### Notifications
```
POST /notifications/email/booking-confirmation
POST /notifications/email/payment-confirmation
POST /notifications/email/delivery-notification
POST /notifications/sms/booking
POST /notifications/sms/delivery
POST /notifications/sms/driver-assigned
GET  /notifications/preferences
PATCH /notifications/preferences
```

### Uploads
```
POST /uploads/document
POST /uploads/payment-proof
POST /uploads/profile-picture
GET  /uploads/documents/:bookingId
DELETE /uploads/document/:documentId
```

### Validation
```
POST /validation/address
POST /validation/geocode
POST /validation/distance
POST /validation/phone
POST /validation/email
```

### PDF Generation
```
GET /pdf/receipt/:paymentId
GET /pdf/invoice/:bookingId
GET /pdf/booking-confirmation/:bookingId
GET /pdf/delivery-note/:bookingId
GET /pdf/manifest/:tripId
```

## 🎯 Usage Examples

### Email Notifications
```javascript
import { notificationService } from '@/services'

// After booking creation
await notificationService.sendBookingConfirmation(bookingId, email)

// After payment
await notificationService.sendPaymentConfirmation(paymentId, email)
```

### SMS Notifications
```javascript
// Send booking SMS
await notificationService.sendBookingSMS(bookingId, phone)

// Driver assigned
await notificationService.sendDriverAssignedSMS(bookingId, phone)
```

### File Upload
```javascript
import { FileUpload } from '@/components/common'

<FileUpload
  onUploadSuccess={(data) => console.log('Uploaded:', data)}
  acceptedTypes="image/*,.pdf"
  maxSize={5 * 1024 * 1024}
  type="document"
  bookingId={bookingId}
/>
```

### Address Validation
```javascript
import { validationService } from '@/services'

// Validate address
const result = await validationService.validateAddress(address)

// Calculate distance
const distance = await validationService.calculateDistance(origin, destination)
```

### PDF Generation
```javascript
import { pdfService } from '@/services'

// Generate and download receipt
const blob = await pdfService.generateReceipt(paymentId)
pdfService.downloadPDF(blob, `receipt-${paymentId}.pdf`)

// Generate invoice
const invoiceBlob = await pdfService.generateInvoice(bookingId)
pdfService.downloadPDF(invoiceBlob, `invoice-${bookingId}.pdf`)
```

## 🔌 Backend Integration Requirements

### Email Service
**Options:**
- SendGrid
- AWS SES
- Mailgun
- Postmark

**Setup:**
```env
EMAIL_SERVICE_API_KEY=your_key
EMAIL_FROM_ADDRESS=noreply@yourdomain.com
EMAIL_FROM_NAME=Dara Logistics
```

### SMS Service
**Options:**
- Twilio
- Africa's Talking
- Termii
- SMS Portal

**Setup:**
```env
SMS_SERVICE_API_KEY=your_key
SMS_SENDER_ID=DaraLogistics
```

### File Storage
**Options:**
- AWS S3
- Cloudinary
- Azure Blob Storage
- Google Cloud Storage

**Setup:**
```env
STORAGE_SERVICE=s3
AWS_S3_BUCKET=your-bucket
AWS_ACCESS_KEY=your_key
AWS_SECRET_KEY=your_secret
```

### Address Validation
**Options:**
- Google Maps API
- Mapbox
- Here Maps
- OpenStreetMap

**Setup:**
```env
MAPS_API_KEY=your_google_maps_key
```

### PDF Generation
**Libraries:**
- Node.js: PDFKit, Puppeteer, jsPDF
- Python: ReportLab, WeasyPrint
- PHP: TCPDF, FPDF

## 📱 Integration Points

### Booking Flow
```javascript
// After booking creation
await notificationService.sendBookingConfirmation(bookingId, email)
await notificationService.sendBookingSMS(bookingId, phone)

// Generate confirmation PDF
const pdf = await pdfService.generateBookingConfirmation(bookingId)
```

### Payment Flow
```javascript
// After payment success
await notificationService.sendPaymentConfirmation(paymentId, email)

// Generate receipt
const receipt = await pdfService.generateReceipt(paymentId)
```

### Delivery Flow
```javascript
// On delivery
await notificationService.sendDeliveryNotification(bookingId, email)
await notificationService.sendDeliverySMS(bookingId, phone)

// Generate delivery note
const note = await pdfService.generateDeliveryNote(bookingId)
```

## 🧪 Testing Checklist

### Email Service
- [ ] Booking confirmation sent
- [ ] Payment confirmation sent
- [ ] Delivery notification sent
- [ ] Email templates render correctly
- [ ] Attachments work

### SMS Service
- [ ] Booking SMS sent
- [ ] Delivery SMS sent
- [ ] Driver assigned SMS sent
- [ ] Phone numbers validated
- [ ] International numbers work

### File Upload
- [ ] Files upload successfully
- [ ] File type validation works
- [ ] Size validation works
- [ ] Preview displays correctly
- [ ] Upload progress shows

### Address Validation
- [ ] Addresses validated
- [ ] Geocoding works
- [ ] Distance calculated correctly
- [ ] Invalid addresses rejected

### PDF Generation
- [ ] Receipts generate correctly
- [ ] Invoices generate correctly
- [ ] PDFs download properly
- [ ] All data displays correctly

## 🔐 Security Considerations

### File Upload
- Validate file types server-side
- Scan for malware
- Limit file sizes
- Use secure storage
- Generate unique filenames

### API Keys
- Store in environment variables
- Never commit to repository
- Rotate regularly
- Use different keys for dev/prod

### Data Privacy
- Encrypt sensitive data
- Comply with GDPR/data laws
- Allow users to opt-out
- Secure file storage

## 📊 Response Formats

### Email/SMS Response
```json
{
  "success": true,
  "messageId": "msg_123",
  "status": "sent"
}
```

### Upload Response
```json
{
  "success": true,
  "data": {
    "fileId": "file_123",
    "url": "https://storage.com/file.pdf",
    "filename": "document.pdf",
    "size": 1024000
  }
}
```

### Validation Response
```json
{
  "success": true,
  "valid": true,
  "data": {
    "formatted": "+234 123 456 7890",
    "country": "NG"
  }
}
```

## ✅ Summary

All integration services are ready:
1. ✅ Email notifications
2. ✅ SMS notifications
3. ✅ File upload
4. ✅ Address validation
5. ✅ PDF generation

Ready to connect backend APIs!
