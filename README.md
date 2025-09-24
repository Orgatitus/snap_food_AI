# SnapFood - AI Nutrition Assistant

SnapFood is a comprehensive food classification and health advisory web application that uses AI to analyze food images and provide personalized nutrition advice based on user health conditions.

## 🌟 Features

### Core Functionality
- **AI Food Recognition**: Upload or capture food images for instant classification using TensorFlow Lite models
- **Health-Aware Advice**: Personalized nutrition recommendations based on health conditions (Diabetic, Hypertensive, Weight Loss, Pregnant/Nursing, Cholesterol Watch)
- **Multi-Language Support**: Available in English, Hausa, Yoruba, Igbo, and French
- **Text-to-Speech**: Listen to nutrition advice with built-in TTS functionality
- **Dashboard Analytics**: Track nutrition history with interactive charts and trends
- **Export Capabilities**: Download nutrition reports as PDF or CSV files

### Admin Panel
- **Model Management**: Upload and replace TensorFlow Lite (.tflite), Keras (.h5), or ONNX models
- **Food Metadata Management**: Upload JSON files containing nutrition data for food items
- **Health Logic Management**: Upload Python files containing health advisory logic
- **Real-time Validation**: Automatic file validation and hot-reload capabilities
- **System Diagnostics**: Monitor system health and performance metrics

### Progressive Web App (PWA)
- **Offline Support**: Works without internet connection using cached models and data
- **Mobile Responsive**: Optimized for all device sizes
- **Fast Loading**: Efficient caching and lazy loading
- **Native App Feel**: Install on mobile devices like a native app

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **TensorFlow.js** for client-side ML inference
- **Chart.js** for data visualization
- **React Router** for navigation
- **i18next** for internationalization

### Backend Services
- **Model Service**: Handles TensorFlow Lite model loading and predictions
- **Food Metadata Service**: Manages nutrition data and food information
- **Health Logic Service**: Processes health-specific advice generation
- **Dashboard Service**: Manages user data and analytics

### AI/ML
- **TensorFlow Lite**: Optimized models for food classification
- **Custom Health Logic**: Python-based advisory system
- **Real-time Inference**: Client-side prediction for fast results

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with WebGL support

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd snapfood
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=SnapFood
VITE_DEFAULT_LANGUAGE=en
VITE_MAX_FILE_SIZE=104857600
VITE_SUPPORTED_FORMATS=.tflite,.h5,.onnx,.json,.py
```

### Model Configuration
- Place default models in `public/models/`
- Food metadata should be in `public/data/food_metadata.json`
- Health logic files are processed through the admin panel

## 👨‍💼 Admin Panel Usage

### Accessing Admin Panel
1. Login with admin credentials
2. Navigate to `/admin`
3. Use the file upload sections for different components

### Uploading New Models

1. **AI Model Upload**
   - Supported formats: `.tflite`, `.h5`, `.onnx`
   - Maximum size: 100MB
   - Automatic validation and hot-reload

2. **Food Metadata Upload**
   - Format: JSON file
   - Maximum size: 10MB
   - Required structure:
   ```json
   {
     "Food Name": {
       "name": "Food Name",
       "ethnicity": "Origin",
       "ingredients": ["ingredient1", "ingredient2"],
       "nutrients": {
         "calories": 400,
         "protein": 20,
         "carbs": 50,
         "fat": 15,
         "fiber": 5,
         "sodium": 600,
         "sugar": 10
       },
       "healthAdvice": {
         "general": "General advice",
         "diabetic": "Diabetic-specific advice",
         "hypertensive": "Hypertensive-specific advice"
       },
       "dietType": ["Vegetarian", "Gluten-Free"]
     }
   }
   ```

3. **Health Logic Upload**
   - Format: Python (.py) or JavaScript (.js)
   - Maximum size: 200KB
   - Required function: `generateAdvice(food_data, health_condition, user_profile)`
   - Security: Automatic code scanning and sandboxed execution

### File Replacement Process
1. Upload new file through admin panel
2. System validates file format and content
3. Automatic backup of previous version
4. Hot-reload without application restart
5. Validation testing with sample data
6. Success/failure notification

## 📊 Dashboard Features

### Analytics
- **Nutrition Trends**: Track calories, protein, and carbs over time
- **Health Risk Distribution**: Monitor low/medium/high risk meals
- **Top Foods**: Most frequently analyzed foods
- **Confidence Scores**: Model prediction accuracy tracking

### Export Options
- **PDF Reports**: Comprehensive nutrition summaries
- **CSV Data**: Raw data for external analysis
- **Date Range Filtering**: Custom time periods
- **Health Condition Filtering**: Condition-specific reports

## 🌍 Multi-Language Support

### Supported Languages
- **English** (en) - Default
- **Hausa** (ha) - Nigerian language
- **Yoruba** (yo) - Nigerian language  
- **Igbo** (ig) - Nigerian language
- **French** (fr) - International

### Adding New Languages
1. Add translations to `src/i18n/config.ts`
2. Update language selector in navbar
3. Test TTS functionality for new language

## 🔒 Security Features

### File Upload Security
- **File Type Validation**: Strict format checking
- **Size Limits**: Configurable maximum file sizes
- **Code Scanning**: Static analysis for Python files
- **Sandboxed Execution**: Isolated testing environment
- **Access Control**: Admin-only upload permissions

### Data Protection
- **Local Storage**: Sensitive data kept client-side
- **Encryption**: Secure data transmission
- **Input Validation**: Comprehensive input sanitization
- **Error Handling**: Graceful failure management

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Test Coverage
- Unit tests for all services
- Integration tests for file uploads
- E2E tests for user workflows
- Security tests for admin functions

## 🚀 Deployment

### Production Deployment
1. Build the application: `npm run build`
2. Deploy `dist/` folder to web server
3. Configure environment variables
4. Set up HTTPS and security headers
5. Configure CDN for static assets

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Write comprehensive tests
4. Document new features
5. Follow security guidelines for file uploads

### Code Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── services/           # Business logic and API calls
├── types/              # TypeScript type definitions
├── contexts/           # React context providers
└── i18n/              # Internationalization files
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues
1. **Model Loading Errors**: Check file format and size limits
2. **Upload Failures**: Verify admin permissions and file validation
3. **TTS Not Working**: Ensure browser supports Web Speech API
4. **Offline Mode**: Check service worker registration

### Getting Help
- Check the documentation
- Review error logs in browser console
- Contact development team
- Submit issues on GitHub

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with core functionality
- AI food classification
- Health advisory system
- Admin panel with file management
- Multi-language support
- PWA capabilities

---

**SnapFood** - Eat Smarter, Live Safer 🍽️🤖
