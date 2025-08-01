"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AudioVisualizer from '@/components/AudioVisualizer';

// Definisikan tipe untuk props Step1 dan Step2
type Step1Props = {
  cameraOk: boolean;
  setCameraOk: (value: boolean) => void;
  lightingOk: boolean;
  setLightingOk: (value: boolean) => void;
};

type Step2Props = {
  audioOk: boolean;
  setAudioOk: (value: boolean) => void;
  envOk: boolean;
  setEnvOk: (value: boolean) => void;
  internetOk: boolean;
  setInternetOk: (value: boolean) => void;
};


// Komponen untuk Langkah 1: Pengecekan Kamera
const Step1 = ({ cameraOk, setCameraOk, lightingOk, setLightingOk }: Step1Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    let stream: MediaStream;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) { console.error("Error accessing camera: ", err); }
    };
    startCamera();
    return () => stream?.getTracks().forEach(track => track.stop());
  }, []);

  return (
    <>
      <p className="text-center text-gray-600 mb-6">Kamera (1/2)</p>
      <div className="w-full h-96 bg-black rounded-lg overflow-hidden mb-6">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
      </div>
      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={cameraOk} onChange={() => setCameraOk(!cameraOk)} className="h-5 w-5 rounded text-pink-600 focus:ring-pink-500 border-gray-300"/>
          <span className="text-gray-700">Kamera saya berfungsi dengan baik</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={lightingOk} onChange={() => setLightingOk(!lightingOk)} className="h-5 w-5 rounded text-pink-600 focus:ring-pink-500 border-gray-300"/>
          <span className="text-gray-700">Pencahayaan dan sudut kamera saya jelas dan berada di tengah</span>
        </label>
      </div>
    </>
  );
};

// Komponen untuk Langkah 2: Pengecekan Audio & Koneksi
const Step2 = ({ audioOk, setAudioOk, envOk, setEnvOk, internetOk, setInternetOk }: Step2Props) => {
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

    //State untuk menyimpan daftar perangkat
    const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);
    const [outputDevices, setOutputDevices] = useState<MediaDeviceInfo[]>([]);

    //Efek untuk mengambil daftar perangkat saat komponen dimuat
    useEffect(() => {
        const getDevices = async () => {
            try {
                // Minta izin dulu agar bisa mendapatkan daftar lengkap
                await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                
                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioInputs = devices.filter(device => device.kind === 'audioinput');
                const audioOutputs = devices.filter(device => device.kind === 'audiooutput');
                
                setInputDevices(audioInputs);
                setOutputDevices(audioOutputs);
            } catch (err) {
                console.error("Gagal mendapatkan daftar perangkat:", err);
            }
        };

        getDevices();
    }, []);

    //State untuk status koneksi
    const [isOnline, setIsOnline] = useState(true); // Asumsi awal: online
    const [ping, setPing] = useState<number | null>(null);
    const [isCheckingPing, setIsCheckingPing] = useState(false);

    //Efek untuk mendeteksi status online/offline secara real-time
    useEffect(() => {
        setIsOnline(navigator.onLine); //Set status awal saat komponen dimuat
        
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    //Fungsi untuk mengukur ping
    const STABLE_PING_THRESHOLD = 100;
    const checkPing = async () => {
        setIsCheckingPing(true);
        setPing(null);
        const startTime = Date.now();
        try {
            await fetch('/favicon.ico', { cache: 'no-store' }); 
            const endTime = Date.now();
            setPing(endTime - startTime);
        } catch (error) {
          console.log(error)
            setIsOnline(false);
        }
        setIsCheckingPing(false);
    };

    //State untuk mic
    const testMicrophone = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioStream(stream);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Tidak dapat mengakses mikrofon.");
        }
    };

    useEffect(() => {
        return () => {
            audioStream?.getTracks().forEach(track => track.stop());
        };
    }, [audioStream]);

    return (
        <>
            <p className="text-center text-gray-600 mb-6">Audio & Koneksi Internet (2/2)</p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Perangkat masukan</label>
                    {/*Tampilkan daftar perangkat masukan */}
                    <select className="text-gray-400 w-full p-2 border border-gray-300 rounded-md">
                        {inputDevices.length > 0 ? (
                            inputDevices.map(device => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Mikrofon ${inputDevices.indexOf(device) + 1}`}
                                </option>
                            ))
                        ) : (
                            <option>Tidak ada mikrofon terdeteksi</option>
                        )}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Perangkat keluaran</label>
                    {/*Tampilkan daftar perangkat keluaran */}
                    <select className="text-gray-400 w-full p-2 border border-gray-300 rounded-md">
                        {outputDevices.length > 0 ? (
                            outputDevices.map(device => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Speaker ${outputDevices.indexOf(device) + 1}`}
                                </option>
                            ))
                        ) : (
                            <option>Tidak ada speaker terdeteksi</option>
                        )}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8 items-center">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tes Mikrofon</label>
                    <div className="flex items-center gap-4">
                        <button onClick={testMicrophone} className="bg-[#C9184A] text-white font-semibold py-2 px-6 rounded-lg cursor-pointer transition hover:bg-pink-500">
                            tes
                        </button>
                        <div className="bg-gray-100 rounded-lg p-1">
                            {audioStream ? (
                                <AudioVisualizer stream={audioStream} width={200} height={40} />
                            ) : (
                                <div className="w-[200px] h-[40px] flex items-center justify-center">
                                    <p className="text-xs text-gray-500">Klik tes</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Koneksi Internet</label>
                    <div className="flex gap-8 items-center">
                        {/* Tampilkan status dan ping dinamis */}
                        <div><span className="font-bold text-gray-400">Status</span><p className={isOnline ? 'text-green-600' : 'text-red-600'}>{isOnline ? 'Terhubung' : 'Terputus'}</p></div>
                        <div>
                            <span className="font-bold text-gray-400">Ping</span>
                            {/* 2. Tambahkan className dinamis di sini */}
                            <p className={
                                ping !== null 
                                ? (ping <= STABLE_PING_THRESHOLD ? 'text-green-600' : 'text-red-600') 
                                : ''
                            }>
                                {ping ? `${ping} ms` : '-'}
                            </p>
                        </div>
                        <button onClick={checkPing} disabled={isCheckingPing} className="text-sm text-[#C9184A] hover:underline disabled:text-gray-400">
                          {isCheckingPing ? 'Mengecek...' : 'Cek Ping'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={audioOk} onChange={() => setAudioOk(!audioOk)} className="h-5 w-5 rounded text-[#C9184A] focus:ring-[#C9184A] border-gray-300"/>
                  <span className="text-gray-700">Audio saya berfungsi dengan baik</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={envOk} onChange={() => setEnvOk(!envOk)} className="h-5 w-5 rounded text-[#C9184A] focus:ring-[#C9184A] border-gray-300"/>
                  <span className="text-gray-700">Saya berada di lingkungan yang tenang dan bebas gangguan</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={internetOk} onChange={() => setInternetOk(!internetOk)} className="h-5 w-5 rounded text-[#C9184A] focus:ring-[#C9184A] border-gray-300"/>
                  <span className="text-gray-700">Internet saya stabil</span>
                </label>
            </div>
        </>
    );
};

export default function CekPerangkatPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // State untuk checkbox Step 1
  const [cameraOk, setCameraOk] = useState(false);
  const [lightingOk, setLightingOk] = useState(false);
  
  // State untuk checkbox Step 2
  const [audioOk, setAudioOk] = useState(false);
  const [envOk, setEnvOk] = useState(false);
  const [internetOk, setInternetOk] = useState(false);

  const canContinueStep1 = cameraOk && lightingOk;
  const canContinueStep2 = audioOk && envOk && internetOk;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      alert("Semua pengecekan berhasil!");
      router.push('/simulasi-wawancara/mulai'); // Ganti dengan halaman simulasi yang sebenarnya
    }
  };
  
  const handleBack = () => {
    if (step === 2) {
        setStep(1);
    } else {
        router.back();
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-8 shadow-lg border">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Cek Lingkungan & Perangkat</h1>
        
        {step === 1 && <Step1 cameraOk={cameraOk} setCameraOk={setCameraOk} lightingOk={lightingOk} setLightingOk={setLightingOk} />}
        {step === 2 && <Step2 audioOk={audioOk} setAudioOk={setAudioOk} envOk={envOk} setEnvOk={setEnvOk} internetOk={internetOk} setInternetOk={setInternetOk} />}

        <div className="flex justify-between items-center mt-8">
          <button onClick={handleBack} className="py-2 px-6 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50">
            Kembali
          </button>
          <button 
            onClick={handleNext}
            disabled={step === 1 ? !canContinueStep1 : !canContinueStep2}
            className="py-2 px-6 bg-[#C9184A] text-white rounded-lg font-semibold hover:bg-pink-500 disabled:bg-gray-300 cursor-pointer"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}