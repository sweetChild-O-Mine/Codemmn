# Codemmn

A VS Code extension that auto-generates study notes from your code using Google's Gemini AI. Write code, hit save, get explanations. Simple.

## What it does

- Automatically creates notes when you save your code
- Only processes new lines (incremental, not the whole file)
- Understands Hinglish comments
- Matches your comment style (professional or funny)
- Stores everything in `.codemmn/studyNotes.md`

## Setup

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Open VS Code Settings and search "Codemmn"
3. Paste your API key
4. Start coding and save files

That's it.

## How it works

```
Write code → Save file → AI generates notes → Check .codemmn/studyNotes.md
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
- Check `.codemmn/studyNotes.md` to review

## Known Issues

- Only works on file save
- Notes file grows over time
- Large code blocks take a few seconds


---

Built with Gemini AI for students and learners.

---

**Enjoy!**
