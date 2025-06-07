import { orchestrateLighthouseAnalysis } from "@/utils/lh/orchestrator";
import { createClient } from "@/utils/supabase/server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url, device, region } = req.body;

  if (!url) {
    res.status(400).json({ message: "URL is required" });
  }

  if (!device) {
    res.status(400).json({ message: "Device is required" });
  }

  if (!region) {
    res.status(400).json({ message: "Region is required" });
  }

  const parsedRegions = region.split(',').map(r => r.trim());
  const availableRegions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1', 'eu-central-1'];

  if (!parsedRegions.every(r => availableRegions.includes(r))) {
    res.status(400).json({ message: "Invalid region(s) provided" });
  }

  const urlWithProtocol = url.startsWith('https') ? url : `https://${url}`;
  const supabase = createClient({ req, res });
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    res.status(401).json({ message: "Unauthorized: User not authenticated" });
  }
  
  const ip = req?.ip;

  const { data, error } = await supabase.from("lighthouse_job").insert([
    {
      url: urlWithProtocol,
      device,
      ip,
      user_id: user.id,
      regions: parsedRegions,
    },
  ]).select();

  if (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  let hasErrorInLHService = false;
  for (const eachRegion of parsedRegions) {
    const taskResult = await orchestrateLighthouseAnalysis({
      traceId: data[0].id,
      url: urlWithProtocol,
      device,
      region:eachRegion
    });

    console.log("Task Result:", taskResult);
    if (!taskResult || !taskResult.taskArn) {
      hasErrorInLHService = true;
      break;
    }
  }

  // TODO:: log error to a monitoring service
  if (hasErrorInLHService) {
    await supabase.from("lighthouse").update({ status: 'FAILED' }).eq('id', data[0].id);
    res.status(500).json({ message: "Failed to orchestrate Lighthouse analysis" });
  }

  if (data && data.length > 0) {
    const id = data[0].id;
    res.status(200).json({ content: { id } });
  } else {
    res.status(500).json({ message: "Failed to create Lighthouse entry" });
  }
}
