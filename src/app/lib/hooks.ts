// src/app/lib/hooks.ts
import { useState, useEffect } from 'react';
import { supabase, Project, Experience, Contact, ProjectInsert, ExperienceInsert, ContactInsert, ProjectUpdate, ExperienceUpdate } from './supabase';

// Projects Hooks
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入專案時發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (project: ProjectInsert) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      setProjects(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '新增專案時發生錯誤';
      return { data: null, error: errorMessage };
    }
  };

  const updateProject = async (id: string, updates: ProjectUpdate) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setProjects(prev => prev.map(p => p.id === id ? data : p));
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '更新專案時發生錯誤';
      return { data: null, error: errorMessage };
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProjects(prev => prev.filter(p => p.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '刪除專案時發生錯誤';
      return { error: errorMessage };
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
};

// Experiences Hooks
export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入經歷時發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  const addExperience = async (experience: ExperienceInsert) => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .insert([experience])
        .select()
        .single();

      if (error) throw error;
      setExperiences(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '新增經歷時發生錯誤';
      return { data: null, error: errorMessage };
    }
  };

  const updateExperience = async (id: string, updates: ExperienceUpdate) => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setExperiences(prev => prev.map(e => e.id === id ? data : e));
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '更新經歷時發生錯誤';
      return { data: null, error: errorMessage };
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setExperiences(prev => prev.filter(e => e.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '刪除經歷時發生錯誤';
      return { error: errorMessage };
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return {
    experiences,
    loading,
    error,
    addExperience,
    updateExperience,
    deleteExperience,
    refetch: fetchExperiences,
  };
};

// Contacts Hooks
export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入聯絡記錄時發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: ContactInsert) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([contact])
        .select()
        .single();

      if (error) throw error;
      setContacts(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '發送聯絡訊息時發生錯誤';
      return { data: null, error: errorMessage };
    }
  };

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setContacts(prev => prev.filter(c => c.id !== id));
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '刪除聯絡記錄時發生錯誤';
      return { error: errorMessage };
    }
  };

  const deleteAllContacts = async () => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // 刪除所有記錄

      if (error) throw error;
      setContacts([]);
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '清除所有聯絡記錄時發生錯誤';
      return { error: errorMessage };
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    addContact,
    deleteContact,
    deleteAllContacts,
    refetch: fetchContacts,
  };
};