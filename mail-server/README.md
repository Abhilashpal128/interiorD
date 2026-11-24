# S&D Build Solutions mail API

Standalone Node.js + Nodemailer backend for the existing website. `POST /api/leads` emails enquiries to **sndbuildsolution@gmail.com**. No database is required. The existing contact form, enquiry modal and calculator all use this endpoint.

## Quick Vercel deployment

1. Import this repository as a **new Vercel project**. Set **Root Directory** to the folder containing this README: `client/mail-server` if the repository root contains `client/`, or `mail-server` if the repository is already the client folder.
2. Choose **Other** as the framework. Use Node.js **24.x**, the included build command (`npm run check`), and leave the Output Directory override disabled. The files in `api/` become Node.js functions; do not deploy `dist/` or run `npm start` as a build command.
3. Add these environment variables to the **backend project**, then deploy:

   | Variable | Value |
   | --- | --- |
   | `GMAIL_USER` | `sndbuildsolution@gmail.com`, or the Gmail account that owns your app password |
   | `GMAIL_APP_PASSWORD` | Your Google App Password for that account |
   | `CORS_ORIGINS` | Your exact frontend origin, e.g. `https://your-website.com` |

   Multiple origins can be comma separated, e.g. `https://your-website.com,https://www.your-website.com`. Include the origin visitors actually use. No paths or wildcards. A trailing slash is accepted. Put secrets directly in Vercel; never commit them or use `VITE_` for a secret.
4. Open `https://YOUR-BACKEND.vercel.app/api/health`. `emailConfigured: true` means the credential variables are present; it does **not** test Gmail authentication or delivery.
5. In the **frontend hosting project**, set `VITE_API_URL=https://YOUR-BACKEND.vercel.app`, with no `/api` or `/api/leads` suffix. Rebuild/redeploy the frontend because Vite embeds this value during the build.
6. Submit a real enquiry through the website. Confirm the success reference appears and check the recipient's inbox/spam folder. The backend returns success only after Gmail's SMTP server accepts the message; inbox placement is controlled by Gmail.

The production API must be publicly reachable by site visitors. If Vercel Deployment Protection returns a login page for the backend, allow public access to the production API in the project settings. Preview URLs may have different protection settings.

Gmail App Passwords require 2-Step Verification. The password must belong to `GMAIL_USER`; spaces in the copied password are removed automatically. Gmail authenticates the sender, while the visitor's email is set as `Reply-To` when supplied.

References: [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js), [Nodemailer Gmail setup](https://nodemailer.com/guides/using-gmail), [Google App Passwords](https://support.google.com/mail/answer/185833).

## Local development

Use Node.js 24. In this folder:

```powershell
npm install
Copy-Item .env.example .env
# Fill GMAIL_APP_PASSWORD in .env, then:
npm run dev
```

In a second terminal, from the frontend folder:

```powershell
npm run dev
```

Leave the frontend `VITE_API_URL` empty locally. Vite proxies `/api` to port 5000. Run only one backend on that port; the older database-backed `server/` project also uses port 5000.

## Checks

```powershell
npm run check
npm test
```

Tests use mocked delivery and Nodemailer's local message stream; they do not send real email or require credentials.

## API and scope

The endpoint accepts the frontend's existing lead payload, validates fields, and returns:

```json
{ "success": true, "data": { "leadId": "SND-12345678", "duplicate": false } }
```

Errors use `{ "success": false, "error": { "message": "...", "fields": {} } }`, with optional field errors. Invalid data returns 400, unlisted browser origins 403, oversized requests 413, repeated submissions 429, missing credentials 503, and SMTP failures 502.

This service sends one notification to the business inbox. It does not store leads in a database, support the admin dashboard, or send customer acknowledgement emails. The reference is included in the notification so the business can find the enquiry in Gmail.

The honeypot, exact-origin CORS, 16 KB body limit and per-IP limit provide basic protection. CORS is a browser control, not authentication. Rate limiting (five new attempts per 15 minutes) and duplicate suppression are held in bounded memory **per warm function instance**. They reset on cold starts and are not shared between instances. For stronger abuse protection or durable deduplication, add a shared store and/or a CAPTCHA. SMTP timeouts can have uncertain delivery outcomes, so a later retry may duplicate an email.

Common setup issues:

- **403:** Add the frontend's actual origin to `CORS_ORIGINS` and redeploy the backend.
- **503:** Set both Gmail variables in the backend's active deployment environment and redeploy.
- **502:** Check Vercel function logs for the error code. `EAUTH` usually means the Gmail account/app password combination needs correcting; timeouts can indicate SMTP connectivity problems.
- **HTML or a login page instead of JSON:** Check the backend URL and Vercel Deployment Protection.
- **Frontend still uses an old API:** Rebuild/redeploy after changing `VITE_API_URL`.
