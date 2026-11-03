# Krishna Prasad Kurmi — Personal Portfolio

A responsive personal portfolio website for Krishna Prasad Kurmi, a Computer Science and Engineering student exploring backend development, C++, Data Structures and Algorithms, and MongoDB-backed project work.

## Built With

- HTML
- CSS
- Vanilla JavaScript

No framework, build step, or backend service is required.

## Website Pages

- `index.html` — Home, profile introduction, selected projects, and social links
- `about.html` — Background, interests, and development approach
- `skills.html` — Programming, web, database, and developer-tool skills
- `projects.html` — Project portfolio, category filters, and accessible project details
- `education.html` — College, degree, academic timeline, and learning milestones
- `contact.html` — Contact details, generated résumé link, and Formspree-powered contact form
- `resume.html` — Portfolio-backed résumé with print and Save as PDF support

Every page uses the shared responsive Bento Grid styling and a consistent navigation bar with regular HTML page links.

## Keeping the Résumé Current

Update the `portfolioData` object near the top of `script.js` to change the profile, contact details, education, or skills. The About, Skills, Education, Contact, and printable résumé sections read those shared values. Update the `projects` collection in the same file to change project details; only projects marked `Live` appear on the résumé.

## Run Locally

1. Open the project folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

The site can also be opened directly in a browser. Pages, styles, scripts, and images use relative paths.

## Cloudflare Workers Deployment

The workflow in `.github/workflows/deploy.yml` deploys the static site to Cloudflare Workers whenever changes are pushed to `main`. It uses `wrangler.jsonc` and `.assetsignore` from the repository root.

Before the first deployment:

1. Commit `wrangler.jsonc` and `.assetsignore` along with the site files.
2. In GitHub **Settings → Secrets and variables → Actions**, add `CLOUDFLARE_API_TOKEN` with permission to deploy Workers and `CLOUDFLARE_ACCOUNT_ID` for the Cloudflare account.
3. Push to `main`, or run **Deploy portfolio** manually from the repository's **Actions** tab.

The configured Worker URL is [krishna-portfolio.krishnaprasadkurmi99.workers.dev](https://krishna-portfolio.krishnaprasadkurmi99.workers.dev).

## Repository

[GitHub repository](https://github.com/krishnaprasadkurmi99-jpg/krishna-portfolio)

## Contact Form

The contact form validates the fields in the browser and submits messages to the configured Formspree endpoint. Formspree must remain active and configured to deliver messages to the intended email address. If a submission fails, visitors can use the optional **Open Email App** action to create a mailto draft in their own email application.
