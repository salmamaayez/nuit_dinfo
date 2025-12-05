export type Prediction = { word: string; prob: number; new_text?: string };

export async function getNextWords(phrase: string, top_k = 3): Promise<Prediction[]> {
  try {
    const res = await fetch("http://127.0.0.1:8001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: phrase, top_k })
    });

    if (!res.ok) return [];

    const data = await res.json();
    const candidates: Prediction[] = data.candidates || [];

    // ⚡ Fallback simple si pas assez de mots
    if (candidates.length < top_k) {
      const fallback: Prediction[] = [
        { word: "est", prob: 0.4 },
        { word: "a", prob: 0.35 },
        { word: "fait", prob: 0.25 }
      ].filter(f => !candidates.some(c => c.word === f.word));

      candidates.push(...fallback);
    }

    return candidates.slice(0, top_k);
  } catch (err) {
    console.error(err);
    return [
      { word: "est", prob: 0.4 },
      { word: "a", prob: 0.35 },
      { word: "fait", prob: 0.25 }
    ];
  }
}
