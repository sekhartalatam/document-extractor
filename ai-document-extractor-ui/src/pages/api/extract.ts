import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Simulate AI data extraction logic
    const { file } = req.body;
    res.status(200).json({ data: { extractedText: `Extracted data from ${file.name}` } });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
