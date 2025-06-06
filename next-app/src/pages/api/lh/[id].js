import { createClient } from "@/utils/supabase/server";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const supabase = createClient({ req, res });
  
  // First get the lighthouse test status
  const { data: testData, error: testError } = await supabase
    .from("lighthouse")
    .select("*")
    .eq("id", id)
    .single();

  if (testError) {
    console.error(testError);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!testData) {
    return res.status(404).json({ message: "Test not found" });
  }

  // If test is completed, fetch the results from lighthouse_results
  if (testData.status === 'COMPLETED') {
    const { data: resultsData, error: resultsError } = await supabase
      .from("lighthouse_results")
      .select("*")
      .eq("relation_id", id)
      .single();

    if (resultsError) {
      console.error(resultsError);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (resultsData?.json_report_url) {
      try {
        const jsonResponse = await fetch(resultsData.json_report_url);
        if (!jsonResponse.ok) {
          throw new Error('Failed to fetch JSON report');
        }
        const jsonData = await jsonResponse.json();
        return res.status(200).json({
          status: testData.status,
          region: testData.region,
          device: testData.device,
          url: testData.url,
          created_at: testData.created_at,
          finished_at: resultsData.created_at,
          results: {
            ...resultsData,
            metrics: jsonData
          }
        });
      } catch (error) {
        console.error('Error fetching JSON report:', error);
        return res.status(200).json({
          status: testData.status,
          results: resultsData,
        });
      }
    }

    return res.status(200).json({
      status: testData.status,
      results: resultsData
    });
  }

  return res.status(200).json({
    status: testData.status
  });
} 