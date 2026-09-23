// Extended Store Outlets Dataset (kept in sync with index.html OUTLETS)
const outletsData = [
  { name: "Shahrah-e-Faisal (Nursery)", city: "Karachi", address: "16b Shahrah-e-Faisal Rd, PECHS Block 6, Karachi", timing: "12:00 PM - 03:00 AM" },
  { name: "Clifton (Boat Basin)", city: "Karachi", address: "Block 5 Clifton, Marine Drive, Karachi", timing: "11:00 AM - 04:00 AM" },
  { name: "Gulshan-e-Iqbal", city: "Karachi", address: "Block 13-C, University Road, Karachi", timing: "12:00 PM - 03:00 AM" },
  { name: "North Nazimabad", city: "Karachi", address: "Block H, Near Five Star Chowrangi, Karachi", timing: "12:00 PM - 03:00 AM" },
  { name: "DHA Phase 6", city: "Karachi", address: "Khayaban-e-Shahbaz, Phase 6, Karachi", timing: "12:00 PM - 03:00 AM" },
  { name: "Atrium Mall", city: "Karachi", address: "Staff Lines, Zaibunnisa Street, Saddar, Karachi", timing: "11:00 AM - 11:00 PM" },
  { name: "Lucky One Mall", city: "Karachi", address: "LA-2/B, Block 21, Rashid Minhas Rd, Karachi", timing: "11:00 AM - 12:00 AM" },
  { name: "Bahadurabad", city: "Karachi", address: "Chowrangi, Alamgir Road, Bahadurabad, Karachi", timing: "12:00 PM - 02:00 AM" },
  { name: "Tariq Road", city: "Karachi", address: "Main Tariq Road, PECHS, Karachi", timing: "12:00 PM - 03:00 AM" },
  { name: "Dolmen Mall Clifton", city: "Karachi", address: "HC-3, Marine Drive, Clifton Block 4, Karachi", timing: "11:00 AM - 11:00 PM" },
  { name: "Gulberg III", city: "Lahore", address: "MM Alam Road, Block B2, Gulberg III, Lahore", timing: "12:00 PM - 03:00 AM" },
  { name: "DHA Phase 3 (Y Block)", city: "Lahore", address: "Street 12, Sector Y DHA Phase 3, Lahore", timing: "12:00 PM - 03:00 AM" },
  { name: "Johar Town", city: "Lahore", address: "Main Boulevard Johar Town, Block G, Lahore", timing: "12:00 PM - 02:00 AM" },
  { name: "Mall Road", city: "Lahore", address: "Shahrah-e-Quaid-e-Azam, Near Regal Chowk, Lahore", timing: "11:00 AM - 01:00 AM" },
  { name: "Packages Mall", city: "Lahore", address: "Walton Road, Near Defence Morr, Lahore", timing: "11:00 AM - 11:00 PM" },
  { name: "Emporium Mall", city: "Lahore", address: "Abdul Haque Rd, Johar Town, Lahore", timing: "11:00 AM - 11:00 PM" },
  { name: "Thokar Niaz Baig", city: "Lahore", address: "Multan Road, Thokar Niaz Baig, Lahore", timing: "12:00 PM - 02:00 AM" },
  { name: "F-6 Markaz", city: "Islamabad", address: "Super Market, F-6 Markaz, Islamabad", timing: "11:00 AM - 02:00 AM" },
  { name: "F-11 Markaz", city: "Islamabad", address: "Select Center, F-11 Markaz, Islamabad", timing: "11:00 AM - 02:00 AM" },
  { name: "Centaurus Mall", city: "Islamabad", address: "Food Court, 4th Floor, Centaurus Mall, Islamabad", timing: "11:00 AM - 11:00 PM" },
  { name: "G-9 Markaz", city: "Islamabad", address: "Karachi Company, G-9 Markaz, Islamabad", timing: "11:00 AM - 01:00 AM" },
  { name: "Saddar (Commercial Market)", city: "Rawalpindi", address: "Haider Rd, Saddar, Rawalpindi", timing: "12:00 PM - 02:00 AM" },
  { name: "Bahria Town Phase 4", city: "Rawalpindi", address: "Civic Center, Bahria Town Phase 4, Rawalpindi", timing: "12:00 PM - 02:00 AM" },
  { name: "Saddar Multan", city: "Multan", address: "Abdali Road, Near Clock Tower, Multan", timing: "12:00 PM - 01:00 AM" },
  { name: "Gulgasht Colony", city: "Multan", address: "Main Boulevard, Gulgasht Colony, Multan", timing: "12:00 PM - 01:00 AM" },
  { name: "D Ground", city: "Faisalabad", address: "People's Colony, D Ground, Faisalabad", timing: "12:00 PM - 01:00 AM" },
  { name: "Susan Road", city: "Faisalabad", address: "Susan Road, Madina Town, Faisalabad", timing: "12:00 PM - 01:00 AM" },
  { name: "University Road", city: "Peshawar", address: "University Road, Near Board Bazaar, Peshawar", timing: "12:00 PM - 01:00 AM" },
  { name: "Saddar Peshawar", city: "Peshawar", address: "Saddar Road, Cantonment, Peshawar", timing: "12:00 PM - 01:00 AM" }
];

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toastContainer = document.getElementById('toast-container');

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();
  if (document.getElementById('store-list') && typeof renderStores === 'function') {
    // Prefer page-inline OUTLETS renderer when present
  } else if (document.getElementById('store-list')) {
    renderStores(outletsData);
  }
  const saved = localStorage.getItem('kfc-theme') || 'day';
  if (typeof setTheme === 'function') setTheme(saved);
});

// Render Outlets
function renderStores(list) {
  const container = document.getElementById('store-list');
  if (!container) return;
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = `<p class="text-sm text-gray-500 text-center py-4">No KFC outlets found matching your query.</p>`;
    return;
  }

  list.forEach(store => {
    const card = document.createElement('div');
    card.className = "p-4 border border-gray-200 rounded-lg hover:border-red-500 transition cursor-pointer flex items-start gap-3 bg-white";
    card.onclick = () => selectStore(store.name);
    card.innerHTML = `
      <i data-lucide="map-pin" class="w-5 h-5 text-red-600 shrink-0 mt-1"></i>
      <div>
        <h3 class="font-bold text-black text-sm">${store.name}</h3>
        <p class="text-xs text-gray-500">${store.address}</p>
        <p class="text-xs font-bold text-red-600 mt-1">${store.timing}</p>
      </div>
    `;
    container.appendChild(card);
  });
  if (window.lucide) lucide.createIcons();
}

// Filter Stores Logic
function filterStores() {
  const searchQuery = (document.getElementById('store-search')?.value || '').toLowerCase();
  const selectedCity = document.getElementById('city-select')?.value || 'All';

  const filtered = outletsData.filter(store => {
    const matchesCity = selectedCity === 'All' || store.city === selectedCity;
    const matchesQuery = store.name.toLowerCase().includes(searchQuery) || store.address.toLowerCase().includes(searchQuery);
    return matchesCity && matchesQuery;
  });

  renderStores(filtered);
}

// Select Store Handler
function selectStore(storeName) {
  const label = document.getElementById('selected-store-label');
  if (label) label.innerText = storeName;
  if (typeof showToast === 'function') showToast(`Selected Store: ${storeName}`);
}

// Toggle Active Red Border for Order Modes
function setActiveOrderMode(selectedButton) {
  document.querySelectorAll('.order-mode-btn').forEach(btn => btn.classList.remove('active'));
  selectedButton.classList.add('active');
}

// Sidebar Controls
function toggleSidebar() {
  sidebar?.classList.toggle('-translate-x-full');
  overlay?.classList.toggle('hidden');
}

function closeSidebar() {
  sidebar?.classList.add('-translate-x-full');
  overlay?.classList.add('hidden');
}

// Toast Alert Notification
function showToast(message) {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'bg-white border border-gray-200 rounded-lg p-3 shadow-xl flex items-center gap-3 text-xs font-semibold text-black pointer-events-auto min-w-[280px] animate-bounce';
  toast.innerHTML = `
    <div class="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold shrink-0">!</div>
    <span class="flex-1">${message}</span>
    <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-black">✕</button>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.remove(), 4000);
}

// REORDER Handler
function handleReorder() {
  showToast("Please login first to reorder");
  setTimeout(() => navigateTo('login'), 800);
}

// Submit Login Handler
function submitLogin() {
  const phone = document.getElementById('login-phone')?.value;
  if (!phone) {
    showToast("Please enter a valid phone number");
  } else {
    showToast("Logging in...");
    setTimeout(() => navigateTo('home'), 1000);
  }
}

// Single Page Navigation
function navigateTo(viewId) {
  closeSidebar();
  document.querySelectorAll('.page-view').forEach(view => view.classList.add('hidden'));
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) targetView.classList.remove('hidden');
  window.scrollTo(0, 0);
}

// Day / Night Switcher — Day = bright/light theme
function setTheme(theme) {
  const body = document.getElementById('body-container');
  const dayBtn = document.getElementById('day-btn');
  const nightBtn = document.getElementById('night-btn');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const isNight = theme === 'night';

  if (!body || !dayBtn || !nightBtn) return;

  body.classList.remove('bg-gray-100', 'bg-stone-900', 'theme-night');
  body.classList.add(isNight ? 'bg-stone-900' : 'bg-gray-100');
  if (isNight) body.classList.add('theme-night');

  if (header) {
    header.classList.toggle('bg-white', !isNight);
    header.classList.toggle('border-gray-200', !isNight);
    header.classList.toggle('bg-stone-800', isNight);
    header.classList.toggle('border-stone-700', isNight);
    header.classList.toggle('text-white', isNight);
  }

  if (footer) {
    footer.classList.toggle('bg-white', !isNight);
    footer.classList.toggle('border-gray-200', !isNight);
    footer.classList.toggle('bg-stone-800', isNight);
    footer.classList.toggle('border-stone-700', isNight);
    footer.classList.toggle('text-gray-300', isNight);
    footer.classList.toggle('text-gray-600', !isNight);
  }

  dayBtn.classList.toggle('bg-red-600', !isNight);
  dayBtn.classList.toggle('text-white', !isNight);
  dayBtn.classList.toggle('text-gray-400', isNight);

  nightBtn.classList.toggle('bg-red-600', isNight);
  nightBtn.classList.toggle('text-white', isNight);
  nightBtn.classList.toggle('text-gray-400', !isNight);

  localStorage.setItem('kfc-theme', theme);
}
