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

  const { data: jobData, error: jobError } = await supabase
    .from("lighthouse_job")
    .select("*")
    .eq("id", id)
    .single();

  if (jobError) {
    console.error(jobError);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!jobData) {
    return res.status(404).json({ message: "Job not found" });
  }

  // Fetch all regional results
  const { data: regionResults, error: regionError } = await supabase
    .from("lighthouse_result")
    .select("*")
    .eq("job_id", id);

  if (regionError) {
    console.error(regionError);
    return res.status(500).json({ message: "Error fetching region results" });
  }

  const results = regionResults.map((result) => ({
    id: result.id,
    region: result.region,
    status: result.status,
    created_at: result.created_at,
    s3_report_url: result.s3_report_url,
    metrics: {
      lcp: result.lcp,
      fcp: result.fcp,
      cls: result.cls,
      tbt: result.tbt,
      tti: result.tti,
      score: result.score,
    },
  }));

  return res.status(200).json({
    status: jobData.status,
    url: jobData.url,
    device: jobData.device,
    ip: jobData.ip,
    username: jobData.username,
    created_at: jobData.created_at,
    completed_at: jobData.completed_at,
    regions: jobData.regions,
    results,
  });
}