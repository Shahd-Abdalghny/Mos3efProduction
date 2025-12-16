// src/hooks/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyClNZiIPMCl9gdnWYO6nWgJ3bR2x8mr3H0");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'الطريقة غير مسموح بها' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'الرسالة مطلوبة' });
  }

  try {
    // اختيار النموذج (Gemini 1.5 Flash - مجاني وسريع)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      }
    });

    const prompt = `
      أنت مساعد ذكي عربي. 
      يجب أن تكون الردود:
      1. باللغة العربية الفصحى ما لم يطلب المستخدم خلاف ذلك
      2. ودية ومفيدة
      3. دقيقة وموجزة
      
      سؤال المستخدم: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ 
      success: true,
      message: text 
    });
  } catch (error) {
    console.error('خطأ في Gemini:', error);
    
    // رسائل خطأ مفيدة
    if (error.message.includes('API key')) {
      return res.status(401).json({ 
        success: false,
        message: 'مفتاح API غير صالح' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'حدث خطأ في الاتصال بالروبوت' 
    });
  }
}