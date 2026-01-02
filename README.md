# Codemmn

A VS Code extension that auto-generates study notes from your code using Google's Gemini AI. Write code, hit save, get explanations. Simple.

## What it does

- Automatically creates notes when you save your code
- Only processes new lines (incremental, not the whole file)
- Separate notes file for each source file (`index.js` gets `index.notes.md`)
- Asks for API key on first install (no settings hunting)
- Ignores non-code files like `.json`, `.md`, `node_modules`, `.git`
- Understands Hinglish comments
- Matches your comment style (professional or funny)
- Quiet mode - only notifies when creating a new notes file

## Setup

1. Install the extension
2. On first launch, it asks for your Gemini API key (get one free from [Google AI Studio](https://aistudio.google.com/app/apikey))
3. Start coding and save files

That's it.

## How it works

```
Write code → Save file → AI generates notes → Check .codemmn/filename.notes.md
```

## File structure

```
your-project/
  ├── index.js
  ├── utils.js
  └── .codemmn/
      ├── index.notes.md    ← notes for index.js
      └── utils.notes.md    ← notes for utils.js
```

## Example

Your code:
```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done!"), 1000);
});
```

Generated notes:
```markdown
### Creating a Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done!"), 1000);
});
```

**Explanation:**
* **Concept:** Creates a Promise that resolves after 1 second
* **How it's working?**
  - `new Promise()` creates a promise object
  - `setTimeout` delays execution by 1000ms
  - `resolve("Done!")` fulfills the promise
* **Key Syntax:** Promise, async, setTimeout, resolve
```

## Requirements

- VS Code 1.107.0+
- Gemini API key
- Internet connection

## Configuration

`codemmn.geminiApiKey` - Your Gemini API key

## Tips

- Write comments for better explanations
- Hinglish works fine
- Notes accumulate with each save
- Each file gets its own notes file in `.codemmn/`

## Known Issues

- Only works on file save
- Notes file grows over time
- Large code blocks take a few seconds


---

Built with Gemini AI for students and learners.

---

**Enjoy!**
