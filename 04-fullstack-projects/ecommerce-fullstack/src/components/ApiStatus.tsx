// API Status Component - Shows connection status with Django backend
import React from 'react';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { useApiHealth } from '../hooks/useApi';

interface ApiStatusProps {
  className?: string;
}

export const ApiStatus: React.FC<ApiStatusProps> = ({ className = '' }) => {
  const { isHealthy, checking, checkHealth } = useApiHealth();

  const getStatusConfig = () => {
    if (checking) {
      return {
        icon: RefreshCw,
        text: 'Checking API...',
        className: 'text-blue-600 animate-spin',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
      };
    }

    if (isHealthy === true) {
      return {
        icon: CheckCircle,
        text: 'API Connected',
        className: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
      };
    }

    return {
      icon: AlertCircle,
      text: 'API Disconnected',
      className: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    };
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div 
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-lg border 
        ${config.bgColor} ${config.borderColor} ${className}
      `}
    >
      <Icon className={`w-4 h-4 ${config.className}`} />
      <span className={`text-sm font-medium ${config.className.replace('animate-spin', '')}`}>
        {config.text}
      </span>
      {!checking && (
        <button
          onClick={checkHealth}
          className="ml-1 p-1 rounded hover:bg-white/50 transition-colors"
          title="Refresh status"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

// Connection Details Component
export const ApiConnectionDetails: React.FC = () => {
  const { isHealthy, checking } = useApiHealth();
  const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8005/api';

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <h3 className="font-semibold text-gray-900 mb-3">API Connection Details</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-gray-600">Endpoint:</span>
          <span className="ml-2 font-mono text-gray-800">{apiUrl}</span>
        </div>
        
        <div>
          <span className="font-medium text-gray-600">Status:</span>
          <ApiStatus className="ml-2" />
        </div>

        <div>
          <span className="font-medium text-gray-600">Environment:</span>
          <span className="ml-2 text-gray-800">
            {process.env.REACT_APP_ENV || 'development'}
          </span>
        </div>

        {!isHealthy && !checking && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700 text-sm">
              <strong>Connection Failed:</strong> Make sure Django server is running on port 8005
            </p>
            <p className="text-red-600 text-xs mt-1">
              Run: <code className="bg-red-100 px-1 rounded">python manage.py runserver 8005</code>
            </p>
          </div>
        )}

        {isHealthy && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-green-700 text-sm">
              ✅ Successfully connected to Django backend
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
