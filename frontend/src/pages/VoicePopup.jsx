import { useState, useRef, useEffect } from "react";
import { Mic, Square, Trash2, Globe2, Volume2, VolumeX } from "lucide-react";

// AdBanner component placeholder
const AdBanner = ({ slot }) => (
  <div className="mt-3 p-2 bg-gray-100 rounded text-center text-xs text-gray-500">
    Ad Slot: {slot}
  </div>
);

// ==================== MULTI-LANGUAGE TTS SERVICE ====================
class MultiLanguageTTS {
  constructor() {
    this.synth = window.speechSynthesis;
    this.currentUtterance = null;
    this.isSpeaking = false;

    this.languageMap = {
      "ta-IN": { lang: "ta-IN", name: "Tamil", voices: ["ta-IN", "ta"] },
      "hi-IN": { lang: "hi-IN", name: "Hindi", voices: ["hi-IN", "hi"] },
      "te-IN": { lang: "te-IN", name: "Telugu", voices: ["te-IN", "te"] },
      "kn-IN": { lang: "kn-IN", name: "Kannada", voices: ["kn-IN", "kn"] },
      "ml-IN": { lang: "ml-IN", name: "Malayalam", voices: ["ml-IN", "ml"] },
      "en-US": {
        lang: "en-US",
        name: "English",
        voices: ["en-US", "en-GB", "en"],
      },
    };

    this.availableVoices = [];
    this.loadVoices();

    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    this.availableVoices = this.synth.getVoices();
  }

  findVoice(langCode) {
    if (this.availableVoices.length === 0) {
      this.loadVoices();
    }

    const langConfig = this.languageMap[langCode];
    if (!langConfig) return null;

    for (const voiceLang of langConfig.voices) {
      const voice = this.availableVoices.find((v) =>
        v.lang.toLowerCase().startsWith(voiceLang.toLowerCase())
      );
      if (voice) return voice;
    }

    return null;
  }

  async speakWithBrowser(text, langCode, callbacks = {}) {
    return new Promise((resolve, reject) => {
      this.stop();

      const voice = this.findVoice(langCode);
      if (!voice) {
        reject(new Error(`No voice found for ${langCode}`));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = langCode;
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (callbacks.onStart) callbacks.onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (callbacks.onEnd) callbacks.onEnd();
        resolve();
      };

      utterance.onerror = (event) => {
        this.isSpeaking = false;
        if (callbacks.onError) callbacks.onError(event);
        reject(event);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    });
  }

  async speakWithBackendProxy(text, langCode, callbacks = {}, backendUrl) {
    return new Promise(async (resolve, reject) => {
      this.stop();

      try {
        const response = await fetch(`${backendUrl}/api/tts/speak`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            language: langCode,
          }),
        });

        if (!response.ok) {
          throw new Error(`Backend TTS failed: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.onloadstart = () => {
          this.isSpeaking = true;
          if (callbacks.onStart) callbacks.onStart();
        };

        audio.onended = () => {
          this.isSpeaking = false;
          URL.revokeObjectURL(audioUrl);
          if (callbacks.onEnd) callbacks.onEnd();
          resolve();
        };

        audio.onerror = (error) => {
          this.isSpeaking = false;
          URL.revokeObjectURL(audioUrl);
          if (callbacks.onError) callbacks.onError(error);
          reject(error);
        };

        this.currentUtterance = audio;
        await audio.play();
      } catch (error) {
        this.isSpeaking = false;
        if (callbacks.onError) callbacks.onError(error);
        reject(error);
      }
    });
  }

  convertToPhonetic(text, langCode) {
    const numberMatch = text.match(/\d+\.?\d*/);
    if (!numberMatch) return text;

    const phoneticMap = {
      "ta-IN": { vidhai: "விடை", pulli: "pulli" },
      "hi-IN": { jawab: "jawab", hai: "hai", dashamlav: "dashamlav" },
      "te-IN": { samadhanam: "samadhanam", binduvu: "binduvu" },
      "kn-IN": { uttara: "uttara", bindu: "bindu" },
      "ml-IN": { utharam: "utharam", point: "point" },
    };

    return `The answer is ${numberMatch[0]}`;
  }

  async speakWithPhoneticFallback(text, langCode, callbacks = {}) {
    return new Promise((resolve, reject) => {
      this.stop();

      const phoneticText = this.convertToPhonetic(text, langCode);
      const utterance = new SpeechSynthesisUtterance(phoneticText);

      const voices = this.availableVoices;
      if (voices.length > 0) {
        let voice = voices.find((v) => v.lang.includes("en-IN"));
        if (!voice) voice = voices.find((v) => v.lang.includes("en"));
        if (voice) utterance.voice = voice;
      }

      utterance.lang = "en-IN";
      utterance.rate = 0.75;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (callbacks.onStart) callbacks.onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (callbacks.onEnd) callbacks.onEnd();
        resolve();
      };

      utterance.onerror = (event) => {
        this.isSpeaking = false;
        if (callbacks.onError) callbacks.onError(event);
        reject(event);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    });
  }

  extractNumber(text) {
    const match = text.match(/\d+\.?\d*/);
    return match ? match[0] : text;
  }

  async speak(
    text,
    langCode,
    callbacks = {},
    backendUrl = "http://localhost:5000"
  ) {
    try {
      if (backendUrl) {
        try {
          await this.speakWithBackendProxy(
            text,
            langCode,
            callbacks,
            backendUrl
          );
          return { method: "Google TTS (Backend)", success: true };
        } catch (backendError) {
          console.warn("Backend TTS failed:", backendError);
        }
      }

      const voice = this.findVoice(langCode);
      if (voice) {
        try {
          await this.speakWithBrowser(text, langCode, callbacks);
          return { method: "Browser TTS (Native)", success: true };
        } catch (browserError) {
          console.warn("Browser TTS failed:", browserError);
        }
      }

      try {
        await this.speakWithPhoneticFallback(text, langCode, callbacks);
        return { method: "Phonetic English", success: true };
      } catch (phoneticError) {
        console.warn("Phonetic fallback failed:", phoneticError);
      }

      const simpleText = `Result is ${this.extractNumber(text)}`;
      await this.speakWithBrowser(simpleText, "en-US", callbacks);
      return { method: "English Fallback", success: true };
    } catch (error) {
      console.error("All TTS methods failed:", error);
      if (callbacks.onError) callbacks.onError(error);
      return { method: "Failed", success: false, error };
    }
  }

  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
    if (this.currentUtterance && this.currentUtterance instanceof Audio) {
      this.currentUtterance.pause();
      this.currentUtterance.currentTime = 0;
    }
    this.isSpeaking = false;
  }
}

const ttsService = new MultiLanguageTTS();

// ==================== CALCULATION LOGIC ====================
const processCalculation = (input) => {
  try {
    const converted = input
      .toLowerCase()
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .replace(/multiplied by|multiply by|multiple by/g, "*")
      .replace(/times|time|multiply|multiple/g, "*")
      .replace(/divided by|divide by/g, "/")
      .replace(/divide|divided/g, "/")
      .replace(/to the power of|power of/g, "**")
      .replace(/power/g, "**")
      .replace(/point/g, ".")
      .replace(/ /g, "");

    const clean = converted.replace(/[^0-9+\-*/().%^]/g, "");
    if (!clean) return "Invalid expression";

    return eval(clean).toString();
  } catch {
    return "Error in calculation";
  }
};

// ==================== MAIN COMPONENT ====================
export default function VoicePopup() {
  const [isListening, setIsListening] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("ta-IN");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [ttsMethod, setTtsMethod] = useState("");
  const [backendUrl, setBackendUrl] = useState("http://localhost:5000");

  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      ttsService.stop();
    };
  }, []);

  const speakResult = async (text, lang) => {
    if (!voiceEnabled) return;

    const callbacks = {
      onStart: () => {
        setIsSpeaking(true);
      },
      onEnd: () => {
        setIsSpeaking(false);
      },
      onError: (error) => {
        setIsSpeaking(false);
        console.error("TTS Error:", error);
        setError(
          "Voice playback failed. Check browser permissions or backend connection."
        );
      },
    };

    const result = await ttsService.speak(text, lang, callbacks, backendUrl);

    if (result.success) {
      setTtsMethod(result.method);
    } else {
      setError("All TTS methods failed");
    }
  };

  const stopSpeaking = () => {
    ttsService.stop();
    setIsSpeaking(false);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");

      // console.log("Original speech:", text);
      
      let result = text.toLowerCase().trim();
      // console.log("Step 1 - Lowercase:", result);

      // Step 1: Replace operation PHRASES first (before individual words)
      const operationPhrases = [
        { pattern: /multiplied\s+by/g, replacement: ' * ' },
        { pattern: /multiply\s+by/g, replacement: ' * ' },
        { pattern: /divided\s+by/g, replacement: ' / ' },
        { pattern: /divide\s+by/g, replacement: ' / ' },
        { pattern: /to\s+the\s+power\s+of/g, replacement: ' ** ' },
        { pattern: /power\s+of/g, replacement: ' ** ' },
      ];

      operationPhrases.forEach(({pattern, replacement}) => {
        const before = result;
        result = result.replace(pattern, replacement);
        if (before !== result) console.log(`Replaced phrase: ${pattern} -> ${replacement}`);
      });

      // console.log("Step 2 - After phrases:", result);

      // Step 2: Replace number words
      const allNumbers = {
        'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
        'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
        'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
        'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
        'eighteen': '18', 'nineteen': '19', 'twenty': '20', 'thirty': '30',
        'forty': '40', 'fifty': '50', 'sixty': '60', 'seventy': '70',
        'eighty': '80', 'ninety': '90', 'hundred': '100', 'thousand': '1000',
        'பூஜ்ஜியம்': '0', 'ஒன்று': '1', 'இரண்டு': '2', 'மூன்று': '3', 'நான்கு': '4',
        'ஐந்து': '5', 'ஆறு': '6', 'ஏழு': '7', 'எட்டு': '8', 'ஒன்பது': '9', 'பத்து': '10',
        'शून्य': '0', 'एक': '1', 'दो': '2', 'तीन': '3', 'चार': '4',
        'पाँच': '5', 'छह': '6', 'सात': '7', 'आठ': '8', 'नौ': '9', 'दस': '10',
        'సున్నా': '0', 'ఒకటి': '1', 'రెండు': '2', 'మూడు': '3', 'నాలుగు': '4',
        'ఐదు': '5', 'ఆరు': '6', 'ఏడు': '7', 'ఎనిమిది': '8', 'తొమ్మిది': '9', 'పది': '10',
        'ಸೊನ್ನೆ': '0', 'ಒಂದು': '1', 'ಎರಡು': '2', 'ಮೂರು': '3', 'ನಾಲ್ಕು': '4',
        'ಐದು': '5', 'ಆರು': '6', 'ಏಳು': '7', 'ಎಂಟು': '8', 'ಒಂಬತ್ತು': '9', 'ಹತ್ತು': '10',
        'പൂജ്യം': '0', 'ഒന്ന്': '1', 'രണ്ട്': '2', 'മൂന്ന്': '3', 'നാല്': '4',
        'അഞ്ച്': '5', 'ആറ്': '6', 'ഏഴ്': '7', 'എട്ട്': '8', 'ഒമ്പത്': '9', 'പത്ത്': '10'
      };

      Object.entries(allNumbers).forEach(([word, digit]) => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const before = result;
        result = result.replace(regex, ` ${digit} `);
        if (before !== result) console.log(`Replaced number: ${word} -> ${digit}`);
      });

      // console.log("Step 3 - After numbers:", result);

      // Step 3: Replace single operation words
      const operations = [
        { pattern: /\bmultiplied\b/g, replacement: ' * ', name: 'multiplied' },
        { pattern: /\bmultiply\b/g, replacement: ' * ', name: 'multiply' },
        { pattern: /\bmultiple\b/g, replacement: ' * ', name: 'multiple' },
        { pattern: /\btimes\b/g, replacement: ' * ', name: 'times' },
        { pattern: /\btime\b/g, replacement: ' * ', name: 'time' },
        { pattern: /\binto\b/g, replacement: ' * ', name: 'into' },
        { pattern: /\bdivided\b/g, replacement: ' / ', name: 'divided' },
        { pattern: /\bdivide\b/g, replacement: ' / ', name: 'divide' },
        { pattern: /\bplus\b/g, replacement: ' + ', name: 'plus' },
        { pattern: /\badd\b/g, replacement: ' + ', name: 'add' },
        { pattern: /\bminus\b/g, replacement: ' - ', name: 'minus' },
        { pattern: /\bsubtract\b/g, replacement: ' - ', name: 'subtract' },
        { pattern: /\bpower\b/g, replacement: ' ** ', name: 'power' },
        { pattern: /\bpoint\b/g, replacement: '.', name: 'point' },
        { pattern: /\bdot\b/g, replacement: '.', name: 'dot' },
      ];

      operations.forEach(({pattern, replacement, name}) => {
        const before = result;
        result = result.replace(pattern, replacement);
        if (before !== result) console.log(`Replaced operation: ${name} -> ${replacement.trim()}`);
      });

      // console.log("Step 4 - After operations:", result);

      // Step 3.5: Handle single letters that represent operations
      // Browser often converts "times" to "x" in speech recognition
      result = result.replace(/\bx\b/g, ' * ');
      result = result.replace(/\sxx\s/g, ' ** '); // "x x" might mean power
      
      // console.log("Step 4.5 - After letter replacements:", result);

      // Tamil, Hindi, Telugu, Kannada, Malayalam operations
      const regionalOps = [
        { pattern: /கூட்டல்|கூட்டு/g, replacement: '+' },
        { pattern: /கழித்தல்|கழி/g, replacement: '-' },
        { pattern: /பெருக்கல்|பெருக்கு/g, replacement: '*' },
        { pattern: /வகுத்தல்|வகு/g, replacement: '/' },
        { pattern: /அடுக்கு/g, replacement: '**' },
        { pattern: /புள்ளி/g, replacement: '.' },
        { pattern: /जोड़/g, replacement: '+' },
        { pattern: /घटाव/g, replacement: '-' },
        { pattern: /गुणा/g, replacement: '*' },
        { pattern: /भाग/g, replacement: '/' },
        { pattern: /घात/g, replacement: '**' },
        { pattern: /दशमलव/g, replacement: '.' },
        { pattern: /కూడిక/g, replacement: '+' },
        { pattern: /తీసివేత/g, replacement: '-' },
        { pattern: /గుణకారం/g, replacement: '*' },
        { pattern: /భాగహారం/g, replacement: '/' },
        { pattern: /ఘాతం/g, replacement: '**' },
        { pattern: /బిందువు/g, replacement: '.' },
        { pattern: /ಸೇರಿಸಿ/g, replacement: '+' },
        { pattern: /ಕಳೆಯಿರಿ/g, replacement: '-' },
        { pattern: /ಗುಣಿಸಿ/g, replacement: '*' },
        { pattern: /ಭಾಗಿಸಿ/g, replacement: '/' },
        { pattern: /ಘಾತ/g, replacement: '**' },
        { pattern: /ಬಿಂದು/g, replacement: '.' },
        { pattern: /കൂട്ടൽ/g, replacement: '+' },
        { pattern: /കുറയ്ക്കൽ/g, replacement: '-' },
        { pattern: /ഗുണനം/g, replacement: '*' },
        { pattern: /ഹരണം/g, replacement: '/' },
        { pattern: /ഘാതം/g, replacement: '**' },
        { pattern: /പോയിന്റ്/g, replacement: '.' },
      ];

      regionalOps.forEach(({pattern, replacement}) => {
        result = result.replace(pattern, replacement);
      });

      // console.log("Step 5 - After regional ops:", result);

      // Step 4: Clean up - remove all spaces, keep only valid math characters
      result = result.replace(/\s+/g, '');
      // console.log("Step 6 - Remove spaces:", result);
      
      const final = result.replace(/[^0-9+\-*/().%^]/g, '');
      // console.log("Final result:", final);
      
      setManualInput(final);
      
      // Focus the input field after voice recognition
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    };

    recognition.onerror = stopListening;
    recognition.onend = stopListening;
    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
    timeoutRef.current = setTimeout(stopListening, 10000);
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsListening(false);
  };

  const handleCalculate = async () => {
    if (!manualInput.trim()) {
      setError("Please enter or speak a calculation");
      return;
    }

    setError("");
    setLoading(true);
    stopSpeaking();

    try {
      const calculatedResult = processCalculation(manualInput);
      setResult(calculatedResult);

      setTimeout(() => {
        const speechText = getSpeechText(calculatedResult, language);
        speakResult(speechText, language);
      }, 100);
    } catch (err) {
      setError("Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  const numberToNativeWords = (num, lang) => {
    return num.toString();
  };

  const getSpeechText = (result, lang) => {
    const resultInWords = convertNumberToWords(result, lang);

    const languageResponses = {
      "ta-IN": `விடை ${resultInWords}`,
      "hi-IN": `jawab ${resultInWords} hai`,
      "en-US": `The answer is ${resultInWords}`,
      "te-IN": `samadhanam ${resultInWords}`,
      "kn-IN": `uttara ${resultInWords}`,
      "ml-IN": `utharam ${resultInWords}`,
    };

    return languageResponses[lang] || `Result is ${resultInWords}`;
  };

  const convertNumberToWords = (num, lang) => {
    const number = parseFloat(num);

    if (lang === "en-US") {
      if (Number.isInteger(number)) return number.toString();
      const parts = num.toString().split(".");
      return `${parts[0]} point ${parts[1]}`;
    }

    if (Number.isInteger(number)) {
      return numberToNativeWords(number, lang);
    }

    const parts = num.toString().split(".");
    const integerWords = numberToNativeWords(parts[0], lang);
    const decimalWords = parts[1];

    const decimalSeparators = {
      "ta-IN": "pulli",
      "hi-IN": "dashamlav",
      "te-IN": "binduvu",
      "kn-IN": "bindu",
      "ml-IN": "point",
    };

    return `${integerWords} ${decimalSeparators[lang]} ${decimalWords}`;
  };

  const clearAll = () => {
    setManualInput("");
    setResult("");
    setError("");
    setTtsMethod("");
    stopSpeaking();
  };

  const languageLabels = {
    "ta-IN": "Tamil 🇮🇳",
    "hi-IN": "Hindi 🇮🇳",
    "en-US": "English 🇬🇧",
    "te-IN": "Telugu 🇮🇳",
    "kn-IN": "Kannada 🇮🇳",
    "ml-IN": "Malayalam 🇮🇳",
  };

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-pink-50 to-purple-100 text-gray-900 overflow-hidden px-4 sm:px-10 pt-[110px] pb-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-10 w-[300px] h-[300px] bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 opacity-25 blur-3xl rounded-full animate-blob" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gradient-to-tr from-purple-400 via-pink-300 to-indigo-400 opacity-25 blur-3xl rounded-full animate-blob animation-delay-2000" />
      </div>

      <section className="text-center mb-10 px-6 animate-fade-up">
        <h2 className="text-sm font-semibold tracking-widest text-pink-600 uppercase mb-3">
          Multilingual Voice Calculator
        </h2>

        <div className="w-40 h-[3px] mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-full mb-5"></div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] mb-3">
          Speak, Calculate,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 animate-gradient-x">
            Listen in Your Language
          </span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-4">
          Results spoken in Tamil, Hindi, English, Telugu, Kannada & Malayalam
        </p>
      </section>

      <div className="relative w-full max-w-2xl bg-white/80 border border-gray-200 rounded-2xl shadow-2xl p-10 backdrop-blur-md animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-3 sm:gap-0">
          <h3 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 text-center sm:text-left">
            VoiceCalc AI
          </h3>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (voiceEnabled) stopSpeaking();
              }}
              className={`p-2 rounded-full transition-all ${
                voiceEnabled
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
              }`}
              title={voiceEnabled ? "Voice enabled" : "Voice disabled"}
            >
              {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            <div ref={dropdownRef} className="relative inline-block text-left">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center justify-center sm:justify-between gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full shadow-inner cursor-pointer hover:shadow-md transition"
              >
                <Globe2 size={20} className="text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  {languageLabels[language]}
                </span>
                <svg
                  className={`w-4 h-4 text-purple-600 transform transition-transform ${
                    showDropdown ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 animate-fade-in z-20">
                  {Object.entries(languageLabels).map(([code, label]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm rounded-lg transition ${
                        language === code
                          ? "text-purple-600 font-semibold bg-purple-50"
                          : "text-gray-700 hover:bg-gradient-to-r from-purple-50 to-pink-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 mb-8">
          <div
            onClick={isListening ? stopListening : startListening}
            className={`cursor-pointer w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? "bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse shadow-[0_0_30px_rgba(236,72,153,0.6)]"
                : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            }`}
          >
            {isListening ? (
              <Square size={38} className="text-white" />
            ) : (
              <Mic size={38} className="text-white" />
            )}
          </div>

          <p className="text-gray-500 text-sm text-center">
            {isListening
              ? "Listening..."
              : isSpeaking
              ? `🔊 Speaking in ${languageLabels[language]}... ${
                  ttsMethod ? `(${ttsMethod})` : ""
                }`
              : "Speak your equation or type below"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="w-full bg-white/70 border border-gray-200 p-6 rounded-2xl shadow-md backdrop-blur-lg">
          <input
            ref={inputRef}
            type="text"
            value={manualInput}
            onChange={(e) => {
              const value = e.target.value;
              const allowedPattern = /^[0-9+\-*/().%^\s]*$/;
              if (allowedPattern.test(value) || value === "") {
                setManualInput(value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading && !isSpeaking) {
                e.preventDefault();
                handleCalculate();
              }
            }}
            placeholder="Try: 12+8/2 or 5*3"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-500 transition text-gray-700"
          />

          <div className="flex justify-between gap-3 mt-5">
            <button
              onClick={handleCalculate}
              disabled={loading || isSpeaking}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 shadow-md transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Calculating..." : "Calculate"}
            </button>

            <button
              onClick={clearAll}
              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:opacity-90 shadow-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Trash2 size={16} /> Clear
            </button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border-2 border-pink-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Result:</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    {result}
                  </p>
                </div>

                {isSpeaking && (
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-8 bg-pink-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-6 bg-purple-500 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-10 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 flex gap-2">
                {!isSpeaking ? (
                  <button
                    onClick={() =>
                      speakResult(getSpeechText(result, language), language)
                    }
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition flex items-center gap-2"
                  >
                    <Volume2 size={14} /> Speak Again
                  </button>
                ) : (
                  <button
                    onClick={stopSpeaking}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                  >
                    <Square size={14} /> Stop
                  </button>
                )}
              </div>

              <AdBanner slot="1234567890" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}