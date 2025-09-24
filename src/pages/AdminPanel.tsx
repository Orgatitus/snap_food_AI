import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Upload, 
  Database, 
  Brain, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  RefreshCw,
  Settings,
  Activity,
  HardDrive,
  Users,
  Clock,
  Shield,
  Eye,
  Download
} from 'lucide-react';
import { UploadStatus, SystemHealth } from '../types';

const AdminPanel = () => {
  const { t } = useTranslation();
  const [modelUpload, setModelUpload] = useState<UploadStatus>({ status: 'idle' });
  const [healthLogicUpload, setHealthLogicUpload] = useState<UploadStatus>({ status: 'idle' });
  const [foodMetaUpload, setFoodMetaUpload] = useState<UploadStatus>({ status: 'idle' });
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    database: 'healthy',
    mlModel: 'healthy',
    storage: 'warning',
    workers: 'healthy',
    lastCheck: new Date().toISOString()
  });

  const validateFile = (file: File, type: string): { valid: boolean; error?: string } => {
    const validations = {
      model: {
        extensions: ['.h5', '.hdf5', '.tflite', '.onnx'],
        maxSize: 200 * 1024 * 1024, // 200MB
        mimeTypes: ['application/octet-stream', 'application/x-hdf']
      },
      healthLogic: {
        extensions: ['.py'],
        maxSize: 200 * 1024, // 200KB
        mimeTypes: ['text/x-python', 'text/plain']
      },
      foodMeta: {
        extensions: ['.json', '.csv'],
        maxSize: 10 * 1024 * 1024, // 10MB
        mimeTypes: ['application/json', 'text/csv']
      }
    };

    const config = validations[type as keyof typeof validations];
    if (!config) return { valid: false, error: 'Invalid file type' };

    // Check file size
    if (file.size > config.maxSize) {
      return { valid: false, error: `File too large. Max size: ${config.maxSize / (1024 * 1024)}MB` };
    }

    // Check file extension
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!config.extensions.includes(extension)) {
      return { valid: false, error: `Invalid extension. Allowed: ${config.extensions.join(', ')}` };
    }

    return { valid: true };
  };

  const handleFileUpload = async (type: string, file: File) => {
    const setters = {
      model: setModelUpload,
      healthLogic: setHealthLogicUpload,
      foodMeta: setFoodMetaUpload
    };
    
    const setter = setters[type as keyof typeof setters];
    if (!setter) return;

    // Validate file
    const validation = validateFile(file, type);
    if (!validation.valid) {
      setter({ status: 'error', message: validation.error });
      return;
    }

    setter({ status: 'uploading', progress: 0 });

    try {
      // Simulate upload process
      for (let i = 0; i <= 50; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setter({ status: 'uploading', progress: i });
      }

      // Simulate validation phase
      setter({ status: 'validating', progress: 60, message: 'Validating file...' });
      
      if (type === 'model') {
        setter({ status: 'validating', progress: 70, message: 'Testing model inference...' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        setter({ status: 'validating', progress: 90, message: 'Verifying model compatibility...' });
      } else if (type === 'healthLogic') {
        setter({ status: 'validating', progress: 70, message: 'Running static code analysis...' });
        await new Promise(resolve => setTimeout(resolve, 1500));
        setter({ status: 'validating', progress: 85, message: 'Testing in sandbox environment...' });
      } else if (type === 'foodMeta') {
        setter({ status: 'validating', progress: 70, message: 'Validating data schema...' });
        await new Promise(resolve => setTimeout(resolve, 1000));
        setter({ status: 'validating', progress: 85, message: 'Checking data integrity...' });
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setter({ status: 'validating', progress: 100, message: 'Deploying and hot-reloading...' });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setter({ 
        status: 'success', 
        message: `${file.name} uploaded successfully. System reloaded with new ${type}.`,
        details: type === 'model' ? 'Test inference: 95% accuracy on sample data' : 
                type === 'healthLogic' ? 'Code analysis passed. No security issues detected.' :
                'Schema validation passed. 1,247 food items loaded.'
      });

      // Trigger system health check
      setTimeout(() => {
        setSystemHealth(prev => ({
          ...prev,
          [type === 'model' ? 'mlModel' : type === 'healthLogic' ? 'workers' : 'database']: 'healthy',
          lastCheck: new Date().toISOString()
        }));
      }, 2000);

    } catch (error) {
      setter({ 
        status: 'error', 
        message: 'Upload failed. Please check file format and try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    setShowConfirmModal(null);
  };

  const runDiagnostics = async () => {
    setSystemHealth(prev => ({ ...prev, lastCheck: new Date().toISOString() }));
    
    // Simulate diagnostic checks
    const checks = ['database', 'mlModel', 'storage', 'workers'] as const;
    
    for (const check of checks) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const status = Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'error' : 'healthy';
      setSystemHealth(prev => ({ ...prev, [check]: status }));
    }
  };

  const FileUploadCard = ({ 
    title, 
    icon: Icon, 
    currentFile, 
    lastUpdated, 
    allowedTypes, 
    maxSize, 
    uploadStatus,
    onUpload,
    type,
    description
  }: {
    title: string;
    icon: any;
    currentFile: string;
    lastUpdated: string;
    allowedTypes: string[];
    maxSize: string;
    uploadStatus: UploadStatus;
    onUpload: (file: File) => void;
    type: string;
    description: string;
  }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Icon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {uploadStatus.status === 'success' && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
          {uploadStatus.status === 'error' && (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          {(uploadStatus.status === 'uploading' || uploadStatus.status === 'validating') && (
            <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-gray-700">Current File:</span>
            <span className="text-xs text-gray-500">Last Updated</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-sm text-gray-900 font-mono">{currentFile}</span>
            <span className="text-xs text-gray-500">{lastUpdated}</span>
          </div>
        </div>

        {(uploadStatus.status === 'uploading' || uploadStatus.status === 'validating') && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{uploadStatus.message}</span>
              <span className="text-gray-500">{uploadStatus.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadStatus.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {uploadStatus.message && uploadStatus.status !== 'uploading' && uploadStatus.status !== 'validating' && (
          <div className={`p-3 rounded-lg text-sm ${
            uploadStatus.status === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200'
              : uploadStatus.status === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            <div className="font-medium">{uploadStatus.message}</div>
            {uploadStatus.details && (
              <div className="text-xs mt-1 opacity-80">{uploadStatus.details}</div>
            )}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            Drag & drop your file here, or{' '}
            <label className="text-green-600 cursor-pointer hover:text-green-700 font-medium">
              browse
              <input
                type="file"
                className="hidden"
                accept={allowedTypes.join(',')}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setShowConfirmModal(type);
                    setTimeout(() => onUpload(file), 100);
                  }
                }}
              />
            </label>
          </p>
          <p className="text-xs text-gray-500">
            Allowed: {allowedTypes.join(', ')} | Max size: {maxSize}
          </p>
        </div>

        <div className="flex space-x-2">
          <button 
            disabled={uploadStatus.status === 'uploading' || uploadStatus.status === 'validating'}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadStatus.status === 'uploading' || uploadStatus.status === 'validating' ? 'Processing...' : 'Validate & Replace'}
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Eye className="h-4 w-4" />
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const systemStats = [
    { label: 'Active Users', value: '1,247', icon: Users, color: 'text-blue-600' },
    { label: 'Models Loaded', value: '3', icon: Brain, color: 'text-purple-600' },
    { label: 'Disk Usage', value: '65%', icon: HardDrive, color: 'text-orange-600' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-green-600' }
  ];

  const getHealthColor = (status: SystemHealth[keyof SystemHealth]) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getHealthIcon = (status: SystemHealth[keyof SystemHealth]) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="h-8 w-8 text-red-600" />
              <h1 className="text-3xl font-bold text-gray-900">{t('admin')}</h1>
            </div>
            <p className="text-gray-600">Secure file management and system administration</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={runDiagnostics}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Activity className="h-4 w-4" />
              <span>Run Diagnostics</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {systemStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* File Management Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        <FileUploadCard
          title={t('modelManagement')}
          icon={Brain}
          currentFile="nutrition_model_v2.1.h5"
          lastUpdated="2 hours ago"
          allowedTypes={['.h5', '.hdf5', '.tflite', '.onnx']}
          maxSize="200MB"
          uploadStatus={modelUpload}
          onUpload={(file) => handleFileUpload('model', file)}
          type="model"
          description="AI model for food recognition and nutrition analysis"
        />

        <FileUploadCard
          title={t('healthLogicManagement')}
          icon={FileText}
          currentFile="health_logic.py"
          lastUpdated="1 day ago"
          allowedTypes={['.py']}
          maxSize="200KB"
          uploadStatus={healthLogicUpload}
          onUpload={(file) => handleFileUpload('healthLogic', file)}
          type="healthLogic"
          description="Python module defining health condition rules and advice"
        />

        <FileUploadCard
          title={t('foodMetaManagement')}
          icon={Database}
          currentFile="food_info.json"
          lastUpdated="3 days ago"
          allowedTypes={['.json', '.csv']}
          maxSize="10MB"
          uploadStatus={foodMetaUpload}
          onUpload={(file) => handleFileUpload('foodMeta', file)}
          type="foodMeta"
          description="Nutritional database for African foods and ingredients"
        />

        {/* System Health Dashboard */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{t('systemDiagnostics')}</h2>
            <span className="text-xs text-gray-500">
              Last check: {new Date(systemHealth.lastCheck).toLocaleTimeString()}
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(systemHealth).filter(([key]) => key !== 'lastCheck').map(([key, status]) => {
              const Icon = getHealthIcon(status);
              return (
                <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getHealthColor(status)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-sm text-gray-600">
                        {key === 'database' && 'PostgreSQL connection and queries'}
                        {key === 'mlModel' && 'AI model loading and inference'}
                        {key === 'storage' && 'File system and disk space'}
                        {key === 'workers' && 'Background job processing'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getHealthColor(status)}`}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Auto-Remediate Issues
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View Logs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Security Notice</h3>
            <div className="text-sm text-yellow-700 space-y-1">
              <p>• All uploads are validated and sandboxed before deployment</p>
              <p>• Health logic files undergo static code analysis for security</p>
              <p>• Model files are tested for compatibility and performance</p>
              <p>• File replacements trigger automatic system reloads</p>
              <p>• All admin actions are logged and auditable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm File Replacement</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to replace the current {showConfirmModal} file? This action will:
            </p>
            <ul className="text-sm text-gray-600 mb-6 space-y-1">
              <li>• Validate the new file for security and compatibility</li>
              <li>• Replace the active file if validation passes</li>
              <li>• Trigger an immediate system hot-reload</li>
              <li>• Log this action for audit purposes</li>
            </ul>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Confirm Replace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;