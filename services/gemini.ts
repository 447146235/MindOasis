import { GoogleGenAI, Chat, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION_THERAPIST, SYSTEM_INSTRUCTION_QUOTE } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const createTherapistChat = (): Chat => {
  const client = getClient();
  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_THERAPIST,
      temperature: 0.7,
    },
  });
};

export const generateDailyQuote = async (): Promise<string> => {
  const client = getClient();
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Give me a quote',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_QUOTE,
        temperature: 1.0,
      }
    });
    return response.text || "保持热爱，奔赴山海。";
  } catch (error) {
    console.error("Failed to generate quote", error);
    return "休息是为了走更长远的路。";
  }
};

export const convertTextToSpeech = async (text: string): Promise<string | null> => {
  const client = getClient();
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    // The audio data is in the first part's inlineData
    const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (audioData) {
      return audioData; // Returns Base64 string
    }
    return null;
  } catch (error) {
    console.error("TTS generation failed", error);
    return null;
  }
};