import { Card, CardBody, Button, Chip } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";
import Header from "@/components/Header";

export default function ApiDocs() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/performance",
      description: "Get performance metrics for a specific URL",
      params: [
        { name: "url", type: "string", required: true, description: "The URL to analyze" },
        { name: "region", type: "string", required: false, description: "Target region for testing (default: us-east-1)" }
      ],
      example: {
        request: "GET /api/v1/performance?url=https://example.com&region=eu-west-1",
        response: {
          "lighthouse": {
            "performance": 92,
            "accessibility": 95,
            "bestPractices": 100,
            "seo": 100
          },
          "metrics": {
            "firstContentfulPaint": 1.2,
            "largestContentfulPaint": 2.1,
            "cumulativeLayoutShift": 0.1,
            "totalBlockingTime": 50
          }
        }
      }
    },
    {
      method: "POST",
      path: "/api/v1/monitor",
      description: "Set up continuous monitoring for a URL",
      params: [
        { name: "url", type: "string", required: true, description: "The URL to monitor" },
        { name: "frequency", type: "string", required: false, description: "Monitoring frequency (hourly/daily)" },
        { name: "regions", type: "array", required: false, description: "List of regions to monitor" }
      ],
      example: {
        request: {
          "url": "https://example.com",
          "frequency": "hourly",
          "regions": ["us-east-1", "eu-west-1"]
        },
        response: {
          "id": "mon_123456",
          "status": "active",
          "nextCheck": "2024-03-20T15:00:00Z"
        }
      }
    },
    {
      method: "GET",
      path: "/api/v1/history",
      description: "Get historical performance data",
      params: [
        { name: "monitorId", type: "string", required: true, description: "The monitor ID" },
        { name: "from", type: "string", required: false, description: "Start date (ISO format)" },
        { name: "to", type: "string", required: false, description: "End date (ISO format)" }
      ],
      example: {
        request: "GET /api/v1/history?monitorId=mon_123456&from=2024-03-01&to=2024-03-20",
        response: {
          "data": [
            {
              "timestamp": "2024-03-20T14:00:00Z",
              "performance": 92,
              "metrics": {
                "firstContentfulPaint": 1.2,
                "largestContentfulPaint": 2.1
              }
            }
          ]
        }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-default-50 to-white">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary-50 text-primary-600 ring-1 ring-inset ring-primary-600/20 mb-8">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            🚀 We're in Beta! Try FERU for free and help shape its future
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary-900">
            API Documentation
          </h1>
          <p className="mt-6 text-lg leading-8 text-default-600">
            Integrate FERU's performance monitoring capabilities into your applications with our RESTful API.
          </p>
        </div>

        {/* Authentication */}
        <div className="mx-auto max-w-3xl mt-16">
          <Card className="bg-primary-50">
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Authentication</h2>
              <p className="text-default-600 mb-4">
                All API requests require authentication using an API key. Include your API key in the Authorization header:
              </p>
              <div className="bg-default-100 p-4 rounded-lg">
                <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Endpoints */}
        <div className="mx-auto max-w-3xl mt-16">
          <h2 className="text-2xl font-bold text-primary-900 mb-8">Available Endpoints</h2>
          <div className="space-y-8">
            {endpoints.map((endpoint) => (
              <Card key={endpoint.path} className="border border-default-200">
                <CardBody className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Chip
                      color={endpoint.method === "GET" ? "success" : "primary"}
                      variant="flat"
                      className="font-medium"
                    >
                      {endpoint.method}
                    </Chip>
                    <code className="text-sm font-mono">{endpoint.path}</code>
                  </div>
                  <p className="text-default-600 mb-6">{endpoint.description}</p>

                  <Accordion>
                    <AccordionItem
                      key="parameters"
                      aria-label="Parameters"
                      title="Parameters"
                      className="px-0"
                    >
                      <div className="space-y-4">
                        {endpoint.params.map((param) => (
                          <div key={param.name} className="flex gap-4">
                            <div className="w-32">
                              <code className="text-sm font-mono">{param.name}</code>
                              {param.required && (
                                <span className="ml-2 text-xs text-danger-500">required</span>
                              )}
                            </div>
                            <div>
                              <span className="text-sm text-default-500">{param.description}</span>
                              <span className="text-sm text-default-400 ml-2">({param.type})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>

                    <AccordionItem
                      key="example"
                      aria-label="Example"
                      title="Example"
                      className="px-0"
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Request</h4>
                          <div className="bg-default-100 p-4 rounded-lg">
                            <code className="text-sm font-mono whitespace-pre-wrap">
                              {typeof endpoint.example.request === "string"
                                ? endpoint.example.request
                                : JSON.stringify(endpoint.example.request, null, 2)}
                            </code>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Response</h4>
                          <div className="bg-default-100 p-4 rounded-lg">
                            <code className="text-sm font-mono whitespace-pre-wrap">
                              {JSON.stringify(endpoint.example.response, null, 2)}
                            </code>
                          </div>
                        </div>
                      </div>
                    </AccordionItem>
                  </Accordion>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Rate Limits */}
        <div className="mx-auto max-w-3xl mt-16">
          <Card className="bg-default-50">
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">Rate Limits</h2>
              <p className="text-default-600">
                During the beta period, API requests are limited to 100 requests per hour per API key.
                Rate limit headers are included in all responses:
              </p>
              <div className="bg-default-100 p-4 rounded-lg mt-4">
                <code className="text-sm">
                  X-RateLimit-Limit: 100<br />
                  X-RateLimit-Remaining: 99<br />
                  X-RateLimit-Reset: 1616248800
                </code>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-3xl mt-16 text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Ready to Get Started?</h2>
          <p className="text-default-600 mb-8">
            Sign up for a free account to get your API key and start monitoring your website's performance.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              color="primary"
              variant="solid"
              href="/signup"
            >
              Get Your API Key
            </Button>
            <Button
              color="primary"
              variant="flat"
              href="https://github.com/your-repo"
              target="_blank"
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 