import { Camera, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo/Brand */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            SNAPFOOD AI
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            Eat Smarter, Live Safer
          </p>
        </div>

        {/* Main Value Proposition */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Your Offline AI Nutrition Assistant for Africa
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Snap a photo of your meal and get instant, culturally-relevant nutrition analysis 
            with traffic-light health indicators. Works offline on any device.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all duration-300">
            <Camera className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Smart Food Recognition</h3>
            <p className="text-muted-foreground text-sm">
              Identify African dishes and local ingredients instantly
            </p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all duration-300">
            <Heart className="h-8 w-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Health-First Analysis</h3>
            <p className="text-muted-foreground text-sm">
              Get personalized advice for diabetes, hypertension, and more
            </p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all duration-300">
            <Globe className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Works Everywhere</h3>
            <p className="text-muted-foreground text-sm">
              Offline-first design for rural areas and low connectivity
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground text-lg px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <Camera className="mr-2 h-5 w-5" />
            Start Scanning Food
          </Button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;