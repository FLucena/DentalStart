import { NextRequest, NextResponse } from 'next/server';

const scriptURL = "https://script.google.com/macros/s/AKfycbwZmrZT--7QhwJeRYfqmhiCjLGqW7jWlmj5sJwSPmD9/dev";

export async function POST(request: NextRequest) {
    try {
      const formData = await request.json();
      console.log('Form Data:', formData);
  
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseText = await response.text();
      console.log('Response Text:', responseText);
  
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        result = { error: 'La respuesta del servidor no es JSON' };
      }
  
      if (response.ok) {
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json(result, { status: 500 });
      }
    } catch (error) {
      console.error('Error in API route:', error);
      return NextResponse.json({ error: 'Error handling request' }, { status: 500 });
    }
  }
  