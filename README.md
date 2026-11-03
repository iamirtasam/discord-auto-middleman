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

- **Node.js** + **discord.js v14** (threads, buttons, modal)
- **Tatum API** — LTC address & private-key generation, transfers
- **BlockCypher API** — transaction monitoring & balances
- **CryptoCompare API** — USD/EUR ⇄ LTC rates
- **MongoDB** (mongoose) — panel storage • **trades.json** — per-thread escrow state persistence

## Emojis (single-file config)

All emoji markup lives in **`emojis.txt`** — the code never hard-codes emoji. Keys are referenced everywhere as `E.<key>` (via `functions/emojis.js`), e.g. `${E.Money}`, and the file is **hot-reloaded within ~1s of saving** (no restart).

```toml
Money = <:Money:1494053090863612024>
check = <:1390952506346963016:1494053058668396735>   # animated: <a:name:id>
```

**Moving to a new server?** Upload your emojis there → paste each emoji's markup on the right side of its line → save. Keys on the left never change, so zero code edits are needed. Then run `/emojicheck` to confirm every key still renders.

## Setup

```bash
npm install
cp config.example.toml config.toml   # then fill in your own secrets
node index.js
```

`config.toml` and `trades.json` are **git-ignored on purpose** — they hold bot tokens, API keys, wallet mnemonic and private keys.

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
