import Header from "@/components/Header";
import { Card, CardBody } from "@heroui/react";
import { Chip } from "@heroui/react";
import { Button } from "@heroui/react";
import { Divider } from "@heroui/react";

export default function Features() {
  const features = [
    {
      title: "Global Performance Testing",
      description: "Run Lighthouse tests from multiple regions worldwide to ensure consistent performance across different geographical locations. Get insights into how your website performs for users around the globe.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      details: [
        "US East (N. Virginia)",
        "EU Central (Frankfurt)",
        "Asia Pacific (Singapore)",
        "EU North (Stockholm)"
      ],
      stats: [
        { label: "Global Coverage", value: "100%" },
        { label: "Test Regions", value: "4+" },
        { label: "Response Time", value: "< 2s" }
      ]
    },
    {
      title: "Comprehensive Metrics",
      description: "Get detailed insights into your website's performance with industry-standard metrics and scoring. Track and improve your Core Web Vitals and other crucial performance indicators.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      details: [
        "First Contentful Paint (FCP)",
        "Largest Contentful Paint (LCP)",
        "Cumulative Layout Shift (CLS)",
        "Total Blocking Time (TBT)",
        "Time to Interactive (TTI)"
      ],
      stats: [
        { label: "Core Web Vitals", value: "5+" },
        { label: "Custom Metrics", value: "10+" },
        { label: "Real-time Updates", value: "Yes" }
      ]
    },
    {
      title: "Real-time Monitoring",
      description: "Monitor your website's performance in real-time with live updates and status tracking. Get instant notifications and detailed progress information for all your tests.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      details: [
        "Live test status updates",
        "Progress tracking",
        "Instant result notifications",
        "Detailed error reporting"
      ],
      stats: [
        { label: "Update Frequency", value: "Real-time" },
        { label: "Alert Types", value: "5+" },
        { label: "Integration Options", value: "10+" }
      ]
    },
    {
      title: "AI-Powered Analysis",
      description: "Our MCP (Model Context Provider) server enables AI Agents to access and analyze global Lighthouse test results. AI Agents can leverage this data to provide intelligent insights and automated performance optimization recommendations across different regions.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      details: [
        "Global LH results access",
        "Multi-region data analysis",
        "AI-driven insights",
        "Automated optimization"
      ],
      stats: [
        { label: "Global Coverage", value: "4+" },
        { label: "Data Points", value: "100+" },
        { label: "AI Integration", value: "Yes" }
      ]
    }
  ];

  return (
    <>
      <Header />
      <div className="relative isolate">
        {/* Hero Section */}
        <div className="relative px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary-900">
              Monitor Your Website's Performance Globally
            </h1>
            <p className="mt-6 text-lg leading-8 text-default-500">
              FERU provides comprehensive performance testing and monitoring across multiple global regions, helping you ensure optimal user experience worldwide. Our MCP server enables AI Agents to access and analyze global Lighthouse test results for intelligent performance optimization.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                color="primary"
                size="lg"
                className="px-8"
                href="/"
              >
                Start Testing Now
              </Button>
              <Button
                variant="flat"
                size="lg"
                href="/docs"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>

        {/* Features Sections */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 py-24 ${
                index !== features.length - 1 ? 'border-b border-default-200' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <h2 className="text-3xl font-bold tracking-tight text-primary-900">{feature.title}</h2>
                </div>
                <p className="text-lg text-default-500">{feature.description}</p>
                <div className="flex flex-wrap gap-3">
                  {feature.details.map((detail, idx) => (
                    <Chip
                      key={idx}
                      size="lg"
                      variant="flat"
                      color="primary"
                      className="text-sm"
                    >
                      {detail}
                    </Chip>
                  ))}
                </div>
                <Divider className="my-8" />
                <div className="grid grid-cols-3 gap-4">
                  {feature.stats.map((stat, idx) => (
                    <Card key={idx}>
                      <CardBody className="p-4 text-center">
                        <p className="text-sm text-default-500">{stat.label}</p>
                        <p className="text-xl font-semibold text-primary-900">{stat.value}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Image/Illustration */}
              <div className="flex-1">
                <Card>
                  <CardBody className="p-8">
                    <div className="aspect-[4/3] w-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative px-6 lg:px-8 py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-default-50 to-white -z-10" />
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary-900">
              Start Your Global Performance Journey
            </h2>
            <p className="mt-6 text-lg leading-8 text-default-500">
              Join FERU to monitor and optimize your website's performance across the globe. Let our AI agents help you achieve the best possible user experience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                color="primary"
                size="lg"
                className="px-8"
                href="/"
              >
                Start Testing Now
              </Button>
              <Button
                variant="flat"
                size="lg"
                href="/docs"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 