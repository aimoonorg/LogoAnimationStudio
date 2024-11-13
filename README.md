# LogoAnimationStudio

Create beautiful rotating logos for your website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/logo-animation-studio.svg)](https://badge.fury.io/js/logo-animation-studio)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

Create beautiful animated logos for your website with ease. Logo Animation Studio provides a powerful yet simple interface to design, customize, and export rotating logos with various effects.

## ✨ Features

- 🎨 **Visual Editor**: Intuitive interface for logo customization
- 🔄 **Real-time Preview**: See changes instantly as you edit
- 🎯 **Multiple Animation Options**:
  - Adjustable rotation speed
  - Clockwise/counterclockwise rotation
  - Pause/resume controls
- 🖼️ **Image Filters**:
  - Grayscale
  - Sepia
  - Blur
  - Brightness
  - Contrast
  - Hue rotation
- 📱 **Responsive Design**: Works seamlessly across all devices
- 🎯 **Easy Integration**: Simple API for adding to any website
- 📦 **Zero Dependencies**: Lightweight and performant

## 🚀 Quick Start

### Online Editor

Visit [Logo Animation Studio](https://logo-animation-studio.dev) to start creating your animated logo online.

### React Component

```bash
npm install logo-animation-studio
# or
yarn add logo-animation-studio
```

```jsx
import { RotatingLogo } from 'logo-animation-studio';

function Header() {
  return (
    <div className="flex items-center gap-2">
      <RotatingLogo
        imageUrl="/path/to/logo.png"
        size={32}
        speed={5}
        filter="none"
        direction="clockwise"
        scale={1}
      />
      <h1>Your Website Name</h1>
    </div>
  );
}
```

## 📖 API Reference

### RotatingLogo Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string` | Required | URL of the logo image |
| `size` | `number \| string` | `'2rem'` | Size of the logo container |
| `speed` | `number` | `5` | Rotation speed (1-10) |
| `filter` | `ImageFilter` | `'none'` | Applied image filter |
| `direction` | `'clockwise' \| 'counterclockwise'` | `'clockwise'` | Rotation direction |
| `scale` | `number` | `1` | Logo scale factor |
| `isPaused` | `boolean` | `false` | Pause/resume animation |
| `className` | `string` | `''` | Additional CSS classes |

### ImageFilter Types

```typescript
type ImageFilter = 
  | 'none'
  | 'grayscale'
  | 'sepia'
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'hue-rotate';
```

## 🎨 Examples

### Basic Usage

```jsx
<RotatingLogo imageUrl="/logo.png" size="2rem" />
```

### Custom Animation

```jsx
<RotatingLogo
  imageUrl="/logo.png"
  size={64}
  speed={8}
  direction="counterclockwise"
  filter="sepia"
  scale={1.2}
/>
```

### With Pause Control

```jsx
function LogoWithControls() {
  const [isPaused, setIsPaused] = useState(false);
  
  return (
    <div>
      <RotatingLogo
        imageUrl="/logo.png"
        isPaused={isPaused}
      />
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
}
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/your-org/logo-animation-studio.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

- Twitter: [@aimoon_org](https://twitter.com/aimoon_org)
- Email: aimmon.xyz@gmail.com

---

<p align="center">Made with ❤️ by the Logo Animation Studio team</p>
