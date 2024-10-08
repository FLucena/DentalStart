import { NextRequest, NextResponse } from 'next/server';

const scriptURL = "https://script.google.com/macros/s/AKfycbzdITpctADgwshAIoXZTRfrGWqTnOkssWIgqnhdGgSQtJNy5hiLkXPaEu2a0mesMUdBoA/exec";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const responseText = await response.text();

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { error: 'La respuesta del servidor no es JSON' };
    }

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });

    if (response.ok) {
      return NextResponse.json(result, { status: 200, headers });
    } else {
      return NextResponse.json(result, { status: 500, headers });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    return NextResponse.json({ error: 'Error handling request' }, { status: 500, headers });
  }
}

export async function OPTIONS(request: NextRequest) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });
  return new NextResponse(null, { status: 204, headers });
}