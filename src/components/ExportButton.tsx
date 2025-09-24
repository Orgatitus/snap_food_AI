import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Download, FileText, Table, Loader } from 'lucide-react';
import { ExportData, NutritionAnalysis } from '../types';

interface ExportButtonProps {
  data?: NutritionAnalysis[];
  type?: 'dashboard' | 'report' | 'analysis';
  className?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ 
  data = [], 
  type = 'dashboard',
  className = '' 
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const generateCSV = (exportData: ExportData): string => {
    const headers = [
      'Date',
      'Food Item',
      'Confidence',
      'Calories',
      'Protein (g)',
      'Carbs (g)',
      'Fat (g)',
      'Fiber (g)',
      'Sodium (mg)',
      'Sugar (g)',
      'Health Condition',
      'Health Flags',
      'Recommendations'
    ];

    const rows = exportData.scans.map(scan => [
      new Date(scan.timestamp).toLocaleDateString(),
      scan.dishName,
      `${Math.round(scan.confidence * 100)}%`,
      scan.nutrients.calories,
      scan.nutrients.protein,
      scan.nutrients.carbs,
      scan.nutrients.fat,
      scan.nutrients.fiber,
      scan.nutrients.sodium,
      scan.nutrients.sugar,
      scan.healthCondition,
      scan.healthFlags.map(flag => flag.message).join('; '),
      scan.recommendations.join('; ')
    ]);

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  };

  const generatePDF = async (exportData: ExportData): Promise<void> => {
    // In a real app, you'd use a library like jsPDF or call a backend service
    const content = `
      SnapFood Nutrition Report
      User: ${exportData.user.name}
      Health Condition: ${exportData.user.healthCondition}
      Date Range: ${exportData.dateRange.start} to ${exportData.dateRange.end}
      
      Summary:
      - Total Scans: ${exportData.stats.totalScans}
      - Average Calories: ${exportData.stats.averageCalories}
      - Health Score: ${exportData.stats.healthScore}%
      
      Recent Meals:
      ${exportData.scans.map(scan => `
        ${new Date(scan.timestamp).toLocaleDateString()} - ${scan.dishName}
        Calories: ${scan.nutrients.calories}, Confidence: ${Math.round(scan.confidence * 100)}%
        Health Flags: ${scan.healthFlags.map(f => f.message).join(', ')}
        Recommendations: ${scan.recommendations.join(', ')}
      `).join('\n')}
    `;

    // Create a simple text file for demo purposes
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snapfood-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = async (format: 'pdf' | 'csv') => {
    if (!user) return;

    setIsExporting(true);
    setShowOptions(false);

    try {
      // Simulate API call to get export data
      await new Promise(resolve => setTimeout(resolve, 1500));

      const exportData: ExportData = {
        user,
        scans: data.length > 0 ? data : [
          {
            id: '1',
            userId: user.id,
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
            recommendations: [
              'Add vegetables to increase fiber',
              'Consider reducing salt'
            ],
            healthCondition: user.healthCondition || 'normal',
            timestamp: new Date().toISOString()
          }
        ],
        stats: {
          totalScans: 25,
          weeklyScans: 7,
          averageCalories: 1847,
          topFoods: ['Jollof Rice', 'Egusi Soup', 'Plantain'],
          healthScore: 85
        },
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString()
        }
      };

      if (format === 'csv') {
        const csvContent = generateCSV(exportData);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `snapfood-data-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        await generatePDF(exportData);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        disabled={isExporting}
        className={`flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isExporting ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        <span>{isExporting ? 'Exporting...' : t('exportReport')}</span>
      </button>

      {showOptions && !isExporting && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
            <div className="py-1">
              <button
                onClick={() => handleExport('pdf')}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FileText className="h-4 w-4 text-red-500" />
                <span>{t('downloadPDF')}</span>
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Table className="h-4 w-4 text-green-500" />
                <span>{t('downloadCSV')}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportButton;