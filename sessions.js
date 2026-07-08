// Pulls the latest schedule update from a Google Form's response Sheet
// so Paul can update session times/locations from his phone without
// touching the code. See README.md for setup steps.
(function () {
  // Paste the ID from your Google Sheet's URL, e.g.
  const SHEET_ID = "https://docs.google.com/spreadsheets/d/1FAIpQLSfYG83FQvJ1g4kE-kpM8_QjQRyDWWgAKZnaxnBzv_zpuFUqgw/edit";

  // gid of the "Form Responses" tab (0 if it's the only/first sheet)
  const GID = 0;

  // Column order must match the Google Form's question order.
  // Column A (Timestamp) is added automatically by Forms and is unused here.
  const FIELD_MAP = [
    null,                // A: Timestamp
    "session1Day",       // B
    "session1Time",      // C
    "session1Location",  // D
    "session2Day",        // E
    "session2Time",       // F
    "session2Location",   // G
    "session3Day",        // H
    "session3Time",       // I
    "session3Location",   // J
    "notes",               // K
  ];

  async function loadLatestSchedule() {
    if (!SHEET_ID || SHEET_ID.startsWith("REPLACE_")) {
      return; // Not configured yet — keep showing the default markup in index.html
    }

    const query = encodeURIComponent("select * order by A desc limit 1");
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}&tq=${query}`;

    try {
      const res = await fetch(url);
      const text = await res.text();
      const json = JSON.parse(text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1));
      const row = json.table.rows[0];
      if (!row) return;

      const data = {};
      FIELD_MAP.forEach((key, i) => {
        if (!key) return;
        const cell = row.c[i];
        data[key] = cell && cell.v != null ? String(cell.v).trim() : "";
      });

      renderSchedule(data);
    } catch (err) {
      console.warn("Could not load the latest schedule, showing default info.", err);
    }
  }

  function renderSchedule(data) {
    const container = document.getElementById("sessions-container");
    if (!container) return;

    const sessions = [
      { day: data.session1Day, time: data.session1Time, location: data.session1Location },
      { day: data.session2Day, time: data.session2Time, location: data.session2Location },
      { day: data.session3Day, time: data.session3Time, location: data.session3Location },
    ].filter((s) => s.day || s.time || s.location);

    if (sessions.length === 0) return; // Nothing submitted yet — keep the fallback markup

    container.innerHTML = sessions
      .map(
        (s) => `
      <div class="session">
        <strong>${escapeHtml(s.day)}</strong><br/>
        ${escapeHtml(s.time)}<br/>
        📍 ${escapeHtml(s.location)}
      </div>`
      )
      .join("");

    const notesEl = document.getElementById("sessions-notes");
    if (notesEl && data.notes) {
      notesEl.textContent = data.notes;
      notesEl.style.textAlign = "center";
      notesEl.style.fontStyle = "italic";
    }
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", loadLatestSchedule);
})();
