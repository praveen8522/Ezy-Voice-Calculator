import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/speak', async (req, res) => {
  try {
    const { text, language } = req.body;
    
    console.log('TTS Request:', { text, language }); // Debug log
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const langMap = {
      'ta-IN': 'ta',
      'hi-IN': 'hi',
      'te-IN': 'te',
      'kn-IN': 'kn',
      'ml-IN': 'ml',
      'en-US': 'en'
    };
    
    const googleLang = langMap[language] || 'en';
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${googleLang}&client=tw-ob&q=${encodeURIComponent(text)}`;
    
    const response = await axios.get(ttsUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': response.data.length,
      'Cache-Control': 'public, max-age=3600'
    });
    
    res.send(response.data);
    
  } catch (error) {
    console.error('TTS Error:', error.message);
    res.status(500).json({ error: 'TTS generation failed', details: error.message });
  }
});

export default router;