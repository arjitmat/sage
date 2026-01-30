# Sage AI Documentation

**Purpose:** Comprehensive documentation for context persistence, development tracking, and knowledge transfer.

## 📚 Documentation Structure

This folder contains all documentation for the Sage AI project. Each file serves a specific purpose for different audiences and use cases.

## 🗂️ File Index

### For AI Assistants

1. **`claude.md`** - AI Context & Memory
   - **Purpose:** Primary context file for Claude Code and similar AI assistants
   - **Contains:** Project identity, technical constraints, user preferences, common pitfalls
   - **When to read:** At the start of every new AI session
   - **Update frequency:** After major changes or issues resolved

2. **`resume-context.md`** - Session Handoff
   - **Purpose:** Quick context restoration for new sessions
   - **Contains:** Current state, recent changes, gotchas, debugging steps
   - **When to read:** First thing when starting a new session
   - **Update frequency:** At the end of each session

### For Developers

3. **`development-status.md`** - Current Status
   - **Purpose:** Track what's working, what's broken, what's next
   - **Contains:** Feature status, recent fixes, known issues, technical debt
   - **When to read:** Before starting any work
   - **Update frequency:** After completing features or fixing bugs

4. **`system-index.md`** - Architecture Map
   - **Purpose:** Complete system architecture and file structure
   - **Contains:** Architecture diagrams, directory structure, file explanations, data flows
   - **When to read:** When understanding how things connect
   - **Update frequency:** When architecture changes

### For Non-Technical Users

5. **`navigation-guide.md`** - Codebase Navigation
   - **Purpose:** Help non-technical users find things in the codebase
   - **Contains:** "Where do I find...?" answers, common tasks, simple explanations
   - **When to read:** When you need to change text, styling, or behavior
   - **Update frequency:** When file structure changes

6. **`project-explanation.md`** - Project Overview
   - **Purpose:** High-level explanation of what Sage AI is and how it works
   - **Contains:** Problem/solution, features, architecture decisions, business context
   - **When to read:** For understanding the big picture
   - **Update frequency:** When major features are added

## 🚀 Quick Start Guides

### For AI Assistants Starting a New Session

```
1. Read: resume-context.md (5 min)
2. Read: claude.md (10 min)
3. Check: git log --oneline -5
4. Check: git status
5. Start helping!
```

### For New Developers

```
1. Read: project-explanation.md (15 min)
2. Read: system-index.md (20 min)
3. Read: development-status.md (10 min)
4. Read: navigation-guide.md (10 min)
5. Start coding!
```

### For Non-Technical Users

```
1. Read: project-explanation.md (10 min)
2. Read: navigation-guide.md (15 min)
3. Use the "Where do I find...?" section
4. Make your changes!
```

## 📝 Documentation Maintenance

### When to Update

| File | Update When... |
|------|---------------|
| `claude.md` | Major issues resolved, new constraints discovered |
| `development-status.md` | Features completed, bugs fixed, status changes |
| `system-index.md` | Architecture changes, new files added |
| `navigation-guide.md` | File structure changes, new features |
| `resume-context.md` | End of every session, important discoveries |
| `project-explanation.md` | Major feature additions, business changes |

### How to Update

1. Open the relevant file
2. Find the section that needs updating
3. Make your changes
4. Update the "Last Updated" date
5. Commit with message: `docs: update [filename] - [what changed]`

### Who Updates

- **AI Assistants:** Should update `resume-context.md` at session end
- **Developers:** Should update relevant docs when making changes
- **Project Owner:** Should review and update `project-explanation.md`

## 🎯 Best Practices

### Writing Documentation

- ✅ Be concise but complete
- ✅ Use examples liberally
- ✅ Include code snippets where helpful
- ✅ Use clear headings and structure
- ✅ Think about your audience
- ✅ Keep formatting consistent
- ❌ Don't assume prior knowledge
- ❌ Don't use jargon without explanation
- ❌ Don't let docs get stale

### Using Documentation

- ✅ Read relevant docs before starting work
- ✅ Update docs after making changes
- ✅ Reference specific sections when helping others
- ✅ Trust the docs but verify in code
- ❌ Don't skip reading docs
- ❌ Don't assume docs are outdated
- ❌ Don't work without context

## 🔄 Documentation Workflow

```
1. Need to make changes?
   → Read development-status.md
   → Read system-index.md (if architectural)

2. Making changes?
   → Keep notes of what you're doing
   → Test thoroughly

3. Done with changes?
   → Update development-status.md
   → Update system-index.md (if needed)
   → Update resume-context.md
   → Commit docs with code changes

4. Session ending?
   → Update resume-context.md with handoff notes
   → List any issues or gotchas discovered
   → Note current CACHEBUST value
```

## 📖 Additional Resources

### External Documentation

- **Next.js 15:** https://nextjs.org/docs
- **FastAPI:** https://fastapi.tiangolo.com/
- **Google Gemini:** https://ai.google.dev/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Hugging Face Spaces:** https://huggingface.co/docs/hub/spaces

### Internal Files

- `package.json` - Frontend dependencies and scripts
- `backend/requirements.txt` - Python dependencies
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Styling configuration

## 🆘 Need Help?

### Can't find something?
1. Check `navigation-guide.md`
2. Use file search in your editor
3. Check `system-index.md` for architecture
4. Ask another developer

### Documentation unclear?
1. Read related docs
2. Check code for clarification
3. Update docs with what you learned
4. Ask for clarification

### Found an error?
1. Fix it immediately
2. Update "Last Updated" date
3. Commit the fix
4. Consider if other docs need updates

## 🎓 Learning Path

### Day 1: Understanding the Project
- Read: `project-explanation.md`
- Read: `system-index.md`
- Browse: actual source files

### Day 2: Development Basics
- Read: `development-status.md`
- Read: `navigation-guide.md`
- Make a small change locally

### Day 3: Deployment
- Read: `claude.md` (deployment section)
- Read: `resume-context.md` (deployment process)
- Deploy a change

### Week 2+: Contributing
- Make feature additions
- Fix bugs
- Update documentation
- Help others

## 📊 Documentation Health

**Last Full Review:** 2026-01-30
**Status:** ✅ Up to date
**Coverage:** ✅ Comprehensive

All documentation files are current and comprehensive. The next full review should happen when:
- Major architectural changes occur
- New features are added
- Deployment platform changes
- Team composition changes

## 💡 Documentation Philosophy

**Good documentation should:**
- Be easy to find
- Be easy to read
- Be easy to update
- Save more time than it takes to write
- Prevent mistakes
- Enable autonomy

**Bad documentation:**
- Gets out of sync with code
- Assumes too much knowledge
- Is hard to navigate
- Duplicates information
- Never gets read

**Our goal:** Keep docs lean, relevant, and useful.

---

**Questions?** Check the relevant doc file or ask the project owner.
**Want to contribute?** Start by reading `project-explanation.md` and `system-index.md`.
**New AI session?** Start with `resume-context.md` and `claude.md`.
