export async function fetchMessages() {
  const response = await fetch("/api/messages");
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`${errorMessage}`);
  }
  const data = await response.json();
  return data.messages as Message[];
}

export async function createMessage(
  messageContent: string,
  tagNames: string[]
) {
  const response = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messageContent: messageContent,
      tagNames: tagNames,
    }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`${errorMessage}`);
  }
  const data = await response.json();
  return data.message as Message;
}
