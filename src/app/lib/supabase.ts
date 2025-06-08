// src/app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 創建 Supabase 客戶端
export const supabase = createClient(supabaseUrl, supabaseKey)

// 類型定義
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

// 類型定義（用於插入操作，不包含自動生成的欄位）
export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type ExperienceInsert = Omit<Experience, 'id' | 'created_at' | 'updated_at'>
export type ContactInsert = Omit<Contact, 'id' | 'created_at'>
export type ProjectUpdate = Partial<ProjectInsert>
export type ExperienceUpdate = Partial<ExperienceInsert>

export default supabase