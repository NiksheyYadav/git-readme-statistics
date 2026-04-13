# Vercel Deployment Checklist

## Pre-Deployment Verification ✅

### Code Quality
- [x] Linting passes: `npm run lint`
- [x] Tests pass: `npm test`
- [x] All new features tested (SEO audit, landing page)
- [x] No console errors or warnings
- [x] TypeScript types valid (if applicable)

### Configuration Files
- [x] `vercel.json` - Serverless functions configured
  - Memory: 128MB (sufficient for API calls)
  - Max duration: 10 seconds (ideal for card generation)
  - Root rewrite configured: `/` → `/api/page`
- [x] `.vercelignore` - Unnecessary files excluded
- [x] `.env.example` - Environment variables documented
- [x] `express.js` - Entry point properly configured
- [x] `package.json` - Type: "module" (ES modules)

### Environment Variables
**Required on Vercel:**
- `PAT_1` - GitHub Personal Access Token (rate limit: 5000 requests/hour)
- `PAT_2` (optional) - Second token for higher rate limits
- `WAKATIME_USER_ID` (optional) - For WakaTime card
- `WAKATIME_API_KEY` (optional) - For WakaTime card

**Auto-provided by Vercel:**
- `NODE_ENV` - Automatically set to "production"
- `PORT` - Automatically set by Vercel (default 3000)

### Dependencies
- [x] All dependencies in `package.json` with pinned versions
- [x] No missing peer dependencies
- [x] ES modules compatible (type: "module")
- [x] Express.js configured for serverless

### API Endpoints Status
- [x] `GET /` - Landing page with SEO audit form
- [x] `POST /api/seo-audit` - SEO audit backend
- [x] `GET /api` - GitHub stats card
- [x] `GET /api/pin` - Pinned repositories card
- [x] `GET /api/top-langs` - Languages card
- [x] `GET /api/wakatime` - WakaTime card
- [x] `GET /api/gist` - Gist card

## Deployment Steps

### 1. Connect Repository to Vercel
```bash
# Option A: Via CLI
npm i -g vercel
vercel link

# Option B: Via Dashboard
# 1. Go to https://vercel.com/new
# 2. Import GitHub repository
# 3. Select NiksheyYadav/git-readme-statistics
```

### 2. Configure Environment Variables on Vercel
In Vercel Dashboard → Settings → Environment Variables:
1. Add `PAT_1` with GitHub Personal Access Token
2. Add `PAT_2` (optional) with second token
3. Add `WAKATIME_USER_ID` (optional)
4. Add `WAKATIME_API_KEY` (optional)

**Token Scopes Required:**
- `public_repo` - Read public repository data
- `user` - Read user profile info

### 3. Deploy
```bash
# Automatic on git push to main
git push origin main

# Or manual deployment
vercel deploy --prod
```

### 4. Verify Deployment
After deployment completes:
1. Visit `https://<project>.vercel.app/` - Should show landing page
2. Test SEO audit: `https://<project>.vercel.app/?url=github.com`
3. Test card endpoints:
   - `https://<project>.vercel.app/api?username=github`
   - `https://<project>.vercel.app/api/pin?username=github&repo=copilot-workspace`
4. Monitor Vercel Logs for errors

## Performance Optimization

### Current Settings
- **Memory**: 128MB ✅ (Sufficient for typical operations)
- **Max Duration**: 10 seconds ✅ (Fast API responses)
- **Root Rewrite**: `/` → `/api/page` ✅ (Landing page served correctly)

### Rate Limiting
- GitHub API: 60 requests/hour (unauthenticated) → 5000/hour per token
- SEO Audit: 5 requests/minute per IP (configurable)

### Caching Strategy
- Landing page: Static, cached by Vercel CDN
- Card images: Cached via `Cache-Control` headers
- SEO audit results: Fresh on each request (non-cacheable for accuracy)

## Monitoring & Logs

### View Live Logs
```bash
vercel logs --prod
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | GitHub token not set or expired. Regenerate in Settings → Developer Settings |
| 429 Rate Limit | Add second token with `PAT_2` for higher limits |
| Timeout (>10s) | API call taking too long. Check GitHub status or optimize code |
| 500 Server Error | Check logs with `vercel logs --prod` |
| Landing page not loading | Verify rewrite rule in `vercel.json` |

## Rollback Plan
If deployment fails:
```bash
# Rollback to previous version
vercel rollback
```

Or revert commit and push again:
```bash
git revert <commit-hash>
git push origin main
```

## Post-Deployment

### Update Documentation
- [ ] Update README with production URL
- [ ] Test all endpoints in production
- [ ] Document any breaking changes

### Monitor Metrics
- [ ] Monitor function duration
- [ ] Check error rate
- [ ] Track API rate limits
- [ ] Review SEO audit usage

### Security Checklist
- [x] GitHub tokens stored in environment variables (not in code)
- [x] `.env` file in `.gitignore`
- [x] No sensitive data in logs
- [x] HTTPS enforced by Vercel
- [x] CORS headers properly configured

## Additional Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Node.js + Express on Vercel](https://vercel.com/docs/concepts/runtimes/node-js)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
