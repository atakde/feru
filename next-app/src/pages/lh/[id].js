import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import { Button } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";
import { Chip, Spinner } from "@heroui/react";

export default function LighthouseResults() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/lh/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        if (data.status === 'COMPLETED') {
          clearInterval(pollInterval);
          setLoading(false);
          setTestData(data);
        } else if (data.status === 'FAILED') {
          clearInterval(pollInterval);
          setLoading(false);
          setError('Test failed');
        }
      } catch (error) {
        console.error('Polling error:', error);
        setError(error.message);
        clearInterval(pollInterval);
        setLoading(false);
      }
    }, 2000);

    // Clear interval after 5 minutes (timeout)
    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
      setLoading(false);
      setError('Test timed out');
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
    };
  }, [id]);

  const getShortPerformanceMetric = (metric) => {
    switch (metric) {
      case 'first-contentful-paint':
        return 'FCP';
      case 'largest-contentful-paint':
        return 'LCP';
      case 'cumulative-layout-shift':
        return 'CLS';
      case 'total-blocking-time':
        return 'TBT';
      case 'speed-index':
        return 'SI';
      case 'interactive':
        return 'TTI';
      case 'server-response-time':
        return 'SRT';
      default:
        return metric.replace(/-/g, ' ').toUpperCase();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'FAILED':
        return 'danger';
      case 'PENDING':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
            <div className="flex flex-col items-center justify-center space-y-8">
              <Spinner size="lg" color="primary" />
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold">Running Lighthouse Test...</h2>
                <p className="text-default-500">This may take a few moments</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56">
            <Card className="max-w-md mx-auto">
              <CardBody className="text-center space-y-4">
                <div className="text-danger">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-danger">Error</h2>
                <p className="text-default-500">{error}</p>
                <Button
                  color="primary"
                  variant="flat"
                  onClick={() => router.push('/')}
                >
                  Try Again
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-8 sm:py-12">
          {testData && (
            <div className="space-y-8">
              {/* Test Details */}
              <Card className="w-full shadow-sm bg-white">
                <CardBody className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="font-semibold truncate">{testData?.url}</h2>
                        <Chip color={getStatusColor(testData.status)} variant="flat" size="sm">
                          {testData.status}
                        </Chip>
                      </div>
                      <div className="flex items-center gap-4 py-2 mb-4">
                          <div className='space-y-1'>
                          <p className="text-sm">
                            {testData?.status === 'COMPLETED' ? `Finished at ${new Date(testData.finished_at).toLocaleString()}` : 'In Progress'}
                          </p>
                          <p className="text-sm">
                            Took {testData?.status === 'COMPLETED' ? `${Math.round((new Date(testData.finished_at) - new Date(testData.created_at)) / 1000)} seconds` : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                          <div>
                            <p className="text-default-500 mb-1">Device</p>
                            <p className="font-medium capitalize">{testData?.device}</p>
                          </div>
                          <div>
                            <p className="text-default-500 mb-1">Region</p>
                            <p className="font-medium">{testData?.region}</p>
                          </div>
                          <div>
                            <p className="text-default-500 mb-1">Lighthouse Version</p>
                            <p className="font-medium">{testData.results?.metrics?.lighthouseVersion}</p>
                          </div>
                          <div>
                            <p className="text-default-500 mb-1">Test Date</p>
                            <p className="font-medium">{new Date(testData?.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>


              {/* Regional Performance */}
              {testData.results?.metrics?.audits && (
                <Card className="w-full shadow-sm">
                  <CardBody className="p-6">
                    <h3 className="text-md font-semibold mb-4">Regional Performance Metrics</h3>
                    <p className="text-sm text-default-500 mb-6">
                      The following metrics are based on the Lighthouse test results for different regions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                      {['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'].map((region) => {
                        const isAvailable = testData?.region === region;
                        const audits = testData.results?.metrics?.audits;

                        return (
                          <Card key={region} className="bg-default-50 shadow-sm">
                            <CardBody className={`p-4 ${isAvailable ? '' : 'opacity-50'}`}>
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">
                                    {region === 'us-east-1' && '🇺🇸'}
                                    {region === 'us-west-2' && '🇺🇸'}
                                    {region === 'eu-west-1' && '🇪🇺'}
                                    {region === 'ap-southeast-1' && '🇸🇬'}
                                  </span>
                                  <Chip size="sm" variant="flat">
                                    {region.replace('-', ' ').toUpperCase()}
                                  </Chip>
                                </div>
                                {!isAvailable && (
                                  <Chip size="sm" variant="flat" color="default" className="opacity-50">
                                    Not Available
                                  </Chip>
                                )}
                              </div>


                              {isAvailable ? (
                                <div className="space-y-4">
                                  {[
                                    'first-contentful-paint',
                                    'largest-contentful-paint',
                                    'server-response-time',
                                    'interactive'
                                  ].map((metric) => {
                                    const audit = audits?.[metric];
                                    if (!audit) return null;

                                    const scoreColor = audit.score >= 0.9 ? 'success' : audit.score >= 0.5 ? 'warning' : 'danger';

                                    console.log(audit);
                                    return (
                                      <div key={metric} className="p-3 bg-white rounded-lg flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                          <span className="text-sm font-medium">{getShortPerformanceMetric(metric)}</span>
                                          <Chip size="sm" color={scoreColor} variant="flat">
                                            {audit.displayValue}
                                          </Chip>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="text-center text-default-400 text-sm mt-8">
                                  Regional test data is not available.
                                </div>
                              )}

                              {isAvailable && (
                                <p className="mt-6 text-sm text-default-500">
                                  You can view the full report for this region on the{' '}
                                  <a
                                    href={testData.results?.html_report_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:underline"
                                  >
                                    Regional Lighthouse Report
                                  </a>.
                                </p>
                              )}
                            </CardBody>
                          </Card>
                        );
                      })}
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 