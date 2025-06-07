import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from "@/components/Header";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
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

    let pollInterval;
    let timeout;

    const poll = async () => {
      try {
        const response = await fetch(`/api/lh/${id}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        setLoading(false);
        setError(null);

        const data = await response.json();
        setTestData(data);

        if (data.status === 'COMPLETED') {
          clearInterval(pollInterval);
          clearTimeout(timeout);
          setTestData(data);
        } else if (data.status === 'FAILED') {
          clearInterval(pollInterval);
          clearTimeout(timeout);
          setLoading(false);
          setError('Test failed');
        }
      } catch (error) {
        console.error('Polling error:', error);
        setError(error.message);
        clearInterval(pollInterval);
        clearTimeout(timeout);
        setLoading(false);
      }
    };

    poll();

    pollInterval = setInterval(poll, 2000);

    timeout = setTimeout(() => {
      clearInterval(pollInterval);
      setLoading(false);
      setError('Test timed out');
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
    };
  }, [id]);

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
        <div className="flex items-center justify-center h-screen">
          <Spinner color="primary" label="Loading..." />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="relative isolate px-2 max-w-[1536px] mx-auto">
        <div className="mx-auto py-8 sm:py-12">
          {testData && (
            <div className="space-y-8">
              {/* Test Details */}
              <Breadcrumbs className="px-4 mb-6" variant='solid'>
                <BreadcrumbItem href="/">Lighthouse Tests</BreadcrumbItem>
                <BreadcrumbItem href={`/lh/${id}`}>Test ID: {id}</BreadcrumbItem>
              </Breadcrumbs>
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
                            {testData?.status === 'COMPLETED' ? `Finished at ${new Date(testData.completed_at).toLocaleString()}` : 'Test is still running'}
                          </p>
                          <p className="text-sm">
                            Took {testData?.status === 'COMPLETED' ? `${Math.round((new Date(testData.completed_at) - new Date(testData.created_at)) / 1000)} seconds` : 'N/A'}
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
                            <p className="text-default-500 mb-1">Regions</p>
                            <p className="font-medium">{testData?.regions?.join(', ') || 'N/A'}</p>
                          </div>
                          {/* <div>
                            <p className="text-default-500 mb-1">Lighthouse Version</p>
                            <p className="font-medium">{testData.results?.metrics?.lighthouseVersion}</p>
                          </div> */}
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
              {testData.results && (
                <Card className="w-full shadow-sm">
                  <CardBody className="p-6">
                    <h3 className="text-md font-semibold mb-4">Regional Performance Metrics</h3>
                    <p className="text-sm text-default-500 mb-6">
                      The following metrics are based on the Lighthouse test results for different regions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                      {['us-east-1', 'eu-central-1', 'ap-southeast-1', 'eu-north-1'].map((region) => {
                        const regionalResult = testData.results?.find((result) => result.region === region);
                        const isAvailable = regionalResult && regionalResult.status === 'COMPLETED';
                        const audits = regionalResult?.metrics || {};
                        const isTestRunningForTheRegion = testData?.regions?.includes(region);

                        return (
                          <Card key={region} className="bg-default-50 shadow-sm">
                            <CardBody className={`p-4 ${(isAvailable || isTestRunningForTheRegion) ? '' : 'opacity-50'}`}>
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">
                                    {region === 'us-east-1' && '🇺🇸'}
                                    {region === 'eu-central-1' && '🇩🇪'}
                                    {region === 'eu-west-1' && '🇪🇺'}
                                    {region === 'ap-southeast-1' && '🇸🇬'}
                                  </span>
                                  <Chip size="sm" variant="flat">
                                    {region.replace('-', ' ').toUpperCase()}
                                  </Chip>
                                </div>
                              </div>

                              {isAvailable ? (
                                <div className="space-y-4">
                                  {[
                                    'cls',
                                    'fcp',
                                    'lcp',
                                    'tbt',
                                    'tti',
                                  ].map((metric) => {
                                    const audit = audits?.[metric];
                                    if (!audit) return null;

                                    const auditColor = audit >= 0.9 ? 'success' : audit >= 0.5 ? 'warning' : 'danger';

                                    console.log(audit);
                                    return (
                                      <div key={metric} className="p-3 bg-white rounded-lg flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                          <span className="text-sm font-medium">{metric.toUpperCase()}</span>
                                          <Chip size="sm" color={auditColor} variant="flat">
                                            {audit.toFixed(2)}
                                          </Chip>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="text-center text-default-400 text-sm mt-8">
                                  {(regionalResult?.status === 'RUNNING' || isTestRunningForTheRegion) ? (
                                    <Spinner size="sm" />
                                  ) : (
                                    <p>Test results are not available for this region.</p>
                                  )}
                                </div>
                              )}

                              {isAvailable && (
                                <p className="mt-6 text-sm text-default-500">
                                  You can view the full report for this region on the{' '}
                                  <a
                                    href={regionalResult.s3_report_url}
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