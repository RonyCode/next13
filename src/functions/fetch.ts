export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init: RequestInit | undefined
) {
  const data = await fetch(`${process.env.NEXTAUTH_URL}/${input}`, init);
  const result = await data.json();
  return result as T;
}
