
import { Profile } from '@/types/user'

const KEY = 'Profile'

// 提供存储/获取/删除 Profile 的方法
export function setProfile(profile: Profile) {
  localStorage.setItem(KEY, JSON.stringify(profile))
}

// 获取
export function getProfile() {
  return JSON.parse(localStorage.getItem(KEY) || '{}')
}

// 删除
export function removeProfile() {
  localStorage.removeItem(KEY)
}