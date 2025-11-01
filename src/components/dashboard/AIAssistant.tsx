import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Mic } from 'lucide-react';

export const AIAssistant = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('chat.placeholder') },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // 🧠 Fetch AI response from OpenRouter
  const fetchAIResponse = async (query) => {
    try {
      setLoading(true);
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3-8b-instruct',
          messages: [
            {
              role: 'system',
              content:
                'You are AgriVani, a friendly multilingual AI farming assistant that helps with weather, fertilizer, and crop-related advice. Reply clearly and concisely.',
            },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: query },
          ],
        }),
      });

      const data = await response.json();
      console.log('OpenRouter Response:', data);

      const aiText =
        data?.choices?.[0]?.message?.content ||
        "I'm sorry, I couldn't understand that. Can you try again?";

      // Update chat with AI reply
      setMessages((prev) => [...prev, { role: 'assistant', content: aiText }]);
      speak(aiText); // 🔊 Speak the AI response
    } catch (error) {
      console.error('AI Fetch Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error: Unable to connect to AI service.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 📨 Send message to AI
  const handleSend = () => {
    if (!input.trim()) return;
    const userInput = input;
    setMessages([...messages, { role: 'user', content: userInput }]);
    setInput('');
    fetchAIResponse(userInput);
  };

  // 🎙️ Handle Voice Input (Speech-to-Text)
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input not supported in this browser.');
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-IN'; // You can change to 'hi-IN' or 'te-IN'
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Voice input:', transcript);
        setInput(transcript); // ✅ Only fill input box, don’t send automatically
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    if (!listening) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      setListening(false);
      recognitionRef.current.stop();
    }
  };

  // 🔊 Text-to-Speech for AI responses
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN'; // You can set to 'hi-IN' or 'te-IN' as needed
      utterance.rate = 1; // normal speed
      utterance.pitch = 1;
      window.speechSynthesis.cancel(); // stop any ongoing speech
      window.speechSynthesis.speak(utterance);
    }
  };

  const exampleQuestions = [t('chat.weather'), t('chat.fertilizer'), t('chat.rain')];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle>{t('chat.title')}</CardTitle>
          </div>
          <CardDescription>
            Ask questions in your language and get instant farming advice
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-4 bg-muted italic text-sm">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              placeholder={t('chat.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button
              size="icon"
              variant={listening ? 'default' : 'outline'}
              onClick={handleVoiceInput}
              title={listening ? 'Listening...' : 'Speak'}
            >
              <Mic className={`h-4 w-4 ${listening ? 'text-red-500' : ''}`} />
            </Button>
            <Button onClick={handleSend} disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Questions</CardTitle>
          <CardDescription>{t('chat.examples')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {exampleQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => setInput(question)}
            >
              {question}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
