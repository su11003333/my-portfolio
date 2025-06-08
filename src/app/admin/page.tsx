// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useProjects, useExperiences, useContacts } from '../lib/hooks';
import { Plus, Edit, Trash2, Save, X, Eye, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const { user, signOut, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const { 
    projects, 
    loading: projectsLoading, 
    addProject, 
    updateProject, 
    deleteProject 
  } = useProjects();
  
  const { 
    experiences, 
    loading: experiencesLoading, 
    addExperience, 
    updateExperience, 
    deleteExperience 
  } = useExperiences();
  
  const { 
    contacts, 
    loading: contactsLoading, 
    deleteContact, 
    deleteAllContacts 
  } = useContacts();

  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'contacts'>('projects');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  // 表單狀態
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    live_url: '',
    image_url: ''
  });

  const [experienceForm, setExperienceForm] = useState({
    company: '',
    position: '',
    duration: '',
    description: ''
  });

  // 檢查用戶是否已登入
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const resetForms = () => {
    setProjectForm({ title: '', description: '', technologies: '', github_url: '', live_url: '', image_url: '' });
    setExperienceForm({ company: '', position: '', duration: '', description: '' });
    setIsAdding(false);
    setIsEditing(null);
  };

  const handleSignOut = async () => {
    if (confirm('確定要登出嗎？')) {
      await signOut();
      router.push('/login');
    }
  };

  const handleAddProject = async () => {
    if (!projectForm.title || !projectForm.description) {
      alert('請填寫必要欄位：標題和描述');
      return;
    }

    setLoading(true);
    try {
      const newProject = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(t => t)
      };
      const { error } = await addProject(newProject);
      if (error) {
        alert('新增失敗：' + error);
      } else {
        resetForms();
        alert('項目已新增成功！');
      }
    } catch (error) {
      console.error('新增項目時出錯:', error);
      alert('新增失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExperience = async () => {
    if (!experienceForm.company || !experienceForm.position) {
      alert('請填寫必要欄位：公司名稱和職位');
      return;
    }

    setLoading(true);
    try {
      const { error } = await addExperience(experienceForm);
      if (error) {
        alert('新增失敗：' + error);
      } else {
        resetForms();
        alert('經歷已新增成功！');
      }
    } catch (error) {
      console.error('新增經歷時出錯:', error);
      alert('新增失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('確定要刪除這個項目嗎？此操作無法復原。')) {
      setLoading(true);
      try {
        const { error } = await deleteProject(id);
        if (error) {
          alert('刪除失敗：' + error);
        } else {
          alert('項目已刪除！');
        }
      } catch (error) {
        console.error('刪除項目時出錯:', error);
        alert('刪除失敗，請稍後再試');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm('確定要刪除這個經歷嗎？此操作無法復原。')) {
      setLoading(true);
      try {
        const { error } = await deleteExperience(id);
        if (error) {
          alert('刪除失敗：' + error);
        } else {
          alert('經歷已刪除！');
        }
      } catch (error) {
        console.error('刪除經歷時出錯:', error);
        alert('刪除失敗，請稍後再試');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm('確定要刪除這個聯絡記錄嗎？')) {
      setLoading(true);
      try {
        const { error } = await deleteContact(id);
        if (error) {
          alert('刪除失敗：' + error);
        } else {
          alert('聯絡記錄已刪除！');
        }
      } catch (error) {
        console.error('刪除聯絡記錄時出錯:', error);
        alert('刪除失敗，請稍後再試');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateProject = async (id: string) => {
    if (!projectForm.title || !projectForm.description) {
      alert('請填寫必要欄位：標題和描述');
      return;
    }

    setLoading(true);
    try {
      const updatedProject = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(t => t)
      };
      const { error } = await updateProject(id, updatedProject);
      if (error) {
        alert('更新失敗：' + error);
      } else {
        resetForms();
        alert('項目已更新成功！');
      }
    } catch (error) {
      console.error('更新項目時出錯:', error);
      alert('更新失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExperience = async (id: string) => {
    if (!experienceForm.company || !experienceForm.position) {
      alert('請填寫必要欄位：公司名稱和職位');
      return;
    }

    setLoading(true);
    try {
      const { error } = await updateExperience(id, experienceForm);
      if (error) {
        alert('更新失敗：' + error);
      } else {
        resetForms();
        alert('經歷已更新成功！');
      }
    } catch (error) {
      console.error('更新經歷時出錯:', error);
      alert('更新失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item: any, type: 'project' | 'experience') => {
    setIsEditing(item.id);
    if (type === 'project') {
      setProjectForm({
        title: item.title,
        description: item.description,
        technologies: item.technologies.join(', '),
        github_url: item.github_url || '',
        live_url: item.live_url || '',
        image_url: item.image_url || ''
      });
    } else {
      setExperienceForm({
        company: item.company,
        position: item.position,
        duration: item.duration,
        description: item.description
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW') + ' ' + date.toLocaleTimeString('zh-TW');
    } catch (error) {
      return '日期格式錯誤';
    }
  };

  // 如果正在檢查認證狀態，顯示載入畫面
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">載入中...</div>
      </div>
    );
  }

  // 如果未登入，不顯示內容（會被重定向）
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 頂部導航 */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2">管理面板</h1>
            <p className="text-gray-300">管理您的作品集內容</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="text-right">
              <div className="flex items-center gap-2 text-white">
                <User size={20} />
                <span>{user.email}</span>
              </div>
              <div className="text-gray-400 text-sm">管理員</div>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              登出
            </button>
          </motion.div>
        </div>
        
        {/* 選項卡 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 rounded-lg p-1 flex">
            <button
              onClick={() => {setActiveTab('projects'); resetForms();}}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'projects' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              作品管理 ({projects.length})
            </button>
            <button
              onClick={() => {setActiveTab('experiences'); resetForms();}}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'experiences' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              經歷管理 ({experiences.length})
            </button>
            <button
              onClick={() => {setActiveTab('contacts'); resetForms();}}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'contacts' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              聯絡記錄 ({contacts.length})
            </button>
          </div>
        </motion.div>

        {/* 新增按鈕 - 僅在作品和經歷頁面顯示 */}
        {(activeTab === 'projects' || activeTab === 'experiences') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <button
              onClick={() => setIsAdding(true)}
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              <Plus size={20} />
              新增{activeTab === 'projects' ? '作品' : '經歷'}
            </button>
          </motion.div>
        )}

        {loading && (
          <div className="text-center mb-4">
            <div className="text-purple-400">處理中...</div>
          </div>
        )}

        {/* 作品管理 */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* 新增作品表單 */}
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-4">新增作品</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="項目標題 *"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="text"
                    placeholder="技術標籤 (用逗號分隔)"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="url"
                    placeholder="GitHub 連結"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({...projectForm, github_url: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="url"
                    placeholder="線上展示連結"
                    value={projectForm.live_url}
                    onChange={(e) => setProjectForm({...projectForm, live_url: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <input
                  type="url"
                  placeholder="圖片連結"
                  value={projectForm.image_url}
                  onChange={(e) => setProjectForm({...projectForm, image_url: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-4 focus:outline-none focus:border-purple-400"
                />
                <textarea
                  placeholder="項目描述 *"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-4 focus:outline-none focus:border-purple-400"
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleAddProject}
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save size={16} />
                    儲存
                  </button>
                  <button
                    onClick={resetForms}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    取消
                  </button>
                </div>
              </motion.div>
            )}

            {/* 作品列表 */}
            <div className="grid gap-6">
              {projectsLoading && projects.length === 0 ? (
                <div className="text-center text-gray-400 py-8">載入作品中...</div>
              ) : projects.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  還沒有任何作品，點擊上方按鈕新增第一個作品吧！
                </div>
              ) : (
                projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                  >
                    {isEditing === project.id ? (
                      // 編輯模式
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">編輯作品</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="項目標題 *"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                          />
                          <input
                            type="text"
                            placeholder="技術標籤 (用逗號分隔)"
                            value={projectForm.technologies}
                            onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                          />
                          <input
                            type="url"
                            placeholder="GitHub 連結"
                            value={projectForm.github_url}
                            onChange={(e) => setProjectForm({...projectForm, github_url: e.target.value})}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                          />
                          <input
                            type="url"
                            placeholder="線上展示連結"
                            value={projectForm.live_url}
                            onChange={(e) => setProjectForm({...projectForm, live_url: e.target.value})}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                          />
                        </div>
                        <input
                          type="url"
                          placeholder="圖片連結"
                          value={projectForm.image_url}
                          onChange={(e) => setProjectForm({...projectForm, image_url: e.target.value})}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-purple-400"
                        />
                        <textarea
                          placeholder="項目描述 *"
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                          rows={4}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-purple-400"
                        />
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleUpdateProject(project.id)}
                            disabled={loading}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                          >
                            <Save size={16} />
                            更新
                          </button>
                          <button
                            onClick={resetForms}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                          >
                            <X size={16} />
                            取消
                          </button>
                        </div>
                      </div>
                    ) : (
                      // 顯示模式
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                            <p className="text-gray-300 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.technologies.map((tech) => (
                                <span key={tech} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-col gap-1 text-sm text-gray-400">
                              {project.github_url && (
                                <div>
                                  <strong>GitHub:</strong> 
                                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">
                                    {project.github_url}
                                  </a>
                                </div>
                              )}
                              {project.live_url && (
                                <div>
                                  <strong>線上展示:</strong> 
                                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">
                                    {project.live_url}
                                  </a>
                                </div>
                              )}
                              {project.image_url && (
                                <div>
                                  <strong>圖片:</strong> 
                                  <a href={project.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">
                                    查看圖片
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => startEdit(project, 'project')}
                              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                              title="編輯"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              disabled={loading}
                              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                              title="刪除"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* 經歷管理 */}
        {activeTab === 'experiences' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* 新增經歷表單 */}
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-4">新增經歷</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="公司名稱 *"
                    value={experienceForm.company}
                    onChange={(e) => setExperienceForm({...experienceForm, company: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="text"
                    placeholder="職位 *"
                    value={experienceForm.position}
                    onChange={(e) => setExperienceForm({...experienceForm, position: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="任職期間 (例: 2023 - 現在)"
                  value={experienceForm.duration}
                  onChange={(e) => setExperienceForm({...experienceForm, duration: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-4 focus:outline-none focus:border-purple-400"
                />
                <textarea
                  placeholder="工作描述"
                  value={experienceForm.description}
                  onChange={(e) => setExperienceForm({...experienceForm, description: e.target.value})}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 mb-4 focus:outline-none focus:border-purple-400"
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleAddExperience}
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save size={16} />
                    儲存
                  </button>
                  <button
                    onClick={resetForms}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    取消
                  </button>
                </div>
              </motion.div>
            )}

            {/* 經歷列表 */}
            <div className="grid gap-6">
              {experiencesLoading && experiences.length === 0 ? (
                <div className="text-center text-gray-400 py-8">載入經歷中...</div>
              ) : experiences.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  還沒有任何工作經歷，點擊上方按鈕新增第一個經歷吧！
                </div>
              ) : (
                experiences.map((experience) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                  >
                    {isEditing === experience.id ? (
                      // 編輯模式
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">編輯經歷</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            placeholder="公司名稱 *"
                            value={experienceForm.company}
                            onChange={(e) => setExperienceForm({...experienceForm, company: e.target.value})}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                          />
                          <input
                            type="text"
                            placeholder="職位 *"
                            value={experienceForm.position}
                            onChange={(e) => setExperienceForm({...experienceForm, position: e.target.value})}
                            className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="任職期間"
                          value={experienceForm.duration}
                          onChange={(e) => setExperienceForm({...experienceForm, duration: e.target.value})}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-purple-400"
                        />
                        <textarea
                          placeholder="工作描述"
                          value={experienceForm.description}
                          onChange={(e) => setExperienceForm({...experienceForm, description: e.target.value})}
                          rows={4}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-purple-400"
                        />
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleUpdateExperience(experience.id)}
                            disabled={loading}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                          >
                            <Save size={16} />
                            更新
                          </button>
                          <button
                            onClick={resetForms}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                          >
                            <X size={16} />
                            取消
                          </button>
                        </div>
                      </div>
                    ) : (
                      // 顯示模式
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{experience.position}</h3>
                              <p className="text-purple-400">{experience.company}</p>
                            </div>
                            <span className="text-gray-400 text-sm mt-1 md:mt-0">{experience.duration}</span>
                          </div>
                          <p className="text-gray-300">{experience.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => startEdit(experience, 'experience')}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                            title="編輯"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(experience.id)}
                            disabled={loading}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                            title="刪除"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* 聯絡記錄 */}
        {activeTab === 'contacts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <p className="text-gray-300">這裡顯示從網站聯絡表單收到的所有訊息</p>
            </div>

            {/* 聯絡記錄列表 */}
            <div className="grid gap-6">
              {contactsLoading && contacts.length === 0 ? (
                <div className="text-center text-gray-400 py-8">載入聯絡記錄中...</div>
              ) : contacts.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  還沒有收到任何聯絡訊息
                </div>
              ) : (
                contacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{contact.name}</h3>
                            <p className="text-purple-400">{contact.email}</p>
                          </div>
                          <span className="text-gray-400 text-sm mt-1 md:mt-0">
                            {formatDate(contact.created_at || '')}
                          </span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 mb-3">
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">訊息內容：</h4>
                          <p className="text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <a
                            href={`mailto:${contact.email}?subject=回覆您的聯絡訊息&body=您好 ${contact.name}，%0D%0A%0D%0A感謝您的聯絡...`}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
                          >
                            <Eye size={14} />
                            回覆郵件
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          disabled={loading}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                          title="刪除記錄"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* 清除所有聯絡記錄按鈕 */}
            {contacts.length > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={async () => {
                    if (confirm(`確定要刪除所有 ${contacts.length} 筆聯絡記錄嗎？此操作無法復原。`)) {
                      setLoading(true);
                      try {
                        const { error } = await deleteAllContacts();
                        if (error) {
                          alert('清除失敗：' + error);
                        } else {
                          alert('所有聯絡記錄已清除！');
                        }
                      } catch (error) {
                        console.error('清除聯絡記錄時出錯:', error);
                        alert('清除失敗，請稍後再試');
                      } finally {
                        setLoading(false);
                      }
                    }
                  }}
                  disabled={loading}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  清除所有記錄
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* 統計資訊 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">統計資訊</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400">{projects.length}</div>
              <div className="text-gray-300">作品數量</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">{experiences.length}</div>
              <div className="text-gray-300">工作經歷</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">{contacts.length}</div>
              <div className="text-gray-300">聯絡訊息</div>
            </div>
          </div>
        </motion.div>

        {/* 操作指南 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-blue-500/10 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4">💡 使用提示</h3>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>• <strong>作品管理：</strong>新增、編輯或刪除您的項目作品，支援 GitHub 和線上展示連結</p>
            <p>• <strong>經歷管理：</strong>管理您的工作經歷和職業發展歷程</p>
            <p>• <strong>聯絡記錄：</strong>查看從網站聯絡表單收到的訊息，可直接回覆郵件</p>
            <p>• <strong>技術標籤：</strong>使用逗號分隔多個技術標籤，例如：React, Next.js, TypeScript</p>
            <p>• <strong>資料安全：</strong>所有資料都儲存在 Supabase 雲端資料庫中，並具有身份驗證保護</p>
          </div>
        </motion.div>

        {/* 返回首頁按鈕 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <a
            href="/"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all inline-block"
          >
            返回作品集首頁
          </a>
        </motion.div>
      </div>
    </div>
  );
}