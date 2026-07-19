import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const apiBase = process.env.AI_API_BASE;
    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL;

    if (!apiBase || !apiKey || !model) {
      return NextResponse.json({ error: 'AI service is not configured' }, { status: 500 });
    }

    const response = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => 'Unknown error');
      console.error('AI API error:', response.status, errText);
      return NextResponse.json({ error: 'AI service unavailable. Please try again.' }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'AI request failed';
    console.error('AI chat error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}