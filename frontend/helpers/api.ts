export type Prediction = {
  word: string;
  confidence: number;
};

const API_URL = "http://127.0.0.1:8000/predict";

export async function getPredictions(text: string): Promise<Prediction[]> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, top_k: 4, max_new_tokens: 3 })
    });

    if (!res.ok) throw new Error("Erreur serveur " + res.status);

    const data = await res.json();
    
    // Convertir la réponse pour correspondre à ton type Prediction
    return data.candidates.map((c: any) => ({
      word: c.word,
      confidence: Math.round((c.prob || 0) * 100)
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}
