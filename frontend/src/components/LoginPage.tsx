// LoginPage.tsx - KODE YANG SUDAH DIREVISI (FINAL)

import { useState } from 'react';
import { Coffee, Lock, User, ArrowRight, Loader2 } from 'lucide-react'; 
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

// -------------------------------------------------------------------
// PERBAIKAN 1: UBAH 'localhost' menjadi '127.0.0.1' (Sinkron dengan hasil curl)
// -------------------------------------------------------------------
const API_BASE_URL = 'http://127.0.0.1:8000'; 

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    setIsLoading(true); 

    const formBody = new URLSearchParams();
    
    // -------------------------------------------------------------------
    // PERBAIKAN 2: Tambahkan 'grant_type' agar sesuai dengan payload curl yang berhasil
    // -------------------------------------------------------------------
    formBody.append('grant_type', 'password');
    formBody.append('username', loginData.username);
    formBody.append('password', loginData.password);

    try {
      // -------------------------------------------------------------------
      // PERBAIKAN 3: HAPUS '/api' prefix, Gunakan '/token'
      // -------------------------------------------------------------------
      const response = await fetch(`${API_BASE_URL}/token`, { 
        method: 'POST',
        headers: {
          // Jenis konten ini WAJIB digunakan untuk OAuth2PasswordRequestForm di FastAPI
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      // PENTING: Periksa apakah response.json() berhasil sebelum memproses data
      // Jika server mengembalikan response non-JSON pada error, ini bisa gagal.
      // Kita asumsikan FastAPI selalu mengembalikan JSON.
      const data = await response.json();

      if (!response.ok) {
        // Jika status code adalah 401 Unauthorized
        const detailMessage = data.detail || 'Username atau Password salah! (Coba admin/admin123)';
        setError(detailMessage);
        return;
      }

      // Login berhasil!
      const accessToken = data.access_token;
      
      localStorage.setItem('access_token', accessToken); 
      
      onLogin(); 

    } catch (err) {
      console.error("Fetch error:", err);
      // Catch ini menangani error koneksi jaringan (ERR_CONNECTION_REFUSED/TIMEOUT)
      setError('Gagal terhubung ke server. Pastikan backend berjalan dan URL: 127.0.0.1:8000 benar.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-white to-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side - Image & Branding (Dibiarkan sama) */}
        <div className="relative bg-gradient-to-br from-[#2d5f3f] to-[#4a7c59] p-12 flex flex-col justify-between text-white">
          <div className="absolute inset-0 opacity-10">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80"
              alt="Coffee Pattern"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Coffee className="w-9 h-9 text-white" />
              </div>
              <h2 className="text-white">Kopintar</h2>
            </div>
            <h1 className="text-white mb-4 leading-tight">
              Dashboard Monitoring Kopi Berbasis AI
            </h1>
            <p className="text-white/90 leading-relaxed">
              Platform analitik dan monitoring produksi kopi untuk meningkatkan kesejahteraan petani di Kecamatan Doko, Kabupaten Blitar, Jawa Timur.
            </p>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-[#8b6f47] rounded-lg flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <div>
                <p className="text-sm text-white">Real-time Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-[#8b6f47] rounded-lg flex items-center justify-center">
                <span className="text-white">✓</span>
              </div>
              <div>
                <p className="text-sm text-white">AI Recommendations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-12 flex flex-col justify-center">
          <button 
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-[#2d5f3f] mb-6 flex items-center gap-2 transition-colors"
          >
            ← Kembali ke Beranda
          </button>

          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-gray-900 mb-2">Selamat Datang!</h2>
              <p className="text-gray-600">Masukkan kredensial Anda untuk melanjutkan</p>
            </div>

            {/* Menampilkan pesan error */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="Masukkan username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    className="pl-10 border-gray-300 focus:border-[#2d5f3f]"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10 border-gray-300 focus:border-[#2d5f3f]"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Ingat saya</span>
                </label>
                <a href="#" className="text-[#2d5f3f] hover:underline">Lupa password?</a>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#2d5f3f] to-[#4a7c59] hover:from-[#3d7050] hover:to-[#5a8c69] text-white gap-2"
                disabled={isLoading} 
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}