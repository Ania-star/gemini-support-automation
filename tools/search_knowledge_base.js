/**
 * search_knowledge_base.js
 * Custom tool for searching KB files based on category + query.
 */

import fs from "fs";

export async function search_knowledge_base({ category, query }) {
  // Map categories to filenames
  const fileMapping = {
    IT: "kb_it.txt",
    HR: "kb_hr.txt",
    Software: "kb_software.txt"
  };

  const kbPath = `knowledge_base/${fileMapping[category]}`;

  if (!fs.existsSync(kbPath)) {
    return { results: [`No KB found for category: ${category}`] };
  }

  const content = fs.readFileSync(kbPath, "utf-8").split("\n");

  const matched = content.filter(line =>
    line.toLowerCase().includes(query.toLowerCase())
  );

  return {
    category,
    query,
    results: matched.length > 0 ? matched : ["No matches found."]
  };
}
