import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowRight, BarChart3, FileText, Network, Zap, 
  ArrowDownCircle, Code, Database, 
  GitBranch, LineChart, Settings, ChevronRight, 
  Share2, Eye 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with enhanced animations and gradients */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Animated background with more vibrant colors */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/20"></div>
          
          {/* Animated gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60 transform -translate-y-1/2 animate-pulse"></div>
          
          {/* Multiple floating elements with different animations */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/15 rounded-full blur-3xl opacity-60 animate-ping"></div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5 text-sm font-medium bg-background/70 backdrop-blur-sm shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary">Introducing ViSuAlIser 1.0</span>
            </div>
            
            {/* Main heading with enhanced gradient and animations - fixed visibility */}
            <div className="space-y-5 max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] pb-3">
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
                  Transform Data into
                </span><br />
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
                  Beautiful Visualizations
                </span>
              </h1>
              <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl lg:text-2xl">
                Harness the power of natural language to create stunning, interactive 
                data visualizations in seconds — no coding required.
              </p>
            </div>
            
            {/* Enhanced CTA buttons with animations */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md mx-auto">
              <Button size="lg" className="w-full sm:w-auto px-8 h-12 rounded-full bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1">
                <Link href="/visualization" className="flex items-center justify-center gap-2 w-full">
                  Try For Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-12 rounded-full border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 transition-all">
                <Link href="#how-it-works" className="flex items-center justify-center gap-2 w-full">
                  See How It Works <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Enhanced hero visual with interactive preview and animations */}
          <div className="mt-16 relative mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 shadow-2xl shadow-primary/20 bg-background/70 backdrop-blur-lg transform transition-all hover:shadow-primary/30 hover:-translate-y-1 duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row">
                {/* Control panel with enhanced styling */}
                <div className="w-full md:w-72 border-r border-primary/10 p-4 lg:p-6 flex flex-col gap-4 bg-background/50">
                  <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Controls</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="rounded-lg border border-primary/20 p-3 bg-muted/30 hover:border-primary/30 transition-colors">
                      <div className="text-sm font-medium mb-2 text-primary/80">Data Source</div>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">sales_data.csv</span>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border border-primary/20 p-3 bg-muted/30 hover:border-primary/30 transition-colors">
                      <div className="text-sm font-medium mb-2 text-primary/80">Query</div>
                      <p className="text-sm text-muted-foreground">
                        "Show monthly sales trends with breakdown by region"
                      </p>
                    </div>
                    
                    <div className="rounded-lg border border-primary/20 p-3 bg-muted/30 hover:border-primary/30 transition-colors">
                      <div className="text-sm font-medium mb-2 text-primary/80">Visualization Type</div>
                      <div className="flex gap-2">
                        <div className="bg-primary/20 rounded-md p-1.5 border border-primary/30 shadow-sm">
                          <LineChart className="h-4 w-4 text-primary" />
                        </div>
                        <div className="bg-muted/50 rounded-md p-1.5 hover:bg-primary/10 transition-colors">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="bg-muted/50 rounded-md p-1.5 hover:bg-primary/10 transition-colors">
                          <Network className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="bg-muted/50 rounded-md p-1.5 hover:bg-primary/10 transition-colors">
                          <GitBranch className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 space-y-2">
                    <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-colors">
                      <Share2 className="h-4 w-4 mr-2" /> Share
                    </Button>
                    <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                      <Eye className="h-4 w-4 mr-2" /> Preview
                    </Button>
                  </div>
                </div>
                
                {/* Enhanced visualization preview with animations */}
                <div className="flex-1 p-4 sm:p-6">
                  <div className="rounded-lg overflow-hidden h-[400px] lg:h-[500px] bg-muted/10 flex items-center justify-center border border-primary/10">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-0">
                        {/* Enhanced chart background with animations */}
                        <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05" />
                            </linearGradient>
                            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="var(--primary)" />
                              <stop offset="100%" stopColor="#4F46E5" />
                            </linearGradient>
                          </defs>
                          
                          {/* Area chart */}
                          <path d="M0,400 C100,350 200,390 300,340 C400,290 500,320 600,280 C700,240 800,260 800,260 L800,500 L0,500 Z" fill="url(#chart-gradient)" />
                          
                          {/* Line */}
                          <path d="M0,400 C100,350 200,390 300,340 C400,290 500,320 600,280 C700,240 800,260 800,260" stroke="url(#line-gradient)" strokeWidth="3" fill="none" />
                          
                          {/* Data points */}
                          <circle cx="0" cy="400" r="6" fill="white" fillOpacity="0.5" />
                          <circle cx="0" cy="400" r="4" fill="var(--primary)" />
                          
                          <circle cx="100" cy="350" r="6" fill="white" fillOpacity="0.5" />
                          <circle cx="100" cy="350" r="4" fill="var(--primary)" />
                          
                          <circle cx="200" cy="390" r="6" fill="white" fillOpacity="0.5" />
                          <circle cx="200" cy="390" r="4" fill="var(--primary)" />
                          
                          <circle cx="300" cy="340" r="6" fill="white" fillOpacity="0.5" />
                          <circle cx="300" cy="340" r="4" fill="var(--primary)" />
                          
                          <circle cx="400" cy="290" r="6" fill="white" fillOpacity="0.5" />
                          <circle cx="400" cy="290" r="4" fill="var(--primary)" />
                          
                          <circle cx="500" cy="320" r="6" fill="white" fillOpacity="0.5" />
                          <circle cx="500" cy="320" r="4" fill="var(--primary)" />
                          
                          <circle cx="600" cy="280" r="6" fill="white" fillOpacity="0.5" />
                          <circle cx="600" cy="280" r="4" fill="var(--primary)" />
                          
                          <circle cx="700" cy="240" r="6" fill="white" fillOpacity="0.5" />
                          <circle cx="700" cy="240" r="4" fill="var(--primary)" />
                          
                          <circle cx="800" cy="260" r="6" fill="white" fillOpacity="0.5" />
                          <circle cx="800" cy="260" r="4" fill="var(--primary)" />
                        </svg>
                      </div>
                      
                      {/* Text overlay */}
                      <div className="relative z-10 text-center bg-background/60 backdrop-blur-sm px-8 py-4 rounded-xl border border-primary/20 shadow-lg">
                        <div className="text-2xl font-bold mb-2 text-primary">Monthly Sales Visualization</div>
                        <p className="text-muted-foreground">Interactive visualization of your sales data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced glow effect */}
            <div className="absolute -inset-px -z-10 bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 rounded-2xl blur-xl opacity-70"></div>
          </div>
          
          {/* Animated scroll indicator */}
          <div className="flex justify-center mt-16 mb-4">
            <Link href="#how-it-works" className="relative rounded-full p-2 border border-primary/30 text-primary hover:text-white hover:bg-primary hover:border-transparent transition-colors group">
              <ArrowDownCircle className="h-5 w-5 animate-bounce" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - With numbers and illustrations */}
      <section className="py-24 bg-background" id="how-it-works">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl md:leading-tight">
              Visualize Data in Three Simple Steps
            </h2>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
              Our intuitive process makes it easy to transform complex data into clear, 
              insightful visualizations with minimal effort.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-primary/20">
              <div className="absolute left-1/3 top-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute left-2/3 top-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative flex flex-col items-center text-center space-y-6 group"
              >
                {/* Step number */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="p-4 rounded-xl bg-background border border-border shadow-sm group-hover:border-primary/20 group-hover:shadow-md transition-all">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground mx-auto max-w-[250px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/visualization" className="flex items-center gap-2">
                Start Creating <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid with hover effects */}
      <section className="py-24 bg-muted/30" id="features">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl md:leading-tight">
              Powerful Tools for Data Visualization
            </h2>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
              Our comprehensive suite of features gives you everything you need to explore,
              understand, and share insights from your data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group flex flex-col space-y-4 rounded-xl border p-6 bg-background/80 backdrop-blur-sm transition-all hover:shadow-lg hover:border-primary/20 hover:translate-y-[-4px] h-full"
              >
                <div className="p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">
                  {feature.description}
                </p>
                <div className="pt-4">
                  <Link href="#" className="text-primary font-medium text-sm flex items-center hover:underline">
                    Learn more <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action with gradient background */}
      <section className="py-24 relative bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-sm p-8 md:p-12 shadow-xl">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="bg-primary/10 p-3 rounded-full">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                  Ready to Transform Your Data?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Start creating beautiful visualizations today — no coding skills required.
                </p>
              </div>
              
              <div className="mt-6 w-full max-w-xs">
                <Button size="lg" className="px-8 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg w-full">
                  <Link href="/visualization" className="flex items-center justify-center gap-2 w-full">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Steps data
const steps = [
  {
    title: "Upload Your Data",
    description: "Simply upload your data files in CSV, JSON, Excel, or other common formats. Our platform supports various data types and structures.",
    icon: Database
  },
  {
    title: "Describe What You Want",
    description: "Use natural language to tell us what visualization you need. Our AI understands your intent and translates it into the perfect visualization.",
    icon: Code
  },
  {
    title: "Explore & Share",
    description: "Interact with your visualization, adjust parameters, and gain insights. Easily share your findings with your team or export for presentations.",
    icon: BarChart3
  }
];

// Feature list
const features = [
  {
    title: "Natural Language Processing",
    description: "Use everyday language to describe the visualizations you want. No technical expertise required to create professional-quality charts and graphs.",
    icon: Zap,
  },
  {
    title: "Multiple Visualization Types",
    description: "Choose from graphs, trees, matrices, and more, each optimized for different types of data relationships and insights.",
    icon: Network,
  },
  {
    title: "Interactive Controls",
    description: "Zoom, pan, filter, and explore your data with intuitive controls designed to help you uncover deeper insights.",
    icon: BarChart3,
  },
  {
    title: "Enterprise-Grade Security",
    description: "Your data is processed securely and never shared with third parties, ensuring privacy and compliance with regulations.",
    icon: FileText,
  },
  {
    title: "Real-time Processing",
    description: "Get instant visualizations as soon as you upload your data and provide your query, with minimal waiting time.",
    icon: Zap,
  },
  {
    title: "Advanced Customization",
    description: "Fine-tune your visualizations with adjustable parameters, color schemes, and layout options to match your exact requirements.",
    icon: Settings,
  },
];
