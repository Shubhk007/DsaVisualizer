# DSA Visual Practice Platform

An interactive, client-side web application for learning and practicing Data Structures & Algorithms with live visualization.

## 🚀 Features

- **Interactive Visualization**: See your data structures come to life with real-time SVG animations
- **Multiple Data Structures**: Array, Linked Lists (Singly, Doubly, Circular), Stack, Queue, HashMap, BST, Graph
- **Live Code Editor**: Monaco Editor with syntax highlighting
- **Sandboxed Execution**: Safe code execution environment with timeout protection
- **Dark/Light Mode**: System-aware theming with manual toggle
- **Beginner Friendly**: Starter templates and comprehensive help documentation
- **GitHub Pages Ready**: Static build, no backend required

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Monaco Editor** - Code editor
- **SVG** - Visualization rendering

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment to GitHub Pages

### Option 1: Using gh-pages package (Automated)

1. Update `vite.config.ts` base path to match your repo name:
```typescript
base: '/your-repo-name/'
```

2. Deploy:
```bash
npm run deploy
```

### Option 2: Manual GitHub Actions

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist
          
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

2. Enable GitHub Pages in your repository settings (Settings → Pages → Source: GitHub Actions)

3. Push to main branch - automatic deployment will trigger

## 📖 Usage

1. **Select a Data Structure** from the dropdown menu
2. **Write Code** using the provided template in the Monaco editor
3. **Run Code** to execute operations
4. **Watch Visualization** update in real-time
5. **Check Console Output** for operation results
6. **Use Reset** to clear and start fresh
7. **Click Help** for detailed documentation

## 📚 Available Operations

### Array
- `insert(value)`, `insertAt(index, value)`
- `delete(value)`, `deleteAt(index)`
- `search(value)`, `update(index, value)`
- `traverse()`, `size()`, `isEmpty()`

### Linked List
- `insert(value)`, `insertAt(index, value)`
- `delete(value)`, `deleteAt(index)`
- `search(value)`, `traverse()`
- `size()`, `isEmpty()`

### Stack
- `push(value)`, `pop()`, `peek()`
- `search(value)`, `traverse()`
- `size()`, `isEmpty()`

### Queue
- `enqueue(value)`, `dequeue()`
- `front()`, `rear()`, `search(value)`
- `traverse()`, `size()`, `isEmpty()`

### HashMap
- `put(key, value)`, `get(key)`
- `delete(key)`, `has(key)`
- `traverse()`, `size()`, `isEmpty()`

### Binary Search Tree
- `insert(value)`, `delete(value)`
- `search(value)`, `find(value)`
- `inorder()`, `preorder()`, `postorder()`
- `traverse()`, `size()`, `isEmpty()`

### Graph
- `addVertex(vertex)`, `addEdge(from, to)`
- `removeVertex(vertex)`, `removeEdge(from, to)`
- `hasVertex(vertex)`, `hasEdge(from, to)`
- `getNeighbors(vertex)`, `traverse()`
- `size()`, `isEmpty()`

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Add New Data Structure

1. Create DSA class in `src/dsa/YourDS.ts`
2. Implement `getVisualizationState()` method
3. Add to `DSAType` in `src/types/index.ts`
4. Add template in `src/utils/codeTemplates.ts`
5. Add case in `src/utils/sandbox.ts`
6. Update Navigation dropdown

## 🔒 Security

- Code runs in sandboxed environment
- No access to `window`, `document`, or network APIs
- 5-second execution timeout for infinite loop protection
- No backend - fully client-side

## 📝 License

MIT License - feel free to use for learning and teaching!

## 💝 Credits

Built with ❤️ by Shubham

---

## 🐛 Troubleshooting

**Monaco Editor not loading?**
- Check network tab for CDN issues
- Clear browser cache

**Visualization not updating?**
- Check console for errors
- Ensure you're calling operations correctly
- Try resetting the state

**Build fails?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (v18+ recommended)

**GitHub Pages shows 404?**
- Verify `base` path in `vite.config.ts`
- Check GitHub Pages settings
- Wait a few minutes for deployment

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

**Happy Learning! 🚀**
