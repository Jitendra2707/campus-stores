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

## My Work

### What the product does well

When I issued Kabir’s kit for the Film Society, I tried adding an item that wasn't part of the approved request, but the app didn't allow it. It also stopped me from issuing a second projector and didn't show the projector that was already in the workshop for repair. This makes it much easier to avoid issuing the wrong items.

Another thing I liked was that every item had its own slip. This was useful when Kabir returned only part of the kit. I could close the projector and speaker slips while keeping the adapter slip open.

I would definitely keep these features.

### What I would change

The main problem came up during the return process.

Kabir returned the projector and speaker but told me that Leela had the adapter and would return it the next morning at 9 am. However, there was no option in the app to record this information against the adapter slip.

The slip still showed "Kabir Sen, due Fri 8 pm". The only way to record that Leela had the adapter was to write it in the Desk book, which is in a separate tab and isn't connected to the loan slip.

This became more confusing during the morning shift. I could see an overdue slip under Kabir's name, but Leela was the one returning the item. The register only showed `L-404 · AD-12`, without clearly displaying the item details.

There were also two identical adapters in the same bin (AD-12 and AD-15), and Tara's microphone slip was still open. I had to check the Desk book and Inventory separately just to make sure I was closing the correct slip. This made it quite easy to make a mistake.

Another issue was that clicking "Record return" immediately closed the slip without asking for confirmation or providing an undo option.

### My proposed changes

I decided to improve the Loan register by focusing on making partial returns easier to manage and reducing the chances of closing the wrong slip.

#### 1. Return the entire kit together

Instead of handling each slip separately, staff can now open one return screen for the whole request.

For every item, they can select either "Back at the desk" or "Still out". If an item is still out, they must enter who currently has it and when it is expected back.

For example, the adapter slip would show:

> "With Leela Das, back by Sat 9 am."

The same information would automatically be added to the Desk book and linked to the relevant slip. This removes the need to write the same information twice.

#### 2. Check returns using the item's tag

When someone returns an item, staff can simply enter the tag printed on it.

For example, if I enter AD-12, the app will show the correct loan slip so I can check and confirm the return.

If I accidentally enter AD-15, the app will tell me that AD-15 isn't currently on loan. It will also show that AD-12 is the adapter that is actually out and is currently with Leela.

This makes it easier to identify the correct item without checking Inventory separately.

#### 3. Make loan slips easier to understand

Each slip should clearly display the item name, model, bin location, current holder and return status.

This way, staff don't have to guess what an item tag represents or search through different sections of the app.

#### 4. Add an undo option

I would also add an undo option for the most recent return. This would help staff correct mistakes if they accidentally confirm the wrong item.

### How the improved process would work

- **Friday, 3:45 pm:** I issue the projector, speaker and adapter to Kabir, just as I did before.
- **Friday, 7:30 pm:** Kabir returns the projector and speaker. I open the Film Society's return screen and mark both items as "Back at the desk". For the adapter, I select "Still out", enter Leela's name and set the expected return time as Saturday at 9 am. The adapter slip updates automatically, and the handover information is also added to the Desk book.
- **Saturday, 9 am:** Leela comes to return the adapter. I enter its tag, AD-12, and the app immediately shows the correct loan slip. I check the details and confirm the return.

That's it. I don't need to open the Desk book or search through Inventory to find the correct slip.

### What I haven't changed

I haven't changed the existing issuing process. Staff still need to create separate slips for each item.

Another issue is that the app doesn't verify whether Kabir is authorised to collect items on behalf of Isha. That permission is currently recorded only in a Desk book message.

These are also worth improving, but I decided to focus on one specific problem first: making partial returns and shift handovers safer and easier.

### How I would measure whether it works

I would test this at an actual counter, especially during the morning shift after a partial return.

I would observe whether staff can identify and close the correct slip without first checking the Desk book or Inventory.

To understand whether the change has actually helped, I would compare two things before and after the update:

- How many times staff accidentally close the wrong slip.
- How often staff need to switch between the Loan register, Desk book and Inventory to complete a return.

If both numbers decrease, it would be a good indication that the new process is making returns simpler and reducing mistakes.

### Run it

Open `index.html`, or `python3 -m http.server 8000 --bind 127.0.0.1`. Saved state from the original version is ignored (storage key `v2`). Use **Restart sample shift** to start over.
