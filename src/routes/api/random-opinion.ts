export async function get() {
  const url = `https://n8n-ext.vsy.io/webhook/demo/opinions?random=true`;
    const response = await fetch(url);
    
    // get first item from response
    const data = await response.json();
    const item = data[0];
  return {
    body: item,
  };
}