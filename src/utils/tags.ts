export async function fetchTags() {
  const response = await fetch("/api/tags");
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`${errorMessage}`);
  }
  const data = await response.json();
  return data.tags as Tag[];
}

export async function createTags(tagNames: string[]) {
  const response = await fetch("/api/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tagNames: tagNames,
    }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`${errorMessage}`);
  }
  const data = await response.json();
  return data.tags as Tag[];
}
