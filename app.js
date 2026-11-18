(() => {
  const storageKey = "campus-stores.shift.v2";
  const root = document.getElementById("campus-stores");
  const q = (selector) => root.querySelector(selector);
  const requests = [
    {
      id: "RQ-214",
      club: "Film Society",
      event: "Courtyard screening",
      owner: "Isha Rao",
      due: "Fri 8 pm",
      items: ["HDMI projector", "Portable speaker", "USB-C → HDMI adapter"],
      note: "Playback is from a USB-C-only laptop. The host will collect at 4 pm.",
    },
    {
      id: "RQ-209",
      club: "Debate Union",
      event: "Finals rehearsal",
      owner: "Tara Shah",
      due: "Sat 10 am",
      items: ["Wireless microphone"],
      note: "Rehearsal runs into the evening.",
    },
    {
      id: "RQ-217",
      club: "Photo Circle",
      event: "Street portrait walk",
      owner: "Dev Menon",
      due: "Sat noon",
      items: ["Digital camera"],
      note: "Collection on Saturday morning.",
    },
  ];
  const assets = [
    { id: "PR-04", type: "HDMI projector", model: "BenQ MH550", bin: "A2" },
    {
      id: "PR-06",
      type: "HDMI projector",
      model: "Epson EB-X49",
      bin: "Workshop",
      repair: true,
    },
    { id: "SP-02", type: "Portable speaker", model: "JBL Eon One", bin: "B1" },
    { id: "SP-05", type: "Portable speaker", model: "Bose S1", bin: "B2" },
    {
      id: "AD-12",
      type: "USB-C → HDMI adapter",
      model: "Belkin AVC002",
      bin: "C4",
    },
    {
      id: "AD-15",
      type: "USB-C → HDMI adapter",
      model: "Anker A8312",
      bin: "C4",
    },
    { id: "MI-09", type: "Wireless microphone", model: "Shure BLX", bin: "B3" },
    { id: "CA-03", type: "Digital camera", model: "Sony A6400", bin: "D2" },
  ];
  const people = [
    "Isha Rao",
    "Kabir Sen",
    "Leela Das",
    "Tara Shah",
    "Dev Menon",
  ];
  const shifts = [
    {
      time: "Friday · 3:45 pm",
      title: "Pickup at the counter",
      text: "Kabir is here for the Film Society screening. The film starts at four. Can he leave with everything he needs?",
      next: "Move to return time",
    },
    {
      time: "Friday · 7:30 pm",
      title: "The kit comes back in pieces",
      text: "Kabir has brought back the projector and speaker. “Leela still has the adapter. She’ll drop it off tomorrow at nine.” Take the return and hand over to the morning shift.",
      next: "Move to next morning",
    },
    {
      time: "Saturday · 9:00 am",
      title: "Morning shift",
      text: "You’ve just taken over. Leela walks in with an adapter. Work out what was outstanding from the screening and close the loan for the right item.",
    },
  ];
  const pages = [
    ["Requests", "clipboard-list"],
    ["Inventory", "package"],
    ["Loan register", "book-open"],
    ["Desk book", "messages-square"],
  ];
  const returnTimes = ["Fri 8 pm", "Sat 9 am", "Sat 10 am", "Sat noon"];
  const original = () => ({
    version: 2,
    tab: "Requests",
    phase: 0,
    selected: "",
    filter: "All items",
    loans: [
      {
        num: 401,
        req: "RQ-209",
        asset: "MI-09",
        who: "Tara Shah",
        holder: "Tara Shah",
        due: "Sat 10 am",
        back: false,
        log: [["Friday · earlier", "Issued to Tara Shah · due Sat 10 am"]],
      },
    ],
    notes: [],
    editing: false,
    // Prototype: request whose kit return form is open, the asset tag typed
    // at check-in, and a snapshot that lets the desk undo the last return.
    returning: "",
    lookup: "",
    undo: null,
    onlyOpen: true,
    notice: "Sample shift · All records are fictional.",
  });
  let s = original();
  const getAsset = (id) => assets.find((x) => x.id === id);
  const getReq = (id) => requests.find((x) => x.id === id);
  const out = (id) => s.loans.find((l) => l.asset === id && !l.back);
  const esc = (x) =>
    String(x).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const opts = (list) =>
    list
      .map(([v, t]) => '<option value="' + esc(v) + '">' + esc(t) + "</option>")
      .join("");
  const btn = (label, act, val = "", style = "") =>
    '<button type="button" data-action="' +
    act +
    '" data-val="' +
    esc(val) +
    '" class="' +
    style +
    '">' +
    esc(label) +
    "</button>";
  const head = (title, sub, control = "") =>
    '<div class="sectionhead"><div><h2>' +
    title +
    "</h2><small>" +
    sub +
    "</small></div>" +
    control +
    "</div>";
  const row = (label, sub, right) =>
    '<div class="row"><div><strong>' +
    esc(label) +
    "</strong><small>" +
    esc(sub) +
    "</small></div><div>" +
    right +
    "</div></div>";
  const badge = (t, good = false) =>
    '<span class="tag' + (good ? " good" : "") + '">' + esc(t) + "</span>";
  function requestPage() {
    let html = head(
      "Approved requests",
      "Student Activities Office · 3 approved forms",
    );
    if (s.selected) {
      const r = getReq(s.selected);
      html +=
        btn("Back to list", "close") +
        '<div class="record"><small>' +
        r.id +
        " · Approved</small><h3>" +
        r.event +
        "</h3><p>" +
        r.club +
        " · Filed by " +
        r.owner +
        "</p><p><b>Return by</b> " +
        r.due +
        "</p><p><b>Approved equipment</b></p><ul>" +
        r.items.map((x) => "<li>" + x + "</li>").join("") +
        "</ul><p>" +
        r.note +
        "</p></div>";
    } else
      html += requests
        .map((r) =>
          row(
            r.event,
            r.id + " · " + r.club,
            btn("View form", "request", r.id),
          ),
        )
        .join("");
    return html;
  }
  function inventory() {
    let html = head(
      "Inventory",
      "Physical units · home shelf and current availability",
    );
    html +=
      '<div class="buttons"><label>Show <select data-filter>' +
      opts(
        ["All items", "On shelf", "On loan", "In repair"].map((f) => [f, f]),
      ) +
      "</select></label></div>";
    for (const a of assets) {
      const status = a.repair
        ? "In repair"
        : out(a.id)
          ? "On loan"
          : "On shelf";
      if (s.filter !== "All items" && s.filter !== status) continue;
      const loan = out(a.id);
      html += row(
        a.id + " · " + a.type,
        a.model +
          " · " +
          a.bin +
          (loan ? " · with " + loan.holder + ", back " + loan.due : ""),
        badge(status, status === "On shelf"),
      );
    }
    return html;
  }
  const unitName = (id) => {
    const a = getAsset(id);
    return a.id + " · " + a.type;
  };
  const logList = (l) =>
    '<ul class="log">' +
    l.log
      .map(
        ([t, text]) =>
          "<li><small>" + esc(t) + "</small> " + esc(text) + "</li>",
      )
      .join("") +
    "</ul>";
  // One card per open slip: what the unit is, who has it now, when it is due.
  function slipCard(l, right) {
    const a = getAsset(l.asset);
    const moved = l.holder !== l.who;
    return (
      '<div class="slip' +
      (moved ? " moved" : "") +
      '"><div><strong>L-' +
      l.num +
      " · " +
      esc(unitName(l.asset)) +
      "</strong><small>" +
      esc(a.model) +
      " · home bin " +
      esc(a.bin) +
      "</small>" +
      (l.back
        ? "<small>Returned by " + esc(l.returnedBy || l.holder) + "</small>"
        : "<p><b>With " +
          esc(l.holder) +
          "</b> · back by " +
          esc(l.due) +
          (moved ? " · issued to " + esc(l.who) : "") +
          "</p>") +
      logList(l) +
      "</div><div>" +
      right +
      "</div></div>"
    );
  }
  // Prototype: take back a whole kit at once and account for every unit.
  function returnForm(reqId) {
    const r = getReq(reqId);
    const open = s.loans.filter((l) => l.req === reqId && !l.back);
    const people_ = people.map((p) => [p, p]);
    const pick = (name, options, chosen, blank) =>
      '<select name="' +
      name +
      '">' +
      (blank ? '<option value="">Select…</option>' : "") +
      options
        .map(
          ([v, t]) =>
            '<option value="' +
            esc(v) +
            '"' +
            (v === chosen ? " selected" : "") +
            ">" +
            esc(t) +
            "</option>",
        )
        .join("") +
      "</select>";
    let html = head(
      "Take a return",
      esc(r.id + " · " + r.club + " · " + r.event),
      btn("Cancel", "cancelreturn"),
    );
    html +=
      '<form data-return data-req="' +
      esc(reqId) +
      '"><div class="form"><label><span>Brought in by</span>' +
      pick("by", people_, open[0] ? open[0].holder : "", false) +
      "</label></div><p><b>Account for every unit on this request.</b></p>";
    for (const l of open) {
      const a = getAsset(l.asset);
      html +=
        '<fieldset class="unit"><legend>L-' +
        l.num +
        " · " +
        esc(unitName(l.asset)) +
        " <small>" +
        esc(a.model) +
        " · with " +
        esc(l.holder) +
        "</small></legend>" +
        '<div class="choices"><label><input type="radio" name="st-' +
        l.num +
        '" value="back"> Back at the desk</label><label><input type="radio" name="st-' +
        l.num +
        '" value="out"> Still out</label></div>' +
        '<div class="form stillout"><label><span>Who has it now</span>' +
        pick("holder-" + l.num, people_, "", true) +
        "</label><label><span>Expected back</span>" +
        pick(
          "due-" + l.num,
          returnTimes.map((t) => [t, t]),
          "",
          true,
        ) +
        "</label></div></fieldset>";
    }
    return (
      html +
      '<p class="formerror" role="alert" data-formerror></p><button type="submit" class="primary">Save return</button></form>'
    );
  }
  // Prototype: start from the unit in hand, not from the slip list.
  function checkIn() {
    let html =
      '<form data-lookup class="checkin"><label><span>Item in hand · read the asset tag</span><input name="tag" list="asset-tags" autocomplete="off" placeholder="e.g. AD-12" value="' +
      esc(s.lookup) +
      '" /></label><datalist id="asset-tags">' +
      assets.map((a) => '<option value="' + esc(a.id) + '"></option>').join("") +
      '</datalist><button type="submit">Find slip</button></form>';
    if (!s.lookup) return html;
    const a = getAsset(s.lookup);
    const clear = btn("Clear", "clearlookup");
    if (!a)
      return (
        html +
        '<div class="found warn"><p>No unit is tagged <b>' +
        esc(s.lookup) +
        "</b>. Check the tag on the item.</p>" +
        clear +
        "</div>"
      );
    const l = out(a.id);
    if (l)
      return (
        html +
        '<div class="found ok">' +
        slipCard(
          l,
          btn("Confirm " + a.id + " is back", "checkin", String(l.num), "primary") +
            clear,
        ) +
        "<small>" +
        esc(getReq(l.req).id + " · " + getReq(l.req).club + " · " + getReq(l.req).event) +
        "</small></div>"
      );
    const where = a.repair
      ? "in repair (" + a.bin + ")"
      : "on the shelf (bin " + a.bin + ")";
    const same = s.loans.filter(
      (x) => !x.back && getAsset(x.asset).type === a.type,
    );
    return (
      html +
      '<div class="found warn"><p><b>' +
      esc(unitName(a.id)) +
      "</b> is " +
      esc(where) +
      ". It isn’t on loan, so there is no slip to close.</p>" +
      (same.length
        ? "<p>Still out of this type: " +
          same
            .map(
              (x) =>
                "<b>L-" +
                x.num +
                " · " +
                esc(x.asset) +
                "</b> with " +
                esc(x.holder) +
                ", back " +
                esc(x.due),
            )
            .join("; ") +
          ". Check the tag on the unit in hand before closing anything.</p>"
        : "") +
      clear +
      "</div>"
    );
  }
  function register() {
    if (s.returning) return returnForm(s.returning);
    let html = head(
      "Loan register",
      "One slip per physical unit",
      s.editing
        ? btn("Cancel", "cancel")
        : btn("New issue slip", "new", "", "primary"),
    );
    if (s.editing) {
      const available = assets.filter((a) => !a.repair && !out(a.id));
      const select = (label, key, options) =>
        "<label><span>" +
        label +
        '</span><select name="' +
        key +
        '" required><option value="">Select…</option>' +
        opts(options) +
        "</select></label>";
      return (
        html +
        '<form data-issue><div class="form">' +
        select(
          "Approved request",
          "req",
          requests.map((r) => [r.id, r.id + " · " + r.club]),
        ) +
        select(
          "Unit leaving the desk",
          "asset",
          available.map((a) => [a.id, a.id + " · " + a.type]),
        ) +
        select(
          "Collected by",
          "who",
          people.map((p) => [p, p]),
        ) +
        select(
          "Return by",
          "due",
          ["Fri 8 pm", "Sat 9 am", "Sat 10 am", "Sat noon"].map((d) => [d, d]),
        ) +
        '</div><button type="submit" class="primary">Save issue slip</button></form>'
      );
    }
    html += checkIn();
    html +=
      '<div class="buttons">' +
      ["Outstanding", "All slips"]
        .map(
          (v, i) =>
            '<button type="button" data-action="scope" data-val="' +
            i +
            '" aria-pressed="' +
            (s.onlyOpen === (i === 0)) +
            '">' +
            v +
            "</button>",
        )
        .join("") +
      "</div>";
    const shown = s.loans
      .filter((l) => !s.onlyOpen || !l.back)
      .slice()
      .reverse();
    if (!shown.length) html += "<p>No outstanding slips.</p>";
    // Group slips by request so a kit reads as one job.
    const groups = [];
    for (const l of shown) {
      let g = groups.find((x) => x.req === l.req);
      if (!g) groups.push((g = { req: l.req, loans: [] }));
      g.loans.push(l);
    }
    for (const g of groups) {
      const r = getReq(g.req);
      const openCount = g.loans.filter((l) => !l.back).length;
      html +=
        '<section class="kit"><div class="kithead"><div><strong>' +
        esc(r.id + " · " + r.club) +
        "</strong><small>" +
        esc(r.event) +
        " · " +
        openCount +
        " of " +
        s.loans.filter((l) => l.req === g.req).length +
        " units still out</small></div>" +
        (openCount ? btn("Take return", "takereturn", r.id) : "") +
        "</div>" +
        g.loans
          .map((l) => slipCard(l, l.back ? badge("Returned") : ""))
          .join("") +
        "</section>";
    }
    return html;
  }
  function deskbook() {
    let html = head(
      "Desk book",
      "Messages from clubs and notes for the next shift",
    );
    const entries = [
      [
        "Friday · 3:20 pm",
        "Isha Rao · Film Society",
        "Kabir Sen is picking up our whole screening kit. Please issue it in his name. I’m setting up in the courtyard.",
      ],
      [
        "Friday · 3:30 pm",
        "Tara Shah · Debate Union",
        "Our microphone stays with me overnight. I’ll return it by 10 am Saturday.",
      ],
    ];
    if (s.phase >= 1)
      entries.push([
        "Friday · 7:30 pm",
        "Kabir Sen · Film Society",
        "I brought the projector and speaker. Leela Das has our adapter. She’ll be at the counter at 9 am tomorrow.",
      ]);
    for (const n of s.notes)
      entries.push([
        shifts[n.phase].time,
        "Counter handover" + (n.slip ? " · linked to slip L-" + n.slip : ""),
        n.text,
      ]);
    for (const [t, author, body] of entries.slice().reverse())
      html +=
        '<article class="record"><small>' +
        esc(t) +
        "</small><h3>" +
        esc(author) +
        "</h3><p>" +
        esc(body) +
        "</p></article>";
    return (
      html +
      '<form data-note><div class="form"><label class="full"><span>Note for the next shift</span><textarea name="note" rows="2" maxlength="400" required></textarea></label></div><button type="submit">Add handover note</button></form>'
    );
  }
  const screens = {
    Requests: requestPage,
    Inventory: inventory,
    "Loan register": register,
    "Desk book": deskbook,
  };
  function paint() {
    const phase = shifts[s.phase];
    q("[data-clock]").textContent = phase.time;
    q("[data-shift-title]").textContent = phase.title;
    q("[data-shift]").textContent = phase.text;
    const advance = q('[data-action="advance"]');
    advance.hidden = !phase.next;
    advance.textContent = phase.next || "";
    q("[data-nav]").innerHTML = pages
      .map(
        ([n, icon]) =>
          '<button type="button" data-action="tab" data-val="' +
          n +
          '" aria-pressed="' +
          (s.tab === n) +
          '"><svg aria-hidden="true" class="store-icon"><use href="#icon-' +
          icon +
          '"></use></svg>' +
          n +
          "</button>",
      )
      .join("");
    q("[data-page]").innerHTML = screens[s.tab]();
    if (q("[data-filter]")) q("[data-filter]").value = s.filter;
    q("[data-status]").textContent = s.notice;
    const undo = q('[data-action="undo"]');
    undo.hidden = !s.undo;
    undo.textContent = s.undo ? "Undo: " + s.undo.label : "";
  }
  const now = () => shifts[s.phase].time;
  const snapshot = (label) => ({
    label,
    loans: JSON.parse(JSON.stringify(s.loans)),
    notes: JSON.parse(JSON.stringify(s.notes)),
  });
  function commit(msg) {
    if (msg) s.notice = msg;
    paint();
    try {
      localStorage.setItem(storageKey, JSON.stringify(s));
    } catch {
      q("[data-status]").textContent +=
        " Browser storage is unavailable. Progress lasts for this visit.";
    }
  }
  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-action]");
    if (!b) return;
    const v = b.dataset.val;
    switch (b.dataset.action) {
      case "restart":
        s = original();
        break;
      case "advance":
        if (s.phase < 2) s.phase++;
        s.undo = null;
        s.notice = "Shift time updated.";
        break;
      case "tab":
        s.tab = v;
        s.editing = false;
        s.returning = "";
        break;
      case "close":
        s.selected = "";
        break;
      case "request":
        s.selected = v;
        break;
      case "new":
        s.editing = true;
        s.returning = "";
        break;
      case "cancel":
        s.editing = false;
        break;
      case "scope":
        s.onlyOpen = v === "0";
        break;
      case "takereturn":
        if (!getReq(v)) return;
        s.returning = v;
        s.editing = false;
        break;
      case "cancelreturn":
        s.returning = "";
        break;
      case "clearlookup":
        s.lookup = "";
        break;
      case "checkin": {
        const l = s.loans.find((l) => l.num === Number(v));
        if (!l || l.back) return;
        s.undo = snapshot("check-in of " + l.asset);
        l.back = true;
        l.returnedBy = l.holder;
        l.log.push([now(), "Checked in by tag " + l.asset + " · from " + l.holder]);
        s.lookup = "";
        s.notice =
          l.asset + " is back on the shelf (bin " + getAsset(l.asset).bin + "). Slip L-" + l.num + " closed.";
        break;
      }
      case "undo":
        if (!s.undo) return;
        s.loans = s.undo.loans;
        s.notes = s.undo.notes;
        s.notice = "Undid " + s.undo.label + ".";
        s.undo = null;
        break;
    }
    commit();
  });
  root.addEventListener("change", (e) => {
    if (e.target.matches("[data-filter]")) {
      s.filter = e.target.value;
      commit();
    }
  });
  root.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const form = new FormData(f);
    if (f.matches("[data-note]")) {
      const text = String(form.get("note")).trim();
      if (!text) return;
      s.notes.push({ phase: s.phase, text });
      commit("Handover note saved.");
      return;
    }
    if (f.matches("[data-lookup]")) {
      s.lookup = String(form.get("tag") || "").trim().toUpperCase();
      commit();
      q("[data-lookup] input").focus();
      return;
    }
    if (f.matches("[data-return]")) {
      const reqId = f.dataset.req;
      const r = getReq(reqId);
      const open = s.loans.filter((l) => l.req === reqId && !l.back);
      const by = String(form.get("by"));
      const fail = (msg) => {
        f.querySelector("[data-formerror]").textContent = msg;
      };
      if (!r || !open.length || !people.includes(by)) return;
      const plan = [];
      for (const l of open) {
        const st = form.get("st-" + l.num);
        const holder = String(form.get("holder-" + l.num) || "");
        const due = String(form.get("due-" + l.num) || "");
        if (!st)
          return fail(
            "Mark " + unitName(l.asset) + " as back at the desk or still out.",
          );
        if (st === "out" && (!people.includes(holder) || !returnTimes.includes(due)))
          return fail(
            "Say who has " + unitName(l.asset) + " now and when it is expected back.",
          );
        plan.push({ l, st, holder, due });
      }
      s.undo = snapshot("return for " + r.id);
      const backNames = [];
      const outNotes = [];
      for (const { l, st, holder, due } of plan) {
        if (st === "back") {
          l.back = true;
          l.returnedBy = by;
          l.log.push([now(), "Returned by " + by]);
          backNames.push(getAsset(l.asset).type);
        } else {
          l.log.push([
            now(),
            "Still out · " + by + " says " + holder + " has it, back " + due,
          ]);
          l.holder = holder;
          l.due = due;
          outNotes.push(l);
        }
      }
      for (const l of outNotes)
        s.notes.push({
          phase: s.phase,
          slip: l.num,
          text:
            unitName(l.asset) +
            " (" +
            r.id +
            ", " +
            r.club +
            ") is still out with " +
            l.holder +
            ", expected " +
            l.due +
            ". " +
            (backNames.length
              ? "Back from this kit: " + backNames.join(", ") + "."
              : "Nothing else came back.") +
            " Check the tag before closing L-" +
            l.num +
            ".",
        });
      s.returning = "";
      commit(
        "Return saved for " +
          r.id +
          ": " +
          backNames.length +
          " back" +
          (outNotes.length
            ? ", " +
              outNotes.length +
              " still out with " +
              outNotes.map((l) => l.holder).join(", ") +
              ". Handover note added to the desk book."
            : "."),
      );
      return;
    }
    if (!f.matches("[data-issue]")) return;
    const [req, asset, who, due] = ["req", "asset", "who", "due"].map((k) =>
      form.get(k),
    );
    const unit = getAsset(asset),
      r = getReq(req);
    if (!r || !unit || unit.repair || out(asset) || !people.includes(who))
      return;
    if (!r.items.includes(unit.type)) {
      q("[data-status]").textContent =
        "This equipment type is outside the approved request. Choose an approved unit.";
      return;
    }
    if (
      s.loans.some(
        (l) => l.req === req && !l.back && getAsset(l.asset).type === unit.type,
      )
    ) {
      q("[data-status]").textContent =
        "The approved quantity of this equipment type is already on loan.";
      return;
    }
    const num = Math.max(...s.loans.map((l) => l.num)) + 1;
    s.loans.push({
      num,
      req,
      asset,
      who,
      holder: who,
      due,
      back: false,
      log: [[now(), "Issued to " + who + " · due " + due]],
    });
    s.editing = false;
    s.undo = null;
    commit("Issued " + asset + " to " + who + " on slip L-" + num + ".");
  });
  function restore(d) {
    if (
      !d ||
      d.version !== 2 ||
      !Object.hasOwn(screens, d.tab) ||
      !shifts[d.phase] ||
      (d.selected && !getReq(d.selected)) ||
      (d.returning && !getReq(d.returning)) ||
      typeof d.lookup !== "string" ||
      !Array.isArray(d.notes) ||
      !d.notes.every(
        (n) => n && shifts[n.phase] && typeof n.text === "string",
      ) ||
      !Array.isArray(d.loans) ||
      !d.loans.length ||
      !d.loans.every(
        (l) =>
          l &&
          getReq(l.req) &&
          getAsset(l.asset) &&
          Number.isInteger(l.num) &&
          typeof l.holder === "string" &&
          Array.isArray(l.log),
      )
    )
      return;
    s = {
      ...original(),
      ...d,
      loans: d.loans.map((l) => ({ ...l, log: l.log.map((e) => [...e]) })),
      notes: d.notes.map((n) => ({ ...n })),
      undo: null,
    };
    paint();
  }
  paint();
  try {
    restore(JSON.parse(localStorage.getItem(storageKey)));
  } catch {
    // Keep the fresh shift when storage is unavailable or the saved data is invalid.
  }
})();
