/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {

  const body = await request.formData();

  // Return error if body formdata does not have name or opinion
  if (!body.has('name') || !body.has('opinion')) {
    return {
      status: 400,
      body: {
        error: 'Missing name or opinion'
      }
    };
  }

  try {
    const response = await fetch('https://n8n-ext.vsy.io/webhook/demo/add-opinion/form', {
      method: 'POST', 
      body
    });
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Error posting opinion'
      }
    };
  }
  
 
  return {
    body: {
      sentOpinion: {
        name: body.get('name')?.toString(),
        text: body.get('opinion')?.toString()
      }
    }
  };
}