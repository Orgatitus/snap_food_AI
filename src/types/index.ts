export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'clinician' | 'user';
  avatar?: string;
  healthCondition?: HealthCondition;
  createdAt: string;
  lastLogin?: string;
}

export type HealthCondition = 
  | 'normal' 
  | 'diabetic' 
  | 'hypertensive' 
  | 'weight_loss' 
  | 'pregnant_nursing' 
  | 'cholesterol_watch';

export interface NutritionAnalysis {
  id: string;
  userId: string;
  dishName: string;
  confidence: number;
  imageUrl?: string;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
    sugar: number;
    cholesterol?: number;
    calcium?: number;
    iron?: number;
  };
  healthFlags: {
    level: 'green' | 'yellow' | 'red';
    message: string;
    condition?: HealthCondition;
  }[];
  recommendations: string[];
  healthCondition: HealthCondition;
  timestamp: string;
}

export interface FoodMetadata {
  id: string;
  name: string;
  category: string;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
    sugar: number;
    cholesterol?: number;
    calcium?: number;
    iron?: number;
  };
  healthNotes?: string[];
}

export interface UploadStatus {
  status: 'idle' | 'uploading' | 'validating' | 'success' | 'error';
  message?: string;
  progress?: number;
  details?: string;
}

export interface SystemHealth {
  database: 'healthy' | 'warning' | 'error';
  mlModel: 'healthy' | 'warning' | 'error';
  storage: 'healthy' | 'warning' | 'error';
  workers: 'healthy' | 'warning' | 'error';
  lastCheck: string;
}

export interface UserStats {
  totalScans: number;
  weeklyScans: number;
  averageCalories: number;
  topFoods: string[];
  healthScore: number;
  lastScan?: string;
}

export interface ExportData {
  user: User;
  scans: NutritionAnalysis[];
  stats: UserStats;
  dateRange: {
    start: string;
    end: string;
  };
}