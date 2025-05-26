// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Download, User, Briefcase, Code, MessageCircle } from 'lucide-react';
import { db } from './lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // 載入資料
  useEffect(() => {
    loadProjects();
    loadExperiences();
  }, []);

  const loadProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (error) {
      console.log('載入項目時出錯:', error);
      // 如果 Firebase 連接失敗，使用示例資料
      setProjects([
        {
          id: '1',
          title: '電商網站',
          description: '使用 React 和 Node.js 開發的全棧電商平台',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          githubUrl: 'https://github.com/example/ecommerce',
          liveUrl: 'https://example-ecommerce.com'
        },
        {
          id: '2',
          title: '任務管理應用',
          description: '具有即時協作功能的任務管理工具',
          technologies: ['Next.js', 'Firebase', 'Tailwind CSS'],
          githubUrl: 'https://github.com/example/task-manager'
        }
      ]);
    }
  };

  const loadExperiences = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'experiences'));
      const experiencesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Experience[];
      setExperiences(experiencesData);
    } catch (error) {
      console.log('載入經歷時出錯:', error);
      // 示例資料
      setExperiences([
        {
          id: '1',
          company: '科技公司 A',
          position: '前端工程師',
          duration: '2023 - 現在',
          description: '負責開發和維護公司的主要產品，使用 React 和 TypeScript'
        },
        {
          id: '2',
          company: '新創公司 B',
          position: '全端工程師',
          duration: '2022 - 2023',
          description: '參與產品從零到一的開發過程，涵蓋前後端和資料庫設計'
        }
      ]);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'contacts'), {
        ...contactForm,
        timestamp: new Date()
      });
      alert('訊息已發送成功！');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.log('發送訊息時出錯:', error);
      alert('發送失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 導航欄 */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white"
            >
              我的作品集
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${
                    activeSection === item ? 'text-purple-400' : 'text-white hover:text-purple-300'
                  }`}
                >
                  {item === 'home' ? '首頁' : 
                   item === 'about' ? '關於我' :
                   item === 'experience' ? '經歷' :
                   item === 'projects' ? '作品' : '聯絡'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 主要內容 */}
      <main>
        {/* 首頁區塊 */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                你好，我是
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {' '}開發者
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                熱愛創造數位體驗的全端工程師，專精於現代 Web 技術和使用者體驗設計
              </p>
              <div className="flex justify-center space-x-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  聯絡我
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Download size={20} />
                  下載履歷
                </motion.a>
              </div>
              <div className="flex justify-center space-x-6 mt-8">
                <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:your@email.com" className="text-gray-400 hover:text-white transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 关于我區塊 */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <User className="text-purple-400" />
                關於我
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                我是一位充滿熱情的全端工程師，擁有豐富的 Web 開發經驗。
                我專精於使用現代技術如 React、Next.js、Node.js 等來創建高品質的數位產品。
                我相信好的代碼不僅要功能完善，更要優雅且易於維護。
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: '前端開發', desc: 'React, Next.js, TypeScript, Tailwind CSS', icon: Code },
                { title: '後端開發', desc: 'Node.js, Express, Firebase, MongoDB', icon: Briefcase },
                { title: '其他技能', desc: 'Git, Docker, AWS, UI/UX 設計', icon: User }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                >
                  <skill.icon className="text-purple-400 mb-4" size={32} />
                  <h3 className="text-xl font-semibold text-white mb-2">{skill.title}</h3>
                  <p className="text-gray-300">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 經歷區塊 */}
        <section id="experience" className="py-20 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <Briefcase className="text-purple-400" />
                工作經歷
              </h2>
            </motion.div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                      <p className="text-purple-400">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{exp.duration}</span>
                  </div>
                  <p className="text-gray-300">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 作品區塊 */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <Code className="text-purple-400" />
                我的作品
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all"
                >
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="text-gray-400 hover:text-white transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="text-gray-400 hover:text-white transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 聯絡區塊 */}
        <section id="contact" className="py-20 px-4 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                <MessageCircle className="text-purple-400" />
                聯絡我
              </h2>
              <p className="text-gray-300 text-lg">有任何問題或合作機會嗎？歡迎與我聯繫！</p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleContactSubmit}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white mb-2">姓名</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="您的姓名"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">電子郵件</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="您的電子郵件"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-white mb-2">訊息</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="您想說些什麼..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '發送中...' : '發送訊息'}
              </button>
            </motion.form>
          </div>
        </section>
      </main>

      {/* 頁腳 */}
      <footer className="bg-black/40 text-center py-8">
        <p className="text-gray-400">© 2025 我的作品集. 保留所有權利.</p>
      </footer>
    </div>
  );
}