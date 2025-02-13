import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getCompletion(prompt: string) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 5000,
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
    });
    return completion.choices[0].message.content;
}
