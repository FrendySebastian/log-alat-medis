// 1. Pilih elemen dari HTML
const form = document.getElementById('maintenanceForm');
const tableBody = document.getElementById('logTableBody');

// 2. Ambil data dari LocalStorage saat pertama kali dibuka
let logs = JSON.parse(localStorage.getItem('medicalLogs')) || [];

// 3. Fungsi untuk menampilkan data ke tabel
function renderTable() {
    tableBody.innerHTML = ''; // Bersihkan tabel dulu
    
    logs.forEach((log, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${log.name}</td>
            <td>${log.date}</td>
            <td>${log.technician}</td>
            <td><span class="status-badge">${log.status}</span></td>
            <td>${log.notes}</td>
            <td><button class="btn-delete" onclick="deleteLog(${index})">Hapus</button></td>
        `;
        
        tableBody.appendChild(row);
    });
}

// 4. Fungsi untuk menambahkan data baru
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah halaman reload

    const newLog = {
        name: document.getElementById('equipmentName').value,
        date: document.getElementById('maintenanceDate').value,
        technician: document.getElementById('technician').value,
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value
    };

    logs.push(newLog); // Tambah ke array
    saveData(); // Simpan ke storage
    renderTable(); // Tampilkan ulang tabel
    form.reset(); // Reset form
});

// 5. Fungsi untuk menghapus data
window.deleteLog = function(index) {
    if(confirm('Apakah Anda yakin ingin menghapus log ini?')) {
        logs.splice(index, 1);
        saveData();
        renderTable();
    }
};

// 6. Fungsi Simpan ke LocalStorage
function saveData() {
    localStorage.setItem('medicalLogs', JSON.stringify(logs));
}

// Jalankan fungsi render saat网页muat
renderTable();