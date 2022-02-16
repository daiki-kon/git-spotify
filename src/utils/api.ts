export async function fetcher(url: string, token: string | undefined) {
  if (token === undefined) {
    return null;
  }
  const response = await fetch(`${url}?accessToken=${token}`);
  return response.json();
}
