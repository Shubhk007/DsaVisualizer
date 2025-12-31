# 🚀 Quick Start Guide

Welcome to the DSA Visual Practice Platform! This guide will get you up and running in minutes.

## Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

⏱️ This takes about 1-2 minutes.

## Step 2: Start Development Server

```bash
npm run dev
```

You should see:

```
  VITE v5.3.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

## Step 3: Open in Browser

Visit: **http://localhost:5173/**

You should see the DSA Visual Practice Platform!

## 🎮 Try It Out

### Test Array Operations

1. **Select "Array"** from the dropdown (should be default)
2. Click **"Run Code"** button
3. Watch the visualization appear on the left!
4. See console output on the bottom right

### Try Different Data Structures

**Stack:**
1. Select "Stack" from dropdown
2. Code will auto-update to stack template
3. Run code to see LIFO visualization

**Binary Search Tree:**
1. Select "Binary Search Tree"
2. Run code to see tree visualization
3. Try different insert orders!

**Graph:**
1. Select "Graph"
2. Run code to see connected vertices
3. Observe the circular layout

### Test Dark Mode

Click the moon/sun icon in the top right to toggle dark mode!

### Check Help Documentation

Click the **"?"** button to see comprehensive help.

## 🎯 Quick Feature Test

Run this checklist to verify everything works:

- [ ] Array visualization displays
- [ ] Code editor syntax highlighting works
- [ ] Run button executes code
- [ ] Console output shows results
- [ ] Dark mode toggles correctly
- [ ] Help modal opens and closes (ESC key)
- [ ] Reset button clears visualization
- [ ] All DSA types are selectable
- [ ] Theme persists on page reload

## 🏗️ Build for Production

Test the production build:

```bash
# Build
npm run build

# Preview
npm run preview
```

Visit http://localhost:4173/ to see the production version.

## 📤 Deploy to GitHub Pages

### Quick Deploy

```bash
npm run deploy
```

### First-Time GitHub Setup

1. Create a GitHub repository
2. Update `vite.config.ts`:
   ```typescript
   base: '/YourRepoName/',  // Match your GitHub repo name
   ```
3. Initialize and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/YourRepoName.git
   git push -u origin main
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
5. Enable GitHub Pages:
   - Go to repo Settings → Pages
   - Source: `gh-pages` branch
   - Save

Your site will be live at: `https://yourusername.github.io/YourRepoName/`

## 🧪 Testing Each DSA

### Array
```javascript
insert(10);
insert(20);
insertAt(1, 15);
traverse();
```
**Expected:** 3 boxes showing [10, 15, 20]

### Linked List
```javascript
insert(5);
insert(10);
insert(15);
traverse();
```
**Expected:** 3 connected nodes with arrows

### Stack
```javascript
push(1);
push(2);
push(3);
traverse();
```
**Expected:** Vertical stack, 3 on top

### Queue
```javascript
enqueue(1);
enqueue(2);
enqueue(3);
traverse();
```
**Expected:** Horizontal queue, 1 at front

### HashMap
```javascript
put('a', 1);
put('b', 2);
traverse();
```
**Expected:** Multiple boxes with key:value pairs

### BST
```javascript
insert(50);
insert(30);
insert(70);
insert(20);
insert(40);
inorder();
```
**Expected:** Tree structure, root at top

### Graph
```javascript
addVertex('A');
addVertex('B');
addVertex('C');
addEdge('A', 'B');
addEdge('B', 'C');
traverse();
```
**Expected:** Circular vertex layout with connecting lines

## 🐛 Common Issues & Solutions

### Monaco Editor Not Loading

**Problem:** Code editor shows blank/loading
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Visualization Not Updating

**Problem:** Code runs but visualization doesn't change
**Solution:**
1. Check browser console for errors
2. Click "Reset" button
3. Refresh the page

### Dark Mode Not Saving

**Problem:** Theme resets on page reload
**Solution:**
- Check browser localStorage is enabled
- Try in incognito mode to rule out extensions

### GitHub Pages Shows 404

**Problem:** Site shows "404 Page Not Found"
**Solution:**
1. Verify `base` in `vite.config.ts` matches repo name exactly
2. Check GitHub Pages settings (Settings → Pages)
3. Wait 2-3 minutes after deployment
4. Clear browser cache

### Build Fails

**Problem:** `npm run build` shows errors
**Solution:**
```bash
# Type check
npx tsc --noEmit

# If type errors, check the files mentioned
# Common: missing imports, wrong types
```

## 💡 Pro Tips

1. **Use Ctrl+Space** in Monaco Editor for auto-complete
2. **Press ESC** to close modals quickly
3. **Try edge cases**: empty structures, single element, max capacity
4. **Check console** for operation feedback
5. **Reset frequently** when testing different scenarios

## 📚 Next Steps

- ✅ Read [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment options
- ✅ Check [README.md](README.md) for feature documentation
- ✅ Explore [GETTING_STARTED.md](GETTING_STARTED.md) for customization
- ✅ Review source code to understand implementation

## 🎓 Learning Path

**Beginners:**
1. Start with Array
2. Move to Stack/Queue (simpler operations)
3. Try Linked Lists (understand pointers)
4. Explore HashMap (key-value concept)

**Intermediate:**
1. Binary Search Tree (tree structure)
2. Graph (complex relationships)
3. Try custom operations
4. Modify code templates

**Advanced:**
1. Add new data structures
2. Implement algorithms (sorting, searching)
3. Add step-by-step execution
4. Contribute to the project!

## 🆘 Need Help?

- **Check Help Button** (? icon) in the app
- **Browser Console** (F12) for error details
- **GitHub Issues** for bugs and questions
- **Read Documentation** in the repo

---

## ✅ Verification Checklist

Before deploying, ensure:

- [ ] All dependencies installed (`npm install`)
- [ ] Dev server runs (`npm run dev`)
- [ ] All DSA types work
- [ ] Visualization renders correctly
- [ ] Dark mode works
- [ ] Production build succeeds (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] Base path is correct in `vite.config.ts`

If all checked, you're ready to deploy! 🚀

```bash
npm run deploy
```

---

**Congratulations! You're all set up! 🎉**

Start exploring data structures visually and happy learning!

Built with ❤️ by Shubham
