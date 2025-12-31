# Getting Started with DSA Visual Practice Platform

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (for version control and deployment)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor
- React Router DOM
- gh-pages

### 2. Configure for Your Repository

**Important:** Update the `base` path in `vite.config.ts` to match your GitHub repository name:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/YourRepoName/',  // ← Change this!
})
```

### 3. Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build

Create a production build:

```bash
npm run build
```

This generates optimized files in the `dist/` folder.

### 5. Preview Build

Test the production build locally:

```bash
npm run preview
```

## Deployment Options

### Option A: Automated Deployment with gh-pages

**Quick and Easy!**

```bash
npm run deploy
```

This command:
1. Builds the project
2. Pushes the `dist` folder to the `gh-pages` branch
3. Your site will be live at `https://yourusername.github.io/DsaVisualizer/`

**First-time setup:**
1. Ensure you have a GitHub repository
2. Push your code to GitHub
3. Run `npm run deploy`
4. Go to Settings → Pages → Source should be `gh-pages` branch

### Option B: GitHub Actions (Recommended for CI/CD)

**Automatic deployment on every push!**

1. The workflow file is already created at `.github/workflows/deploy.yml`

2. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

3. Push to main branch:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

4. GitHub Actions will automatically build and deploy

5. Your site will be live at the URL shown in Settings → Pages

## Project Structure

```
DsaVisualizer/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── .vscode/
│   ├── extensions.json         # Recommended VS Code extensions
│   └── settings.json           # VS Code settings
├── public/
│   └── favicon.svg             # App icon
├── src/
│   ├── components/
│   │   ├── CodeEditorPanel.tsx   # Monaco editor component
│   │   ├── Footer.tsx            # Footer component
│   │   ├── HelpModal.tsx         # Help documentation modal
│   │   ├── Navigation.tsx        # Top navigation bar
│   │   └── VisualizationPanel.tsx # SVG visualization
│   ├── contexts/
│   │   └── ThemeContext.tsx      # Dark/Light mode context
│   ├── dsa/
│   │   ├── ArrayDS.ts            # Array implementation
│   │   ├── BinarySearchTreeDS.ts # BST implementation
│   │   ├── GraphDS.ts            # Graph implementation
│   │   ├── HashMapDS.ts          # HashMap implementation
│   │   ├── LinkedListDS.ts       # Linked List implementation
│   │   ├── QueueDS.ts            # Queue implementation
│   │   └── StackDS.ts            # Stack implementation
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── utils/
│   │   ├── codeTemplates.ts      # Starter code templates
│   │   └── sandbox.ts            # Code execution sandbox
│   ├── App.tsx                   # Main app component
│   ├── index.css                 # Global styles
│   └── main.tsx                  # App entry point
├── .gitignore
├── DEPLOYMENT.md                 # Detailed deployment guide
├── README.md                     # Project documentation
├── index.html                    # HTML template
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.node.json            # TypeScript config for Vite
└── vite.config.ts                # Vite configuration
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |

## Customization Guide

### 1. Change Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#your-color',
        // ... more shades
      }
    }
  }
}
```

### 2. Add New Data Structure

**Step 1:** Create DSA class in `src/dsa/`

```typescript
export class YourDS {
  // Implement operations
  
  getVisualizationState(): VisualizationState {
    // Return nodes and edges for visualization
  }
}
```

**Step 2:** Add type in `src/types/index.ts`

```typescript
export type DSAType = 
  | 'array' 
  | 'yourds'  // Add here
  | ...
```

**Step 3:** Add template in `src/utils/codeTemplates.ts`

```typescript
export const codeTemplates: Record<DSAType, string> = {
  yourds: `// Your template code`,
  ...
}
```

**Step 4:** Add case in `src/utils/sandbox.ts`

**Step 5:** Update Navigation dropdown

### 3. Modify Visualization

Edit `src/components/VisualizationPanel.tsx`:

- Adjust node sizes, colors, positions
- Change SVG rendering
- Add custom animations

### 4. Customize Editor

Edit `src/components/CodeEditorPanel.tsx`:

- Change Monaco editor theme
- Modify editor options
- Customize console output styling

## Troubleshooting

### Monaco Editor Issues

If Monaco Editor doesn't load:
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Type check
npx tsc --noEmit

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### GitHub Pages 404

1. Check `vite.config.ts` base path matches repo name
2. Verify GitHub Pages settings
3. Wait 2-3 minutes for deployment
4. Clear browser cache

### Dark Mode Not Working

- Check if `localStorage` is enabled in browser
- Verify Tailwind dark mode is set to 'class'
- Check browser console for errors

## Development Tips

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### Best Practices

1. **Use TypeScript**: Type safety prevents runtime errors
2. **Test DSA operations**: Verify edge cases (empty, full, invalid)
3. **Check visualization**: Ensure nodes render correctly
4. **Console errors**: Monitor browser console during development
5. **Build regularly**: Test production builds before deploying

### Performance Optimization

- Keep DSA operations O(1) or O(n) where possible
- Limit visualization nodes (< 50 for performance)
- Use React.memo for expensive components
- Lazy load Monaco Editor if needed

## Support & Community

- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Contributing**: See CONTRIBUTING.md (if you create one)

## Next Steps

1. ✅ Install dependencies
2. ✅ Run development server
3. ✅ Try different data structures
4. ✅ Customize theme
5. ✅ Deploy to GitHub Pages
6. 🎉 Share with others!

---

**Happy Coding! 🚀**

Need help? Check out [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.
