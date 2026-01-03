# 🎯 DSA Visual Practice Platform
live at : https://shubhk007.github.io/DsaVisualizer/
<div align="center">

**Interactive Data Structures & Algorithms Learning Platform**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](DEPLOYMENT.md)

</div>

---

## ✨ Features

### 🎨 Interactive Visualization
- Real-time SVG-based animations
- Smooth transitions for all operations
- Color-coded nodes and edges
- Responsive layout

### 📚 Comprehensive DSA Support
- **Linear**: Array, Linked Lists (Singly, Doubly, Circular)
- **LIFO/FIFO**: Stack, Queue
- **Hash-based**: HashMap with collision handling
- **Trees**: Binary Search Tree
- **Graphs**: Adjacency list representation

### 💻 Powerful Code Editor
- Monaco Editor integration (VS Code's editor)
- Syntax highlighting
- Auto-completion
- Starter templates for each DSA

### 🔒 Safe Execution Environment
- Sandboxed code execution
- Timeout protection (5s max)
- No DOM/Network access
- Detailed error messages

### 🌓 Modern UX
- Dark/Light mode with system detection
- Persistent theme preference
- Responsive design
- Comprehensive help system

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Visit `http://localhost:5173` to see the app running!

## 📖 How to Use

1. **Select Data Structure**: Choose from the dropdown in the navigation bar
2. **Write Code**: Use the Monaco editor with provided templates
3. **Run Operations**: Click "Run Code" to execute
4. **Watch Magic**: See real-time visualization updates
5. **Learn**: Check console output for operation results

### Example Code

```javascript
// Array Operations
insert(10);
insert(20);
insert(30);
insertAt(1, 15);
search(20);
traverse();
```

## 🎓 Educational Use Cases

- **Interview Preparation**: Practice common DSA problems
- **CS Students**: Visualize complex data structures
- **Teaching**: Demonstrate DSA concepts interactively
- **Self-Learning**: Understand behavior through visualization

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Monaco Editor | Code Editor |
| SVG | Visualization |

## 📦 Project Structure

```
DsaVisualizer/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React contexts (Theme)
│   ├── dsa/           # DSA implementation modules
│   ├── utils/         # Utilities (sandbox, templates)
│   ├── types/         # TypeScript types
│   └── App.tsx        # Main app component
├── public/            # Static assets
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies
```

## 🌐 Deployment

### GitHub Pages (Automated)

```bash
npm run deploy
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions including GitHub Actions setup.

## 🎯 Roadmap

- [ ] Add more data structures (Heap, Trie, AVL Tree)
- [ ] Step-by-step execution
- [ ] Algorithm visualization (sorting, searching)
- [ ] Code sharing via URL
- [ ] Export visualization as image

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shubham**

Built with ❤️ for the coding community

---

<div align="center">

**Made with ❤️ by Shubham**

</div>
