# discord-auto-middleman

A Discord bot that acts as an **automated Litecoin (LTC) middleman / escrow service**. Two users open a private trade thread, the sender deposits LTC into a generated escrow address, and the bot releases the funds to the receiver's LTC address once the deal is confirmed — 24/7, no manual middleman required.

## How it works

1. A user clicks **Start Auto Middleman** on the MM panel → the bot opens a **private thread**
2. The trade owner invites the counterparty; both users **select sender/receiver roles** and confirm
3. Currency is chosen (EUR/USD), the deal amount is entered and double-confirmed
4. The bot generates a **one-time LTC escrow address** (via Tatum) and posts a payment invoice (with copy/QR buttons)
5. Deposits are detected by polling **BlockCypher**; the bot waits for ≥1 confirmation
6. Once payment is confirmed, the buyer can **Release** (receiver provides their LTC address, funds are sent via Tatum) or **Cancel** (refund flow)
7. Completion auto-logs to Discord webhooks (payment log + HTML transcript) and assigns a "client" role

## Tech stack

- **Node.js** + **discord.js v14** (threads, buttons, modal) — UI is 100% **Components V2**, requires `discord.js ^14.28.0`
- **Tatum API** — LTC address & private-key generation, transfers
- **BlockCypher API** — transaction monitoring & balances
- **CryptoCompare API** — USD/EUR ⇄ LTC rates
- **MongoDB** (mongoose) — panel storage • **trades.json** — per-thread escrow state persistence

## UI (Components V2, no embeds)

Every message the bot posts is a CV2 **container** (`MessageFlags.IsComponentsV2`) — text displays, headings, separators, sections with accessors, media galleries and files instead of an embed + loose `content`. All visual markup flows through a small design system in **`functions/ui.js`**:

```js
// fluent card builder — used by every flow (panels, escrow, invoices, transcripts)
UI.card(UI.COLORS.warn)
    .title('Transaction Detected', E.loader)   // heading inside the container
    .divider()                                 // separator
    .text('> The Payment for this deal has been Detected')
    .field('Txid', `[ ${hash} ](https://…)`)   // "Label: value" text node
    .foot('Waiting for confirmations', { ts }) // footer + <t:…:F> timestamp
    .row(row)                                  // action row rides inside the card
    .msg({ allowPing: true })                  // full payload, flag pre-set
```

- `UI.COLORS` — the container accent palette (brand `0x1ec42c`, success, warn, danger, info)
- `Card.msg()` — always returns a payload with the CV2 flag and **no pings** (`allowedMentions.parse: []`); pass `allowPing: true` at the few spots that explicitly ping (spoiler sandwiches, wallet notices)
- `UI.withButtonState(components, disabled)` — toggles button state on an **existing** CV2 message while preserving its layout (clones CV2 containers or classic rows)

Because CV2 payloads can't carry `content`/`embeds`, converted messages that used to send plain text send a one-node card instead, and legacy content is scrubbed on edits with `{ content: null }`.

## Emojis (zero-config, auto-uploaded)

All emoji markup lives in **`emojis.txt`** — the code never hard-codes emoji. Keys are referenced everywhere as `E.<key>` (via `functions/emojis.js`), e.g. `${E.Money}`, and the file is **hot-reloaded within ~1s of saving** (no restart).

```toml
Money = ./assets/emojis/Money.png          # bundled image  (preferred)
check = https://cdn.discordapp.com/emojis/1494053058668396735.png   # CDN url
elite_LTC = <:elite_LTC:1494053153350357022>                        # direct markup
```

**New server? Do nothing.** At startup the bot uploads every image source in `emojis.txt` **once** to its own *application emoji set* (`functions/emojiSync.js`). Application emojis work in **every guild the bot is in** — no per-server uploads, no "Manage Emojis" permission, no boost-level limits. Uploads are restart-safe: already-uploaded emojis are matched by name and reused, never duplicated.

Run `/emojicheck` to render every key and confirm the set is complete. Log lines to look for at startup: `[emoji-sync] uploaded application emoji "Money" -> id ...`.

## Setup

```bash
npm install
cp config.example.toml config.toml   # then fill in your own secrets
node index.js
```

`config.toml` and `trades.json` are **git-ignored on purpose** — they hold bot tokens, API keys, wallet mnemonic and private keys.

> Pulling the CV2 UI upgrade? Run `npm install` again — it bumps you to **discord.js ^14.28.0** (the first 14.x line with full Components V2 support).

## Slash commands (admin)

| Command | Purpose |
|---|---|
| `/balance` | Show escrow balance for the current thread |
| `/release <addy>` | Admin-force release funds |
| `/manual <addy> <key> <amount>` | Send LTC from a supplied address/key |
| `/key` / `/addy` | Get the thread's LTC key / deposit address |
| `/close` | Force-close the trade thread |
| `/panels` | Rebuild the MM panel + admin control panel |
| `/support` | Contact support |
| `/changelog` | Show changelog |

---

Made with ♥ by Joystoss · maintained by @iamirtasam
