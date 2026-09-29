// Install PWA Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('installBtn');
    if(btn) btn.style.display = 'inline-block';
});

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User menginstal aplikasi');
            }
            deferredPrompt = null;
        });
    } else {
        alert('Aplikasi sudah terinstal atau browser tidak mendukung.');
    }
}

// Auth Logic
function openAuthModal() { document.getElementById('authModal').style.display = 'flex'; }
function closeAuthModal() { document.getElementById('authModal').style.display = 'none'; }

function handleLogin() {
    const email = document.getElementById('userEmail').value;
    if(!email) { alert('Masukkan email Anda!'); return; }
    localStorage.setItem('ghof_user', email);
    alert('Login Berhasil!');
    window.location.href = 'dashboard.html';
}

function logout() {
    localStorage.removeItem('ghof_user');
    window.location.href = 'index.html';
}

// Checkout Logic
let selectedPkg = '';
let selectedPrice = 0;

function selectPackage(packageName, price) {
    const user = localStorage.getItem('ghof_user');
    if(!user) {
        alert('Silakan Login/Daftar terlebih dahulu sebelum memilih paket!');
        openAuthModal();
        return;
    }
    selectedPkg = packageName;
    selectedPrice = price;
    document.getElementById('summaryPackage').innerText = `Paket: ${packageName} - Rp ${price.toLocaleString()}`;
    document.getElementById('checkoutModal').style.display = 'flex';
}

function closeCheckout() { document.getElementById('checkoutModal').style.display = 'none'; }

function submitOrder() {
    alert(`Pesanan Paket ${selectedPkg} berhasil dibuat!\nSilakan transfer Rp ${selectedPrice.toLocaleString()} ke nomor DANA / ShopeePay: 08979517541.\n\nTunggu verifikasi dari admin (anakbahasainternational@gmail.com).`);
    closeCheckout();
}

// Custom Domain Mapping Logic
function saveCustomDomain() {
    const target = document.getElementById('targetUrl').value;
    const custom = document.getElementById('customDomainInput').value;
    if(!target || !custom) { alert('Harap isi URL target dan custom domain!'); return; }
    
    let domains = JSON.parse(localStorage.getItem('ghof_domains') || '[]');
    domains.push({ target, custom });
    localStorage.setItem('ghof_domains', JSON.stringify(domains));
    
    alert(`Berhasil! Custom domain ${custom} diarahkan ke ${target}`);
    loadDomains();
}

function loadDomains() {
    const container = document.getElementById('domainList');
    if(!container) return;
    let domains = JSON.parse(localStorage.getItem('ghof_domains') || '[]');
    container.innerHTML = domains.map(d => `<div style="background:#1e293b; padding:10px; border-radius:8px; margin-top:5px;">🌐 <b>${d.custom}</b> ➔ Menuju: ${d.target}</div>`).join('');
}
window.onload = loadDomains;

// Admin Verification Logic
function verifyAdmin() {
    const email = document.getElementById('adminEmail').value;
    if(email === 'anakbahasainternational@gmail.com') {
        document.getElementById('adminLoginBox').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        alert('Selamat datang Pencipta GhofDomainku!');
    } else {
        alert('Akses Ditolak! Hanya anakbahasainternational@gmail.com yang berhak.');
    }
}

function logoutAdmin() {
    document.getElementById('adminLoginBox').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
}

function updateStats() {
    alert('Statistik rating dan pengguna berhasil diperbarui!');
}

function updatePayment() {
    alert('Nomor pembayaran berhasil diperbarui!');
}
