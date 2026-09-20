/**
 * AgriVision AI — Frontend Application Logic
 * Single Page Application for Leaf Disease Diagnostics & AI Advisory
 */

let selectedFile = null;
let selectedSampleKey = null;
let currentAdvisory = null;

// Initialize event listeners when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop();
});

// Setup drag and drop support for leaf upload zone
function setupDragAndDrop() {
    const dropZone = document.getElementById('dropZone');
    if (!dropZone) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files.length > 0) {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.files = files;
        handleFileSelect({ target: { files: files } });
    }
}

// User file input handler
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        selectedFile = file;
        selectedSampleKey = null;
        clearActiveSampleHighlight();

        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('dropZone').classList.add('d-none');
            document.getElementById('previewContainer').classList.remove('d-none');
            document.getElementById('analyzeBtn').disabled = false;
        };
        reader.readAsDataURL(file);
    }
}

// 1-Click Sample Test Kit loader
function loadSample(sampleKey, btnElement) {
    selectedSampleKey = sampleKey;
    selectedFile = null;
    clearActiveSampleHighlight();

    if (btnElement) {
        btnElement.classList.add('active-sample');
    }

    const origin = (window.location.origin && window.location.origin !== 'null' && window.location.origin.startsWith('http'))
        ? window.location.origin
        : 'http://127.0.0.1:8001';

    // Append timestamp query parameter to bypass browser image caching
    document.getElementById('previewImg').src = `${origin}/static/samples/${sampleKey}.jpg?v=${Date.now()}`;
    document.getElementById('dropZone').classList.add('d-none');
    document.getElementById('previewContainer').classList.remove('d-none');
    document.getElementById('analyzeBtn').disabled = false;
}

function clearActiveSampleHighlight() {
    const buttons = document.querySelectorAll('.btn-sample');
    buttons.forEach(b => b.classList.remove('active-sample'));
}

// Reset view back to initial state
function resetForm() {
    selectedFile = null;
    selectedSampleKey = null;
    clearActiveSampleHighlight();

    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';

    document.getElementById('dropZone').classList.remove('d-none');
    document.getElementById('previewContainer').classList.add('d-none');
    document.getElementById('analyzeBtn').disabled = true;

    document.getElementById('placeholderState').classList.remove('d-none');
    document.getElementById('loadingState').classList.add('d-none');
    document.getElementById('resultState').classList.add('d-none');
}

// Execute AI Disease Diagnostics API Call
async function runAnalysis() {
    document.getElementById('placeholderState').classList.add('d-none');
    document.getElementById('loadingState').classList.remove('d-none');
    document.getElementById('resultState').classList.add('d-none');

    const formData = new FormData();
    if (selectedFile) {
        formData.append('file', selectedFile);
    } else if (selectedSampleKey) {
        formData.append('sample_key', selectedSampleKey);
    }

    const origin = (window.location.origin && window.location.origin !== 'null' && window.location.origin.startsWith('http'))
        ? window.location.origin
        : 'http://127.0.0.1:8001';

    const endpoints = [
        `${origin}/api/v1/predict`,
        `${origin}/api/predict`
    ];

    for (const url of endpoints) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                displayResult(data);
                return;
            } else if (response.status === 400 || response.status === 422) {
                const data = await response.json();
                alert('Validation Error: ' + (data.detail || 'Invalid input file or sample'));
                resetForm();
                return;
            }
        } catch (err) {
            // Retry next endpoint option
        }
    }

    alert(
        'Connection Error: Could not connect to FastAPI backend.\n\n' +
        'Please ensure your backend server is running in CMD on http://127.0.0.1:8001.'
    );
    resetForm();
}

// Render diagnosis details and advisory tabs
function displayResult(data) {
    currentAdvisory = data.advisory || {};
    document.getElementById('cropBadge').innerText = data.crop || 'Crop';
    document.getElementById('displayName').innerText = data.display_name || data.predicted_class;
    document.getElementById('confidenceBadge').innerText = (data.confidence || 95).toFixed(1) + '% Confidence';

    document.getElementById('loadingState').classList.add('d-none');
    document.getElementById('resultState').classList.remove('d-none');
    switchTab('symptoms');
}

// Switch between Symptoms, Organic, and Chemical advisory tabs
function switchTab(tabName, eventBtn) {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));

    if (eventBtn) {
        eventBtn.classList.add('active');
    } else {
        const activeBtn = Array.from(buttons).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(tabName));
        if (activeBtn) activeBtn.classList.add('active');
    }

    const contentDiv = document.getElementById('tabContent');
    let items = [];
    if (tabName === 'symptoms') items = currentAdvisory.symptoms || ['No symptoms listed'];
    if (tabName === 'organic') items = currentAdvisory.organic_treatment || ['No organic treatment required'];
    if (tabName === 'chemical') items = currentAdvisory.chemical_treatment || ['No chemical treatment required'];

    let html = '<div class="d-flex flex-column gap-2 mt-2">';
    items.forEach(item => {
        html += `<div class="list-group-item-custom d-flex align-items-center"><i class="fa-solid fa-circle-check text-success me-3 fs-5"></i><span>${item}</span></div>`;
    });
    html += '</div>';
    contentDiv.innerHTML = html;
}
