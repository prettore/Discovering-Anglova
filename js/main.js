// Update the JavaScript to work with our sample images

document.addEventListener('DOMContentLoaded', function () {
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
        btn.addEventListener('click', function (e) {
            openTech(e, this.textContent.toLowerCase().replace('-', ''));
        });
    });

    // Spatiotemporal metrics
    const metricItems = document.querySelectorAll('.metric-item');
    metricItems.forEach(item => {
        item.addEventListener('click', function () {
            openMetric(this.getAttribute('data-metric'));
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

            if (metricName === 'on-the-road') {
                metricDiv.innerHTML = `
                <h3>${displayName}</h3>
                <p>Analysis of ${displayName.toLowerCase()} patterns across different units in the scenario. <br>
                The units are registered as using the road network, when closer than 100m.</p>
                <div class="analysis-grid" id="${metricName}-grid">
                    <!-- Content will be loaded dynamically -->
                </div>
            `;
            } else if (metricName === 'direction') {
                metricDiv.innerHTML = `
                <h3>${displayName}</h3>
                <p>Analysis of ${displayName.toLowerCase()} patterns across different units in the scenario. <br>
                Where 0º refers to the North direction, 90º refers to the East direction, 180º refers to the South direction, and 270º refers to the West direction.</p>
                <div class="analysis-grid" id="${metricName}-grid">
                    <!-- Content will be loaded dynamically -->
                </div>
            `;
            } else {
                metricDiv.innerHTML = `
                    <h3>${displayName}</h3>
                    <p>Analysis of ${displayName.toLowerCase()} patterns across different units in the scenario.</p>
                    <div class="analysis-grid" id="${metricName}-grid">
                        <!-- Content will be loaded dynamically -->
                    </div>
                `;
            }


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
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function (e) {
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
        const selector = `.tab-btn[onclick*="${techName}"]`;
        const button = document.querySelector(selector);
        if (button) {
            button.classList.add('active');
        }
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
    if (grid && grid.children.length > 0) {
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

            // Handle spaces in file names for URL encoding
            const fileName = encodeURIComponent(item.name) + '.png';

            analysisItem.innerHTML = `
                <img src="images/communication/${techName}/${fileName}" alt="${item.name}" class="analysis-image">
                <div class="analysis-info">
                    <h4>${formatName(item.name)}</h4>
                    <p>${item.description}</p>
                </div>
            `;

            // Add click event to open image in modal
            const img = analysisItem.querySelector('img');
            img.addEventListener('click', function () {
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

    // Define analysis items for spatiotemporal metrics based on actual file naming conventions
    let analysisItems = [];

    // Special case for spatiotemporal-coverage which has a different file structure
    if (metricName === 'spatiotemporal-coverage') {
        analysisItems.push({ name: 'anglova', description: `Units positions over time` });
        analysisItems.push({ name: 'Company', description: `Units positions over time colored by Company` });
    }
    else if (metricName === 'speed') {
        analysisItems = [
            { name: 'Command_speed_ecdf', description: `${formatMetricName(metricName)} analysis at the Command level` },
            { name: 'Company_speed_ecdf', description: `${formatMetricName(metricName)} analysis at the Company level` },
            { name: 'Company Type_speed_ecdf', description: `${formatMetricName(metricName)} analysis by Company Type` },
            { name: 'Platoon_speed_ecdf', description: `${formatMetricName(metricName)} analysis at the Platoon level` },
            { name: 'Platoon Type_speed_ecdf', description: `${formatMetricName(metricName)} analysis by Platoon Type` },
            { name: 'Vehicle Function_speed_ecdf', description: `${formatMetricName(metricName)} analysis by Vehicle Function` },
            { name: 'Vehicle Type_speed_ecdf', description: `${formatMetricName(metricName)} analysis by Vehicle Type` },
            { name: 'Company_boxplot', description: `${formatMetricName(metricName)} analysis by Company` },
            { name: 'Company_Type_boxplot', description: `${formatMetricName(metricName)} analysis by Company Type` },
            { name: 'Platoon_Type_boxplot', description: `${formatMetricName(metricName)} analysis by Platoon Type` },
            { name: 'Company_violinplot', description: `${formatMetricName(metricName)} analysis by Company` },
            { name: 'Command_violinplot', description: `${formatMetricName(metricName)} analysis by Command` },
            { name: 'Anglova_Mean_Over_Time', description: `Full scenario mean speed analysis over time` },
            { name: 'Company_Mean_Over_Time', description: `Companies mean speed analysis over time` },
            { name: 'Platoon_Mean_Over_Time', description: `Platoons mean speed analysis over time` },
        ];
    }
    else if (metricName === 'straight-line-distance') {
        analysisItems = [
            { name: `Command_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Command level` },
            { name: `Company_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Company level` },
            { name: `Company Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Company Type` },
            { name: `Platoon_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Platoon level` },
            { name: `Platoon Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Platoon Type` },
            { name: `Vehicle Function_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Vehicle Function` },
            { name: `Vehicle Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Vehicle Type` },
            { name: `Anglova_kde`, description: `${formatMetricName(metricName)} analysis full scenario density probability` },
            { name: `Company_vs_Platoon_kde`, description: `${formatMetricName(metricName)} density probability by Company vs Platoon` },
            { name: `Company_facetgrid`, description: `${formatMetricName(metricName)} density facedgrid by Company` },
            { name: `Command_facetgrid`, description: `${formatMetricName(metricName)} density facedgrid by Command` },
            { name: `Company_boxplot`, description: `${formatMetricName(metricName)} analysis by Company` },
        ];
    }
    else if (metricName === 'connectivity') {
        analysisItems = [
            { name: `Company_Min_Max_Mean_Distances_Over_Time`, description: `The minimum, maximum, and mean distances between units over time, inner Company` },
            { name: `Number_of_Edges_Over_Time`, description: `Graph analyses of the number of edges (Connections) over time, closer then 100m` },
            { name: `Number_of_Groups_Over_Time`, description: `Graph analyses of the number of groups over time, closer then 100m` },
            { name: `Number_of_Nodes_Over_Time`, description: `Graph analyses of the number of nodes (Units) over time, closer then 100m` },
        ];
    }
    else if (metricName === 'convex-hull') {
        analysisItems = [
            { name: `Anglova`, description: `${formatMetricName(metricName)} analysis full scenario` },
            { name: `Command`, description: `${formatMetricName(metricName)} analysis 3 outliers between Commands` },
            { name: `Company`, description: `${formatMetricName(metricName)} analysis by Company` },
            { name: `Company Type`, description: `${formatMetricName(metricName)} analysis by Company Type` },
            { name: `Platoon`, description: `${formatMetricName(metricName)} analysis by Platoon` },
            { name: `Platoon Type`, description: `${formatMetricName(metricName)} analysis by Platoon Type` },
        ];
    }
    else if (metricName === 'on-the-road') {
        analysisItems = [
            { name: `Anglova`, description: `${formatMetricName(metricName)} analysis full scenario` },
            { name: `Command`, description: `${formatMetricName(metricName)} analysis by Command` },
            { name: `Company`, description: `${formatMetricName(metricName)} analysis by Company` },
            { name: `Company Type`, description: `${formatMetricName(metricName)} analysis by Company Type` },
            { name: `Platoon`, description: `${formatMetricName(metricName)} analysis by Platoon` },
            { name: `Platoon Type`, description: `${formatMetricName(metricName)} analysis by Platoon Type` },
        ];
    }
    else if (metricName === 'direction') {
        analysisItems = [
            { name: `Company`, description: `${formatMetricName(metricName)} analysis by Company` },
            { name: `Platoon_Type`, description: `${formatMetricName(metricName)} analysis by Platoon Type` },
        ];
    }
    else if (metricName === 'path-tortuosity') {
        analysisItems = [
            { name: `Command_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Command level` },
            { name: `Company_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Company level` },
            { name: `Company Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Company Type` },
            { name: `Platoon_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Platoon level` },
            { name: `Platoon Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Platoon Type` },
            { name: `Vehicle Function_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Vehicle Function` },
            { name: `Vehicle Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Vehicle Type` },
            { name: `Anglova_KDE`, description: `${formatMetricName(metricName)} analysis full scenario density probability` },
            { name: `Company_KDE`, description: `${formatMetricName(metricName)} analysis density probability by Command` },
            { name: `Company_vs_Platoon_KDE`, description: `${formatMetricName(metricName)} density probability by Company vs Platoon` },
        ];
    }
    else if (metricName === 'total-distance') {
        analysisItems = [
            { name: `Command_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Command level` },
            { name: `Company_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Company level` },
            { name: `Company Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Company Type` },
            { name: `Platoon_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Platoon level` },
            { name: `Platoon Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Platoon Type` },
            { name: `Vehicle Function_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Vehicle Function` },
            { name: `Vehicle Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Vehicle Type` },
            { name: `Anglova_kde`, description: `${formatMetricName(metricName)} analysis full scenario density probability` },
            { name: `Company_kde`, description: `${formatMetricName(metricName)} analysis density probability by Command` },
            { name: `Company_vs_Platoon_kde`, description: `${formatMetricName(metricName)} density probability by Company vs Platoon` },
        ];
    }
    else if (metricName === 'spatial-projection') {
        analysisItems = [
            { name: `Company_1_2`, description: `${formatMetricName(metricName)} analysis Company 1 and 2` },
            { name: `Company_3_4`, description: `${formatMetricName(metricName)} analysis Company 3 and 4` },
            { name: `Company_5`, description: `${formatMetricName(metricName)} analysis by Company 5` },
            { name: `Company_6`, description: `${formatMetricName(metricName)} analysis by Company 6` },
        ];
    }
    // Standard pattern for most metrics
    else {
        analysisItems = [
            { name: `Command_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Command level` },
            { name: `Company_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Company level` },
            { name: `Company Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Company Type` },
            { name: `Platoon_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis at the Platoon level` },
            { name: `Platoon Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Platoon Type` },
            { name: `Vehicle Function_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Vehicle Function` },
            { name: `Vehicle Type_${metricName.replace(/-/g, '_')}_ecdf`, description: `${formatMetricName(metricName)} analysis by Vehicle Type` }
        ];
    }

    // Remove loader after a short delay to simulate loading
    setTimeout(() => {
        grid.removeChild(loader);

        // Create analysis items
        analysisItems.forEach(item => {
            const analysisItem = document.createElement('div');
            analysisItem.className = 'analysis-item';

            // Handle spaces in file names for URL encoding
            const fileName = encodeURIComponent(item.name) + '.png';

            analysisItem.innerHTML = `
                <img src="images/spatiotemporal/${metricName}/${fileName}" alt="${item.name}" class="analysis-image">
                <div class="analysis-info">
                    <h4>${formatSpatiotemporalName(item.name, metricName)}</h4>
                    <p>${item.description}</p>
                </div>
            `;

            // Add click event to open image in modal
            const img = analysisItem.querySelector('img');
            img.addEventListener('click', function () {
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
        formattedName = 'ECDF of ' + formattedName;
    }

    return formattedName;
}

// Format spatiotemporal name for display
function formatSpatiotemporalName(name, metricType) {
    // Special case for spatiotemporal-coverage
    if (metricType === 'spatiotemporal-coverage' && name === 'anglova') {
        return 'Spatiotemporal Coverage';
    }

    // Special case for spatial-projection
    if (metricType === 'spatial-projection' && name.includes('_Unknown')) {
        return name.replace('_Unknown', '');
    }
    return name.replaceAll('_', ' ').replace(metricType.replaceAll('-', ' '), '')
    .replace('ecdf', 'ECDF')
    .replace('kde', 'KDE')
    .replace('boxplot', 'Boxplot')
    .replace('facetgrid', 'FacetGrid')
    .replace('violinplot', 'ViolinPlot');
}

// Helper function to convert kebab-case to Title Case
function formatMetricName(kebabCase) {
    return kebabCase
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
