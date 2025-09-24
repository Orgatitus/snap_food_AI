import React, { useState } from 'react';
import { 
  Play, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Database,
  Brain,
  HardDrive,
  Activity,
  Users,
  Zap,
  Server,
  Wifi
} from 'lucide-react';

interface DiagnosticTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'warning';
  lastRun?: string;
  duration?: string;
  details?: string;
  icon: any;
}

interface SystemMetric {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  icon: any;
  description: string;
}

const DiagnosticsPanel = () => {
  const [isRunningFullDiagnosis, setIsRunningFullDiagnosis] = useState(false);
  const [diagnosticTests, setDiagnosticTests] = useState<DiagnosticTest[]>([
    {
      id: 'db-connection',
      name: 'Database Connection',
      description: 'Check PostgreSQL connection and query performance',
      status: 'passed',
      lastRun: '2 minutes ago',
      duration: '245ms',
      details: 'Connection healthy, average query time: 12ms',
      icon: Database
    },
    {
      id: 'ml-models',
      name: 'ML Models Loading',
      description: 'Validate all machine learning models are loaded and functional',
      status: 'passed',
      lastRun: '5 minutes ago',
      duration: '1.2s',
      details: 'All 3 models loaded successfully, inference test passed',
      icon: Brain
    },
    {
      id: 'disk-space',
      name: 'Disk Space',
      description: 'Monitor storage usage and available space',
      status: 'warning',
      lastRun: '1 minute ago',
      duration: '50ms',
      details: 'Usage at 78% - consider cleanup or expansion',
      icon: HardDrive
    },
    {
      id: 'api-health',
      name: 'API Health',
      description: 'Test all API endpoints and response times',
      status: 'passed',
      lastRun: '3 minutes ago',
      duration: '800ms',
      details: 'All endpoints responding normally, avg response: 120ms',
      icon: Activity
    },
    {
      id: 'worker-queue',
      name: 'Worker Queue',
      description: 'Check background job processing and queue status',
      status: 'warning',
      lastRun: '4 minutes ago',
      duration: '100ms',
      details: '3 jobs pending, worker processing normally',
      icon: Users
    },
    {
      id: 'health-logic',
      name: 'Health Logic Module',
      description: 'Validate health logic Python module execution',
      status: 'passed',
      lastRun: '6 minutes ago',
      duration: '300ms',
      details: 'Module loaded, test execution successful',
      icon: Zap
    }
  ]);

  const systemMetrics: SystemMetric[] = [
    {
      name: 'CPU Usage',
      value: '45%',
      status: 'good',
      icon: Activity,
      description: 'Current processor utilization'
    },
    {
      name: 'Memory',
      value: '6.2GB / 8GB',
      status: 'warning',
      icon: Server,
      description: 'RAM usage approaching limit'
    },
    {
      name: 'Network',
      value: '125ms',
      status: 'good',
      icon: Wifi,
      description: 'Average API response latency'
    },
    {
      name: 'Storage',
      value: '78%',
      status: 'warning',
      icon: HardDrive,
      description: 'Disk usage percentage'
    }
  ];

  const runFullDiagnosis = async () => {
    setIsRunningFullDiagnosis(true);
    
    // Reset all tests to running
    setDiagnosticTests(tests => 
      tests.map(test => ({ ...test, status: 'running' as const }))
    );

    // Simulate running each test with delays
    for (let i = 0; i < diagnosticTests.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDiagnosticTests(tests => {
        const updatedTests = [...tests];
        const randomStatus = Math.random() > 0.8 ? 'warning' : Math.random() > 0.9 ? 'failed' : 'passed';
        updatedTests[i] = {
          ...updatedTests[i],
          status: randomStatus,
          lastRun: 'Just now',
          duration: `${Math.floor(Math.random() * 1000 + 100)}ms`
        };
        return updatedTests;
      });
    }
    
    setIsRunningFullDiagnosis(false);
  };

  const runSingleTest = async (testId: string) => {
    setDiagnosticTests(tests =>
      tests.map(test =>
        test.id === testId
          ? { ...test, status: 'running' as const }
          : test
      )
    );

    await new Promise(resolve => setTimeout(resolve, 2000));

    setDiagnosticTests(tests =>
      tests.map(test =>
        test.id === testId
          ? {
              ...test,
              status: Math.random() > 0.8 ? 'warning' : 'passed' as const,
              lastRun: 'Just now',
              duration: `${Math.floor(Math.random() * 1000 + 100)}ms`
            }
          : test
      )
    );
  };

  const getStatusIcon = (status: DiagnosticTest['status']) => {
    switch (status) {
      case 'running':
        return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <div className="h-5 w-5 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status: DiagnosticTest['status']) => {
    switch (status) {
      case 'running':
        return 'border-blue-200 bg-blue-50';
      case 'passed':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'failed':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getMetricStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const passedTests = diagnosticTests.filter(t => t.status === 'passed').length;
  const warningTests = diagnosticTests.filter(t => t.status === 'warning').length;
  const failedTests = diagnosticTests.filter(t => t.status === 'failed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Diagnostics</h1>
            <p className="text-gray-600 mt-2">Monitor system health and run diagnostic tests</p>
          </div>
          <button
            onClick={runFullDiagnosis}
            disabled={isRunningFullDiagnosis}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunningFullDiagnosis ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            <span>{isRunningFullDiagnosis ? 'Running...' : 'Run Full Diagnosis'}</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Passed Tests</p>
              <p className="text-3xl font-bold text-green-600">{passedTests}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-3xl font-bold text-yellow-600">{warningTests}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed Tests</p>
              <p className="text-3xl font-bold text-red-600">{failedTests}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-3xl font-bold text-green-600">92%</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Diagnostic Tests */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Diagnostic Tests</h2>
            
            <div className="space-y-4">
              {diagnosticTests.map((test) => (
                <div key={test.id} className={`border-2 rounded-lg p-4 ${getStatusColor(test.status)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg">
                        <test.icon className="h-5 w-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{test.name}</h3>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(test.status)}
                      <button
                        onClick={() => runSingleTest(test.id)}
                        disabled={test.status === 'running' || isRunningFullDiagnosis}
                        className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        Test
                      </button>
                    </div>
                  </div>
                  
                  {test.details && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{test.details}</span>
                        <div className="flex space-x-4 text-gray-500">
                          {test.lastRun && <span>Last run: {test.lastRun}</span>}
                          {test.duration && <span>Duration: {test.duration}</span>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Metrics & Quick Actions */}
        <div className="space-y-6">
          {/* System Metrics */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Metrics</h3>
            
            <div className="space-y-4">
              {systemMetrics.map((metric) => (
                <div key={metric.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getMetricStatusColor(metric.status)}`}>
                      <metric.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{metric.name}</p>
                      <p className="text-xs text-gray-600">{metric.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                <RefreshCw className="h-4 w-4" />
                <span>Reload ML Models</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <Server className="h-4 w-4" />
                <span>Restart Workers</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                <HardDrive className="h-4 w-4" />
                <span>Clear Cache</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                <Database className="h-4 w-4" />
                <span>Database Maintenance</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">System Status</h3>
            </div>
            <p className="text-green-100 mb-4">All critical systems are operational</p>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="flex justify-between text-sm">
                <span>Uptime:</span>
                <span className="font-medium">99.9% (7 days)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsPanel;