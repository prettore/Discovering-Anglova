// Update the JavaScript to work with our sample images

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial content
    loadInitialContent();
});

// Initialize the page
function initializePage() {
    // Create metric content divs dynamically
    createMetricContentDivs();
    
    // Set up modal for image viewing
    setupImageModal();
}

// Set up event listeners
function setupEventListeners() {
    // Communication tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            openTech(e, this.textContent.toLowerCase());
        });
    });
    
    // Spatiotemporal metrics
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
        item.addEventListener('click', function() {
            openMetric(this.getAttribute('data-metric'));
        });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
}

// Load initial content
function loadInitialContent() {
    // Load Bluetooth analysis content
    loadCommunicationContent('bluetooth');
    
    // Load Acceleration metric content
    loadSpatiotemporalContent('acceleration');
}

// Create metric content divs dynamically
function createMetricContentDivs() {
    const metricsContent = document.querySelector('.metrics-content');
    const metricsList = document.querySelectorAll('.metric-item');
    
    metricsList.forEach(item => {
        if (item.getAttribute('data-metric') !== 'acceleration') { // Acceleration already exists in HTML
            const metricName = item.getAttribute('data-metric');
            const displayName = item.textContent;
            
            const metricDiv = document.createElement('div');
            metricDiv.id = metricName;
            metricDiv.className = 'metric-content';
            
            metricDiv.innerHTML = `
                <h3>${displayName}</h3>
                <p>Analysis of ${displayName.toLowerCase()} patterns across different units in the scenario.</p>
                <div class="analysis-grid" id="${metricName}-grid">
                    <!-- Content will be loaded dynamically -->
                </div>
            `;
            
            metricsContent.appendChild(metricDiv);
        }
    });
}

// Set up modal for image viewing
function setupImageModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-img">
    `;
    document.body.appendChild(modal);
    
    // Close modal when clicking the x
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Open communication technology tab
function openTech(evt, techName) {
    // Hide all tech content
    const techContents = document.querySelectorAll('.tech-content');
    techContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show the selected tech content and mark the button as active
    document.getElementById(techName).classList.add('active');
    
    // If event is from a button click, mark that button as active
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add('active');
    } else {
        // Find the button by tech name and mark it active
        document.querySelector(`.tab-btn[onclick*="${techName}"]`).classList.add('active');
    }
    
    // Load content if not already loaded
    loadCommunicationContent(techName);
}

// Open spatiotemporal metric
function openMetric(metricName) {
    // Hide all metric content
    const metricContents = document.querySelectorAll('.metric-content');
    metricContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all metric items
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show the selected metric content and mark the item as active
    document.getElementById(metricName).classList.add('active');
    document.querySelector(`.metric-item[data-metric="${metricName}"]`).classList.add('active');
    
    // Load content if not already loaded
    loadSpatiotemporalContent(metricName);
}

// Load communication content
function loadCommunicationContent(techName) {
    const grid = document.getElementById(`${techName}-grid`);
    
    // Check if content is already loaded
    if (grid.children.length > 0) {
        return;
    }
    
    // Show loading indicator
    const loader = document.createElement('div');
    loader.className = 'loader';
    grid.appendChild(loader);
    
    // Define analysis items based on technology
    let analysisItems = [
        { name: 'Command', description: `${techName.toUpperCase()} communication patterns at the Command level` },
        { name: 'Command_ecdf', description: `Empirical Cumulative Distribution Function of Command ${techName.toUpperCase()} communication` },
        { name: 'Company', description: `${techName.toUpperCase()} communication patterns at the Company level` },
        { name: 'Company_ecdf', description: `Empirical Cumulative Distribution Function of Company ${techName.toUpperCase()} communication` },
        { name: 'Company Type', description: `${techName.toUpperCase()} communication patterns by Company Type` },
        { name: 'Company Type_ecdf', description: `Empirical Cumulative Distribution Function by Company Type for ${techName.toUpperCase()}` },
        { name: 'Platoon', description: `${techName.toUpperCase()} communication patterns at the Platoon level` },
        { name: 'Platoon_ecdf', description: `Empirical Cumulative Distribution Function of Platoon ${techName.toUpperCase()} communication` },
        { name: 'Platoon Type', description: `${techName.toUpperCase()} communication patterns by Platoon Type` },
        { name: 'Platoon Type_ecdf', description: `Empirical Cumulative Distribution Function by Platoon Type for ${techName.toUpperCase()}` },
        { name: 'Vehicle Function', description: `${techName.toUpperCase()} communication patterns by Vehicle Function` },
        { name: 'Vehicle Function_ecdf', description: `Empirical Cumulative Distribution Function by Vehicle Function for ${techName.toUpperCase()}` },
        { name: 'Vehicle Type', description: `${techName.toUpperCase()} communication patterns by Vehicle Type` },
        { name: 'Vehicle Type_ecdf', description: `Empirical Cumulative Distribution Function by Vehicle Type for ${techName.toUpperCase()}` }
    ];
    
    // Remove loader after a short delay to simulate loading
    setTimeout(() => {
        grid.removeChild(loader);
        
        // Create analysis items
        analysisItems.forEach(item => {
            const analysisItem = document.createElement('div');
            analysisItem.className = 'analysis-item';
            
            analysisItem.innerHTML = `
                <img src="images/communication/${techName}/${item.name}.png" alt="${item.name}" class="analysis-image">
                <div class="analysis-info">
                    <h4>${formatName(item.name)}</h4>
                    <p>${item.description}</p>
                </div>
            `;
            
            // Add click event to open image in modal
            const img = analysisItem.querySelector('img');
            img.addEventListener('click', function() {
                openImageModal(this.src);
            });
            
            grid.appendChild(analysisItem);
        });
    }, 500);
}

// Load spatiotemporal content
function loadSpatiotemporalContent(metricName) {
    const grid = document.getElementById(`${metricName}-grid`);
    
    // Check if content is already loaded
    if (grid && grid.children.length > 0) {
        return;
    }
    
    // If grid doesn't exist yet, create it
    if (!grid) {
        const metricContent = document.getElementById(metricName);
        const newGrid = document.createElement('div');
        newGrid.className = 'analysis-grid';
        newGrid.id = `${metricName}-grid`;
        metricContent.appendChild(newGrid);
        
        // Update grid reference
        grid = newGrid;
    }
    
    // Show loading indicator
    const loader = document.createElement('div');
    loader.className = 'loader';
    grid.appendChild(loader);
    
    // Define analysis items for spatiotemporal metrics
    const analysisItems = [
        { name: 'Overall', description: `Overall ${formatMetricName(metricName)} analysis across all units` },
        { name: 'By_Command', description: `${formatMetricName(metricName)} analysis at the Command level` },
        { name: 'By_Company', description: `${formatMetricName(metricName)} analysis at the Company level` },
        { name: 'By_Platoon', description: `${formatMetricName(metricName)} analysis at the Platoon level` },
        { name: 'By_Vehicle_Type', description: `${formatMetricName(metricName)} analysis by Vehicle Type` }
    ];
    
    // Remove loader after a short delay to simulate loading
    setTimeout(() => {
        grid.removeChild(loader);
        
        // Create analysis items
        analysisItems.forEach(item => {
            const analysisItem = document.createElement('div');
            analysisItem.className = 'analysis-item';
            
            analysisItem.innerHTML = `
                <img src="images/spatiotemporal/${metricName}/${item.name}.png" alt="${item.name}" class="analysis-image">
                <div class="analysis-info">
                    <h4>${item.name.replace(/_/g, ' ')}</h4>
                    <p>${item.description}</p>
                </div>
            `;
            
            // Add click event to open image in modal
            const img = analysisItem.querySelector('img');
            img.addEventListener('click', function() {
                openImageModal(this.src);
            });
            
            grid.appendChild(analysisItem);
        });
    }, 500);
}

// Open image in modal
function openImageModal(src) {
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('modal-img');
    
    modal.style.display = 'block';
    modalImg.src = src;
}

// Format name for display
function formatName(name) {
    // Replace underscores with spaces
    let formattedName = name.replace(/_/g, ' ');
    
    // If name contains 'ecdf', format it as 'ECDF of...'
    if (formattedName.toLowerCase().includes('ecdf')) {
        formattedName = formattedName.replace(/ecdf/i, '');
        formattedName = 'ECDF of' + formattedName;
    }
    
    return formattedName;
}

// Helper function to convert kebab-case to Title Case
function formatMetricName(kebabCase) {
    return kebabCase
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
