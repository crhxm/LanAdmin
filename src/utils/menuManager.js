class MenuManager {
  static storageKey = 'menu_settings'

  static defaultSettings = {
    showTopMenu: true,
    showSideMenu: true,
    menuPosition: 'top' // 'top', 'side', 'both'
  }

  // 获取菜单设置
  static getMenuSettings() {
    try {
      const settings = localStorage.getItem(this.storageKey)
      return settings ? JSON.parse(settings) : this.defaultSettings
    } catch (error) {
      console.error('获取菜单设置失败:', error)
      return this.defaultSettings
    }
  }

  // 保存菜单设置
  static saveMenuSettings(settings) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(settings))
      // 确保触发事件时传递完整的设置对象
      const event = new CustomEvent('menuSettingsChanged', {
        detail: {
          showTopMenu: settings.showTopMenu,
          showSideMenu: settings.showSideMenu,
          menuPosition: settings.menuPosition
        }
      })
      window.dispatchEvent(event)
      console.log('Menu settings saved and broadcasted:', settings)
    } catch (error) {
      console.error('保存菜单设置失败:', error)
    }
  }

  // 更新单个设置项
  static updateSetting(key, value) {
    const settings = this.getMenuSettings()
    settings[key] = value
    this.saveMenuSettings(settings)
  }
}

export default MenuManager 