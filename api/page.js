// @ts-check

/**
 * Simple root page handler for the project homepage.
 *
 * @returns {import("express").Response} HTML response with API usage info.
 */
export default (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GitHub Readme Stats</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 2rem; line-height: 1.5; }
      h1 { margin-bottom: 0.5rem; }
      ul { padding-left: 1.25rem; }
      code { background: #f4f4f4; padding: 0.1rem 0.3rem; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>GitHub Readme Stats API</h1>
    <p>Use these endpoints to generate cards:</p>
    <ul>
      <li><code>/api?username=YOUR_GITHUB_USERNAME</code></li>
      <li><code>/api/pin?username=YOUR_GITHUB_USERNAME&repo=REPO_NAME</code></li>
      <li><code>/api/top-langs?username=YOUR_GITHUB_USERNAME</code></li>
      <li><code>/api/wakatime?username=YOUR_WAKATIME_USERNAME</code></li>
      <li><code>/api/gist?id=GIST_ID</code></li>
    </ul>
  </body>
</html>`);
};
