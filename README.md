# Campus Stores

> **Reviewers: my submission starts at [My work](#my-work).** The prototype is in the **Loan register** tab (`app.js`, `styles.css`, plus one undo button in `index.html`).

Campus Stores is a Product Engineer work sample set at a fictional campus media equipment desk. Work through a club’s screening, from equipment pickup to a partial return and the next morning’s handover. Open **Candidate brief** in the app for the assignment.

## Run the app

Open `index.html` in a modern browser. The app includes its scripts, styles, and icons and can run offline.

To serve it over local HTTP, run this from the repository folder and visit `http://localhost:8000`.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Each browser stores its own sample shift locally when browser storage is available. **Restart sample shift** restores the fictional starting records.

## Source

- `index.html` contains the desk layout, candidate brief, and bundled icons.
- `app.js` contains the sample records and interactions.
- `styles.css` defines the desktop and mobile layouts.

Icon license notices are in [third-party/lucide-LICENSE.txt](third-party/lucide-LICENSE.txt).


## Submit your work

1. [Fork Campus Stores](https://github.com/virinchi-healthcare/campus-stores/fork) into your GitHub account. Complete the candidate brief and push your changes to your public fork. In your README, point reviewers to your work and explain the decision you made.
2. In your fork, open **Commits**, select the final commit you want reviewed, and copy the page URL. It should look like `https://github.com/YOUR-USERNAME/campus-stores/commit/COMMIT-SHA`.
3. [Submit your work through the Google Form](https://docs.google.com/forms/d/e/1FAIpQLScvzoh1R4WS-SkiwAVBQbMvniieJYSoOEfLMyVo5CyjOvYUgQ/viewform). Your **roll number**, **email ID**, and **final commit link from your public fork** are required. Enter your roll number and email ID in the form only.

---

## My work

<!-- DRAFT: rewrite this section in your own words, using what you saw on your own shift. -->

### One moment the product handles well: the issue slip refuses the wrong kit

At 3:45 pm, while issuing Kabir's kit for RQ-214, I tried to issue something the request didn't approve and then a second unit of a type already out. Both were refused. The projector in the workshop (PR-06) never appears as an option. Because there is **one slip per physical unit**, the partial return later on has a natural shape: the projector and speaker slips can close while the adapter slip stays open.

**Keep:** request-bound issuing, one slip per unit, units in repair hidden.

### One moment I would change: the adapter that didn't come back

At 7:30 pm Kabir returned two of three items and said Leela had the adapter until 9 am. In the original app I could only:

- click **Record return** on each slip (one click, no confirmation, no undo, no record of who brought it back), and
- leave the adapter slip saying *Kabir Sen · Due Fri 8 pm*, writing "Leela has it, back 9 am" as free text in the Desk book, on a different tab and not linked to the slip.

At 9 am the morning shift sees an **overdue slip in Kabir's name** while **Leela** stands at the counter holding *an* adapter. Register rows show only `L-404 · AD-12`, not what the item is. There are two identical adapters in bin C4 (AD-12, AD-15), and Tara's microphone slip is open too. Closing the right slip depends on someone reading yesterday's note and cross-checking Inventory by hand.

### The change (prototype)

1. **Take return per kit.** The register groups slips by request. **Take return** opens one form that makes you mark *every* unit as **Back at the desk** or **Still out**. For anything still out you must say **who has it now** and **when it's expected back**. The slip is updated (holder → Leela, due → Sat 9 am), and a handover note **linked to the slip** is written to the Desk book automatically.
2. **Check in from the item in hand.** At the top of the register: type or scan the asset tag. A tag on loan shows its slip, holder, expected time and history, with a **Confirm AD-12 is back** button. A tag that isn't on loan (e.g. AD-15) gets a warning that names the adapter that *is* still out, so nobody closes the wrong slip.
3. **Every slip shows what it is and what happened to it**: type, model, home bin, current holder, and a short history.
4. **Undo** the last return or check-in from the status bar.

### Same job, using the prototype

| Time | What I do |
| --- | --- |
| Fri 3:45 pm | Issue PR-04, SP-02, AD-12 to Kabir (unchanged). |
| Fri 7:30 pm | Loan register → RQ-214 **Take return**. Brought in by Kabir. Projector: back. Speaker: back. Adapter: still out, with **Leela Das**, expected **Sat 9 am**. Save. The slip now reads "With Leela Das · back by Sat 9 am · issued to Kabir Sen", and the desk book has a linked note. |
| Sat 9:00 am | Read the tag on the adapter Leela hands over and type it in. `AD-12` → slip L-404 → **Confirm AD-12 is back**. If it were `AD-15`, the app says it isn't on loan and that the open adapter slip is AD-12 with Leela. |

### What I kept

Everything from the issue flow, one slip per unit, the Desk book for free-text messages, and the layout.

### Not done (on purpose)

The issue flow still takes three separate slips, and **Collected by** isn't checked against Isha's note authorizing Kabir. Both are real problems, but I kept the change to one moment.

### One observation at a real counter

On the morning after a partial return, watch the first check-in: **does the person at the counter close the right slip without opening the Desk book or Inventory?** Count wrong closures and lookups in other tabs before and after the change.

### Run it

Open `index.html`, or `python3 -m http.server 8000 --bind 127.0.0.1`. Saved state from the original version is ignored (storage key `v2`). Use **Restart sample shift** to start over.
