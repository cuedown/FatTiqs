# Dead Projects Cleanup

## Status: May 2026

This document tracks dead/half-built projects in the FatTiqs monorepo.

---

## ❌ programs/airdrop - REMOVED

**Status:** Deleted (incomplete stub, no source code)

**Reason:**
- No `src/` directory existed
- package.json scripts only echoed "Skipping" messages
- Anchor framework not configured
- No Solana program code

**Action:** Removed from `programs/` directory and excluded from `pnpm-workspace.yaml`

---

## ❌ apps/web - NOT YET IMPLEMENTED (Phase 6)

**Status:** Directory doesn't exist

**Notes:**
- ROADMAP.md marks Phase 6 as "CANCELLED"
- No Next.js project scaffolded
- Web dashboard features not available

**Recommendation:**
- If dashboard is still needed: Scaffold Next.js app and restart Phase 6
- If not needed: Update ROADMAP to permanently remove Phase 6

---

## ⚠️ apps/api - PARTIAL

**Status:** Working but incomplete

**Missing:**
- [ ] Rate limiting middleware
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Health check endpoint

**Next PR:** Will add rate limiting + docs

---

## ✅ Completed Projects

| Project | Status | Notes |
|---------|--------|-------|
| apps/bot | ✅ Complete | Discord bot fully functional |
| packages/database | ✅ Complete | Prisma schema working |
| packages/shared | ✅ Complete | Shared utilities |
| packages/solana | ✅ Complete | Solana wrappers with tests |

---

## Next Steps

1. **Immediate:** ✅ Clean up `programs/airdrop` (deleted)
2. **Short-term:** Complete API rate limiting + docs (PR #4)
3. **Medium-term:** Decision on web dashboard (build or archive)
4. **Long-term:** Add comprehensive tests

