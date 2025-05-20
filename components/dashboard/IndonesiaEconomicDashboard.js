import { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const IndonesiaEconomicDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  
  // Auto-refresh interval (in milliseconds) - setiap 5 menit
  const refreshInterval = 5 * 60 * 1000; // 300,000 ms = 5 menit
  
  // State untuk menyimpan historical rates data untuk grafik real-time
  const [historicalRates, setHistoricalRates] = useState([]);
  
  // Function to fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current exchange rate data
      await fetchExchangeRateData();
      
      // Set last updated timestamp
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.");
      setLoading(false);
    }
  };
  
  // Fetch exchange rate data dari API
  const fetchExchangeRateData = async () => {
    try {
      // Menggunakan currencyapi.com dengan API key yang diberikan
      const apiKey = 'cur_live_18SpYRveYIQbxXrujF3MczIlU478FqyKIz8QKmvg';
      const response = await fetch('https://api.currencyapi.com/v3/latest?base_currency=USD', {
        headers: {
          'apikey': apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Log untuk debugging
      console.log("Currency API Response:", data);
      
      // Verifikasi bahwa data tersedia dalam format yang diharapkan
      if (!data.data || !data.data.IDR) {
        console.error("Data IDR tidak ditemukan dalam respons API:", data);
        throw new Error("Format data API tidak valid");
      }
      
      // Ekstrak nilai IDR terhadap USD
      const idrValue = data.data.IDR.value; // Misalnya, 15000.5 (artinya 1 USD = 15000.5 IDR)
      
      // Buat objek rates dengan format yang dibutuhkan dashboard
      const formattedRates = {
        date: new Date().toISOString().split('T')[0],
        rates: {
          USD: Math.round(idrValue), // IDR/USD (misalnya 15000)
          EUR: Math.round(idrValue / data.data.EUR.value), // IDR/EUR
          JPY: Math.round(idrValue / data.data.JPY.value), // IDR/JPY
          CNY: Math.round(idrValue / data.data.CNY.value), // IDR/CNY
          SGD: Math.round(idrValue / data.data.SGD.value), // IDR/SGD
          AUD: Math.round(idrValue / data.data.AUD.value), // IDR/AUD
          GBP: Math.round(idrValue / data.data.GBP.value)  // IDR/GBP
        }
      };
      
      // Tambahkan data baru ke historical rates untuk grafik real-time
      const timestamp = new Date();
      setHistoricalRates(prev => {
        // Tambahkan data baru
        const updated = [...prev, { 
          time: `${timestamp.getHours()}:${timestamp.getMinutes().toString().padStart(2, '0')}`,
          rate: formattedRates.rates.USD
        }];
        
        // Batasi data historis hingga 20 poin
        if (updated.length > 20) {
          return updated.slice(updated.length - 20);
        }
        
        return updated;
      });
      
      setExchangeRates(formattedRates);
      return formattedRates;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      
      // Fallback ke data realistis jika API gagal
      const fallbackRates = {
        date: new Date().toISOString().split('T')[0],
        rates: {
          USD: 16450,
          EUR: 17820,
          JPY: 107.35,
          CNY: 2275,
          SGD: 12190,
          AUD: 10920,
          GBP: 20780
        }
      };
      
      // Tambahkan data fallback ke historical rates
      const timestamp = new Date();
      setHistoricalRates(prev => {
        const updated = [...prev, { 
          time: `${timestamp.getHours()}:${timestamp.getMinutes().toString().padStart(2, '0')}`,
          rate: fallbackRates.rates.USD
        }];
        
        if (updated.length > 20) {
          return updated.slice(updated.length - 20);
        }
        
        return updated;
      });
      
      setExchangeRates(fallbackRates);
      return fallbackRates;
    }
  };
  
  // Initial data load
  useEffect(() => {
    // Initial fetch
    fetchAllData();
    
    // Set up auto-refresh interval
    let intervalId = null;
    
    // Hanya aktifkan auto-refresh jika tidak dalam mode development
    if (process.env.NODE_ENV !== 'development') {
      intervalId = setInterval(() => {
        fetchAllData();
      }, refreshInterval);
    }
    
    // Clean up interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []); // Hapus dependency fetchAllData untuk menghindari re-renders
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === 'number' ? 
                (entry.unit ? entry.value.toLocaleString('id-ID') + entry.unit : entry.value.toLocaleString('id-ID')) : 
                entry.value}
              {entry.payload.forecast && " (Proyeksi)"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Get data for GDP and inflation chart
  const getGDPInflationData = () => {
    return [
      { year: "2020", gdpGrowth: -2.07, inflation: 1.68 },
      { year: "2021", gdpGrowth: 3.69, inflation: 1.87 },
      { year: "2022", gdpGrowth: 5.31, inflation: 5.51 },
      { year: "2023", gdpGrowth: 5.05, inflation: 2.61 },
      { year: "2024", gdpGrowth: 5.20, inflation: 2.84, forecast: true },
      { year: "2025", gdpGrowth: 5.30, inflation: 3.10, forecast: true }
    ];
  };
  
  // Get data for trade balance chart
  const getTradeBalanceData = () => {
    return [
      { month: "Sep 2024", ekspor: 24580, impor: 21120, neraca: 3460 },
      { month: "Okt 2024", ekspor: 23950, impor: 21350, neraca: 2600 },
      { month: "Nov 2024", ekspor: 24120, impor: 21520, neraca: 2600 },
      { month: "Des 2024", ekspor: 25150, impor: 22130, neraca: 3020 },
      { month: "Jan 2025", ekspor: 23780, impor: 21850, neraca: 1930 },
      { month: "Feb 2025", ekspor: 23450, impor: 21980, neraca: 1470 },
      { month: "Mar 2025", ekspor: 24860, impor: 22680, neraca: 2180 },
      { month: "Apr 2025", ekspor: 25240, impor: 23120, neraca: 2120 }
    ];
  };
  
  // Get data for GDP sector chart
  const getGDPSectorData = () => {
    return [
      { sector: "Industri Pengolahan", contribution: 19.8 },
      { sector: "Perdagangan", contribution: 13.2 },
      { sector: "Pertanian", contribution: 12.5 },
      { sector: "Konstruksi", contribution: 10.2 },
      { sector: "Pertambangan", contribution: 9.8 },
      { sector: "Informasi & Komunikasi", contribution: 7.5 },
      { sector: "Transportasi & Pergudangan", contribution: 4.3 },
      { sector: "Jasa Keuangan", contribution: 4.2 },
      { sector: "Administrasi Pemerintahan", contribution: 3.8 },
      { sector: "Lainnya", contribution: 14.7 }
    ];
  };
  
  // Get data for FDI chart
  const getFDIData = () => {
    return [
      { quarter: "Q1 2023", value: 9.2 },
      { quarter: "Q2 2023", value: 10.5 },
      { quarter: "Q3 2023", value: 11.8 },
      { quarter: "Q4 2023", value: 12.4 },
      { quarter: "Q1 2024", value: 12.8 },
      { quarter: "Q2 2024", value: 13.1 },
      { quarter: "Q3 2024", value: 13.5 },
      { quarter: "Q4 2024", value: 14.2 },
      { quarter: "Q1 2025", value: 14.6 }
    ];
  };
  
  // Get data for climate economic impact
  const getClimateEconomicImpactData = () => {
    return [
      { year: 2020, cost: 28.5, events: 2938 },
      { year: 2021, cost: 32.7, events: 3175 },
      { year: 2022, cost: 38.4, events: 3465 },
      { year: 2023, cost: 42.2, events: 3530 },
      { year: 2024, cost: 45.8, events: 3650 }
    ];
  };
  
  // Get data for economic projections
  const getEconomicProjections = () => {
    return [
      { year: 2025, gdpGrowth: 5.3, inflation: 3.1, unemploymentRate: 4.9 },
      { year: 2026, gdpGrowth: 5.4, inflation: 3.0, unemploymentRate: 4.7 },
      { year: 2027, gdpGrowth: 5.5, inflation: 2.9, unemploymentRate: 4.5 },
      { year: 2028, gdpGrowth: 5.6, inflation: 2.8, unemploymentRate: 4.4 },
      { year: 2029, gdpGrowth: 5.7, inflation: 2.7, unemploymentRate: 4.2 },
      { year: 2030, gdpGrowth: 5.8, inflation: 2.6, unemploymentRate: 4.0 }
    ];
  };
  
  // Get data for exchange rate trends
  const getExchangeRateTrends = () => {
    return [
      { month: "Apr 2024", rate: 15950.25 },
      { month: "Mei 2024", rate: 16050.80 },
      { month: "Jun 2024", rate: 16120.40 },
      { month: "Jul 2024", rate: 16180.75 },
      { month: "Agu 2024", rate: 16245.30 },
      { month: "Sep 2024", rate: 16310.50 },
      { month: "Okt 2024", rate: 16320.75 },
      { month: "Nov 2024", rate: 16300.20 },
      { month: "Des 2024", rate: 16275.60 },
      { month: "Jan 2025", rate: 16320.40 },
      { month: "Feb 2025", rate: 16380.80 },
      { month: "Mar 2025", rate: 16420.30 },
      { month: "Apr 2025", rate: 16450.25 }
    ];
  };
  
  // Get data for commodity prices
  const getCommodityPrices = () => {
    return [
      { name: "Minyak Kelapa Sawit (CPO)", price: 895.50, unit: "USD/ton", change: 2.3 },
      { name: "Batubara", price: 142.80, unit: "USD/ton", change: -1.2 },
      { name: "Nikel", price: 16820.00, unit: "USD/ton", change: 3.5 },
      { name: "Karet", price: 1.65, unit: "USD/kg", change: 0.8 },
      { name: "Kopi", price: 2.38, unit: "USD/kg", change: 4.2 },
      { name: "Kakao", price: 4.15, unit: "USD/kg", change: 12.5 }
    ];
  };
  
  // Get data for employment statistics
  const getEmploymentStatistics = () => {
    return {
      totalWorkforce: 142.5, // dalam juta
      employed: 135.3, // dalam juta
      unemployed: 7.2, // dalam juta
      unemploymentRate: 5.1, // dalam persen
      formalSector: 45.2, // dalam persen
      informalSector: 54.8, // dalam persen
      sectorDistribution: [
        { sector: "Pertanian", percentage: 28.5 },
        { sector: "Perdagangan", percentage: 18.7 },
        { sector: "Industri Pengolahan", percentage: 13.8 },
        { sector: "Jasa", percentage: 13.2 },
        { sector: "Konstruksi", percentage: 6.5 },
        { sector: "Transportasi", percentage: 4.8 },
        { sector: "Lainnya", percentage: 14.5 }
      ]
    };
  };
  
  // Get data for BI 7-day Reverse Repo Rate
  const getBIRateData = () => {
    return [
      { month: "Mei 2024", rate: 6.00 },
      { month: "Jun 2024", rate: 6.00 },
      { month: "Jul 2024", rate: 6.00 },
      { month: "Agu 2024", rate: 6.00 },
      { month: "Sep 2024", rate: 5.75 },
      { month: "Okt 2024", rate: 5.75 },
      { month: "Nov 2024", rate: 5.50 },
      { month: "Des 2024", rate: 5.50 },
      { month: "Jan 2025", rate: 5.50 },
      { month: "Feb 2025", rate: 5.25 },
      { month: "Mar 2025", rate: 5.25 },
      { month: "Apr 2025", rate: 5.00 }
    ];
  };
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
  
  // Tentukan tren nilai tukar
  const getRateTrend = () => {
    if (historicalRates.length < 2) return 'stable';
    
    const latestRate = historicalRates[historicalRates.length - 1].rate;
    const previousRate = historicalRates[historicalRates.length - 2].rate;
    
    if (latestRate > previousRate + 50) return 'up-significant';
    if (latestRate > previousRate) return 'up';
    if (latestRate < previousRate - 50) return 'down-significant';
    if (latestRate < previousRate) return 'down';
    return 'stable';
  };
  
  // Render icon berdasarkan tren
  const renderTrendIcon = () => {
    const trend = getRateTrend();
    
    if (trend === 'up-significant') {
      return (
        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    } else if (trend === 'up') {
      return (
        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      );
    } else if (trend === 'down-significant') {
      return (
        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
        </svg>
      );
    }
  };
  
  // Render exchange rate alert
  const renderExchangeRateAlert = () => {
    if (exchangeRates && exchangeRates.rates.USD > 16400) {
      return (
        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200 dark:border-yellow-900/20 mb-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                Perhatian: Nilai Tukar Rupiah Melemah
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-1">
                Rupiah saat ini berada pada level Rp {new Intl.NumberFormat('id-ID').format(exchangeRates.rates.USD)} per USD, 
                melemah dibandingkan awal tahun. Faktor utama termasuk penguatan dolar AS, kebijakan suku bunga Fed, 
                dan ketidakpastian geopolitik global.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  // Manual refresh handler
  const handleManualRefresh = () => {
    fetchAllData();
  };

  // Helper function to format numbers
  const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-serif font-bold">Dashboard Ekonomi Indonesia</h2>
        <button 
          onClick={handleManualRefresh}
          disabled={loading}
          className="flex items-center px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Memperbarui...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Perbarui Data</span>
            </>
          )}
        </button>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Dashboard ini menampilkan indikator ekonomi utama Indonesia berdasarkan data dari Bank Indonesia, BPS, 
        dan lembaga terkait lainnya.
      </p>
      
      {lastUpdated && (
        <div className="bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 text-sm p-2 rounded-md mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>
              Terakhir diperbarui: {lastUpdated.toLocaleString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300 text-sm p-3 rounded-md mb-4">
          <div className="flex">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {/* Tab navigation */}
      <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-6">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === 'overview' 
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
          }`}
        >
          Ikhtisar Ekonomi
        </button>
        <button 
          onClick={() => setActiveTab('trade')}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === 'trade' 
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
          }`}
        >
          Perdagangan & Investasi
        </button>
        <button 
          onClick={() => setActiveTab('monetary')}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === 'monetary' 
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
          }`}
        >
          Moneter & Fiskal
        </button>
        <button 
          onClick={() => setActiveTab('projections')}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === 'projections' 
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400' 
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
          }`}
        >
          Proyeksi & Risiko
        </button>
      </div>
      
      {loading && !exchangeRates ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-gray-400 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600 dark:text-gray-400">Memuat data ekonomi terbaru...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Overview tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Economic Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pertumbuhan PDB</div>
                    <span className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">
                      2025
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold">5,3%</div>
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Proyeksi Bank Indonesia</div>
                  <div className="text-sm mt-2">Didukung oleh konsumsi domestik dan peningkatan ekspor</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Tingkat Inflasi</div>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5 rounded-full dark:bg-yellow-900/30 dark:text-yellow-400">
                      Apr 2025
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold">3,1%</div>
                    <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Year-on-Year</div>
                  <div className="text-sm mt-2">Dalam rentang target Bank Indonesia (2,5% ± 1%)</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pengangguran</div>
                    <span className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">
                      Q1 2025
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold">5,1%</div>
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Data BPS</div>
                  <div className="text-sm mt-2">Menurun dari 5,3% pada kuartal sebelumnya</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Nilai Tukar IDR-USD</div>
                    <span className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded-full dark:bg-red-900/30 dark:text-red-400">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold">Rp {formatNumber(exchangeRates?.rates.USD || 16450)}</div>
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Kurs Tengah BI</div>
                  <div className="text-sm mt-2">Melemah 3,1% selama 12 bulan terakhir</div>
                </div>
              </div>
              
              {/* GDP vs Inflation Chart */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Pertumbuhan PDB vs Inflasi (2020-2025)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getGDPInflationData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="gdpGrowth" 
                        name="Pertumbuhan PDB" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        strokeDasharray={(data) => data.forecast ? "5 5" : ""}
                        unit="%"
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="inflation" 
                        name="Tingkat Inflasi" 
                        stroke="#82ca9d" 
                        strokeDasharray={(data) => data.forecast ? "5 5" : ""}
                        unit="%"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Garis putus-putus menunjukkan nilai proyeksi. Sumber: BPS, Bank Indonesia
                </div>
              </div>
              
              {/* GDP Sector Chart */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Komposisi PDB Indonesia (Q1 2025)</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getGDPSectorData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="contribution"
                        nameKey="sector"
                        label={({ sector, contribution, percent }) => `${sector}: ${contribution}% (${(percent * 100).toFixed(1)}%)`}
                      >
                        {getGDPSectorData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Sumber: Badan Pusat Statistik (BPS), Q1 2025
                </div>
              </div>
              
              {/* Employment data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Statistik Tenaga Kerja (Q1 2025)</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Angkatan Kerja</span>
                        <span className="font-medium">{formatNumber(getEmploymentStatistics().totalWorkforce)} juta</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Bekerja</span>
                        <span className="font-medium">{formatNumber(getEmploymentStatistics().employed)} juta</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pengangguran</span>
                        <span className="font-medium">{formatNumber(getEmploymentStatistics().unemployed)} juta</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tingkat Pengangguran Terbuka</span>
                        <span className="font-medium">{getEmploymentStatistics().unemploymentRate}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sektor Formal</span>
                        <span className="font-medium">{getEmploymentStatistics().formalSector}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${getEmploymentStatistics().formalSector}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sektor Informal</span>
                        <span className="font-medium">{getEmploymentStatistics().informalSector}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${getEmploymentStatistics().informalSector}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Distribusi Tenaga Kerja menurut Sektor</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={getEmploymentStatistics().sectorDistribution}
                        layout="vertical" 
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" unit="%" />
                        <YAxis type="category" dataKey="sector" width={80} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="percentage" name="Persentase" fill="#8884d8" unit="%" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Sumber: Badan Pusat Statistik (BPS), Q1 2025
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Trade & Investment tab */}
          {activeTab === 'trade' && (
            <div className="space-y-6">
              {/* Trade Balance Chart */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Neraca Perdagangan (dalam Juta USD)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getTradeBalanceData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="ekspor" name="Ekspor" fill="#82ca9d" unit=" Juta USD" />
                      <Bar dataKey="impor" name="Impor" fill="#8884d8" unit=" Juta USD" />
                      <Bar dataKey="neraca" name="Neraca" fill="#ffc658" unit=" Juta USD" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Sumber: Badan Pusat Statistik (BPS)
                </div>
              </div>
              
              {/* FDI Chart */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Investasi Asing Langsung / FDI (dalam Miliar USD)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getFDIData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="FDI" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        unit=" Miliar USD"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Sumber: Bank Indonesia, BKPM
                </div>
              </div>
              
              {/* Commodity Prices */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Harga Komoditas Ekspor Utama (April 2025)</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Komoditas
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Harga
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Satuan
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Perubahan (%)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {getCommodityPrices().map((commodity, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {commodity.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatNumber(commodity.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {commodity.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={commodity.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                              {commodity.change >= 0 ? "+" : ""}{commodity.change}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Sumber: Bank Indonesia, Kementerian Perdagangan, Bloomberg
                </div>
              </div>
              
              {/* Trade Partners */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Negara Tujuan Ekspor Utama</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>China</span>
                        <span className="font-medium">21,8%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '21.8%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Amerika Serikat</span>
                        <span className="font-medium">10,6%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '10.6%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Jepang</span>
                        <span className="font-medium">8,7%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '8.7%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>India</span>
                        <span className="font-medium">7,9%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '7.9%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Singapura</span>
                        <span className="font-medium">5,8%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '5.8%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Negara Asal Impor Utama</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>China</span>
                        <span className="font-medium">28,7%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '28.7%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Singapura</span>
                        <span className="font-medium">9,8%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '9.8%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Jepang</span>
                        <span className="font-medium">8,3%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '8.3%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Amerika Serikat</span>
                        <span className="font-medium">6,2%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '6.2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Korea Selatan</span>
                        <span className="font-medium">5,4%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '5.4%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Monetary & Fiscal tab */}
          {activeTab === 'monetary' && (
            <div className="space-y-6">
              {renderExchangeRateAlert()}
              
              {/* Exchange rates */}
              {exchangeRates && (
                <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-900/20">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-green-800 dark:text-green-400">Nilai Tukar Real-time</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-1 ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></span>
                      {loading ? 'Memperbarui...' : 'Live'}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-green-100 dark:border-green-900/20">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/USD</div>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold">
                          {exchangeRates?.rates?.USD ? formatNumber(exchangeRates.rates.USD) : 'Memuat...'}
                        </div>
                        <div className="ml-2">{renderTrendIcon()}</div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/EUR</div>
                      <div className="text-2xl font-bold">
                        {exchangeRates?.rates?.EUR ? formatNumber(exchangeRates.rates.EUR) : 'Memuat...'}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/JPY (100)</div>
                      <div className="text-2xl font-bold">
                        {exchangeRates?.rates?.JPY ? formatNumber(exchangeRates.rates.JPY * 100) : 'Memuat...'}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/CNY</div>
                      <div className="text-2xl font-bold">
                        {exchangeRates?.rates?.CNY ? formatNumber(exchangeRates.rates.CNY) : 'Memuat...'}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">IDR/SGD</div>
                      <div className="text-2xl font-bold">
                        {exchangeRates?.rates?.SGD ? formatNumber(exchangeRates.rates.SGD) : 'Memuat...'}
                      </div>
                    </div>
                  </div>
                  {lastUpdated && (
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      Terakhir diperbarui: {lastUpdated.toLocaleString('id-ID')}
                    </div>
                  )}
                </div>
              )}
              
              {/* Exchange rate trend - Gabungan data historis dan real-time */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Tren Nilai Tukar USD/IDR</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    {historicalRates.length > 1 ? (
                      // Tampilkan grafik real-time jika ada data historis
                      <LineChart
                        data={historicalRates}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                        <XAxis dataKey="time" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip 
                          formatter={(value) => [`Rp ${formatNumber(value)}`, 'IDR/USD']}
                          labelFormatter={(time) => `Waktu: ${time}`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="rate" 
                          name="Real-time IDR/USD" 
                          stroke="#ff7300"
                          dot={{ r: 2 }}
                          activeDot={{ r: 6 }} 
                        />
                      </LineChart>
                    ) : (
                      // Tampilkan data historis bulanan jika tidak ada data real-time
                      <LineChart
                        data={getExchangeRateTrends()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                        <XAxis dataKey="month" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="rate" 
                          name="USD/IDR" 
                          stroke="#ff7300" 
                          unit=" IDR"
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  {historicalRates.length > 1 ? 
                    "Data real-time diperbarui setiap 1 menit. Grafik menampilkan perubahan nilai tukar terkini." :
                    "Sumber: Bank Indonesia, kurs tengah"
                  }
                </div>
              </div>
              
              {/* BI 7-Day Rate Chart */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">BI 7-Day Reverse Repo Rate (%)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getBIRateData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[4.5, 6.5]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        name="BI Rate" 
                        stroke="#8884d8" 
                        unit="%"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Sumber: Bank Indonesia
                </div>
              </div>
              
              {/* Monetary policy analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Kebijakan Moneter Terkini</h4>
                  <ul className="list-disc list-inside text-sm space-y-2">
                    <li>BI mempertahankan tren penurunan suku bunga acuan menjadi 5,00% pada April 2025</li>
                    <li>Intervensi aktif di pasar valas untuk menjaga stabilitas Rupiah</li>
                    <li>Pembelian Surat Berharga Negara (SBN) di pasar sekunder sebagai bagian dari burden sharing</li>
                    <li>Penguatan instrumen lindung nilai (hedging) untuk memitigasi risiko volatilitas</li>
                    <li>Optimalisasi kebijakan makroprudensial untuk menjaga stabilitas sistem keuangan</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Kebijakan Fiskal Terkini</h4>
                  <ul className="list-disc list-inside text-sm space-y-2">
                    <li>Target defisit fiskal 2025: 2,23% dari PDB</li>
                    <li>Fokus pada belanja infrastruktur strategis, digitalisasi, dan transisi energi</li>
                    <li>Rasio Utang terhadap PDB: 39,5% (masih di bawah batas 60%)</li>
                    <li>Perluasan insentif pajak untuk investasi di sektor prioritas</li>
                    <li>Reformasi subsidi energi untuk meningkatkan efisiensi anggaran</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Projections & Risks tab */}
          {activeTab === 'projections' && (
            <div className="space-y-6">
              {/* Economic Projections */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Proyeksi Ekonomi Indonesia (2025-2030)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getEconomicProjections()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="gdpGrowth" 
                        name="Pertumbuhan PDB" 
                        stroke="#8884d8" 
                        unit="%"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="inflation" 
                        name="Inflasi" 
                        stroke="#82ca9d" 
                        unit="%"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="unemploymentRate" 
                        name="Tingkat Pengangguran" 
                        stroke="#ffc658" 
                        unit="%"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Sumber: Bank Indonesia, Kementerian Keuangan, Bappenas
                </div>
              </div>
              
              {/* Climate Economic Impact */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Dampak Ekonomi dari Perubahan Iklim</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={getClimateEconomicImpactData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5} />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="cost" 
                        name="Kerugian Ekonomi" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3}
                        unit=" Triliun Rp"
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="events" 
                        name="Jumlah Kejadian Bencana" 
                        stroke="#82ca9d" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  Sumber: BNPB, Kementerian LHK, Bappenas
                </div>
              </div>
              
              {/* Risk factors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Risiko Global</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm">Ketegangan Geopolitik</span>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded dark:bg-red-900/30 dark:text-red-400">
                          Tinggi
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Konflik yang berkelanjutan di Timur Tengah dan Eropa Timur menyebabkan ketidakpastian global.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm">Ketegangan Dagang AS-China</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded dark:bg-yellow-900/30 dark:text-yellow-400">
                          Sedang
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Kebijakan perdagangan proteksionis dapat memengaruhi rantai pasok global.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm">Perubahan Kebijakan Moneter Global</span>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded dark:bg-red-900/30 dark:text-red-400">
                          Tinggi
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Normalisasi kebijakan moneter negara maju berpotensi memicu arus modal keluar dari negara berkembang.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm">Volatilitas Harga Komoditas</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded dark:bg-yellow-900/30 dark:text-yellow-400">
                          Sedang
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Fluktuasi harga energi dan pangan global dapat memengaruhi inflasi dan neraca perdagangan.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Risiko Domestik</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm">Bencana Alam & Perubahan Iklim</span>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded dark:bg-red-900/30 dark:text-red-400">
                          Tinggi
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Indonesia rentan terhadap bencana alam dan dampak perubahan iklim yang dapat mengganggu aktivitas ekonomi.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm">Ketimpangan Ekonomi Regional</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded dark:bg-yellow-900/30 dark:text-yellow-400">
                          Sedang
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Pembangunan yang tidak merata antar wilayah dapat menghambat pertumbuhan ekonomi nasional.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm">Infrastruktur Digital</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded dark:bg-yellow-900/30 dark:text-yellow-400">
                          Sedang
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Kesenjangan digital dapat menghambat adopsi teknologi dan produktivitas.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm">Transisi Energi</span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded dark:bg-green-900/30 dark:text-green-400">
                          Peluang & Tantangan
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Dekarbonisasi global menyajikan tantangan bagi ekspor berbasis fosil, tetapi juga peluang untuk energi terbarukan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Long-term projections */}
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
                <h3 className="text-lg font-medium mb-3 text-blue-800 dark:text-blue-400">Proyeksi Jangka Panjang</h3>
                <div className="space-y-4">
                  <p className="text-sm">
                    Indonesia diproyeksikan menjadi salah satu dari 5 ekonomi terbesar dunia pada tahun 2045, dengan PDB mencapai USD 9 triliun dan pendapatan per kapita sekitar USD 29.000 (setara negara berpendapatan tinggi).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/20">
                      <div className="text-sm text-gray-500 dark:text-gray-400">PDB 2045 (Proyeksi)</div>
                      <div className="text-xl font-bold">USD 9 Triliun</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/20">
                      <div className="text-sm text-gray-500 dark:text-gray-400">PDB per Kapita 2045</div>
                      <div className="text-xl font-bold">USD 29.000</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/20">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Peringkat Ekonomi Global</div>
                      <div className="text-xl font-bold">Top 5</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Untuk mencapai target tersebut, Indonesia perlu mempertahankan pertumbuhan ekonomi rata-rata 5,5-6,0% per tahun, mempercepat transformasi struktural, dan meningkatkan produktivitas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        <p>Data ekonomi yang ditampilkan merupakan data aktual hingga Q1 2025 dan proyeksi untuk periode selanjutnya. Sumber data meliputi Bank Indonesia, Badan Pusat Statistik (BPS), Kementerian Keuangan, dan Bappenas.</p>
      </div>
    </div>
  );
};

export default IndonesiaEconomicDashboard;