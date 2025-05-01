import { OMDbResult } from "@/types/OMDb";

const baseURL = "https://www.omdbapi.com";

export function getAPIKey() {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  if (!apiKey) {
    throw new Error("OMDb API key is not set");
  }
  return apiKey;
}

/**
 * Searches OMDb for a movie or series by title.
 * @param options
 * @param options.title The title of the movie or series to search for. This can be a partial title.
 * @return Search results
 */
export async function search(options: {
  title: string;
}): Promise<OMDbResult[]> {
  if (!options.title) {
    throw new Error("Title is required");
  }
  const apiKey = getAPIKey();
  const url = `${baseURL}/?apikey=${apiKey}&t=${encodeURIComponent(
    options.title
  )}`;
  const response = await fetch(url);
  if (response.ok) {
    return response.json() as unknown as OMDbResult[];
  } else {
    throw new Error(`Request failed status: ${response.status}`);
  }
}
