import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@kopintas.id',
      link: 'mailto:support@kopintas.id',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Telepon',
      value: '+62 812-3456-7890',
      link: 'tel:+6281234567890',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: MapPin,
      title: 'Alamat',
      value: 'Kec. Doko, Kab. Blitar, Jawa Timur',
      link: '#',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      value: 'Senin - Jumat, 08:00 - 17:00 WIB',
      link: '#',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="dark:text-gray-100">
      <div className="mb-8">
        <h1 className="text-[#2d5f3f] dark:text-green-400 mb-2">Hubungi Kami</h1>
        <p className="text-gray-600">
          Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Contact Form */}
        <Card className="col-span-2 p-8 bg-white dark:bg-gray-800 shadow-md border-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2d5f3f] to-[#4a7c59] rounded-xl flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">Kirim Pesan</h2>
              <p className="text-sm text-gray-600">Isi form di bawah untuk menghubungi kami</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border-gray-300 focus:border-[#2d5f3f]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-gray-300 focus:border-[#2d5f3f]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subjek</Label>
              <Input
                id="subject"
                placeholder="Topik pesan Anda"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="border-gray-300 focus:border-[#2d5f3f]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Pesan</Label>
              <Textarea
                id="message"
                placeholder="Tulis pesan Anda di sini..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="border-gray-300 focus:border-[#2d5f3f] resize-none"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#2d5f3f] to-[#4a7c59] hover:from-[#3d7050] hover:to-[#5a8c69] text-white gap-2"
            >
              <Send className="w-4 h-4" />
              Kirim Pesan
            </Button>
          </form>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#2d5f3f] to-[#4a7c59] text-white shadow-lg border-0">
            <h3 className="text-white mb-4">Informasi Kontak</h3>
            <p className="text-sm text-white/80 mb-6">
              Hubungi kami melalui berbagai channel yang tersedia untuk mendapatkan bantuan dan informasi lebih lanjut.
            </p>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-200"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 mb-1">{info.title}</p>
                      <p className="text-sm text-white break-words">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md border-0">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-[#2d5f3f]" />
              <h3 className="text-gray-900">Media Sosial</h3>
            </div>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">FB</span>
                </div>
                <span className="text-sm text-gray-700">Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">IG</span>
                </div>
                <span className="text-sm text-gray-700">Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">WA</span>
                </div>
                <span className="text-sm text-gray-700">WhatsApp</span>
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <Card className="p-6 bg-white shadow-md border-0">
        <h3 className="text-gray-900 mb-4">Lokasi Kami</h3>
        <div className="w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.73634281892!2d112.15890935!3d-8.095684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78ed3e2c7c7b55%3A0x5027a76e356fb50!2sBlitar%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Card>
    </div>
  );
}
