// Definisi mapping awal untuk GL
const glMappings = {
    'getLocal': 'GetLocal',
    'sendPacket': 'SendPacket',
    'pos.x': 'posX',
    'pos.y': 'posY',
    'punchx =': 'px =',
    'punchy =': 'py =',
    'punchx =': 'px=',
    'punchy =': 'py=',
    'sleep': 'Sleep',
    'getPlayerByNetID': 'GetPlayerByNetID',
    'getWorldObject': 'GetObjectList',
    'logToConsole': 'LogToConsole',
    'findPath': 'FindPath',
    'getWorld().name': 'GetWorldName',
    'getItemByID': 'findItemID',
    'getInventory': 'GetInventory',
    'sendPacketRaw': 'SendPacketRaw',
    'sendVariant': 'SendVariant', 
    'checkTile': 'GetTile',
    'getTile': 'GetTiles',
    'getPlayerList': 'GetPlayerList',
    'getNpc': 'getNPCList',
    '[0]': 'v1',
    '[1]': 'v2',
    '[2]': 'v3',
    '[3]': 'v4',
//    'id': 'oid',
};

// Buat mapping terbalik untuk GENTA dari GL
const gentaMappings = {};
Object.keys(glMappings).forEach(key => {
    gentaMappings[glMappings[key]] = key;
});

// State untuk mode saat ini (default GL)
let isGlMode = true;

// Fungsi untuk mendapatkan mapping sesuai mode
function getMappings() {
    return isGlMode ? glMappings : gentaMappings;
}

// Fungsi untuk mengonversi teks sesuai mode
function convertText(text) {
    const mappings = getMappings();
    Object.keys(mappings).forEach(key => {
        const regex = new RegExp(`\\b${key}\\s*=\\s*|\\b${key}\\s*`, 'g'); 
        text = text.replace(regex, mappings[key]);
    });
    return text;
}

// Fungsi untuk memproses teks input
function processText(inputText) {
    const outputText = convertText(inputText);
    downloadOutput(outputText, 'output.txt');
    return outputText;
}

// Fungsi untuk membaca dan memproses file
function processFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        const outputText = convertText(fileContent);
        downloadOutput(outputText, 'output.txt');
        callback(outputText);
    };
    reader.readAsText(file);
}

// Fungsi untuk mengunduh output sebagai file
function downloadOutput(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Fungsi untuk menangani input teks dari textarea
function handleTextInput() {
    const inputText = document.getElementById('inputText').value;
    const outputText = processText(inputText);
    document.getElementById('outputText').textContent = outputText;
}

// Fungsi untuk menangani input dari file
function handleFileInput() {
    const fileInput = document.getElementById('inputFile');
    if (fileInput.files.length === 0) {
        alert('Silakan pilih file untuk diproses.');
        return;
    }
    const file = fileInput.files[0];
    processFile(file, function(outputText) {
        document.getElementById('outputText').textContent = outputText;
    });
}

// Fungsi untuk menangani toggle GL ⇄ GENTA
document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById("toggleSwitch");
    const toggleText = document.getElementById("toggleText");

    toggle.addEventListener("click", function() {
        isGlMode = !isGlMode; // Toggle mode
        toggle.classList.toggle("active"); // Ubah tampilan tombol
        toggleText.textContent = isGlMode ? "GL" : "GENTA"; // Ubah teks toggle
    });
});
