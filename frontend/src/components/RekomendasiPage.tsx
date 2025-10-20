import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  AlertCircle,
  Plus,
  Send,
  Bot,
  User,
  Sparkles,
} from 'lucide-react';
import api from '../api/api';

export function RekomendasiPage() {
  const [newProblem, setNewProblem] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: 'user' | 'ai'; message: string }>
  >([
    {
      role: 'ai',
      message:
        'Halo! Saya asisten AI untuk membantu Anda mengatasi masalah di perkebunan kopi. Apa yang bisa saya bantu hari ini?',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wordCloudWords, setWordCloudWords] = useState<
    { text: string; value: number }[]
  >([]);

  // Load data wordcloud dari backend
  useEffect(() => {
    const fetchWordCloud = async () => {
      try {
        const res = await api.get('/analysis/wordcloud-data');
        if (Array.isArray(res.data)) {
          setWordCloudWords(res.data);
        }
      } catch (err) {
        console.error('Gagal memuat data wordcloud:', err);
      }
    };
    fetchWordCloud();
  }, []);

  const problems = [
    {
      title: 'Penanganan penyakit ngieles belum optimal',
      severity: 'Penyakit',
      farmer: 'Dusun Oleh - Gatot',
      status: 'Terbuka',
    },
    {
      title: 'Hama dan penyakit rontak daun',
      severity: 'Hama & Penyakit',
      farmer: 'Dusun Oleh - Gatot',
      status: 'Terbuka',
    },
    {
      title: 'PH Menurun, Jamur',
      severity: 'Penyakit',
      farmer: 'Dusun Oleh - Gatot',
      status: 'Terselesaikan',
    },
  ];

  // Fungsi kirim pertanyaan ke backend
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', message: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      const res = await api.post('/analysis/recommendation', {
        masalah: chatInput,
        detail_petani: additionalInfo || '-',
      });

      let aiResponse = '';

      if (res.data.recommendation && typeof res.data.recommendation === 'object') {
        const rec = res.data.recommendation;
        aiResponse = `
🧩 *Masalah Utama:* ${rec.masalah_utama}
📌 *Prioritas:* ${rec.prioritas_penanganan}
🎓 *Pelatihan:* ${rec.rekomendasi_pelatihan}
🌱 *Solusi:* ${rec.solusi_praktis}
        `;
      } else {
        aiResponse = res.data.recommendation || 'Tidak ada rekomendasi yang ditemukan.';
      }

      setChatMessages((prev) => [...prev, { role: 'ai', message: aiResponse }]);
    } catch (err) {
      console.error('Error getting AI recommendation:', err);
      setChatMessages((prev) => [
        ...prev,
        { role: 'ai', message: '⚠️ Gagal mengambil rekomendasi dari server. Pastikan backend berjalan.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitProblem = async () => {
    if (!newProblem.trim()) return;
    alert(`Masalah berhasil dilaporkan: ${newProblem}`);
    setNewProblem('');
    setAdditionalInfo('');
  };

  return (
    <div className="dark:text-gray-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#2d5f3f] dark:text-green-400 mb-2 text-xl font-semibold">
          Rekomendasi Permasalahan Petani
        </h1>
        <p className="text-gray-600">
          Kelola dan dapatkan solusi untuk permasalahan yang dihadapi petani kopi
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Masalah Dilaporkan */}
        <Card className="col-span-2 p-6 bg-white dark:bg-gray-800 shadow-md border-0">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-gray-900">Masalah yang Pernah Dilaporkan</h2>
          </div>

          <div className="space-y-3 mb-6">
            {problems.map((problem, index) => (
              <Card
                key={index}
                className="p-4 border border-gray-200 hover:border-[#2d5f3f] transition-colors bg-red-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <h4 className="text-gray-900">{problem.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Dusun Oleh - {problem.farmer.split(' - ')[1]}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
                        {problem.severity}
                      </Badge>
                      <Badge
                        className={`text-xs ${
                          problem.status === 'Terbuka'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : 'bg-green-100 text-green-700 hover:bg-green-100'
                        }`}
                      >
                        {problem.status}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[#2d5f3f] border-[#2d5f3f] hover:bg-[#2d5f3f] hover:text-white"
                  >
                    Resol
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Form Masalah Baru */}
          <Card className="p-5 bg-gradient-to-br from-green-50 to-white border-2 border-dashed border-[#2d5f3f]">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-[#2d5f3f]" />
              <h3 className="text-[#2d5f3f]">Masalah Lain / Masalah Baru</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Deskripsikan masalah yang Anda hadapi</p>

            <Input
              placeholder="Contoh: Tanaman kopi saya terserang jamur daun..."
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
              className="mb-3 border-gray-300 focus:border-[#2d5f3f]"
            />

            <Textarea
              placeholder="Lokasi kebun, umur tanaman, varietas yang ditanam..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="mb-4 border-gray-300 focus:border-[#2d5f3f] resize-none"
              rows={3}
            />

            <Button
              onClick={handleSubmitProblem}
              className="w-full bg-gradient-to-r from-[#2d5f3f] to-[#4a7c59] hover:from-[#3d7050] hover:to-[#5a8c69] text-white gap-2"
            >
              <Send className="w-4 h-4" />
              Cari Solusi
            </Button>
          </Card>
        </Card>

        {/* Wordcloud */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md border-0">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#8b6f47]" />
            <h3 className="text-gray-900">Wordcloud Masalah yang Sering Dihadapi</h3>
          </div>

          <div className="relative h-[400px] bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 flex items-center justify-center overflow-hidden">
            {wordCloudWords.length > 0 ? (
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-6">
                {wordCloudWords.map((word, index) => (
                  <span
                    key={index}
                    className="transition-transform hover:scale-110 cursor-pointer"
                    style={{
                      fontSize: `${10 + word.value * 1.5}px`,
                      color: `hsl(${(index * 37) % 360}, 60%, 40%)`,
                      fontWeight: word.value > 30 ? 700 : 500,
                    }}
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Memuat data...</p>
            )}
          </div>
        </Card>
      </div>

      {/* AI Chat */}
      <Card className="p-6 bg-gradient-to-br from-white to-green-50 shadow-lg border-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2d5f3f] to-[#4a7c59] rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">Tanya Asisten AI</h2>
            <p className="text-sm text-gray-600">Dapatkan rekomendasi dan solusi dari AI</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 h-[400px] overflow-y-auto border border-gray-100 shadow-inner">
          <div className="space-y-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2d5f3f] to-[#4a7c59] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#8b6f47] to-[#a78a5e] text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-[#8b6f47] to-[#a78a5e] rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-700 rounded-2xl px-4 py-2 text-sm animate-pulse">
                  AI sedang memproses...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Chat */}
        <div className="flex gap-3">
          <Input
            placeholder="Ketik pertanyaan Anda di sini..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
            className="flex-1 border-gray-300 focus:border-[#2d5f3f]"
          />
          <Button
            onClick={handleSendChat}
            className="bg-gradient-to-r from-[#2d5f3f] to-[#4a7c59] hover:from-[#3d7050] hover:to-[#5a8c69] text-white px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
