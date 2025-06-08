import { useState } from "react";
import { Select, SelectItem, Input } from "@heroui/react";
import { Button } from "@heroui/button";
import GlobalOutlined from '@ant-design/icons/GlobalOutlined';
import DesktopOutlined from '@ant-design/icons/DesktopOutlined';
import MobileOutlined from '@ant-design/icons/MobileOutlined';
import { REGIONS, DEVICES, MARKER_POSITIONS } from "@/constants";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import MarkedImage from "@/components/MarkedImage";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    url: '',
    region: 'us-east-1',
    device: 'desktop',
  });

  const handleChange = (el, name) => {
    setData({
      ...data,
      [name]: el.target.value,
    });
  }

  const handleUrlChange = url => {
    const urlWithoutProtocol = url
      .replace('https://', '')
      .replace('http://', '');
    setData({
      ...data,
      url: urlWithoutProtocol,
    });
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/lh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      if (result?.content?.id) {
        router.push(`/lh/${result.content.id}`);
      }
    }
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Test Your Website's Performance
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Enter your website URL below to instantly analyze its performance across different regions and devices. Get detailed insights in seconds.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600">1</span>
                    </div>
                    <p className="text-gray-600">Enter your website URL</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600">2</span>
                    </div>
                    <p className="text-gray-600">Select regions and devices to test</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600">3</span>
                    </div>
                    <p className="text-gray-600">Get instant performance results</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Start Your Performance Test</h3>
                    <p className="text-sm text-gray-500 mt-1">Free, instant results</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder="example.com"
                      labelPlacement="outside"
                      label="Website URL"
                      classNames={{
                        base: "w-full",
                      }}
                      value={data?.url}
                      onChange={(e) => handleUrlChange(e.target.value)}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">https://</span>
                        </div>
                      }
                      description="Enter your website URL without https://"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Test Locations"
                        placeholder="Select regions"
                        labelPlacement="outside"
                        defaultSelectedKeys={['us-east-1']}
                        startContent={<GlobalOutlined />}
                        disabledKeys={['ap-south-1', 'eu-north-1']}
                        selectionMode="multiple"
                        onChange={(value) => handleChange(value, 'region')}
                        description="Choose where to test from"
                        popoverProps={{
                          classNames: {
                            base: "before:bg-default-200",
                            content: "p-0 border-small border-divider bg-background",
                          },
                        }}
                      >
                        {REGIONS.map((each) => (
                          <SelectItem
                            title={each.label}
                            key={each.key}
                          >
                            {each.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Select
                        items={DEVICES}
                        label="Test Devices"
                        placeholder="Select devices"
                        labelPlacement="outside"
                        defaultSelectedKeys={['desktop']}
                        onChange={(value) => handleChange(value, 'device')}
                        description="Choose devices to test on"
                        popoverProps={{
                          classNames: {
                            base: "before:bg-default-200",
                            content: "p-0 border-small border-divider bg-background",
                          },
                        }}
                        renderValue={(items) => {
                          return items.map((item) => (
                            <div key={item.key} className="flex items-center gap-2">
                              {item.key === 'desktop' ? <DesktopOutlined /> : <MobileOutlined />}
                              <div className="flex flex-col">
                                <span>{item.data.label}</span>
                              </div>
                            </div>
                          ));
                        }}
                      >
                        {(device) => (
                          <SelectItem key={device.key} textValue={device.label}>
                            <div className="flex gap-2 items-center">
                              {device.key === 'desktop' ? <DesktopOutlined /> : <MobileOutlined />}
                              <div className="flex flex-col">
                                <span className="text-small">{device.label}</span>
                              </div>
                            </div>
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                    <Button
                      type="primary"
                      className="w-full mt-2"
                      size="lg"
                      onClick={handleSubmit}
                      isLoading={loading}
                      spinner={
                        <svg
                          className="animate-spin text-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          />
                        </svg>
                      }
                    >
                      {loading ? 'Running Tests...' : 'Run Performance Test'}
                    </Button>
                    <p className="text-sm text-gray-500 text-center">
                      By clicking Run Test, you agree to our <a href="#" className="text-primary-600">Terms of Service</a> and <a href="#" className="text-primary-600">Privacy Policy</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Testing Section */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Test from Anywhere in the World</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our global testing infrastructure allows you to measure your website's performance from multiple regions worldwide. Get accurate insights into how your users experience your site, regardless of their location.
                </p>
                <div className="space-y-6">
                  <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                        <GlobalOutlined className="text-xl text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 transition-colors duration-300">Global Coverage</h3>
                        <p className="text-sm text-gray-500">Test from 16+ global locations</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                        <span className="text-xl">⚡</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 transition-colors duration-300">Real-time Testing</h3>
                        <p className="text-sm text-gray-500">Get instant performance metrics</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 transition-colors duration-300">Detailed Insights</h3>
                        <p className="text-sm text-gray-500">Region-specific performance data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-lg">
                  <div className="p-8">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-50">
                      <MarkedImage
                        imageUrl="/world.png"
                        initialMarkers={[
                          { label: "US East (N. Virginia)", xPercent: 18.16, yPercent: 31.84 },
                          { label: "EU (Frankfurt)", xPercent: 48.88, yPercent: 27.35 },
                        ]
                        }
                        centerMarker={false}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-end text-sm text-gray-600">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
                        <p className="text-sm text-yellow-800 font-semibold">Currently, we're focusing on two key regions to provide you with the most accurate testing experience.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Device Testing Section */}
        <section className="py-24 px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-lg">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                        <DesktopOutlined className="text-2xl text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Multi-Device Testing</h3>
                        <p className="text-sm text-gray-500">Test on any device type</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-300 cursor-pointer">
                        <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center hover:bg-primary-100 transition-colors duration-300">
                          <DesktopOutlined className="text-xl text-gray-600 hover:text-primary-600 transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 hover:text-primary-600 transition-colors duration-300">Desktop Testing</p>
                          <p className="text-sm text-gray-500">Full browser experience</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors duration-300 cursor-pointer">
                        <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center hover:bg-primary-100 transition-colors duration-300">
                          <MobileOutlined className="text-xl text-gray-600 hover:text-primary-600 transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 hover:text-primary-600 transition-colors duration-300">Mobile Testing</p>
                          <p className="text-sm text-gray-500">Mobile-first experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Test on Any Device</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ensure your website performs flawlessly across all devices. Our comprehensive testing suite simulates both desktop and mobile experiences, giving you complete confidence in your site's responsiveness.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-primary-600 rounded-full"></span>
                    <span>Desktop and mobile testing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-primary-600 rounded-full"></span>
                    <span>Responsive design validation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-primary-600 rounded-full"></span>
                    <span>Device-specific optimizations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Reports Section */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Performance Reports</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Get detailed insights into your website's performance with our comprehensive reporting system. Understand exactly what's affecting your site's speed and how to improve it.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-primary-600 rounded-full"></span>
                    <span>Detailed performance metrics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-primary-600 rounded-full"></span>
                    <span>Actionable improvement suggestions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-primary-600 rounded-full"></span>
                    <span>Historical performance tracking</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-lg">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                        <span className="text-2xl">📊</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Detailed Analytics</h3>
                        <p className="text-sm text-gray-500">Comprehensive performance insights</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg group/metric hover:bg-primary-50 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 group-hover/metric:text-primary-600 transition-colors duration-300">Performance Score</span>
                          <span className="text-sm text-gray-500 group-hover/metric:text-primary-600 transition-colors duration-300">92/100</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-2 bg-primary-600 rounded-full group-hover/metric:animate-progress" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg group/metric hover:bg-primary-50 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 group-hover/metric:text-primary-600 transition-colors duration-300">Load Time</span>
                          <span className="text-sm text-gray-500 group-hover/metric:text-primary-600 transition-colors duration-300">1.2s</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-2 bg-green-500 rounded-full group-hover/metric:animate-progress" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg group/metric hover:bg-primary-50 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 group-hover/metric:text-primary-600 transition-colors duration-300">First Contentful Paint</span>
                          <span className="text-sm text-gray-500 group-hover/metric:text-primary-600 transition-colors duration-300">0.8s</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-2 bg-blue-500 rounded-full group-hover/metric:animate-progress" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
