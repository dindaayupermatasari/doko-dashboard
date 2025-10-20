import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export function ClusteringPage() {
  // Data untuk Cluster Produk Budidaya
  const distribusiClusterBudidaya = [
    { name: 'Cluster 0', value: 4 },
    { name: 'Cluster 1', value: 5 },
    { name: 'Cluster 2', value: 4 },
    { name: 'Cluster 3', value: 2 },
  ];

  const karakteristikBudidaya = [
    {
      cluster: '0',
      hasilPerTahun: '3.4',
      totalLahan: '3540',
      jumlahLahan: '3.4',
      metodeBudidaya: '0.6',
      metodePengolahan: '0.6',
    },
    {
      cluster: '1',
      hasilPerTahun: '3.0',
      totalLahan: '5330',
      jumlahLahan: '3.2',
      metodeBudidaya: '0.6',
      metodePengolahan: '0.2',
    },
    {
      cluster: '2',
      hasilPerTahun: '3.4',
      totalLahan: '3330',
      jumlahLahan: '3.6',
      metodeBudidaya: '0.6',
      metodePengolahan: '1.2',
    },
  ];

  const metrikBudidaya = [
    {
      model: 'Agglomerative Clustering',
      params: '{n_clusters : 4, "linkage : "ward"}',
      silhouetteScore: '0.3428',
    },
  ];

  // Data untuk Cluster Profil Pasar
  const distribusiClusterPasar = [
    { name: 'Cluster 0', value: 9 },
    { name: 'Cluster 1', value: 6 },
    { name: 'Cluster 2', value: 4 },
    { name: 'Cluster 3', value: 1 },
  ];

  const karakteristikPasar = [
    {
      cluster: '0',
      totalLahan: '7935.5535',
      hasilPerAhun: '3.333339',
      lamaBertani: '1.333339',
      mereura: '0.444',
      bentakPanyinic: '1',
    },
    {
      cluster: '1',
      totalLahan: '899.5599',
      hasilPerAhun: '0.44444',
      lamaBertani: '1.333339',
      mereura: '0.304',
      bentakPanyinic: '1',
    },
    {
      cluster: '2',
      totalLahan: '339.3559',
      hasilPerAhun: '0.23333',
      lamaBertani: '1.333333',
      mereura: '0.339',
      bentakPanyinic: '2',
    },
  ];

  const metrikPasar = [
    {
      model: 'Agglomerative Clustering',
      params: '{n_clusters : 4, "linkage: "ward"}',
      silhouetteScore: '0.4734',
    },
  ];

  // Data Petani per Cluster
  const petaniPerCluster = [
    {
      cluster: 0,
      petani: [
        { nama: 'Gatot', dusun: 'Sumberurip', produksi: '680 kg', lahan: '15.000 m²' },
        { nama: 'Bambang', dusun: 'Sumberurip', produksi: '720 kg', lahan: '18.000 m²' },
      ]
    },
    {
      cluster: 1,
      petani: [
        { nama: 'Sutrisno', dusun: 'Sumberagung', produksi: '590 kg', lahan: '12.500 m²' },
        { nama: 'Samsul', dusun: 'Sumberagung', produksi: '620 kg', lahan: '14.000 m²' },
        { nama: 'Yanto', dusun: 'Sumberurip', produksi: '650 kg', lahan: '16.000 m²' },
      ]
    },
    {
      cluster: 2,
      petani: [
        { nama: 'Hadi', dusun: 'Jawai Talu', produksi: '480 kg', lahan: '10.000 m²' },
        { nama: 'Rudi', dusun: 'Sumberurip', produksi: '580 kg', lahan: '13.000 m²' },
      ]
    },
    {
      cluster: 3,
      petani: [
        { nama: 'Agus', dusun: 'Jawai Talu', produksi: '500 kg', lahan: '11.000 m²' },
      ]
    },
  ];

  return (
    <div className="dark:text-gray-100">
      <div className="mb-8">
        <h1 className="text-[#2d5f3f] dark:text-green-400 mb-2">Clustering Analysis</h1>
        <p className="text-gray-600 dark:text-gray-300">Analisis pengelompokan berdasarkan produk budidaya dan profil pasar</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Cluster Produk Budidaya */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#2d5f3f] to-[#235231] text-white shadow-xl border-0">
            <h2 className="text-white mb-6">Cluster Produk Budidaya</h2>

            {/* Distribusi Cluster */}
            <div className="mb-8">
              <h4 className="text-white/90 mb-4">Distribusi Cluster</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={distribusiClusterBudidaya}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.8)' }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.8)' }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2d5f3f', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="value" fill="#4a7c59" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Analisis Karakteristik Cluster */}
            <div className="mb-8">
              <h4 className="text-white/90 mb-4">Analisis Karakteristik Cluster</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead className="text-white/80">Cluster</TableHead>
                      <TableHead className="text-white/80 text-center">Hasil per Tahun (kg)</TableHead>
                      <TableHead className="text-white/80 text-center">Total Lahan (m²)</TableHead>
                      <TableHead className="text-white/80 text-center">Jumlah Lahan</TableHead>
                      <TableHead className="text-white/80 text-center">Metode Budidaya</TableHead>
                      <TableHead className="text-white/80 text-center">Metode Pengolahan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {karakteristikBudidaya.map((row) => (
                      <TableRow key={row.cluster} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white">{row.cluster}</TableCell>
                        <TableCell className="text-white text-center">{row.hasilPerTahun}</TableCell>
                        <TableCell className="text-white text-center">{row.totalLahan}</TableCell>
                        <TableCell className="text-white text-center">{row.jumlahLahan}</TableCell>
                        <TableCell className="text-white text-center">{row.metodeBudidaya}</TableCell>
                        <TableCell className="text-white text-center">{row.metodePengolahan}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Evaluasi Metrik Model */}
            <div>
              <h4 className="text-white/90 mb-4">Evaluasi Metrik Model</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead className="text-white/80">Model</TableHead>
                      <TableHead className="text-white/80">Params</TableHead>
                      <TableHead className="text-white/80 text-center">Silhouette Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrikBudidaya.map((row, index) => (
                      <TableRow key={index} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white">{row.model}</TableCell>
                        <TableCell className="text-white text-sm">{row.params}</TableCell>
                        <TableCell className="text-white text-center">{row.silhouetteScore}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </div>

        {/* Cluster Profil Pasar */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-[#8b6f47] to-[#6d5737] text-white shadow-xl border-0">
            <h2 className="text-white mb-6">Cluster Profil Pasar</h2>

            {/* Distribusi Cluster */}
            <div className="mb-8">
              <h4 className="text-white/90 mb-4">Distribusi Cluster</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={distribusiClusterPasar}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.8)' }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.8)' }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#8b6f47', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="value" fill="#a78a5e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Analisis Karakteristik Cluster */}
            <div className="mb-8">
              <h4 className="text-white/90 mb-4">Analisis Karakteristik Cluster</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead className="text-white/80">Cluster</TableHead>
                      <TableHead className="text-white/80 text-center">Total Lahan (m²)</TableHead>
                      <TableHead className="text-white/80 text-center">Hasil per ahun (kg)</TableHead>
                      <TableHead className="text-white/80 text-center">Lama Bertani</TableHead>
                      <TableHead className="text-white/80 text-center">Mereura</TableHead>
                      <TableHead className="text-white/80 text-center">Bentak Panyinic</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {karakteristikPasar.map((row) => (
                      <TableRow key={row.cluster} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white">{row.cluster}</TableCell>
                        <TableCell className="text-white text-center">{row.totalLahan}</TableCell>
                        <TableCell className="text-white text-center">{row.hasilPerAhun}</TableCell>
                        <TableCell className="text-white text-center">{row.lamaBertani}</TableCell>
                        <TableCell className="text-white text-center">{row.mereura}</TableCell>
                        <TableCell className="text-white text-center">{row.bentakPanyinic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Evaluasi Metrik Model */}
            <div>
              <h4 className="text-white/90 mb-4">Evaluasi Metrik Model</h4>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead className="text-white/80">Model</TableHead>
                      <TableHead className="text-white/80">Params</TableHead>
                      <TableHead className="text-white/80 text-center">Silhouette Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrikPasar.map((row, index) => (
                      <TableRow key={index} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white">{row.model}</TableCell>
                        <TableCell className="text-white text-sm">{row.params}</TableCell>
                        <TableCell className="text-white text-center">{row.silhouetteScore}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Petani per Cluster */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-md border-0 mb-6">
        <h2 className="text-gray-900 dark:text-gray-100 mb-6">Daftar Petani per Cluster</h2>
        <div className="grid grid-cols-2 gap-6">
          {petaniPerCluster.map((item) => (
            <Card key={item.cluster} className="p-5 bg-gradient-to-br from-green-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 border border-[#2d5f3f]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2d5f3f] to-[#4a7c59] rounded-xl flex items-center justify-center">
                  <span className="text-white">{item.cluster}</span>
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-gray-100">Cluster {item.cluster}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.petani.length} Petani</p>
                </div>
              </div>
              <div className="space-y-2">
                {item.petani.map((petani, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-gray-900 dark:text-gray-100">{petani.nama}</p>
                      <Badge className="bg-[#2d5f3f] text-white hover:bg-[#2d5f3f] text-xs">
                        {petani.produksi}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">📍 {petani.dusun}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">🌾 Lahan: {petani.lahan}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md border-0">
          <h4 className="text-gray-600 dark:text-gray-300 mb-2">Total Cluster Produk</h4>
          <p className="text-[#2d5f3f] dark:text-green-400 mb-1">4 Clusters</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Score: 0.3428</p>
        </Card>
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md border-0">
          <h4 className="text-gray-600 dark:text-gray-300 mb-2">Total Cluster Pasar</h4>
          <p className="text-[#2d5f3f] dark:text-green-400 mb-1">4 Clusters</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Score: 0.4734</p>
        </Card>
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-md border-0">
          <h4 className="text-gray-600 dark:text-gray-300 mb-2">Model Terbaik</h4>
          <p className="text-[#2d5f3f] dark:text-green-400 mb-1">Agglomerative</p>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Ward Linkage</Badge>
        </Card>
      </div>
    </div>
  );
}
