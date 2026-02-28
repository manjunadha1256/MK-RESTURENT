/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { Order, MenuItem, Feedback } from "../data/mockData";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface AIOffer {
  id: string;
  title: string;
  description: string;
  discountCode: string;
  discountPercentage: number;
  type: 'Personalized' | 'Time-based' | 'Festival-specific';
  reason: string;
  duration: string;
  bannerColor: string;
}

export const generateAIOffers = async (
  orders: Order[],
  items: MenuItem[],
  feedback: Feedback[]
): Promise<AIOffer[]> => {
  try {
    const prompt = `
      Analyze the following restaurant data and suggest 3 highly effective, personalized, time-based, or festival-specific offers to maximize revenue and customer engagement.
      
      Orders Data: ${JSON.stringify(orders.slice(0, 20))}
      Menu Items: ${JSON.stringify(items.map(i => ({ name: i.name, category: i.category, price: i.price, salesCount: i.salesCount })))}
      Customer Feedback: ${JSON.stringify(feedback.slice(0, 10))}
      
      Current Time: ${new Date().toLocaleString()}
      
      Return the suggestions as a JSON array of objects with the following structure:
      {
        "id": "unique-id",
        "title": "Catchy Offer Title",
        "description": "Brief description of the offer",
        "discountCode": "PROMOCODE",
        "discountPercentage": number,
        "type": "Personalized" | "Time-based" | "Festival-specific",
        "reason": "Why this offer was suggested based on data",
        "duration": "e.g., 2 hours, 3 days",
        "bannerColor": "A hex color code or tailwind color class (e.g., bg-emerald-500)"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              discountCode: { type: Type.STRING },
              discountPercentage: { type: Type.NUMBER },
              type: { type: Type.STRING },
              reason: { type: Type.STRING },
              duration: { type: Type.STRING },
              bannerColor: { type: Type.STRING }
            },
            required: ["id", "title", "description", "discountCode", "discountPercentage", "type", "reason", "duration", "bannerColor"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error generating AI offers:", error);
    return [];
  }
};
