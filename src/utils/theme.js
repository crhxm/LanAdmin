// 主题管理工具
export const ThemeManager = {
  // 主题模式
  modes: {
    light: {
      id: 'light',
      name: '亮色主题',
      icon: '☀️',
      variables: {
        'font-color-primary': '#2c3e50',
        'font-color-secondary': '#34495e',
        'font-color-regular': '#3a4a5c',
        'font-color-light': '#486181',
        'font-color-lighter': '#5c7999',
        'bg-primary': '#ffffff',
        'bg-light': '#f5f7fa',
        'bg-dark': '#252837',
        'bg-darker': '#1f2129',
        'border-color': '#e4e7ed'
      }
    },
    dark: {
      id: 'dark',
      name: '暗色主题',
      icon: '🌙',
      variables: {
        'font-color-primary': '#e6e6e6',
        'font-color-secondary': '#cccccc',
        'font-color-regular': '#b3b3b3',
        'font-color-light': '#999999',
        'font-color-lighter': '#808080',
        'bg-primary': '#2a2d3e',
        'bg-light': '#2f3349',
        'bg-dark': '#252837',
        'bg-darker': '#1f2129',
        'border-color': '#363b54'
      }
    }
  },

  // 颜色主题
  themes: {
    green: {
      id: 'green',
      name: '翠绿',
      icon: '🌿',
      colors: {
        primary: 'var(--theme-green)',
        'primary-light': 'var(--theme-green-light)',
        'primary-lighter': 'var(--theme-green-lighter)',
        'primary-dark': 'var(--theme-green-dark)'
      }
    },
    blue: {
      id: 'blue',
      name: '深蓝',
      icon: '🌊',
      colors: {
        primary: 'var(--theme-blue)',
        'primary-light': 'var(--theme-blue-light)',
        'primary-lighter': 'var(--theme-blue-lighter)',
        'primary-dark': 'var(--theme-blue-dark)'
      }
    },
    purple: {
      id: 'purple',
      name: '紫罗兰',
      icon: '🌸',
      colors: {
        primary: 'var(--theme-purple)',
        'primary-light': 'var(--theme-purple-light)',
        'primary-lighter': 'var(--theme-purple-lighter)',
        'primary-dark': 'var(--theme-purple-dark)'
      }
    },
    pink: {
      id: 'pink',
      name: '粉红',
      icon: '🌺',
      colors: {
        primary: 'var(--theme-pink)',
        'primary-light': 'var(--theme-pink-light)',
        'primary-lighter': 'var(--theme-pink-lighter)',
        'primary-dark': 'var(--theme-pink-dark)'
      }
    },
    orange: {
      id: 'orange',
      name: '橙黄',
      icon: '🌅',
      colors: {
        primary: 'var(--theme-orange)',
        'primary-light': 'var(--theme-orange-light)',
        'primary-lighter': 'var(--theme-orange-lighter)',
        'primary-dark': 'var(--theme-orange-dark)'
      }
    },
    red: {
      id: 'red',
      name: '热红',
      icon: '🌹',
      colors: {
        primary: 'var(--theme-red)',
        'primary-light': 'var(--theme-red-light)',
        'primary-lighter': 'var(--theme-red-lighter)',
        'primary-dark': 'var(--theme-red-dark)'
      }
    },
    cyan: {
      id: 'cyan',
      name: '青碧',
      icon: '🌊',
      colors: {
        primary: 'var(--theme-cyan)',
        'primary-light': 'var(--theme-cyan-light)',
        'primary-lighter': 'var(--theme-cyan-lighter)',
        'primary-dark': 'var(--theme-cyan-dark)'
      }
    },
    // 修改为淡蓝色主题
    lightBlue: {
      id: 'lightBlue',
      name: '淡蓝',
      icon: '💧',
      colors: {
        primary: '#ADD8E6', // 淡蓝色
        'primary-light': '#B0E0E6', // 浅淡蓝色
        'primary-lighter': '#E0FFFF', // 更浅淡蓝色
        'primary-dark': '#87CEFA' // 深淡蓝色
      }
    }
  },

  getThemeMode() {
    return localStorage.getItem('theme-mode') || 'light'
  },

  getThemeColor() {
    return localStorage.getItem('theme-color') || 'green'
  },

  setThemeMode(mode) {
    const theme = this.modes[mode]
    if (!theme) return

    localStorage.setItem('theme-mode', mode)
    document.documentElement.setAttribute('data-theme', mode)

    // 设置主题模式的 CSS 变量
    const root = document.documentElement
    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  },

  setThemeColor(themeId) {
    const theme = this.themes[themeId]
    if (!theme) return

    localStorage.setItem('theme-color', themeId)
    
    // 设置主题色的 CSS 变量
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  },

  initTheme() {
    // 初始化主题模式
    this.setThemeMode(this.getThemeMode())
    // 初始化主题颜色
    this.setThemeColor(this.getThemeColor())
  }
} 