// --- Data Definitions ---

function createWidgetContent(title, desc, chartType = 'bar', chartKey = '') {
    let contentHtml = '';
    
    if (chartType === 'kpi') {
        contentHtml = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%;">
                <div style="display: flex; gap: 24px; align-items: center; justify-content: center;">
                    <div style="text-align: center;">
                        <div style="font-size: 28px; font-weight: 600; color: #1890ff;">${Math.floor(Math.random() * 1000) + 100}</div>
                        <div style="font-size: 11px; color: #8c8c8c; margin-top: 4px;">Metric 1</div>
                    </div>
                    <div style="width: 1px; height: 30px; background: #f0f0f0;"></div>
                    <div style="text-align: center;">
                        <div style="font-size: 28px; font-weight: 600; color: #52c41a;">${Math.floor(Math.random() * 500) + 50}</div>
                        <div style="font-size: 11px; color: #8c8c8c; margin-top: 4px;">Metric 2</div>
                    </div>
                </div>
            </div>`;
    } else if (chartType === 'heatmap') {
        contentHtml = `
            <div class="sim-heatmap" style="display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); gap: 2px; height: 100%; border-radius: 4px; overflow: hidden;">
                ${Array.from({length: 16}, () => `<div style="background: rgba(24, 144, 255, ${Math.random() * 0.8 + 0.1});"></div>`).join('')}
            </div>`;
    } else if (chartType === 'table') {
        contentHtml = `
            <div style="overflow-y: auto; height: 100%; padding: 0 4px;">
                <table style="width: 100%; font-size: 12px; border-collapse: collapse; text-align: left;">
                    <thead><tr style="border-bottom: 1px solid #f0f0f0; color: #8c8c8c;"><th style="padding: 8px 4px;">ID</th><th style="padding: 8px 4px;">Status</th><th style="padding: 8px 4px;">Date</th></tr></thead>
                    <tbody>
                        ${Array.from({length: 4}, (_, i) => `<tr style="border-bottom: 1px solid #fafafa;"><td style="padding: 8px 4px; font-weight: 500;">#${100+i}</td><td style="padding: 8px 4px; color: ${i % 2 === 0 ? '#1890ff' : '#faad14'};">${i % 2 === 0 ? 'Active' : 'Pending'}</td><td style="padding: 8px 4px; color: #555;">2026-03-${10+i}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>`;
    } else if (chartType === 'gantt') {
        contentHtml = `
            <div style="display: flex; flex-direction: column; justify-content: center; gap: 8px; height: 100%; padding: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;"><span style="width: 60px; font-size: 11px; color: #555;">Sprint 1</span><div style="flex: 1; height: 12px; background: #f0f0f0; border-radius: 6px; position: relative;"><div style="position: absolute; left: 10%; width: 40%; height: 100%; background: #1890ff; border-radius: 6px;"></div></div></div>
                <div style="display: flex; align-items: center; gap: 12px;"><span style="width: 60px; font-size: 11px; color: #555;">Sprint 2</span><div style="flex: 1; height: 12px; background: #f0f0f0; border-radius: 6px; position: relative;"><div style="position: absolute; left: 40%; width: 35%; height: 100%; background: #52c41a; border-radius: 6px;"></div></div></div>
                <div style="display: flex; align-items: center; gap: 12px;"><span style="width: 60px; font-size: 11px; color: #555;">Sprint 3</span><div style="flex: 1; height: 12px; background: #f0f0f0; border-radius: 6px; position: relative;"><div style="position: absolute; left: 70%; width: 20%; height: 100%; background: #faad14; border-radius: 6px;"></div></div></div>
            </div>`;
    } else {
        contentHtml = `<canvas class="mock-chart" data-type="${chartType}" data-key="${chartKey}"></canvas>`;
    }

    return `
        <div class="remove-widget-btn" onclick="removeWidget(this)"><i data-lucide="x"></i></div>
        <div class="widget-header">
            <div class="widget-title">${title}</div>
            <div class="widget-drag-handle"><i data-lucide="grip-horizontal"></i></div>
        </div>
        <div class="widget-body" style="position: relative; height: calc(100% - 36px); width: 100%; display: flex; flex-direction: column; padding: 12px;">
            <div style="flex-grow: 1; min-height: 0; position: relative;">
                ${contentHtml}
            </div>
            <div class="text-muted" style="font-size: 11px; text-align: center; margin-top: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-top: 8px; border-top: 1px solid #f0f0f0;">${desc}</div>
        </div>
    `;
}

const dashboardConfigs = {
    // EXISTING DASHBOARDS
    'defect-trend': {
        title: 'Defect Trend',
        desc: 'Monitor defect distribution and trends across the project lifecycle.',
        widgets: [
            { x: 0, y: 0, w: 4, h: 4, content: createWidgetContent('Defect Workflow', 'Distribution across lifecycle stages', 'doughnut', 'chart-donut') },
            { x: 4, y: 0, w: 8, h: 4, content: createWidgetContent('Severity Trend', 'Monthly defect count by severity', 'stacked-bar', 'chart-bar') },
            { x: 0, y: 4, w: 8, h: 2, content: createWidgetContent('Exception Categories', '6 specific defect categories needing attention', 'kpi', 'exception-categories') },
            { x: 8, y: 4, w: 4, h: 2, content: createWidgetContent('Risk Scores', 'Total and average risk scores', 'kpi', 'risk-scores') }
        ]
    },
    'releases': {
        title: 'Releases',
        desc: 'Track release lifecycle status and identify bottlenecks.',
        widgets: [
            { x: 0, y: 0, w: 6, h: 4, content: createWidgetContent('Release Workflow', 'Releases by stage: Draft to Deployed', 'doughnut', 'chart-release-wf') },
            { x: 6, y: 0, w: 6, h: 4, content: createWidgetContent('Key Metrics', 'Total releases, approved %, deployed %', 'kpi', 'release-metrics') }
        ]
    },
    'test-cases': {
        title: 'Test Cases',
        desc: 'Overview of test case inventory and execution readiness.',
        widgets: [
            { x: 0, y: 0, w: 6, h: 4, content: createWidgetContent('TC Workflow', 'Test cases by stage', 'doughnut', 'chart-tc-wf') },
            { x: 6, y: 0, w: 6, h: 4, content: createWidgetContent('Execution Readiness', 'Automation ratio, pass rate, blocked', 'kpi', 'execution-metrics') }
        ]
    },
    'quadrants': {
        title: 'Quadrants',
        desc: 'Multi-dimensional analysis using bubble charts.',
        widgets: [
            { x: 0, y: 0, w: 6, h: 4, content: createWidgetContent('By Process Area', 'Defects plotted by process area vs severity', 'bubble', 'spark-4') },
            { x: 6, y: 0, w: 6, h: 4, content: createWidgetContent('By Assigned To', 'Defect load per team member', 'bubble', 'spark-4') },
            { x: 0, y: 4, w: 6, h: 4, content: createWidgetContent('By User Stories', 'Defect density per user story', 'bubble', 'spark-4') },
            { x: 6, y: 4, w: 6, h: 4, content: createWidgetContent('By Releases', 'Defect burden per release', 'bubble', 'spark-4') }
        ]
    },
    'batches': {
        title: 'Batches',
        desc: 'Monitor automated test batch execution pipeline.',
        widgets: [
            { x: 0, y: 0, w: 4, h: 4, content: createWidgetContent('Batch Workflow', 'Batches by stage', 'doughnut', 'chart-batch-wf') },
            { x: 4, y: 0, w: 8, h: 4, content: createWidgetContent('Daily Frequency', 'Tests executed per day', 'bar', 'chart-batch-freq') },
            { x: 0, y: 4, w: 12, h: 2, content: createWidgetContent('Exceptions', 'Failed batches, timeout count, retry rate', 'kpi', 'batch-exceptions') }
        ]
    },
    'mini': {
        title: 'Mini-Dashboard',
        desc: 'Executive summary view with KPI counters.',
        widgets: [
            { x: 0, y: 0, w: 4, h: 2, content: createWidgetContent('Total Defects', 'Current open defects', 'kpi', 'kpi-defects') },
            { x: 4, y: 0, w: 4, h: 2, content: createWidgetContent('Active Releases', 'Releases in progress', 'kpi', 'kpi-releases') },
            { x: 8, y: 0, w: 4, h: 2, content: createWidgetContent('Requirements', 'Total requirements tracked', 'kpi', 'kpi-reqs') },
            { x: 0, y: 2, w: 4, h: 2, content: createWidgetContent('Test Cases', 'Total active test cases', 'kpi', 'kpi-tc') },
            { x: 4, y: 2, w: 4, h: 2, content: createWidgetContent('Batches Running', 'Currently executing batches', 'kpi', 'kpi-batches') },
            { x: 8, y: 2, w: 4, h: 2, content: createWidgetContent('Total Executions', 'All-time execution count', 'kpi', 'kpi-execs') }
        ]
    },

    // SUGGESTED DASHBOARDS
    'sd1': {
        title: 'Defect Lifecycle (SD1)',
        desc: 'End-to-end defect lifecycle analysis, timing, and SLA compliance.',
        isNew: true,
        widgets: [
            { x: 0, y: 0, w: 6, h: 4, content: createWidgetContent('Time-to-Close', 'Distribution of resolution times', 'bar', 'sd1-chart1') },
            { x: 6, y: 0, w: 6, h: 4, content: createWidgetContent('Age by Severity', 'Oldest open defects', 'stacked-bar', 'chart-bar') },
            { x: 0, y: 4, w: 4, h: 3, content: createWidgetContent('SLA Breach', 'Percentage exceeding SLA', 'table', 'sla-table') },
            { x: 4, y: 4, w: 4, h: 3, content: createWidgetContent('Severity x Priority', 'Heatmap of critical combinations', 'heatmap', 'sev-heatmap') },
            { x: 8, y: 4, w: 4, h: 3, content: createWidgetContent('Reopen Rate', 'Monthly reopen trend', 'line', 'sd1-chart2') }
        ]
    },
    'sd2': {
        title: 'Test Execution Health (SD2)',
        desc: 'Assess test execution pipeline health and pass rates.',
        isNew: true,
        widgets: [
            { x: 0, y: 0, w: 8, h: 4, content: createWidgetContent('Pass Rate Trend', 'Monthly pass/fail/blocked %', 'line', 'sd2-chart1') },
            { x: 8, y: 0, w: 4, h: 4, content: createWidgetContent('Completion Rate', 'Coverage of high-priority tests', 'doughnut', 'sd4-chart1') },
            { x: 0, y: 4, w: 6, h: 4, content: createWidgetContent('Execution Duration', 'Avg time by test suite', 'bar', 'sd1-chart1') },
            { x: 6, y: 4, w: 6, h: 4, content: createWidgetContent('Blocked Test Cases', 'List of blocked TCs and reasons', 'table', 'blocked-tc') }
        ]
    },
    'sd3': {
        title: 'Release Health (SD3)',
        desc: 'Release readiness, coverage, defect load, and deployment velocity.',
        isNew: true,
        widgets: [
            { x: 0, y: 0, w: 12, h: 4, content: createWidgetContent('Release Timeline', 'Gantt chart of milestones', 'gantt', 'release-gantt') },
            { x: 0, y: 4, w: 4, h: 4, content: createWidgetContent('Requirement Coverage', 'Requirements mapped per release', 'stacked-bar', 'sd2-chart2') },
            { x: 4, y: 4, w: 4, h: 4, content: createWidgetContent('Defect Load', 'Open defects per release', 'bar', 'sd3-chart1') },
            { x: 8, y: 4, w: 4, h: 4, content: createWidgetContent('Deployment Velocity', 'Time from approval to deployment', 'line', 'sd3-chart2') }
        ]
    },
    'sd4': {
        title: 'Requirement Traceability (SD4)',
        desc: 'Ensure all requirements have adequate test coverage for compliance.',
        isNew: true,
        widgets: [
            { x: 0, y: 0, w: 8, h: 4, content: createWidgetContent('Coverage Gap Analysis', 'Requirements with 0 test cases', 'bar', 'sd3-chart1') },
            { x: 8, y: 0, w: 4, h: 4, content: createWidgetContent('ISO Classification', 'Requirements by standard', 'doughnut', 'sd4-chart1') },
            { x: 0, y: 4, w: 8, h: 4, content: createWidgetContent('Business Importance Matrix', 'Importance x Coverage heatmap', 'scatter', 'sd4-chart3') },
            { x: 8, y: 4, w: 4, h: 4, content: createWidgetContent('Summary KPIs', 'Total reqs, covered %, average TC/req', 'kpi', 'req-kpi') }
        ]
    },
    'sd5': {
        title: 'Test Case Quality (SD5)',
        desc: 'Assess test suite maturity, complexity, and growth.',
        isNew: true,
        widgets: [
            { x: 0, y: 0, w: 4, h: 4, content: createWidgetContent('Automation Ratio', 'Manual vs Automated', 'doughnut', 'sd5-chart1') },
            { x: 4, y: 0, w: 8, h: 4, content: createWidgetContent('Growth Trend', 'Monthly test case creation', 'line', 'sd5-chart4') },
            { x: 0, y: 4, w: 6, h: 4, content: createWidgetContent('Complexity Distribution', 'Test cases by step count', 'bar', 'sd5-chart3') },
            { x: 6, y: 4, w: 6, h: 4, content: createWidgetContent('Execution Readiness', 'Status per process area', 'stacked-bar', 'sd5-chart2') }
        ]
    },
    'sd6': {
        title: 'User Productivity (SD6)',
        desc: 'Cross-module workload analysis and resolution speed.',
        isNew: true,
        widgets: [
            { x: 0, y: 0, w: 6, h: 4, content: createWidgetContent('Workload Distribution', 'Items assigned per user', 'stacked-bar', 'sd6-chart1') },
            { x: 6, y: 0, w: 6, h: 4, content: createWidgetContent('Resolution Speed', 'Avg time-to-close per user', 'bar', 'sd6-chart2') },
            { x: 0, y: 4, w: 6, h: 4, content: createWidgetContent('Activity Heatmap', 'Day/Hour activity patterns', 'heatmap', 'activity-heatmap') },
            { x: 6, y: 4, w: 6, h: 4, content: createWidgetContent('Team Comparison', 'Side-by-side metrics', 'table', 'team-table') }
        ]
    },
    'sd7': {
        title: 'Batch Scheduling (SD7)',
        desc: 'Automation pipeline analysis and Virtual Worker utilization.',
        isNew: true,
        widgets: [
            { x: 0, y: 0, w: 8, h: 4, content: createWidgetContent('Pipeline Throughput', 'Batches completed per week', 'line', 'sd2-chart1') },
            { x: 8, y: 0, w: 4, h: 4, content: createWidgetContent('Virtual Worker', 'VW usage over time', 'line', 'sd1-chart2') },
            { x: 0, y: 4, w: 6, h: 4, content: createWidgetContent('Failure Patterns', 'Reasons categorized', 'bar', 'sd3-chart1') },
            { x: 6, y: 4, w: 6, h: 4, content: createWidgetContent('Duration Accuracy', 'Estimated vs Actual time', 'bar', 'sd7-chart1') }
        ]
    },
    'sd8': {
        title: 'Root Cause Analysis (SD8)',
        desc: 'Understand why defects happen to prevent future issues.',
        isNew: true,
        widgets: [
            { x: 0, y: 0, w: 6, h: 4, content: createWidgetContent('By Root Cause', 'Top defect causes', 'bar', 'sd8-chart1') },
            { x: 6, y: 0, w: 6, h: 4, content: createWidgetContent('Severity x Env', 'Heatmap of critical environments', 'heatmap', 'sev-env-heatmap') },
            { x: 0, y: 4, w: 6, h: 4, content: createWidgetContent('Risk Matrix', 'Severity x Frequency x Impact', 'bubble', 'spark-4') },
            { x: 6, y: 4, w: 6, h: 4, content: createWidgetContent('Cause Trend', 'Monthly trend per cause', 'line', 'sd5-chart4') }
        ]
    }
};


// --- View Router & Navigation ---
lucide.createIcons();

const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view-container');
const breadcrumb = document.getElementById('breadcrumb');
const settingsBtn = document.getElementById('settings-btn');
const settingsDropdown = document.getElementById('settings-dropdown');
const dropdownItems = document.querySelectorAll('.dropdown-item');

function switchView(viewId, dashboardId = null) {
    // Hide all views
    views.forEach(v => v.classList.add('hidden'));

    // Update active nav state
    navItems.forEach(n => n.classList.remove('active'));
    
    let targetViewEl = document.getElementById(`view-${viewId}`);
    if (viewId === 'dashboard') {
        document.querySelector('.nav-item[data-view="gallery"]').classList.add('active');
        if(dashboardId) loadDashboard(dashboardId);
        if (breadcrumb) {
            breadcrumb.innerHTML = `<a href="#" class="breadcrumb-link" data-target="gallery" style="color: var(--color-text-muted); text-decoration: none;">Dashboard Gallery</a> / <span style="font-weight:600;">${dashboardConfigs[currentDashboardId].title}</span>`;
        }
    } else {
        if(document.querySelector(`.nav-item[data-view="${viewId}"]`)) {
            document.querySelector(`.nav-item[data-view="${viewId}"]`).classList.add('active');
        }
        
        let breadcrumbText = 'Dashboard Gallery';
        if(viewId === 'sql-lab') breadcrumbText = 'Administration / SQL Lab';
        if(viewId === 'data-sources') breadcrumbText = 'Administration / Data Sources';
        if(viewId === 'manage-dashboards') breadcrumbText = 'Administration / Manage Dashboards';
        if(viewId === 'audit-logs') breadcrumbText = 'Administration / Audit Log Viewer';
        if(viewId === 'rls-config') breadcrumbText = 'Administration / RLS Config';
        
        if(viewId.startsWith('settings-')) {
            if(viewId === 'settings-hub') breadcrumbText = 'Platform Settings';
            else breadcrumbText = `<a href="#" class="breadcrumb-link" data-target="settings-hub" style="color: var(--color-text-muted); text-decoration: none;">Platform Settings</a> / ${document.getElementById('view-' + viewId).querySelector('h2').textContent}`;
        }
        if (breadcrumb) {
            breadcrumb.innerHTML = breadcrumbText;
        }
    }

    if (targetViewEl) targetViewEl.classList.remove('hidden');

    // Attach breadcrumb link listener if any
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(link.getAttribute('data-target'));
        });
    });

    if (viewId === 'gallery') renderGallery();
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(item.getAttribute('data-view'));
    });
});

dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = item.getAttribute('data-view');
        if(viewId) {
            settingsDropdown.classList.remove('open');
            switchView(viewId);
        }
    });
});

// Settings dropdown toggle
settingsBtn.addEventListener('click', () => {
    settingsDropdown.classList.toggle('open');
});
document.addEventListener('click', (e) => {
    if (!settingsBtn.contains(e.target) && !settingsDropdown.contains(e.target)) {
        settingsDropdown.classList.remove('open');
    }
});

// --- Gallery Population & Search ---
const galleryAll = document.getElementById('gallery-all');
const searchInput = document.getElementById('gallery-search');

function renderGallery(filterText = '') {
    galleryAll.innerHTML = '';
    const term = filterText.toLowerCase();

    Object.entries(dashboardConfigs).forEach(([id, config]) => {
        if (config.title.toLowerCase().includes(term) || config.desc.toLowerCase().includes(term)) {
            const cardHtml = `
                <div class="dashboard-card" data-dashboard-id="${id}">
                    <div class="card-title">${config.title}</div>
                    <div class="card-desc">${config.desc}</div>
                    <div class="card-meta" style="justify-content: flex-start; gap: 8px;">
                        <span><i data-lucide="bar-chart-2" style="width:12px;height:12px;vertical-align:middle;"></i> ${config.widgets.length} Widgets</span>
                    </div>
                </div>
            `;
            galleryAll.innerHTML += cardHtml;
        }
    });

    // Re-attach click listeners to new cards
    document.querySelectorAll('.dashboard-card').forEach(card => {
        // Skip Settings hub cards which don't have data-dashboard-id
        if(card.hasAttribute('data-dashboard-id')) {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-dashboard-id');
                switchView('dashboard', id);
            });
        }
    });
    lucide.createIcons();
}

// Initial render
renderGallery();

// Search listener
searchInput.addEventListener('input', (e) => {
    renderGallery(e.target.value);
});


// --- Dashboard Grid Management ---
let grid = GridStack.init({
    cellHeight: 80,
    margin: 8,
    column: 12,
    disableResize: true,
    disableDrag: true,
    acceptWidgets: true,
    dragIn: '.new-widget',
    dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' }
}, '#main-grid');

let currentDashboardId = null;

// Populate Sidebar Submenu
const sidebarDashboardsList = document.getElementById('sidebar-dashboards-list');
Object.entries(dashboardConfigs).forEach(([id, config]) => {
    const itemHtml = `
        <a href="#" class="submenu-item" data-dashboard-id="${id}">
            <span class="tree-line"></span>
            <span class="tree-bullet"></span>
            ${config.title}
        </a>`;
    sidebarDashboardsList.innerHTML += itemHtml;
});

// Handle Submenu Toggle
const navGalleryParent = document.getElementById('nav-gallery-parent');
navGalleryParent.addEventListener('click', (e) => {
    // Prevent default routing if they click the chevron, or just toggle it anyway
    e.preventDefault();
    navGalleryParent.classList.toggle('expanded');
    sidebarDashboardsList.classList.toggle('expanded');
    
    // We still want to route to gallery if we click the main button
    switchView('gallery');
});

// Handle Submenu Clicks
sidebarDashboardsList.querySelectorAll('.submenu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = item.getAttribute('data-dashboard-id');
        switchView('dashboard', id);
    });
});

function loadDashboard(id) {
    currentDashboardId = id;
    const config = dashboardConfigs[id];
    document.getElementById('current-dashboard-title').textContent = config.title;
    
    // Update active submenu state
    sidebarDashboardsList.querySelectorAll('.submenu-item').forEach(t => t.classList.remove('active'));
    const activeItem = sidebarDashboardsList.querySelector(`.submenu-item[data-dashboard-id="${id}"]`);
    if(activeItem) {
        activeItem.classList.add('active');
        // Ensure parent is expanded
        navGalleryParent.classList.add('expanded');
        sidebarDashboardsList.classList.add('expanded');
    }

    grid.removeAll();
    grid.load(config.widgets);
    lucide.createIcons();
    
    // Render charts after grid is laid out
    setTimeout(() => renderCharts(), 50);
    
    // Ensure edit mode is disabled when loading a new dashboard
    if(isEditMode) {
        document.getElementById('save-layout-btn').click();
    }
}



// Pinnacle color palette
const PinnacleColors = {
  new: '#F6B168', open: '#739EF9', deferred: '#54D59A', closed: '#6249F8',
  draft: '#F2B41C', deprecated: '#F68268', approved: '#739EF9',
  sev1: '#739EF9', sev2: '#54D59A', sev3: '#F6B168', sev4: '#F68268'
};

const chartDataStore = {
    'chart-donut': {
        type: 'doughnut',
        data: { labels: ['New', 'Open', 'Deferred', 'Closed'], datasets: [{ data: [1357, 98, 12, 64], backgroundColor: [PinnacleColors.new, PinnacleColors.open, PinnacleColors.deferred, PinnacleColors.closed], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { display: false } } }
    },
    'chart-bar': {
        type: 'bar',
        data: { labels: ['12 Mar 2026'], datasets: [
          { label: 'Severity 1', data: [80], backgroundColor: PinnacleColors.sev1 },
          { label: 'Severity 2', data: [160], backgroundColor: PinnacleColors.sev2 },
          { label: 'Severity 3', data: [60], backgroundColor: PinnacleColors.sev3 },
          { label: 'Severity 4', data: [20], backgroundColor: PinnacleColors.sev4 }
        ]},
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } }, plugins: { legend: { position: 'top' } } }
    },
    'chart-release-wf': {
        type: 'doughnut',
        data: { labels: ['Draft','Ready For Review','Rework Required','Approved','Deployed'], datasets: [{ data: [67,6,1,5,11], backgroundColor: ['#faad14','#52c41a','#722ed1','#1890ff','#F6B168'], borderWidth: 2, borderColor: '#fff' }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '62%', plugins: { legend: { display: false } } }
    },
    'chart-tc-wf': {
        type: 'doughnut',
        data: { labels: ['Draft','Ready For Review','Rework Required','Approved','Retired'], datasets: [{ data: [1380,17,12,26,18], backgroundColor: ['#faad14','#52c41a','#722ed1','#1890ff','#999'], borderWidth: 2, borderColor: '#fff' }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '62%', plugins: { legend: { display: false } } }
    },
    'chart-batch-wf': {
        type: 'doughnut',
        data: { labels: ['Configuring','Scheduling','Executing','Completed'], datasets: [{ data: [70,10,46,1169], backgroundColor: ['#faad14','#ff4d4f','#52c41a','#722ed1'], borderWidth: 2, borderColor: '#fff' }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '62%', plugins: { legend: { display: false } } }
    },
    'chart-batch-freq': {
        type: 'bar',
        data: { labels: ['05 Mar 2026'], datasets: [{ label: 'Test Cases', data: [1], backgroundColor: 'rgba(24,144,255,0.6)', borderColor: '#1890ff', borderWidth: 1 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    },
    'spark-4': {
        type: 'bubble',
        data: { datasets: [{ data: [{x:2,y:3,r:8},{x:5,y:7,r:12},{x:8,y:2,r:6},{x:4,y:6,r:10},{x:7,y:5,r:7}], backgroundColor: 'rgba(98,73,248,0.4)', borderColor: PinnacleColors.closed }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }
    },
    'sd1-chart1': {
        type: 'bar',
        data: { labels: ['Sev 1','Sev 2','Sev 3','Sev 4'], datasets: [{ label: 'Min (days)', data: [3,5,2,1], backgroundColor: 'rgba(82,196,26,0.6)' },{ label: 'Avg (days)', data: [12,8,5,3], backgroundColor: 'rgba(24,144,255,0.6)' },{ label: 'Max (days)', data: [45,28,18,10], backgroundColor: 'rgba(255,77,79,0.6)' }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { family: 'Poppins', size: 11 } } } } }
    },
    'sd1-chart2': {
        type: 'line',
        data: { labels: ['Oct','Nov','Dec','Jan','Feb','Mar'], datasets: [{ label: 'Resolution %', data: [62,68,71,75,78,82], borderColor: '#52c41a', backgroundColor: 'rgba(82,196,26,0.1)', fill: true, tension: 0.4 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    },
    'sd2-chart1': {
        type: 'line',
        data: { labels: ['B-81','B-82','B-83','B-84','B-85','B-86','B-87'], datasets: [{ label: 'Pass Rate %', data: [72,78,82,80,85,88,87], borderColor: '#52c41a', backgroundColor: 'rgba(82,196,26,0.15)', fill: true, tension: 0.3 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    },
    'sd2-chart2': {
        type: 'bar',
        data: { labels: ['B-84','B-85','B-86','B-87'], datasets: [{ label: 'Passed', data: [680,720,810,790], backgroundColor: '#52c41a' },{ label: 'Failed', data: [120,95,80,110], backgroundColor: '#ff4d4f' },{ label: 'Blocked', data: [40,25,30,45], backgroundColor: '#faad14' },{ label: 'Not Run', data: [60,70,40,55], backgroundColor: '#d9d9d9' }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }
    },
    'sd3-chart1': {
        type: 'bar',
        data: { labels: ['R4.0','R4.1','R4.2','R4.3','HF4.2.1'], datasets: [{ label: 'Defects', data: [24,18,32,12,8], backgroundColor: ['#52c41a','#1890ff','#faad14','#1890ff','#ff4d4f'] }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    },
    'sd3-chart2': {
        type: 'line',
        data: { labels: ['R3.8','R3.9','R4.0','R4.1','R4.2'], datasets: [{ label: 'Days to deploy', data: [45,38,32,28,24], borderColor: '#1890ff', tension: 0.3, fill: false }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    },
    'sd4-chart1': {
        type: 'doughnut',
        data: { labels: ['Full Coverage','Partial','No Coverage'], datasets: [{ data: [65,20,15], backgroundColor: ['#52c41a','#faad14','#ff4d4f'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'bottom' } } }
    },
    'sd4-chart3': {
        type: 'scatter',
        data: { datasets: [{ label: 'Requirements', data: [{x:1,y:5},{x:2,y:3},{x:3,y:8},{x:4,y:2},{x:5,y:7},{x:3,y:0},{x:5,y:1},{x:4,y:6},{x:2,y:9},{x:1,y:4}], backgroundColor: 'rgba(24,144,255,0.5)', borderColor: '#1890ff', pointRadius: 6 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }
    },
    'sd5-chart1': {
        type: 'doughnut',
        data: { labels: ['Manual','Automated','Component'], datasets: [{ data: [340,310,120], backgroundColor: ['#1890ff','#52c41a','#722ed1'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { position: 'bottom' } } }
    },
    'sd5-chart2': {
        type: 'bar',
        data: { labels: ['Login','Payment','Reports','API','Admin'], datasets: [{ label: 'Passed', data: [45,32,28,52,18], backgroundColor: '#52c41a' },{ label: 'Failed', data: [5,8,3,12,2], backgroundColor: '#ff4d4f' },{ label: 'Not Run', data: [10,15,9,6,20], backgroundColor: '#d9d9d9' }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }
    },
    'sd5-chart3': {
        type: 'bar',
        data: { labels: ['1-5','6-10','11-20','21-50','50+'], datasets: [{ label: 'Test Cases', data: [120,210,180,95,45], backgroundColor: 'rgba(24,144,255,0.6)' }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    },
    'sd5-chart4': {
        type: 'line',
        data: { labels: ['Oct','Nov','Dec','Jan','Feb','Mar'], datasets: [{ label: 'New TCs', data: [45,62,55,78,85,72], borderColor: '#722ed1', tension: 0.3, fill: false }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    },
    'sd6-chart1': {
        type: 'bar',
        data: { labels: ['Ian','Sara','Mike','Jennifer','David'], datasets: [{ label: 'Defects', data: [12,8,15,6,10], backgroundColor: '#ff4d4f' },{ label: 'Test Cases', data: [5,12,3,9,7], backgroundColor: '#1890ff' },{ label: 'Requirements', data: [3,5,2,8,4], backgroundColor: '#52c41a' }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }
    },
    'sd6-chart2': {
        type: 'bar',
        data: { labels: ['Ian','Sara','Mike','Jennifer','David'], datasets: [{ label: 'Avg days', data: [4.2,3.1,6.8,2.5,5.1], backgroundColor: ['#1890ff','#52c41a','#ff4d4f','#52c41a','#faad14'] }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    },
    'sd7-chart1': {
        type: 'bar',
        data: { labels: ['B-84','B-85','B-86','B-87'], datasets: [{ label: 'Scheduled (min)', data: [120,90,150,180], backgroundColor: 'rgba(24,144,255,0.5)' },{ label: 'Actual (min)', data: [135,88,175,160], backgroundColor: 'rgba(255,77,79,0.5)' }] },
        options: { responsive: true, maintainAspectRatio: false }
    },
    'sd8-chart1': {
        type: 'bar',
        data: { labels: ['Code Bug','Config Error','Data Issue','Environment','UI/UX','Integration'], datasets: [{ label: 'Defects', data: [38,22,18,12,10,15], backgroundColor: ['#ff4d4f','#faad14','#1890ff','#52c41a','#722ed1','#F6B168'] }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    }
};

let chartInstances = [];

function renderCharts() {
    chartInstances.forEach(chart => chart.destroy());
    chartInstances = [];

    const canvases = document.querySelectorAll('.mock-chart');
    canvases.forEach(canvas => {
        const type = canvas.getAttribute('data-type') || 'bar';
        const key = canvas.getAttribute('data-key');
        const ctx = canvas.getContext('2d');
        
        let config = null;

        if (key && chartDataStore[key]) {
            // Use exact config from prototype
            const baseConfig = chartDataStore[key];
            // If the asked chartType is different from the base config type (e.g., stacked-bar vs bar), we adjust
            const actualType = type === 'stacked-bar' ? 'bar' : type;
            config = {
                type: actualType,
                data: baseConfig.data,
                options: baseConfig.options
            };
        } else {
            // Fallback generic data based on type
            const actualType = type === 'stacked-bar' ? 'bar' : type;
            const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            const data = Array.from({length: 6}, () => Math.floor(Math.random() * 100));
            const bgColors = [
                'rgba(30, 58, 138, 0.8)',
                'rgba(96, 165, 250, 0.8)',
                'rgba(52, 211, 153, 0.8)',
                'rgba(248, 113, 113, 0.8)',
                'rgba(251, 191, 36, 0.8)',
                'rgba(167, 139, 250, 0.8)'
            ];
            
            const isLine = actualType === 'line' || actualType === 'area';
            
            let dataSets = [{
                label: 'Metric Value',
                data: data,
                backgroundColor: isLine ? 'rgba(30, 58, 138, 0.1)' : bgColors,
                borderColor: isLine ? 'rgba(30, 58, 138, 1)' : 'white',
                borderWidth: 1,
                fill: type === 'area' || isLine
            }];
            
            if (actualType === 'bubble') {
                dataSets = [{
                    label: 'Items',
                    data: Array.from({length: 5}, () => ({x: Math.random()*10, y: Math.random()*10, r: Math.random()*15+5})),
                    backgroundColor: 'rgba(96, 165, 250, 0.6)',
                    borderColor: 'rgba(30, 58, 138, 0.8)'
                }];
            } else if (actualType === 'scatter') {
                dataSets = [{
                    label: 'Items',
                    data: Array.from({length: 10}, () => ({x: Math.random()*10, y: Math.random()*10})),
                    backgroundColor: 'rgba(30, 58, 138, 0.8)'
                }];
            }

            config = {
                type: actualType,
                data: {
                    labels: labels,
                    datasets: dataSets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: (type === 'stacked-bar') ? { x: { stacked: true }, y: { stacked: true } } : {},
                    plugins: {
                        legend: {
                            display: actualType === 'pie' || actualType === 'doughnut',
                            position: 'right',
                            labels: { boxWidth: 12, font: { size: 10 } }
                        }
                    }
                }
            };
        }

        if (typeof Chart !== 'undefined' && config) {
            const chart = new Chart(ctx, config);
            chartInstances.push(chart);
        }
    });
}

function removeWidget(el) {
    if(!isEditMode) return;
    const item = el.closest('.grid-stack-item');
    if (item) {
        grid.removeWidget(item);
    }
}

grid.on('added', function(e, items) {
    lucide.createIcons();
    if(isEditMode) grid.enable();
});

// --- Mock Modals ---
function openMockModal(title) {
    document.getElementById('mock-modal-title').textContent = title;
    document.getElementById('mock-modal-overlay').classList.remove('hidden');
    document.getElementById('mock-modal').classList.remove('hidden');
}

function closeMockModal() {
    document.getElementById('mock-modal-overlay').classList.add('hidden');
    document.getElementById('mock-modal').classList.add('hidden');
}

// --- Filter Interactions ---
const filterControls = ['date', 'project', 'severity', 'assign'];

filterControls.forEach(type => {
    const btn = document.getElementById(`filter-${type}-btn`);
    const dropdown = document.getElementById(`dropdown-${type}`);
    const label = document.getElementById(`${type}-label`);

    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close others
        filterControls.forEach(otherType => {
            if (otherType !== type) {
                const otherDropdown = document.getElementById(`dropdown-${otherType}`);
                if (otherDropdown) otherDropdown.classList.add('hidden');
            }
        });
        dropdown.classList.toggle('hidden');
    });

    // Handle item selection
    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Handle active state for presets (date)
            if (item.classList.contains('preset-item')) {
                dropdown.querySelectorAll('.preset-item').forEach(p => p.classList.remove('active'));
                item.classList.add('active');
            }

            label.textContent = item.textContent.trim();
            dropdown.classList.add('hidden');

            // Simulate widget reloading visual
            const bodies = document.querySelectorAll('.widget-body');
            bodies.forEach(body => {
                body.style.opacity = '0.5';
                setTimeout(() => body.style.opacity = '1', 300);
            });
            
            // Add active class if not default
            if (item.textContent.includes('All') || item.textContent.includes('Last 30')) {
                btn.classList.remove('active-filter');
            } else {
                btn.classList.add('active-filter');
            }
        });
    });
});

// Close dropdowns on outside click
document.addEventListener('click', () => {
    filterControls.forEach(type => {
        const dropdown = document.getElementById(`dropdown-${type}`);
        if (dropdown) dropdown.classList.add('hidden');
    });
});

// --- Edit Mode & Drag Drop ---
const customizeBtn = document.getElementById('customize-btn');
const saveLayoutBtn = document.getElementById('save-layout-btn');
const resetLayoutBtn = document.getElementById('reset-layout-btn');
const addWidgetBtn = document.getElementById('add-widget-btn');
const editModeActions = document.getElementById('edit-mode-actions');
const widgetDrawer = document.getElementById('widget-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const closeDrawerBtn = document.getElementById('close-drawer-btn');
const toast = document.getElementById('toast');

// --- Auth Flow Logic ---
function showScreen(id) {
    document.querySelectorAll('.pn-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

document.getElementById('btn-sign-in').addEventListener('click', () => {
    showScreen('view-product');
});

document.getElementById('btn-logout').addEventListener('click', () => {
    showScreen('view-login');
});

// New logout from header
document.getElementById('btn-logout-header')?.addEventListener('click', () => {
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
    showScreen('view-login');
});

document.getElementById('btn-continue').addEventListener('click', () => {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    // Ensure gallery is loaded by default
    switchView('gallery');
});

// Select product tile
const selectedProducts = new Set(['QMF', 'ENG', 'AUTH']);
const productImages = {
    'QMF': { active: 'https://dashboard-prototype-eta.vercel.app/assets/qmfactory-active.png', inactive: 'https://dashboard-prototype-eta.vercel.app/assets/qmfactory.png' },
    'ENG': { active: 'https://dashboard-prototype-eta.vercel.app/assets/enginuity-active.png', inactive: 'https://dashboard-prototype-eta.vercel.app/assets/enginuity.png' },
    'AUTH': { active: 'https://dashboard-prototype-eta.vercel.app/assets/authorise-active.png', inactive: 'https://dashboard-prototype-eta.vercel.app/assets/authorise.png' },
};

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (card.classList.contains('disabled')) return;
        const code = card.getAttribute('data-product');
        const img = card.querySelector('img');
        
        if (selectedProducts.has(code)) {
            selectedProducts.delete(code);
            card.classList.remove('active');
            img.src = productImages[code].inactive;
        } else {
            selectedProducts.add(code);
            card.classList.add('active');
            img.src = productImages[code].active;
        }
        document.getElementById('btn-continue').disabled = selectedProducts.size === 0;
    });
});

// --- State Variables ---
let currentView = 'gallery';
let isEditMode = false;

customizeBtn.addEventListener('click', () => {
    isEditMode = true;
    document.body.classList.add('edit-mode');
    customizeBtn.classList.add('hidden');
    editModeActions.classList.remove('hidden');
    grid.enableMove(true);
    grid.enableResize(true);
});

saveLayoutBtn.addEventListener('click', () => {
    isEditMode = false;
    document.body.classList.remove('edit-mode');
    editModeActions.classList.add('hidden');
    customizeBtn.classList.remove('hidden');
    grid.enableMove(false);
    grid.enableResize(false);
    showToast('Layout saved successfully');
});

resetLayoutBtn.addEventListener('click', () => {
    if (currentDashboardId) {
        // Force reload from configs, simulating reset to default
        loadDashboard(currentDashboardId);
        showToast('Layout reset to default');
    }
});

// Populate Drawer Widgets
const availableWidgets = [
    { type: 'line', title: 'Defect Trend', icon: 'trending-down', color: 'red' },
    { type: 'pie', title: 'Test Runs', icon: 'activity', color: 'green' },
    { type: 'table', title: 'Critical Bugs', icon: 'alert-octagon', color: 'orange' },
    { type: 'bar', title: 'Velocity', icon: 'bar-chart', color: 'blue' }
];

const drawerList = document.getElementById('drawer-widget-list');
availableWidgets.forEach(w => {
    drawerList.innerHTML += `
        <div class="new-widget" data-type="${w.type}" data-w="4" data-h="3">
            <div class="widget-thumb"><i data-lucide="${w.icon}" class="thumb-icon ${w.color}"></i></div>
            <div class="widget-info">
                <h4>${w.title}</h4>
                <p>Drag to add to dashboard</p>
            </div>
            <div class="drag-handle-new"><i data-lucide="grip-vertical"></i></div>
        </div>
    `;
});

addWidgetBtn.addEventListener('click', () => {
    drawerOverlay.classList.remove('hidden');
    widgetDrawer.classList.remove('hidden');
});

const closeDrawer = () => {
    drawerOverlay.classList.add('hidden');
    widgetDrawer.classList.add('hidden');
};

closeDrawerBtn.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

grid.on('dropped', function(event, previousWidget, newWidget) {
    closeDrawer();
    let type = newWidget.el.getAttribute('data-type');
    let title = "New Widget";
    let icon = "activity";
    if(type === 'line') { title = "Defect Trend"; icon = "trending-down"; }
    if(type === 'pie') { title = "Test Runs"; icon = "pie-chart"; }
    if(type === 'table') { title = "Critical Bugs"; icon = "list"; }
    
    newWidget.el.querySelector('.grid-stack-item-content').innerHTML = createWidgetContent(title, icon, 'Custom added widget');
    lucide.createIcons({ root: newWidget.el });
});

// --- SQL Lab Run Button ---
document.getElementById('run-query-btn')?.addEventListener('click', () => {
    document.getElementById('sql-empty-state').classList.add('hidden');
    document.getElementById('sql-results-table').classList.remove('hidden');
    showToast('Query executed successfully');
});

function showToast(msg) {
    toast.querySelector('.toast-message').textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// Initial Load
lucide.createIcons();
