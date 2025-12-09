// ===================================
// KIMBO CAMPERS - 3D CONFIGURATOR
// Three.js Scene & Configuration Logic
// ===================================

// Configuration State
const currentConfig = {
    truck: 'midsize',
    solarPanels: false,
    awning: false,
    fireplace: false,
    shower: false,
    refrigerator: false,
    seatingNook: false,
    basePrice: 24999
};

// Module Prices
const modulePrices = {
    solarPanels: 300,
    awning: 1000,
    fireplace: 2350,
    shower: 1980,
    refrigerator: 3850
};

// Three.js Scene Variables
let scene, camera, renderer, controls;
let kimboShell, truck, solarPanel, fireplace, chimney;
const THREE = window.THREE;

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D Scene
    init3DScene();
    
    // Setup Event Listeners
    setupEventListeners();
    
    // Initial price calculation
    updateQuote();
    
    // Hide loading screen after scene is ready
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);
});

// ===================================
// THREE.JS SCENE SETUP
// ===================================

function init3DScene() {
    // Get canvas container
    const container = document.getElementById('canvas-container-main');
    if (!container) return;
    
    // Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B1026);
    scene.fog = new THREE.Fog(0x0B1026, 10, 50);
    
    // Create Camera
    camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(8, 5, 8);
    camera.lookAt(0, 0, 0);
    
    // Create Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('three-canvas'),
        antialias: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    
    // Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Add subtle point light for dramatic effect
    const pointLight = new THREE.PointLight(0xF97316, 0.3, 20);
    pointLight.position.set(-3, 3, 3);
    scene.add(pointLight);
    
    // Add OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;
    
    // Create Ground Plane
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1f3a,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Create 3D Models
    createTruck();
    createKimboShell();
    
    // Start Animation Loop
    animate();
    
    // Handle Window Resize
    window.addEventListener('resize', onWindowResize);
}

// ===================================
// 3D MODEL CREATION
// ===================================

function createTruck() {
    const truckGroup = new THREE.Group();
    
    // Truck Bed (base)
    const bedGeometry = new THREE.BoxGeometry(2, 0.3, 3);
    const bedMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        roughness: 0.7,
        metalness: 0.3
    });
    const bed = new THREE.Mesh(bedGeometry, bedMaterial);
    bed.position.y = 0.15;
    bed.castShadow = true;
    truckGroup.add(bed);
    
    // Truck Cab
    const cabGeometry = new THREE.BoxGeometry(2, 1.2, 1.5);
    const cabMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2a2a2a,
        roughness: 0.6,
        metalness: 0.4
    });
    const cab = new THREE.Mesh(cabGeometry, cabMaterial);
    cab.position.set(0, 0.9, -2);
    cab.castShadow = true;
    truckGroup.add(cab);
    
    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x111111,
        roughness: 0.9
    });
    
    const wheelPositions = [
        [-1, 0.4, -2.2], [1, 0.4, -2.2],
        [-1, 0.4, 1.2], [1, 0.4, 1.2]
    ];
    
    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos[0], pos[1], pos[2]);
        wheel.castShadow = true;
        truckGroup.add(wheel);
    });
    
    truck = truckGroup;
    scene.add(truck);
}

function createKimboShell() {
    const shellGroup = new THREE.Group();
    
    // Main Camper Body (Aluminum)
    const shellGeometry = new THREE.BoxGeometry(1.8, 1.8, 2.8);
    const shellMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xC0C0C0,
        roughness: 0.3,
        metalness: 0.8
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shell.position.y = 1.35;
    shell.castShadow = true;
    shellGroup.add(shell);
    
    // Roof
    const roofGeometry = new THREE.BoxGeometry(2, 0.1, 3);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xB0B0B0,
        roughness: 0.4,
        metalness: 0.7
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2.3;
    roof.castShadow = true;
    shellGroup.add(roof);
    
    // Windows
    const windowGeometry = new THREE.BoxGeometry(0.6, 0.5, 0.05);
    const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4a90e2,
        roughness: 0.1,
        metalness: 0.9,
        opacity: 0.7,
        transparent: true
    });
    
    // Side windows
    const windowLeft = new THREE.Mesh(windowGeometry, windowMaterial);
    windowLeft.position.set(-0.9, 1.5, 0);
    shellGroup.add(windowLeft);
    
    const windowRight = new THREE.Mesh(windowGeometry, windowMaterial);
    windowRight.position.set(0.9, 1.5, 0);
    shellGroup.add(windowRight);
    
    kimboShell = shellGroup;
    scene.add(kimboShell);
}

// ===================================
// INTERACTIVE 3D MODULES
// ===================================

function toggleSolarPanel(isVisible) {
    if (isVisible && !solarPanel) {
        const panelGeometry = new THREE.BoxGeometry(1.8, 0.05, 1.2);
        const panelMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a2e,
            roughness: 0.3,
            metalness: 0.6
        });
        solarPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        solarPanel.position.set(0, 2.4, -0.5);
        solarPanel.castShadow = true;
        scene.add(solarPanel);
    } else if (!isVisible && solarPanel) {
        scene.remove(solarPanel);
        solarPanel = null;
    }
}

function toggleFireplace(isVisible) {
    if (isVisible && !chimney) {
        const chimneyGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8);
        const chimneyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x333333,
            roughness: 0.8
        });
        chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
        chimney.position.set(0.6, 2.7, -1);
        chimney.castShadow = true;
        scene.add(chimney);
    } else if (!isVisible && chimney) {
        scene.remove(chimney);
        chimney = null;
    }
}

// ===================================
// ANIMATION LOOP
// ===================================

function animate() {
    requestAnimationFrame(animate);
    
    if (controls) {
        controls.update();
    }
    
    // Subtle rotation animation for visual interest
    if (kimboShell) {
        kimboShell.position.y = 0.3 + Math.sin(Date.now() * 0.001) * 0.02;
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('canvas-container-main');
    if (!container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// ===================================
// UI EVENT HANDLERS
// ===================================

function setupEventListeners() {
    // Truck Type
    document.getElementById('truck-type').addEventListener('change', function(e) {
        currentConfig.truck = e.target.value;
        updateQuote();
    });
    
    // Solar Panels
    document.getElementById('solar-panels').addEventListener('change', function(e) {
        currentConfig.solarPanels = e.target.checked;
        toggleSolarPanel(e.target.checked);
        updateQuote();
    });
    
    // Awning
    document.getElementById('awning').addEventListener('change', function(e) {
        currentConfig.awning = e.target.checked;
        updateQuote();
    });
    
    // Fireplace
    document.getElementById('fireplace').addEventListener('change', function(e) {
        currentConfig.fireplace = e.target.checked;
        toggleFireplace(e.target.checked);
        updateQuote();
    });
    
    // Shower (with conflict handling)
    document.getElementById('shower').addEventListener('change', function(e) {
        currentConfig.shower = e.target.checked;
        
        if (e.target.checked) {
            // Disable seating nook
            const seatingNook = document.getElementById('seating-nook');
            seatingNook.checked = false;
            seatingNook.disabled = true;
            currentConfig.seatingNook = false;
            document.getElementById('conflict-warning').classList.remove('d-none');
        } else {
            // Re-enable seating nook
            document.getElementById('seating-nook').disabled = false;
            document.getElementById('conflict-warning').classList.add('d-none');
        }
        
        updateQuote();
    });
    
    // Refrigerator
    document.getElementById('refrigerator').addEventListener('change', function(e) {
        currentConfig.refrigerator = e.target.checked;
        updateQuote();
    });
    
    // Seating Nook
    document.getElementById('seating-nook').addEventListener('change', function(e) {
        currentConfig.seatingNook = e.target.checked;
    });
}

// ===================================
// PRICE CALCULATION
// ===================================

function updateQuote() {
    let optionsTotal = 0;
    
    if (currentConfig.solarPanels) optionsTotal += modulePrices.solarPanels;
    if (currentConfig.awning) optionsTotal += modulePrices.awning;
    if (currentConfig.fireplace) optionsTotal += modulePrices.fireplace;
    if (currentConfig.shower) optionsTotal += modulePrices.shower;
    if (currentConfig.refrigerator) optionsTotal += modulePrices.refrigerator;
    
    const totalPrice = currentConfig.basePrice + optionsTotal;
    
    // Update UI
    document.getElementById('options-price').textContent = '$' + optionsTotal.toLocaleString();
    document.getElementById('total-price').textContent = '$' + totalPrice.toLocaleString();
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function scrollToConfigurator() {
    document.getElementById('configurator').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function requestQuote() {
    const mailto = 'mailto:sales@Kimboliving.com?subject=Kimbo Camper Quote Request&body=' +
        encodeURIComponent(
            'Hello,\n\n' +
            'I would like to request a quote for a Kimbo Camper with the following configuration:\n\n' +
            'Truck Type: ' + (currentConfig.truck === 'midsize' ? 'Mid-size' : 'Full-size') + '\n' +
            'Solar Panels: ' + (currentConfig.solarPanels ? 'Yes' : 'No') + '\n' +
            'Awning: ' + (currentConfig.awning ? 'Yes' : 'No') + '\n' +
            'Propane Fireplace: ' + (currentConfig.fireplace ? 'Yes' : 'No') + '\n' +
            'Foldaway Shower: ' + (currentConfig.shower ? 'Yes' : 'No') + '\n' +
            'Refrigerator: ' + (currentConfig.refrigerator ? 'Yes' : 'No') + '\n' +
            'Seating Nook: ' + (currentConfig.seatingNook ? 'Yes' : 'No') + '\n\n' +
            'Estimated Total: $' + (currentConfig.basePrice + calculateOptionsTotal()).toLocaleString() + '\n\n' +
            'Thank you!'
        );
    
    window.location.href = mailto;
}

function calculateOptionsTotal() {
    let total = 0;
    if (currentConfig.solarPanels) total += modulePrices.solarPanels;
    if (currentConfig.awning) total += modulePrices.awning;
    if (currentConfig.fireplace) total += modulePrices.fireplace;
    if (currentConfig.shower) total += modulePrices.shower;
    if (currentConfig.refrigerator) total += modulePrices.refrigerator;
    return total;
}
