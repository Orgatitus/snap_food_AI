import React, { useState, useRef } from "react";
import { Camera, Upload, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FoodScannerProps {
  onScanResult?: (result: any) => void;
}

const FoodScanner: React.FC<FoodScannerProps> = ({ onScanResult }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) return;

    setIsScanning(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResult = {
        food: "Jollof Rice with Chicken",
        confidence: 0.95,
        nutrients: {
          calories: 420,
          protein: 28,
          carbs: 45,
          fat: 12,
          sodium: 680,
          sugar: 8
        },
        healthFlags: {
          calories: "good",
          protein: "good", 
          carbs: "warning",
          fat: "good",
          sodium: "danger",
          sugar: "warning"
        }
      };
      
      setIsScanning(false);
      onScanResult?.(mockResult);
    }, 2000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setIsScanning(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Food Scanner</h3>
          <p className="text-muted-foreground text-sm">
            Take or upload a photo of your meal for instant nutrition analysis
          </p>
        </div>

        {/* Image Preview Area */}
        <div className="relative">
          {selectedImage ? (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected food"
                className="w-full h-48 object-cover rounded-lg border-2 border-border"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
              </Button>
              {isScanning && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center space-y-2">
                    <Zap className="h-8 w-8 animate-pulse mx-auto text-primary" />
                    <p className="text-sm font-medium">Analyzing food...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-48 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted/30">
              <div className="text-center space-y-3">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground text-sm">
                  No image selected
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            variant="outline"
            disabled={isScanning}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>

          {selectedImage && (
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
            >
              {isScanning ? (
                <>
                  <Zap className="mr-2 h-4 w-4 animate-pulse" />
                  Scanning...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Analyze Food
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FoodScanner;