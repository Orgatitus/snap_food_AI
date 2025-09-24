import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useOffline } from '../contexts/OfflineContext';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Users,
  BarChart3,
  Clock,
  Utensils
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { NutritionAnalysis, UserStats } from '../types';
import ExportButton from '../components/ExportButton';
import TTSButton from '../components/TTSButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { user, isClinician } = useAuth();
  const { pendingScans, syncPendingData, isOnline } = useOffline();
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('7d');
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentScans, setRecentScans] = useState<NutritionAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user stats
      setUserStats({
        totalScans: 47,
        weeklyScans: 12,
        averageCalories: 1847,
        topFoods: ['Jollof Rice', 'Egusi Soup', 'Plantain', 'Beans'],
        healthScore: 85,
        lastScan: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      });

      // Mock recent scans
      setRecentScans([
        {
          id: '1',
          userId: user?.id || '',
          dishName: 'Jollof Rice with Chicken',
          confidence: 0.92,
          nutrients: {
            calories: 485,
            protein: 28,
            carbs: 52,
            fat: 18,
            fiber: 3,
            sodium: 890,
            sugar: 4
          },
          healthFlags: [
            { level: 'yellow', message: 'High sodium content' },
            { level: 'green', message: 'Good protein source' }
          ],
          recommendations: ['Add vegetables', 'Reduce salt'],
          healthCondition: user?.healthCondition || 'normal',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          userId: user?.id || '',
          dishName: 'Egusi Soup with Pounded Yam',
          confidence: 0.88,
          nutrients: {
            calories: 625,
            protein: 22,
            carbs: 78,
            fat: 24,
            fiber: 6,
            sodium: 650,
            sugar: 8
          },
          healthFlags: [
            { level: 'green', message: 'High fiber content' },
            { level: 'green', message: 'Rich in vitamins' }
          ],
          recommendations: ['Excellent nutritional balance', 'Good portion size'],
          healthCondition: user?.healthCondition || 'normal',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        }
      ]);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for charts
  const caloriesTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories',
        data: [2100, 1950, 2200, 1800, 2000, 2300, 1900],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Target',
        data: [2000, 2000, 2000, 2000, 2000, 2000, 2000],
        borderColor: 'rgb(156, 163, 175)',
        borderDash: [5, 5],
      },
    ],
  };

  const nutrientBreakdownData = {
    labels: ['Protein', 'Carbs', 'Fats', 'Fiber'],
    datasets: [
      {
        data: [25, 45, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const healthRiskData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'High Risk',
        data: [3, 2, 1, 1],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
      {
        label: 'Medium Risk',
        data: [5, 4, 3, 2],
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
      },
      {
        label: 'Low Risk',
        data: [12, 14, 16, 17],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
    ],
  };

  const stats = [
    { 
      label: t('todayCalories'), 
      value: userStats?.averageCalories.toString() || '0', 
      target: '2,000',
      icon: Activity, 
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      label: t('healthScore'), 
      value: `${userStats?.healthScore || 0}%`, 
      trend: '+5%',
      icon: Target, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: t('mealsLogged'), 
      value: userStats?.totalScans.toString() || '0', 
      trend: `+${userStats?.weeklyScans || 0}`,
      icon: BarChart3, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      label: isClinician ? 'Patients' : 'Goals Met', 
      value: isClinician ? '156' : '8/10', 
      trend: isClinician ? '+3' : '',
      icon: Users, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'red':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'yellow':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isClinician ? 'Clinical Dashboard' : t('dashboard')}
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.name}! Here's your nutritional overview.
            </p>
            {user?.healthCondition && (
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                <Target className="h-4 w-4 mr-1" />
                Health focus: {user.healthCondition.replace('_', ' ')}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
            </select>
            <ExportButton data={recentScans} type="dashboard" />
          </div>
        </div>
      </div>

      {/* Pending Sync Alert */}
      {pendingScans.length > 0 && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800">
                {pendingScans.length} scans pending sync
              </span>
            </div>
            <button
              onClick={syncPendingData}
              disabled={!isOnline}
              className="px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50"
            >
              Sync Now
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <div className="flex items-baseline space-x-2 mt-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.target && (
                    <p className="text-sm text-gray-500">/ {stat.target}</p>
                  )}
                  {stat.trend && (
                    <span className="text-sm text-green-600 font-medium">{stat.trend}</span>
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Calorie Trends */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('weeklyTrends')}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <TrendingUp className="h-4 w-4" />
              <span>Daily average: {userStats?.averageCalories || 0} calories</span>
            </div>
          </div>
          <Line 
            data={caloriesTrendData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                y: {
                  beginAtZero: false,
                  min: 1500,
                },
              },
            }}
          />
        </div>

        {/* Nutrient Breakdown */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('nutritionBreakdown')}</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={nutrientBreakdownData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom' as const,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Recent Meals */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('recentMeals')}</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentScans.map((scan) => (
              <div key={scan.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{scan.dishName}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{getTimeAgo(scan.timestamp)}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs font-medium text-gray-700">{scan.nutrients.calories} cal</span>
                    </div>
                  </div>
                  <TTSButton 
                    text={`${scan.dishName}, ${scan.nutrients.calories} calories, ${scan.healthFlags.map(f => f.message).join(', ')}`}
                    size="sm"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {scan.healthFlags.slice(0, 2).map((flag, index) => (
                      <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(flag.level)}`}>
                        {flag.level}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(scan.confidence * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
            View All Meals
          </button>
        </div>

        {/* Health Risk Analysis */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Health Risk Analysis</h3>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Weekly breakdown</span>
            </div>
          </div>
          <Bar 
            data={healthRiskData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Ready to log your next meal?</h3>
            <p className="text-green-100">Capture a photo or chat with NutriBot for personalized advice.</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button 
              onClick={() => window.location.href = '/camera'}
              className="flex items-center justify-center space-x-2 bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              <Utensils className="h-4 w-4" />
              <span>Open Camera</span>
            </button>
            <button 
              onClick={() => window.location.href = '/nutribot'}
              className="flex items-center justify-center space-x-2 border border-green-300 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-500 transition-colors"
            >
              <span>Chat with NutriBot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;