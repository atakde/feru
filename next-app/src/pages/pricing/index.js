import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardBody } from "@heroui/react";
import { Button } from "@heroui/react";
import { Chip } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with performance monitoring",
      price: "$0",
      features: [
        "Monitor 3 URLs daily",
        "3 Regions available",
        "Basic Support",
        "No API Access",
        "No Custom Headers",
        "Basic Performance Metrics"
      ],
      buttonText: "Get Started",
      buttonVariant: "flat",
      popular: false
    },
    {
      name: "Pro",
      description: "For growing businesses that need more monitoring",
      price: "$29",
      period: "/month",
      features: [
        "Monitor 20 URLs daily",
        "All Regions available",
        "Priority Support",
        "API Access",
        "Custom Headers",
        "Advanced Performance Metrics",
        "Custom Alerts"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "solid",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: "Custom",
      features: [
        "Unlimited URL monitoring",
        "All Regions available",
        "24/7 Premium Support",
        "Full API Access",
        "Custom Headers",
        "Advanced Performance Metrics",
        "Unlimited Historical Data",
        "Custom Alerts",
        "Dedicated Account Manager",
        "Custom Integration Support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "flat",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "What happens when I exceed my URL limit?",
      answer: "We'll notify you when you're approaching your limit. You can upgrade your plan at any time to monitor more URLs. Your existing data will be preserved when you upgrade."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. When upgrading, you'll get immediate access to new features. When downgrading, you'll maintain access to your current features until the end of your billing period."
    },
    {
      question: "What kind of support do you offer?",
      answer: "Free tier users get basic email support with response times within 48 hours. Pro users get priority support with response times within 24 hours. Enterprise users get 24/7 premium support with dedicated account managers and custom integration assistance."
    },
    {
      question: "How does the hourly monitoring work?",
      answer: "Pro and Enterprise plans can monitor URLs hourly, providing more granular performance data. This is perfect for critical applications where you need to track performance changes throughout the day. The hourly monitoring can be enabled or disabled per URL."
    },
    {
      question: "What regions are available for testing?",
      answer: "Free tier users can test from 3 regions: US East (N. Virginia), EU Central (Frankfurt), and Asia Pacific (Singapore). Pro and Enterprise users get access to all regions, including additional locations for comprehensive global coverage."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 14-day money-back guarantee for Pro plan subscriptions. If you're not satisfied with our service, contact our support team within 14 days of your purchase for a full refund."
    }
  ];

  return (
    <>
      <Header />
      <div className="relative isolate px-6 lg:px-8 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10" />
        
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary-50 text-primary-600 ring-1 ring-inset ring-primary-600/20 mb-8">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            🚀 We're in Beta! Try FERU for free and help shape its future
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary-900">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-default-500">
            Choose the perfect plan for your needs. Start with our free tier and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Free Plan */}
          <Card className="relative">
            <CardBody className="p-0">
              <div className="p-8 border-b border-default-200">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-bold text-primary-900">Free</h2>
                  </div>
                  <p className="mt-4 text-sm text-default-500">Perfect for getting started with performance monitoring</p>
                  <div className="mt-6 flex items-baseline justify-center gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-primary-900">{plans[0].price}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <ul className="space-y-4">
                  {plans[0].features.map((feature) => (
                    <li key={feature} className="flex items-start gap-x-3">
                      <svg className="h-5 w-5 flex-none text-primary-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-default-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    color={plans[0].buttonVariant === "solid" ? "primary" : "default"}
                    variant={plans[0].buttonVariant}
                    className="w-full"
                    href="/"
                  >
                    {plans[0].buttonText}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Pro Plan */}
          <Card className="relative scale-105">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-primary-900">Coming Soon</p>
                <p className="text-sm text-primary-600 mt-1">Available after beta</p>
              </div>
            </div>
            <CardBody className="p-0">
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-primary-900">Pro</h3>
                  <Chip color="primary" variant="flat" size="sm" className="font-medium">
                    Recommended
                  </Chip>
                </div>
                <p className="mt-4 text-sm text-default-500">For growing businesses that need more monitoring</p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-primary-900">$29</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-default-500">/month</span>
                </div>
              </div>
              <div className="border-t border-default-200 px-8 py-6">
                <ul role="list" className="space-y-4">
                  {plans[1].features.map((feature) => (
                    <li key={feature} className="flex items-start gap-x-3">
                      <svg className="h-5 w-5 flex-none text-primary-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-default-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  color="primary"
                  variant="flat"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-primary-900">Coming Soon</p>
                <p className="text-sm text-primary-600 mt-1">Available after beta</p>
              </div>
            </div>
            <CardBody className="p-0">
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-primary-900">Enterprise</h3>
                </div>
                <p className="mt-4 text-sm text-default-500">For large organizations with advanced needs</p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-primary-900">Custom</span>
                </div>
              </div>
              <div className="border-t border-default-200 px-8 py-6">
                <ul role="list" className="space-y-4">
                  {plans[2].features.map((feature) => (
                    <li key={feature} className="flex items-start gap-x-3">
                      <svg className="h-5 w-5 flex-none text-primary-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-default-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  color="primary"
                  variant="flat"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto max-w-4xl mt-32">
          <h2 className="text-3xl font-bold text-primary-900 text-center mb-16">Frequently Asked Questions</h2>
          <Accordion variant="bordered" className="text-lg">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq.question}
                title={
                  <span className="text-lg font-semibold">{faq.question}</span>
                }
                className="px-6 py-4"
              >
                <p className="text-default-500 text-lg leading-relaxed">{faq.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
    </>
  );
} 