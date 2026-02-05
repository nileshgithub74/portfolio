'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaProjectDiagram, 
  FaCertificate, 
  FaCog, 
  FaSignOutAlt,
  FaSave,
  FaEdit,
  FaPlus,
  FaTrash,
  FaEye
} from 'react-icons/fa';
import PersonalInfoEditor from './PersonalInfoEditor';
import ProjectsEditor from './ProjectsEditor';
import CertificatesEditor from './CertificatesEditor';
import ThemeToggle from '../ThemeToggle';

interface AdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'personal' | 'projects' | 'certificates' | 'settings';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const tabs = [
    { id: 'personal' as TabType, label: 'Personal Info', icon: FaUser },
    { id: 'projects' as TabType, label: 'Projects', icon: FaProjectDiagram },
    { id: 'certificates' as TabType, label: 'Certificates', icon: FaCertificate },
    { id: 'settings' as TabType, label: 'Settings', icon: FaCog },
  ];

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const response = await fetch('/api/admin/portfolio');
      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
      } else {
        // Fallback to default data if API fails
        const defaultData = await import('../../data/portfolio-config.json');
        setPortfolioData(defaultData.default);
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      // Load from local file as fallback
      try {
        const defaultData = await import('../../data/portfolio-config.json');
        setPortfolioData(defaultData.default);
      } catch (fallbackError) {
        console.error('Error loading fallback data:', fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const savePortfolioData = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (response.ok) {
        setSaveMessage('Changes saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Error saving changes. Please try again.');
      }
    } catch (error) {
      console.error('Error saving portfolio data:', error);
      setSaveMessage('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updatePortfolioData = (section: string, data: any) => {
    setPortfolioData((prev: any) => ({
      ...prev,
      [section]: data
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Portfolio Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => window.open('/', '_blank')}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaEye className="mr-2" />
                View Portfolio
              </button>
              <button
                onClick={savePortfolioData}
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaSave className="mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={onLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Save Message */}
      {saveMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`mx-4 mt-4 p-3 rounded-lg text-center ${
            saveMessage.includes('Error')
              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
              : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
          }`}
        >
          {saveMessage}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="mr-3 text-lg" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              {activeTab === 'personal' && portfolioData && (
                <PersonalInfoEditor
                  data={portfolioData.personal}
                  socialLinks={portfolioData.socialLinks}
                  onUpdate={(personal, socialLinks) => {
                    updatePortfolioData('personal', personal);
                    updatePortfolioData('socialLinks', socialLinks);
                  }}
                />
              )}

              {activeTab === 'projects' && portfolioData && (
                <ProjectsEditor
                  data={portfolioData.projects}
                  onUpdate={(projects) => updatePortfolioData('projects', projects)}
                />
              )}

              {activeTab === 'certificates' && portfolioData && (
                <CertificatesEditor
                  data={portfolioData.certificates}
                  onUpdate={(certificates) => updatePortfolioData('certificates', certificates)}
                />
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Theme Settings
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Toggle between light and dark mode for your portfolio.
                      </p>
                      <ThemeToggle />
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Admin Credentials
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Current admin credentials:
                      </p>
                      <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded">
                        Username: admin<br />
                        Password: portfolio2024
                      </div>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                        ⚠️ Change these credentials in production!
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Data Management
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Your portfolio data is automatically saved when you click "Save Changes".
                      </p>
                      <button
                        onClick={loadPortfolioData}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Reload Data
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}