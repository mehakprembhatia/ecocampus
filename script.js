/**
 * EcoCampus — Core Application Logic
 * Vanilla JavaScript implementation for Student Dashboard, Issue Reporting,
 * Leaderboard, Eco-Challenges, and Interactive Analytics.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. Initial State & Sample Seed Data
  // =========================================================================
  const STORAGE_KEY = 'ecocampus_state_v1';

  const INITIAL_STATE = {
    currentUser: {
      id: 'usr-alex',
      name: 'Alex Rivera',
      initials: 'AR',
      points: 750,
      tier: 'Green Guardian',
      reportsCount: 12,
      resolvedCount: 9,
      challengesCount: 3,
      upvotedReports: ['rep-1', 'rep-3']
    },
    students: [
      { id: 'usr-sophia', name: 'Sophia Martinez', initials: 'SM', points: 1420, tier: 'Eco Champion', reports: 28, challenges: 16 },
      { id: 'usr-liam', name: 'Liam Chen', initials: 'LC', points: 1290, tier: 'Zero-Waste Master', reports: 22, challenges: 14 },
      { id: 'usr-aisha', name: 'Aisha Patel', initials: 'AP', points: 1150, tier: 'Energy Sentinel', reports: 19, challenges: 12 },
      { id: 'usr-marcus', name: 'Marcus Thorne', initials: 'MT', points: 980, tier: 'Water Sentinel', reports: 17, challenges: 10 },
      { id: 'usr-emma', name: 'Emma Watson', initials: 'EW', points: 860, tier: 'Green Innovator', reports: 14, challenges: 9 },
      { id: 'usr-alex', name: 'Alex Rivera', initials: 'AR', points: 750, tier: 'Green Guardian', reports: 12, challenges: 8, isCurrentUser: true },
      { id: 'usr-carlos', name: 'Carlos Mendez', initials: 'CM', points: 640, tier: 'Sprout Steward', reports: 11, challenges: 6 },
      { id: 'usr-priya', name: 'Priya Sharma', initials: 'PS', points: 520, tier: 'Campus Seedling', reports: 8, challenges: 5 }
    ],
    reports: [
      {
        id: 'rep-1',
        title: 'Leaking water faucet on 2nd floor restroom',
        category: 'Water Conservation',
        urgency: 'High',
        building: 'North Science Complex',
        location: 'Room 204 Restroom, Sink #2',
        description: 'Dripping water at approximately 1 drop per second. Puddle accumulating on counter.',
        reportedBy: 'Alex Rivera',
        timestamp: Date.now() - 2 * 3600 * 1000,
        status: 'In Progress',
        upvotes: 14,
        photoPreset: 'water-leak'
      },
      {
        id: 'rep-2',
        title: 'Overflowing recycling and compost station',
        category: 'Waste Management',
        urgency: 'Medium',
        building: 'Student Union & Dining',
        location: 'Main Dining Hall West Exit',
        description: 'Blue recycling and green food compost bins are overflowing onto cafeteria floor.',
        reportedBy: 'Sophia Martinez',
        timestamp: Date.now() - 5 * 3600 * 1000,
        status: 'Pending',
        upvotes: 9,
        photoPreset: 'overflow-bin'
      },
      {
        id: 'rep-3',
        title: 'High-bay hallway lights left on in full daylight',
        category: 'Electricity & Energy',
        urgency: 'Medium',
        building: 'Central Library',
        location: '3rd Floor Atrium Skylight Corridor',
        description: 'Large skylights provide 100% adequate natural sunlight, but 16 commercial halogen fixtures were left running.',
        reportedBy: 'Liam Chen',
        timestamp: Date.now() - 14 * 3600 * 1000,
        status: 'Resolved',
        upvotes: 21,
        photoPreset: 'energy-lights'
      },
      {
        id: 'rep-4',
        title: 'Broken lawn sprinkler flooding sidewalk',
        category: 'Water Conservation',
        urgency: 'High',
        building: 'Campus Quad & Grounds',
        location: 'Sidewalk between Quad and Arts Pavilion',
        description: 'Sprinkler head is cracked and shooting a vertical geyser, flooding walkway and wasting clean water.',
        reportedBy: 'Marcus Thorne',
        timestamp: Date.now() - 24 * 3600 * 1000,
        status: 'Resolved',
        upvotes: 18,
        photoPreset: 'water-leak'
      },
      {
        id: 'rep-5',
        title: 'Solar outdoor bollard light flickering and damaged',
        category: 'Electricity & Energy',
        urgency: 'Low',
        building: 'Athletics & Recreation Center',
        location: 'Pathway outside Track Entrance',
        description: 'Solar panel casing is loosened and LED flickers rapidly after sunset.',
        reportedBy: 'Carlos Mendez',
        timestamp: Date.now() - 36 * 3600 * 1000,
        status: 'In Progress',
        upvotes: 4,
        photoPreset: 'energy-lights'
      },
      {
        id: 'rep-6',
        title: 'Compost bin missing biodegradable liners',
        category: 'Waste Management',
        urgency: 'Medium',
        building: 'Student Union & Dining',
        location: 'Coffee Shop Corner',
        description: 'Staff had to use standard black plastic garbage bag because green compostable liners were out of stock.',
        reportedBy: 'Emma Watson',
        timestamp: Date.now() - 48 * 3600 * 1000,
        status: 'Resolved',
        upvotes: 12,
        photoPreset: 'overflow-bin'
      },
      {
        id: 'rep-7',
        title: 'E-waste and computer batteries in regular trash',
        category: 'Campus Grounds / Other',
        urgency: 'High',
        building: 'Engineering Hall',
        location: 'Computer Lab 112',
        description: 'Old laptop batteries and power supplies dumped inside regular paper bin instead of designated e-waste dropoff.',
        reportedBy: 'Aisha Patel',
        timestamp: Date.now() - 72 * 3600 * 1000,
        status: 'Pending',
        upvotes: 15,
        photoPreset: 'none'
      }
    ],
    challenges: [
      {
        id: 'ch-1',
        title: 'Ditch Single-Use Plastic in Dining Hall',
        category: 'Waste',
        pts: 80,
        difficulty: 'Medium',
        impact: 'Saves ~1.2 kg plastic waste per week',
        desc: 'Commit to carrying your own reusable tumbler, water bottle, and dining utensils for lunch across 7 consecutive days.',
        completed: true,
        steps: '7 / 7 days logged'
      },
      {
        id: 'ch-2',
        title: 'Phantom Power Dorm Room Buster',
        category: 'Energy',
        pts: 50,
        difficulty: 'Easy',
        impact: 'Cuts ~15 kWh standby draw per dorm',
        desc: 'Unplug phone chargers, laptop bricks, TVs, and microwave power cords before heading home or to weekend classes.',
        completed: true,
        steps: 'Completed'
      },
      {
        id: 'ch-3',
        title: 'Stairway to Sustainability',
        category: 'Energy',
        pts: 60,
        difficulty: 'Medium',
        impact: 'Reduces campus elevator motor cycle load',
        desc: 'Take the stairs instead of the elevator in science towers, library, and residence halls for 5 consecutive days.',
        completed: true,
        steps: '5 / 5 days logged'
      },
      {
        id: 'ch-4',
        title: 'Lab & Lecture Hall Lights Off Hero',
        category: 'Energy',
        pts: 70,
        difficulty: 'Medium',
        impact: 'Saves ~8 kWh electricity per vacant hall',
        desc: 'Check and turn off overhead lights and projector screens in at least 3 empty classrooms after study sessions.',
        completed: false,
        steps: '1 / 3 rooms checked'
      },
      {
        id: 'ch-5',
        title: 'Zero-Waste Lunch Challenge',
        category: 'Waste',
        pts: 40,
        difficulty: 'Easy',
        impact: '100% diversion to compost & washing',
        desc: 'Pack or order food with zero single-use plastic wrappers, disposable condiment pouches, or styrofoam containers.',
        completed: false,
        steps: 'Ready to start'
      },
      {
        id: 'ch-6',
        title: 'Cold Water Laundry Wash',
        category: 'Energy',
        pts: 45,
        difficulty: 'Easy',
        impact: '90% water heating electricity reduction',
        desc: 'Run 2 consecutive laundry cycles on the Cold Wash setting in your residence hall laundromat.',
        completed: false,
        steps: '0 / 2 loads'
      },
      {
        id: 'ch-7',
        title: 'Campus Quad Clean-Up Blitz',
        category: 'Habits',
        pts: 90,
        difficulty: 'Hard',
        impact: 'Cleans waterways & protects campus fauna',
        desc: 'Spend 15 minutes picking up bottles, cans, and wrappers along the Central Lawn and student quad area.',
        completed: false,
        steps: 'Ready for cleanup'
      },
      {
        id: 'ch-8',
        title: 'Dining Hall Plant-Based Weekday',
        category: 'Habits',
        pts: 60,
        difficulty: 'Medium',
        impact: 'Lowers daily dietary carbon footprint by 65%',
        desc: 'Choose wholesome vegetarian or vegan options for lunch and dinner at the student dining center.',
        completed: false,
        steps: 'Ready to start'
      }
    ],
    activities: [
      {
        id: 'act-1',
        title: 'Sophia M. completed "Campus Quad Clean-Up Blitz"',
        meta: 'Quad & Grounds · 25 mins ago',
        pts: '+90 pts',
        type: 'challenge',
        icon: '🌱'
      },
      {
        id: 'act-2',
        title: 'Alex Rivera reported "Leaking faucet in North Science Complex"',
        meta: 'Maintenance dispatched · 2 hours ago',
        pts: '+50 pts',
        type: 'report',
        icon: '💧'
      },
      {
        id: 'act-3',
        title: 'Facilities team resolved "Central Library daylight lighting issue"',
        meta: 'Central Library · 4 hours ago',
        pts: 'Resolved',
        type: 'resolution',
        icon: '✓'
      },
      {
        id: 'act-4',
        title: 'Liam Chen completed "Ditch Single-Use Plastic in Dining Hall"',
        meta: 'Student Union · 6 hours ago',
        pts: '+80 pts',
        type: 'challenge',
        icon: '🥤'
      },
      {
        id: 'act-5',
        title: 'Marcus Thorne logged "Biked to campus"',
        meta: 'Personal commute · 8 hours ago',
        pts: '+15 pts',
        type: 'action',
        icon: '🚲'
      },
      {
        id: 'act-6',
        title: 'Aisha Patel verified & resolved "Broken lawn sprinkler flooding sidewalk"',
        meta: 'Water saved · 12 hours ago',
        pts: '+30 pts',
        type: 'resolution',
        icon: '💧'
      }
    ],
    hotspots: [
      { building: 'North Science Complex', concern: 'Water Leaks / Faucets', reported: 9, resolved: 8, rate: '89%', avgTime: '3.2 hrs' },
      { building: 'Student Union & Dining', concern: 'Compost & Overflowing Bins', reported: 7, resolved: 6, rate: '85%', avgTime: '1.8 hrs' },
      { building: 'Central Library', concern: 'Daytime Lighting & HVAC', reported: 6, resolved: 5, rate: '83%', avgTime: '4.5 hrs' },
      { building: 'Campus Quad & Grounds', concern: 'Sprinklers & Litter', reported: 5, resolved: 4, rate: '80%', avgTime: '2.1 hrs' },
      { building: 'East Residence Halls', concern: 'Heating & Water Pressure', reported: 4, resolved: 2, rate: '50%', avgTime: '6.0 hrs' },
      { building: 'Engineering Hall', concern: 'E-Waste & Recycling', reported: 3, resolved: 2, rate: '67%', avgTime: '5.2 hrs' }
    ]
  };

  // State in Memory
  let state = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.reports && parsed.students && parsed.challenges) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial state:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_STATE));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }

  // =========================================================================
  // 2. Helpers & Calculations
  // =========================================================================
  function calculateTier(pts) {
    if (pts >= 1400) return 'Campus Sustainability Legend';
    if (pts >= 1000) return 'Eco Champion';
    if (pts >= 700) return 'Green Guardian';
    if (pts >= 400) return 'Sprout Steward';
    return 'Campus Seedling';
  }

  function getNextTierInfo(pts) {
    if (pts >= 1400) {
      return { nextPts: 0, nextName: 'Max Tier Reached', pct: 100 };
    }
    if (pts >= 1000) {
      const diff = 1400 - pts;
      const pct = Math.min(100, Math.round(((pts - 1000) / 400) * 100));
      return { nextPts: diff, nextName: 'Level 5: Campus Legend', pct };
    }
    if (pts >= 700) {
      const diff = 1000 - pts;
      const pct = Math.min(100, Math.round(((pts - 700) / 300) * 100));
      return { nextPts: diff, nextName: 'Level 4: Eco Champion', pct };
    }
    if (pts >= 400) {
      const diff = 700 - pts;
      const pct = Math.min(100, Math.round(((pts - 400) / 300) * 100));
      return { nextPts: diff, nextName: 'Level 3: Green Guardian', pct };
    }
    const diff = 400 - pts;
    const pct = Math.min(100, Math.round((pts / 400) * 100));
    return { nextPts: diff, nextName: 'Level 2: Sprout Steward', pct };
  }

  function formatTimeAgo(ts) {
    const diffSeconds = Math.floor((Date.now() - ts) / 1000);
    if (diffSeconds < 60) return 'just now';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showToast(message, icon = '🌱') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${escapeHtml(message)}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  // =========================================================================
  // 3. User Points & Leaderboard Sync
  // =========================================================================
  function addPointsToCurrentUser(amount, reason = '') {
    state.currentUser.points += amount;
    state.currentUser.tier = calculateTier(state.currentUser.points);

    // Sync with student list entry
    const studentIdx = state.students.findIndex(s => s.id === state.currentUser.id || s.isCurrentUser);
    if (studentIdx !== -1) {
      state.students[studentIdx].points = state.currentUser.points;
      state.students[studentIdx].tier = state.currentUser.tier;
    }

    saveState();
    updateUI();
  }

  // =========================================================================
  // 4. UI Rendering Functions
  // =========================================================================

  function updateUI() {
    renderHeader();
    renderDashboard();
    renderReports();
    renderLeaderboard();
    renderChallenges();
    renderAnalytics();
  }

  // --- Header ---
  function renderHeader() {
    const usr = state.currentUser;
    const nameEl = document.getElementById('headerUserName');
    const avatarEl = document.getElementById('headerUserAvatar');
    const pointsEl = document.getElementById('headerUserPoints');

    if (nameEl) nameEl.textContent = usr.name;
    if (avatarEl) avatarEl.textContent = usr.initials || 'AR';
    if (pointsEl) pointsEl.textContent = usr.points.toLocaleString();

    // Nav open count
    const openReports = state.reports.filter(r => r.status !== 'Resolved').length;
    const navCounter = document.getElementById('navOpenCount');
    if (navCounter) navCounter.textContent = openReports;
  }

  // --- Dashboard ---
  function renderDashboard() {
    const usr = state.currentUser;
    const greetingEl = document.getElementById('welcomeGreeting');
    const dashNameEl = document.getElementById('dashUserName');
    const dashTierEl = document.getElementById('dashUserLevel');
    const levelFillEl = document.getElementById('dashLevelProgress');
    const nextPtsEl = document.getElementById('dashNextLevelPoints');
    const nextNameEl = document.getElementById('dashNextLevelName');

    const hour = new Date().getHours();
    let greet = 'Welcome back';
    if (hour < 12) greet = 'Good morning';
    else if (hour < 18) greet = 'Good afternoon';
    else greet = 'Good evening';

    if (greetingEl) greetingEl.textContent = greet;
    if (dashNameEl) dashNameEl.textContent = usr.name.split(' ')[0] || usr.name;
    if (dashTierEl) dashTierEl.textContent = usr.tier;

    const tierInfo = getNextTierInfo(usr.points);
    if (levelFillEl) levelFillEl.style.width = `${tierInfo.pct}%`;
    if (nextPtsEl) nextPtsEl.textContent = `${tierInfo.nextPts} pts`;
    if (nextNameEl) nextNameEl.textContent = tierInfo.nextName;

    // Metrics Cards
    const totalReports = state.reports.length;
    const resolvedReports = state.reports.filter(r => r.status === 'Resolved').length;
    const resRate = totalReports > 0 ? Math.round((resolvedReports / totalReports) * 100) : 0;

    const totalEl = document.getElementById('dashTotalReported');
    const resolvedEl = document.getElementById('dashTotalResolved');
    const rateEl = document.getElementById('dashResolutionRate');
    const pointsEl = document.getElementById('dashUserPoints');
    const rankEl = document.getElementById('dashRankPosition');

    if (totalEl) totalEl.textContent = totalReports;
    if (resolvedEl) resolvedEl.textContent = resolvedReports;
    if (rateEl) rateEl.textContent = `${resRate}% campus resolution`;
    if (pointsEl) pointsEl.textContent = usr.points.toLocaleString();

    // Determine current user rank
    const sorted = [...state.students].sort((a, b) => b.points - a.points);
    const myRank = sorted.findIndex(s => s.id === usr.id || s.isCurrentUser) + 1;
    if (rankEl) rankEl.textContent = `Rank #${myRank} of ${sorted.length} students`;

    // Activity Feed
    renderActivityFeed();
  }

  function renderActivityFeed(filter = 'all') {
    const container = document.getElementById('activityFeedList');
    if (!container) return;

    let items = state.activities;
    if (filter === 'reports') {
      items = items.filter(i => i.type === 'report');
    } else if (filter === 'challenges') {
      items = items.filter(i => i.type === 'challenge');
    }

    if (items.length === 0) {
      container.innerHTML = '<div class="text-sm text-muted" style="padding: 1.5rem; text-align: center;">No recent activities for this filter.</div>';
      return;
    }

    container.innerHTML = items.map(act => {
      let iconBg = 'var(--surface-subtle)';
      let iconColor = 'var(--text-main)';
      if (act.type === 'challenge') {
        iconBg = 'var(--primary-light)';
        iconColor = 'var(--primary)';
      } else if (act.type === 'report') {
        iconBg = 'var(--accent-blue-light)';
        iconColor = 'var(--accent-blue)';
      } else if (act.type === 'resolution') {
        iconBg = '#dcfce7';
        iconColor = '#15803d';
      }

      return `
        <div class="activity-item">
          <div class="activity-icon-wrap" style="background: ${iconBg}; color: ${iconColor};">
            ${act.icon || '🌱'}
          </div>
          <div class="activity-info">
            <div class="activity-title">${escapeHtml(act.title)}</div>
            <div class="activity-meta">${escapeHtml(act.meta)}</div>
          </div>
          <div class="activity-pts">${escapeHtml(act.pts)}</div>
        </div>
      `;
    }).join('');
  }

  // --- Reports Section ---
  let reportCategoryFilter = 'all';
  let reportStatusFilter = 'all';
  let reportSearchQuery = '';
  let reportSortOrder = 'newest';

  function renderReports() {
    const grid = document.getElementById('reportsGrid');
    const emptyState = document.getElementById('reportsEmptyState');
    if (!grid) return;

    // Filter reports
    let list = state.reports.filter(r => {
      const matchesCat = reportCategoryFilter === 'all' || r.category === reportCategoryFilter;
      const matchesStatus = reportStatusFilter === 'all' || r.status === reportStatusFilter;
      const q = reportSearchQuery.toLowerCase();
      const matchesSearch = !q ||
        r.title.toLowerCase().includes(q) ||
        r.building.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);

      return matchesCat && matchesStatus && matchesSearch;
    });

    // Sort reports
    if (reportSortOrder === 'newest') {
      list.sort((a, b) => b.timestamp - a.timestamp);
    } else if (reportSortOrder === 'upvotes') {
      list.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    } else if (reportSortOrder === 'urgency') {
      const urgencyWeight = { High: 3, Medium: 2, Low: 1 };
      list.sort((a, b) => (urgencyWeight[b.urgency] || 0) - (urgencyWeight[a.urgency] || 0));
    }

    // Update summary counts
    const visCountEl = document.getElementById('reportsVisibleCount');
    const totalCountEl = document.getElementById('reportsTotalCount');
    const pendingEl = document.getElementById('statCountPending');
    const progressEl = document.getElementById('statCountProgress');
    const resolvedEl = document.getElementById('statCountResolved');

    if (visCountEl) visCountEl.textContent = list.length;
    if (totalCountEl) totalCountEl.textContent = state.reports.length;
    if (pendingEl) pendingEl.textContent = state.reports.filter(r => r.status === 'Pending').length;
    if (progressEl) progressEl.textContent = state.reports.filter(r => r.status === 'In Progress').length;
    if (resolvedEl) resolvedEl.textContent = state.reports.filter(r => r.status === 'Resolved').length;

    if (list.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    grid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = list.map(rep => {
      const isUpvoted = (state.currentUser.upvotedReports || []).includes(rep.id);
      const isResolved = rep.status === 'Resolved';

      // Category icon
      let catIcon = '🌱';
      if (rep.category.includes('Water')) catIcon = '💧';
      else if (rep.category.includes('Waste')) catIcon = '🗑️';
      else if (rep.category.includes('Electricity')) catIcon = '⚡';

      // Status class & text
      let statusClass = 'status-pending';
      let dotColor = 'var(--accent-amber)';
      if (rep.status === 'In Progress') {
        statusClass = 'status-progress';
        dotColor = 'var(--accent-blue)';
      } else if (rep.status === 'Resolved') {
        statusClass = 'status-resolved';
        dotColor = '#16a34a';
      }

      return `
        <article class="report-card" data-id="${rep.id}">
          <div>
            <div class="report-top-meta">
              <span class="report-category-label">
                <span>${catIcon}</span>
                <span>${escapeHtml(rep.category)}</span>
              </span>
              <span class="report-status-text ${statusClass}">
                <span class="status-indicator-dot" style="background-color: ${dotColor};"></span>
                <span>${escapeHtml(rep.status)}</span>
              </span>
            </div>

            <h3 class="report-title">${escapeHtml(rep.title)}</h3>

            <div class="report-location-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${escapeHtml(rep.building)} · ${escapeHtml(rep.location)}</span>
            </div>

            <p class="report-desc">${escapeHtml(rep.description)}</p>
          </div>

          <div class="report-footer">
            <div class="report-reporter">
              <span>Reported ${formatTimeAgo(rep.timestamp)}</span>
            </div>
            
            <div class="report-actions">
              <button class="btn-upvote ${isUpvoted ? 'upvoted' : ''}" data-action="upvote" data-id="${rep.id}" title="Endorse this issue">
                ▲ <span>${rep.upvotes || 0}</span>
              </button>

              ${!isResolved ? `
                <button class="btn-resolve-quick" data-action="quick-resolve" data-id="${rep.id}" title="Mark fixed & earn 30 pts">
                  ✓ Resolve (+30)
                </button>
              ` : `
                <span class="text-xs font-semibold" style="color: #16a34a;">Resolved ✓</span>
              `}

              <button class="btn btn-outline" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" data-action="view-details" data-id="${rep.id}">
                Details
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- Leaderboard Section ---
  let leaderboardTimeframe = 'all';

  function renderLeaderboard() {
    const podiumEl = document.getElementById('leaderboardPodium');
    const tableBody = document.getElementById('leaderboardTableBody');
    const userStripEl = document.getElementById('userRankStrip');
    if (!podiumEl || !tableBody) return;

    // Compute multiplier for timeframe preview
    let ptsMultiplier = 1;
    if (leaderboardTimeframe === 'month') ptsMultiplier = 0.42;
    if (leaderboardTimeframe === 'week') ptsMultiplier = 0.16;

    // Clone and sort students
    const sorted = [...state.students].map(s => ({
      ...s,
      displayPts: Math.max(20, Math.round(s.points * ptsMultiplier))
    })).sort((a, b) => b.displayPts - a.displayPts);

    // Top 3 Podium
    const top3 = sorted.slice(0, 3);
    const podiumMedals = [
      { rank: 1, class: 'medal-1', label: '1st', cardClass: 'first-place' },
      { rank: 2, class: 'medal-2', label: '2nd', cardClass: '' },
      { rank: 3, class: 'medal-3', label: '3rd', cardClass: '' }
    ];

    // Rearrange visually: 2nd, 1st, 3rd for athletic podium order
    const podiumDisplay = [
      { student: top3[1], meta: podiumMedals[1] },
      { student: top3[0], meta: podiumMedals[0] },
      { student: top3[2], meta: podiumMedals[2] }
    ];

    podiumEl.innerHTML = podiumDisplay.map(item => {
      if (!item.student) return '';
      const s = item.student;
      return `
        <div class="podium-card ${item.meta.cardClass}">
          <div class="podium-medal ${item.meta.class}">${item.meta.label}</div>
          <div class="podium-avatar">${escapeHtml(s.initials)}</div>
          <h3 class="podium-name">${escapeHtml(s.name)}</h3>
          <span class="podium-tier">${escapeHtml(s.tier)}</span>
          <div class="podium-score">${s.displayPts.toLocaleString()} <span class="unit">pts</span></div>
          <div class="text-xs text-muted" style="margin-top: 0.5rem;">
            ${s.reports || 0} reports · ${s.challenges || 0} challenges
          </div>
        </div>
      `;
    }).join('');

    // Full table
    tableBody.innerHTML = sorted.map((s, index) => {
      const isCurrent = s.id === state.currentUser.id || s.isCurrentUser;
      const rankNum = index + 1;

      return `
        <tr class="${isCurrent ? 'current-user-row' : ''}">
          <td style="font-weight: 700; font-family: var(--font-mono); color: var(--primary);">#${rankNum}</td>
          <td>
            <div class="student-col">
              <div class="table-avatar">${escapeHtml(s.initials)}</div>
              <div>
                <strong>${escapeHtml(s.name)}</strong>
                ${isCurrent ? '<span class="tag-you" style="margin-left: 0.35rem;">You</span>' : ''}
              </div>
            </div>
          </td>
          <td>${escapeHtml(s.tier)}</td>
          <td class="text-center font-medium">${s.reports || 0}</td>
          <td class="text-center font-medium">${s.challenges || 0}</td>
          <td class="text-right table-pts">${s.displayPts.toLocaleString()}</td>
        </tr>
      `;
    }).join('');

    // User rank strip
    const myIndex = sorted.findIndex(s => s.id === state.currentUser.id || s.isCurrentUser);
    if (userStripEl && myIndex !== -1) {
      const myRank = myIndex + 1;
      const usr = state.currentUser;
      document.getElementById('stripUserRank').textContent = `#${myRank}`;
      document.getElementById('stripUserAvatar').textContent = usr.initials || 'AR';
      document.getElementById('stripUserName').textContent = usr.name;
      document.getElementById('stripUserReports').textContent = `${usr.reportsCount || 12} reports filed`;
      document.getElementById('stripUserChallenges').textContent = `${usr.challengesCount || 3} challenges completed`;
      document.getElementById('stripUserBadge').textContent = usr.tier;
      document.getElementById('stripUserPoints').textContent = Math.round(usr.points * ptsMultiplier).toLocaleString();
    }
  }

  // --- Challenges Section ---
  let challengeStatusFilter = 'all';
  let challengeCatFilter = 'all';

  function renderChallenges() {
    const grid = document.getElementById('challengesGrid');
    const compCountEl = document.getElementById('challengesCompletedCount');
    const totalCountEl = document.getElementById('challengesTotalCount');
    if (!grid) return;

    const completed = state.challenges.filter(c => c.completed).length;
    if (compCountEl) compCountEl.textContent = completed;
    if (totalCountEl) totalCountEl.textContent = state.challenges.length;

    let list = state.challenges.filter(ch => {
      const matchStatus =
        challengeStatusFilter === 'all' ||
        (challengeStatusFilter === 'completed' && ch.completed) ||
        (challengeStatusFilter === 'active' && !ch.completed);

      const matchCat = challengeCatFilter === 'all' || ch.category === challengeCatFilter;

      return matchStatus && matchCat;
    });

    if (list.length === 0) {
      grid.innerHTML = '<div class="empty-state" style="grid-column: 1 / -1;"><h3>No challenges match the selected filters</h3><p>Switch filter tabs to explore other active campus green challenges.</p></div>';
      return;
    }

    grid.innerHTML = list.map(ch => {
      let icon = '🌱';
      if (ch.category === 'Energy') icon = '⚡';
      else if (ch.category === 'Waste') icon = '♻️';
      else if (ch.category === 'Water') icon = '💧';
      else if (ch.category === 'Habits') icon = '🥗';

      return `
        <article class="challenge-card ${ch.completed ? 'completed' : ''}" data-id="${ch.id}">
          <div>
            <div class="challenge-header">
              <div class="challenge-icon-box">${icon}</div>
              <div class="challenge-pts-badge">+${ch.pts} pts</div>
            </div>

            <div class="challenge-category-tag">${escapeHtml(ch.category)} Challenge · ${escapeHtml(ch.difficulty)}</div>
            <h3 class="challenge-title">${escapeHtml(ch.title)}</h3>
            <div class="challenge-impact">Impact: ${escapeHtml(ch.impact)}</div>
            <p class="challenge-desc">${escapeHtml(ch.desc)}</p>
          </div>

          <div class="challenge-action-row">
            <span class="challenge-difficulty">Progress: <strong>${ch.completed ? 'Completed ✓' : escapeHtml(ch.steps)}</strong></span>
            
            <button class="btn-complete-challenge" data-action="toggle-challenge" data-id="${ch.id}">
              ${ch.completed ? 'Completed ✓' : 'Mark Complete'}
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- Interactive Analytics Section ---
  function renderAnalytics() {
    renderCategoryDonut();
    renderResolutionGauge();
    renderTrendBarChart();
    renderHotspotsTable();
  }

  function renderCategoryDonut() {
    const svg = document.getElementById('donutSvg');
    const legend = document.getElementById('donutLegend');
    const centerNum = document.getElementById('donutTotalCount');
    if (!svg || !legend) return;

    // Count categories
    const counts = {
      'Water Conservation': 0,
      'Waste Management': 0,
      'Electricity & Energy': 0,
      'Campus Grounds / Other': 0
    };

    state.reports.forEach(r => {
      if (counts[r.category] !== undefined) {
        counts[r.category]++;
      } else {
        counts['Campus Grounds / Other']++;
      }
    });

    const total = state.reports.length || 1;
    if (centerNum) centerNum.textContent = state.reports.length;

    const colors = {
      'Water Conservation': '#0284c7',
      'Waste Management': '#d97706',
      'Electricity & Energy': '#10b981',
      'Campus Grounds / Other': '#8b5cf6'
    };

    // SVG Donut calculation
    const r = 70;
    const cx = 100;
    const cy = 100;
    const circumference = 2 * Math.PI * r;

    let accumulatedOffset = 0;
    let pathsHtml = '';
    let legendHtml = '';

    Object.keys(counts).forEach(cat => {
      const count = counts[cat];
      const pct = count / total;
      const strokeLen = pct * circumference;
      const dashoffset = -accumulatedOffset;
      accumulatedOffset += strokeLen;

      pathsHtml += `
        <circle
          class="donut-slice"
          cx="${cx}"
          cy="${cy}"
          r="${r}"
          stroke="${colors[cat]}"
          stroke-dasharray="${strokeLen} ${circumference - strokeLen}"
          stroke-dashoffset="${dashoffset}"
          data-cat="${cat}"
          data-count="${count}"
          data-pct="${Math.round(pct * 100)}%"
        />
      `;

      legendHtml += `
        <div class="legend-item">
          <div class="legend-left">
            <span class="legend-dot" style="background-color: ${colors[cat]};"></span>
            <span>${cat}</span>
          </div>
          <span class="legend-val">${count} <span class="text-xs text-muted">(${Math.round(pct * 100)}%)</span></span>
        </div>
      `;
    });

    svg.innerHTML = pathsHtml;
    legend.innerHTML = legendHtml;
  }

  function renderResolutionGauge() {
    const gaugeSvg = document.getElementById('gaugeSvg');
    const gaugeValEl = document.getElementById('gaugeResolutionVal');
    const resolvedEl = document.getElementById('analyticsResolvedCount');
    const progressEl = document.getElementById('analyticsProgressCount');
    const pendingEl = document.getElementById('analyticsPendingCount');
    const barResolved = document.getElementById('barResResolved');
    const barProgress = document.getElementById('barResProgress');
    const barPending = document.getElementById('barResPending');

    const total = state.reports.length || 1;
    const countResolved = state.reports.filter(r => r.status === 'Resolved').length;
    const countProgress = state.reports.filter(r => r.status === 'In Progress').length;
    const countPending = state.reports.filter(r => r.status === 'Pending').length;

    const pctResolved = Math.round((countResolved / total) * 100);
    const pctProgress = Math.round((countProgress / total) * 100);
    const pctPending = Math.round((countPending / total) * 100);

    if (gaugeValEl) gaugeValEl.textContent = `${pctResolved}%`;
    if (resolvedEl) resolvedEl.textContent = `${countResolved} (${pctResolved}%)`;
    if (progressEl) progressEl.textContent = `${countProgress} (${pctProgress}%)`;
    if (pendingEl) pendingEl.textContent = `${countPending} (${pctPending}%)`;

    if (barResolved) barResolved.style.width = `${pctResolved}%`;
    if (barProgress) barProgress.style.width = `${pctProgress}%`;
    if (barPending) barPending.style.width = `${pctPending}%`;

    // Semicircle gauge drawing (Arc from (20, 100) to (180, 100) with radius 80)
    if (gaugeSvg) {
      const arcLength = Math.PI * 80; // ~251.3
      const fillLength = (pctResolved / 100) * arcLength;
      const strokeOffset = arcLength - fillLength;

      gaugeSvg.innerHTML = `
        <path class="gauge-bg" d="M 20 100 A 80 80 0 0 1 180 100" />
        <path class="gauge-fill" d="M 20 100 A 80 80 0 0 1 180 100"
          stroke-dasharray="${arcLength}"
          stroke-dashoffset="${strokeOffset}"
        />
      `;
    }
  }

  function renderTrendBarChart() {
    const container = document.getElementById('barChartContainer');
    if (!container) return;

    const monthsData = [
      { month: 'May', reported: 14, resolved: 11 },
      { month: 'Jun', reported: 18, resolved: 15 },
      { month: 'Jul', reported: 12, resolved: 11 },
      { month: 'Aug', reported: 22, resolved: 19 },
      { month: 'Sep', reported: 29, resolved: 24 },
      { month: 'Oct', reported: state.reports.length + 18, resolved: state.reports.filter(r => r.status === 'Resolved').length + 15 }
    ];

    const maxVal = Math.max(...monthsData.map(d => Math.max(d.reported, d.resolved))) + 4;

    container.innerHTML = monthsData.map(d => {
      const hReported = Math.round((d.reported / maxVal) * 130);
      const hResolved = Math.round((d.resolved / maxVal) * 130);

      return `
        <div class="bar-group">
          <div class="bars-pair">
            <div class="chart-bar bar-reported" style="height: ${hReported}px;" title="${d.month}: ${d.reported} reported"></div>
            <div class="chart-bar bar-resolved" style="height: ${hResolved}px;" title="${d.month}: ${d.resolved} resolved"></div>
          </div>
          <div class="bar-label">${d.month}</div>
        </div>
      `;
    }).join('');
  }

  function renderHotspotsTable() {
    const tbody = document.getElementById('hotspotsTableBody');
    if (!tbody) return;

    tbody.innerHTML = state.hotspots.map(h => `
      <tr>
        <td><strong>${escapeHtml(h.building)}</strong></td>
        <td>${escapeHtml(h.concern)}</td>
        <td>${h.reported}</td>
        <td>${h.resolved}</td>
        <td>
          <span style="font-weight: 700; color: #15803d;">${h.rate}</span>
        </td>
        <td class="text-muted">${h.avgTime}</td>
      </tr>
    `).join('');
  }

  // =========================================================================
  // 5. User Interaction & Handlers
  // =========================================================================

  function setupEventHandlers() {
    // Tab Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetTab = item.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });

    // Mobile nav toggle
    const mobileToggle = document.getElementById('mobileNavToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileToggle && mainNav) {
      mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('mobile-open');
      });
    }

    // Logo Click -> Go to Dashboard
    const logoClick = document.getElementById('logoClick');
    if (logoClick) {
      logoClick.addEventListener('click', () => switchTab('dashboard'));
    }

    // Modal: Open New Report
    const openBtns = [
      document.getElementById('openReportModalBtn'),
      document.getElementById('openReportModalBtn2')
    ];
    openBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => openModal('reportModal'));
    });

    const closeReportBtn = document.getElementById('closeReportModalBtn');
    const cancelReportBtn = document.getElementById('cancelReportModalBtn');
    if (closeReportBtn) closeReportBtn.addEventListener('click', () => closeModal('reportModal'));
    if (cancelReportBtn) cancelReportBtn.addEventListener('click', () => closeModal('reportModal'));

    // Submit Report Form
    const newReportForm = document.getElementById('newReportForm');
    if (newReportForm) {
      newReportForm.addEventListener('submit', handleReportSubmit);
    }

    // Modal: Quick Green Action
    const quickLogBtns = [
      document.getElementById('openQuickLogBtn'),
      document.getElementById('dashQuickLogBtn')
    ];
    quickLogBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => openModal('quickLogModal'));
    });

    const closeQuickLogBtn = document.getElementById('closeQuickLogBtn');
    if (closeQuickLogBtn) closeQuickLogBtn.addEventListener('click', () => closeModal('quickLogModal'));

    // Quick Actions click
    const qaCards = document.querySelectorAll('.quick-action-card');
    qaCards.forEach(card => {
      card.addEventListener('click', () => {
        const pts = parseInt(card.getAttribute('data-pts'), 10) || 15;
        const title = card.querySelector('strong')?.textContent || 'Green Action';
        
        addPointsToCurrentUser(pts);
        
        state.activities.unshift({
          id: 'act-' + Date.now(),
          title: `${state.currentUser.name} logged "${title}"`,
          meta: `Personal habit · Just now`,
          pts: `+${pts} pts`,
          type: 'action',
          icon: card.querySelector('.qa-icon')?.textContent || '🌱'
        });

        saveState();
        closeModal('quickLogModal');
        showToast(`Logged "${title}"! +${pts} points earned.`);
      });
    });

    // Modal: User Profile
    const profileBtns = [
      document.getElementById('userProfileBtn'),
      document.getElementById('footerProfileBtn')
    ];
    profileBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', openProfileModal);
    });

    const closeProfileBtn = document.getElementById('closeProfileModalBtn');
    if (closeProfileBtn) closeProfileBtn.addEventListener('click', () => closeModal('userProfileModal'));

    // Save customized name
    const saveNameBtn = document.getElementById('saveStudentNameBtn');
    if (saveNameBtn) {
      saveNameBtn.addEventListener('click', () => {
        const input = document.getElementById('editStudentName');
        const newName = (input.value || '').trim();
        if (newName) {
          state.currentUser.name = newName;
          const initials = newName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
          state.currentUser.initials = initials;

          // Sync student list
          const me = state.students.find(s => s.id === state.currentUser.id || s.isCurrentUser);
          if (me) {
            me.name = newName;
            me.initials = initials;
          }

          saveState();
          updateUI();
          showToast(`Student profile updated to ${newName}!`);
          closeModal('userProfileModal');
        }
      });
    }

    // Reset Demo Data
    const resetBtns = [
      document.getElementById('footerResetBtn'),
      document.getElementById('resetAllDataBtn')
    ];
    resetBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          if (confirm('Reset Eco Campus to default demo data? All local edits will be refreshed.')) {
            localStorage.removeItem(STORAGE_KEY);
            state = JSON.parse(JSON.stringify(INITIAL_STATE));
            saveState();
            updateUI();
            closeModal('userProfileModal');
            showToast('Reset to demo sample data.');
          }
        });
      }
    });

    // Report Detail Modal Close
    const closeDetailBtn = document.getElementById('closeDetailModalBtn');
    if (closeDetailBtn) closeDetailBtn.addEventListener('click', () => closeModal('reportDetailModal'));

    // Reports Toolbar Controls
    const searchInput = document.getElementById('reportSearchInput');
    const clearSearch = document.getElementById('clearSearchBtn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        reportSearchQuery = e.target.value.trim();
        if (clearSearch) clearSearch.style.display = reportSearchQuery ? 'block' : 'none';
        renderReports();
      });
    }

    if (clearSearch) {
      clearSearch.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        reportSearchQuery = '';
        clearSearch.style.display = 'none';
        renderReports();
      });
    }

    const catSelect = document.getElementById('filterCategory');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        reportCategoryFilter = e.target.value;
        renderReports();
      });
    }

    const statusSelect = document.getElementById('filterStatus');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        reportStatusFilter = e.target.value;
        renderReports();
      });
    }

    const sortSelect = document.getElementById('sortReports');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        reportSortOrder = e.target.value;
        renderReports();
      });
    }

    const resetFiltersBtn = document.getElementById('resetReportFiltersBtn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        reportCategoryFilter = 'all';
        reportStatusFilter = 'all';
        reportSearchQuery = '';
        if (catSelect) catSelect.value = 'all';
        if (statusSelect) statusSelect.value = 'all';
        if (searchInput) searchInput.value = '';
        if (clearSearch) clearSearch.style.display = 'none';
        renderReports();
      });
    }

    // Delegate Reports Grid Clicks (Upvote, Quick Resolve, View Details)
    const reportsGrid = document.getElementById('reportsGrid');
    if (reportsGrid) {
      reportsGrid.addEventListener('click', handleReportsGridClick);
    }

    // Activity Feed Filter Chips
    const actFilterChips = document.querySelectorAll('.activity-filter-group .filter-chip');
    actFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        actFilterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-activity-filter');
        renderActivityFeed(filter);
      });
    });

    // Leaderboard Timeframe Chips
    const lbChips = document.querySelectorAll('.leaderboard-timeframe-group .filter-chip');
    lbChips.forEach(chip => {
      chip.addEventListener('click', () => {
        lbChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        leaderboardTimeframe = chip.getAttribute('data-timeframe');
        renderLeaderboard();
      });
    });

    // Challenge Filters
    const chSegBtns = document.querySelectorAll('#challengeStatusFilter .seg-btn');
    chSegBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        chSegBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        challengeStatusFilter = btn.getAttribute('data-filter');
        renderChallenges();
      });
    });

    const chCatSelect = document.getElementById('challengeCategoryFilter');
    if (chCatSelect) {
      chCatSelect.addEventListener('change', (e) => {
        challengeCatFilter = e.target.value;
        renderChallenges();
      });
    }

    // Delegate Challenge Grid clicks
    const challengesGrid = document.getElementById('challengesGrid');
    if (challengesGrid) {
      challengesGrid.addEventListener('click', handleChallengeGridClick);
    }
  }

  function switchTab(tabId) {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.tab-section');

    navItems.forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    sections.forEach(sec => {
      if (sec.id === `section-${tabId}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Close mobile nav after selection
    const mainNav = document.getElementById('mainNav');
    if (mainNav) mainNav.classList.remove('mobile-open');

    // Scroll top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // --- Report Submission Logic ---
  function handleReportSubmit(e) {
    e.preventDefault();

    const titleInput = document.getElementById('reportTitle');
    const catSelect = document.getElementById('reportCategory');
    const urgencySelect = document.getElementById('reportUrgency');
    const buildingSelect = document.getElementById('reportBuilding');
    const locInput = document.getElementById('reportLocation');
    const descInput = document.getElementById('reportDescription');
    const photoPreset = document.querySelector('input[name="reportPhotoPreset"]:checked')?.value || 'water-leak';

    // Errors
    const errTitle = document.getElementById('errReportTitle');
    const errCat = document.getElementById('errReportCategory');
    const errBuilding = document.getElementById('errReportBuilding');
    const errLoc = document.getElementById('errReportLocation');
    const errDesc = document.getElementById('errReportDescription');

    let isValid = true;

    if (!titleInput.value.trim() || titleInput.value.trim().length < 5) {
      errTitle.classList.add('visible');
      isValid = false;
    } else {
      errTitle.classList.remove('visible');
    }

    if (!catSelect.value) {
      errCat.classList.add('visible');
      isValid = false;
    } else {
      errCat.classList.remove('visible');
    }

    if (!buildingSelect.value) {
      errBuilding.classList.add('visible');
      isValid = false;
    } else {
      errBuilding.classList.remove('visible');
    }

    if (!locInput.value.trim()) {
      errLoc.classList.add('visible');
      isValid = false;
    } else {
      errLoc.classList.remove('visible');
    }

    if (!descInput.value.trim() || descInput.value.trim().length < 10) {
      errDesc.classList.add('visible');
      isValid = false;
    } else {
      errDesc.classList.remove('visible');
    }

    if (!isValid) return;

    // Create report object
    const newReport = {
      id: 'rep-' + Date.now(),
      title: titleInput.value.trim(),
      category: catSelect.value,
      urgency: urgencySelect.value,
      building: buildingSelect.value,
      location: locInput.value.trim(),
      description: descInput.value.trim(),
      reportedBy: state.currentUser.name,
      timestamp: Date.now(),
      status: 'Pending',
      upvotes: 1,
      photoPreset: photoPreset
    };

    // Prepend to list
    state.reports.unshift(newReport);

    // Award +50 points
    state.currentUser.reportsCount = (state.currentUser.reportsCount || 0) + 1;
    addPointsToCurrentUser(50);

    // Record activity
    state.activities.unshift({
      id: 'act-' + Date.now(),
      title: `${state.currentUser.name} reported "${newReport.title}"`,
      meta: `${newReport.building} · Just now`,
      pts: '+50 pts',
      type: 'report',
      icon: newReport.category.includes('Water') ? '💧' : (newReport.category.includes('Waste') ? '🗑️' : '⚡')
    });

    saveState();
    closeModal('reportModal');
    newReportForm.reset();

    showToast(`Report submitted! +50 points added to your score.`, '🎉');
  }

  // --- Reports Grid Actions (Upvote, Quick Resolve, Detail) ---
  function handleReportsGridClick(e) {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    if (!id) return;

    const report = state.reports.find(r => r.id === id);
    if (!report) return;

    if (action === 'upvote') {
      const upvoted = state.currentUser.upvotedReports || [];
      const idx = upvoted.indexOf(id);
      if (idx === -1) {
        upvoted.push(id);
        report.upvotes = (report.upvotes || 0) + 1;
        showToast('Upvoted report! Thanks for supporting campus facilities.');
      } else {
        upvoted.splice(idx, 1);
        report.upvotes = Math.max(0, (report.upvotes || 1) - 1);
      }
      state.currentUser.upvotedReports = upvoted;
      saveState();
      renderReports();
    } else if (action === 'quick-resolve') {
      resolveReport(report);
    } else if (action === 'view-details') {
      openReportDetail(report);
    }
  }

  function resolveReport(report) {
    if (report.status === 'Resolved') return;

    report.status = 'Resolved';
    report.resolvedTimestamp = Date.now();
    state.currentUser.resolvedCount = (state.currentUser.resolvedCount || 0) + 1;

    // Bonus points
    addPointsToCurrentUser(30);

    // Add activity
    state.activities.unshift({
      id: 'act-' + Date.now(),
      title: `${state.currentUser.name} verified & resolved "${report.title}"`,
      meta: `${report.building} · Just now`,
      pts: '+30 pts',
      type: 'resolution',
      icon: '✓'
    });

    saveState();
    updateUI();
    showToast(`Issue resolved! +30 points awarded.`, '✓');
  }

  function openReportDetail(report) {
    document.getElementById('detailCategory').textContent = report.category;
    document.getElementById('detailTitle').textContent = report.title;
    document.getElementById('detailLocation').textContent = `${report.building} — ${report.location}`;
    document.getElementById('detailUrgency').textContent = report.urgency;
    document.getElementById('detailDescText').textContent = report.description;
    document.getElementById('detailReporterInfo').textContent = `${report.reportedBy} · ${formatTimeAgo(report.timestamp)}`;

    const badge = document.getElementById('detailStatusBadge');
    badge.textContent = report.status;
    badge.className = `status-badge-inline status-${report.status.toLowerCase().replace(/\s+/g, '-')}`;

    const resolveBox = document.getElementById('detailResolveBox');
    const markResolvedBtn = document.getElementById('detailMarkResolvedBtn');

    if (report.status === 'Resolved') {
      if (resolveBox) resolveBox.style.display = 'none';
    } else {
      if (resolveBox) resolveBox.style.display = 'flex';
      if (markResolvedBtn) {
        markResolvedBtn.onclick = () => {
          resolveReport(report);
          closeModal('reportDetailModal');
        };
      }
    }

    openModal('reportDetailModal');
  }

  // --- Eco-Challenges Actions ---
  function handleChallengeGridClick(e) {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    if (action !== 'toggle-challenge' || !id) return;

    const ch = state.challenges.find(c => c.id === id);
    if (!ch) return;

    if (!ch.completed) {
      ch.completed = true;
      state.currentUser.challengesCount = (state.currentUser.challengesCount || 0) + 1;
      addPointsToCurrentUser(ch.pts);

      state.activities.unshift({
        id: 'act-' + Date.now(),
        title: `${state.currentUser.name} completed "${ch.title}"`,
        meta: `Eco Challenge · Just now`,
        pts: `+${ch.pts} pts`,
        type: 'challenge',
        icon: '🏆'
      });

      saveState();
      updateUI();
      showToast(`Challenge completed! +${ch.pts} points added to your score.`, '🏆');
    } else {
      // Allow un-completing for test flexibility
      ch.completed = false;
      state.currentUser.challengesCount = Math.max(0, (state.currentUser.challengesCount || 1) - 1);
      state.currentUser.points = Math.max(0, state.currentUser.points - ch.pts);
      state.currentUser.tier = calculateTier(state.currentUser.points);

      saveState();
      updateUI();
      showToast(`Challenge status updated.`);
    }
  }

  // --- Profile Modal & Student Switcher ---
  function openProfileModal() {
    const usr = state.currentUser;
    document.getElementById('modalProfileAvatar').textContent = usr.initials || 'AR';
    document.getElementById('modalProfileName').textContent = usr.name;
    document.getElementById('modalProfileTier').textContent = usr.tier;
    document.getElementById('modalProfilePoints').textContent = usr.points.toLocaleString();
    document.getElementById('modalProfileReports').textContent = usr.reportsCount || 12;
    document.getElementById('modalProfileChallenges').textContent = usr.challengesCount || 3;
    document.getElementById('editStudentName').value = usr.name;

    // Render student switcher list
    const listEl = document.getElementById('studentSelectList');
    if (listEl) {
      listEl.innerHTML = state.students.map(s => {
        const isActive = s.id === usr.id || (s.isCurrentUser && usr.id === 'usr-alex');
        return `
          <button class="student-choice-card ${isActive ? 'active' : ''}" data-student-id="${s.id}">
            <div class="user-avatar" style="width: 28px; height: 28px; font-size: 0.75rem;">${escapeHtml(s.initials)}</div>
            <div style="flex: 1; text-align: left;">
              <div style="font-weight: 600;">${escapeHtml(s.name)}</div>
              <div class="text-xs text-muted">${s.points.toLocaleString()} pts</div>
            </div>
            ${isActive ? '✓' : ''}
          </button>
        `;
      }).join('');

      listEl.querySelectorAll('.student-choice-card').forEach(card => {
        card.addEventListener('click', () => {
          const sId = card.getAttribute('data-student-id');
          const targetStudent = state.students.find(s => s.id === sId);
          if (targetStudent) {
            state.currentUser.id = targetStudent.id;
            state.currentUser.name = targetStudent.name;
            state.currentUser.initials = targetStudent.initials;
            state.currentUser.points = targetStudent.points;
            state.currentUser.tier = targetStudent.tier;
            state.currentUser.reportsCount = targetStudent.reports || 10;
            state.currentUser.challengesCount = targetStudent.challenges || 5;

            // Mark in student array
            state.students.forEach(s => s.isCurrentUser = (s.id === targetStudent.id));

            saveState();
            updateUI();
            closeModal('userProfileModal');
            showToast(`Switched active profile to ${targetStudent.name}!`);
          }
        });
      });
    }

    openModal('userProfileModal');
  }

  // =========================================================================
  // 6. Application Initialization
  // =========================================================================
  function init() {
    setupEventHandlers();
    updateUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
