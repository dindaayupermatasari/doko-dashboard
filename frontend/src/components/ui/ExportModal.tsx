import React from 'react';
import { Button } from './button'; // Perbaikan import Button

interface ExportModalProps {
    onClose: () => void;
    onExport: (format: 'csv' | 'xlsx') => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ onClose, onExport }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Pilih Format Ekspor</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="Tutup">
                        <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
                    </Button>
                </div>

                <p className="text-sm text-gray-600 mb-5">Pilih format file yang Anda inginkan. Filter yang sedang aktif akan diterapkan pada hasil ekspor.</p>
                
                <div className="space-y-3">
                    <Button 
                        className="w-full bg-green-700 hover:bg-green-800 text-white gap-2" 
                        onClick={() => onExport('xlsx')}
                    >
                        <FileExcel className="w-4 h-4" /> Ekspor ke Excel (XLSX)
                    </Button>
                    <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2" 
                        onClick={() => onExport('csv')}
                    >
                        <FileText className="w-4 h-4" /> Ekspor ke CSV
                    </Button>
                </div>
                
                <Button 
                    variant="outline" 
                    className="w-full mt-4 border-gray-300 hover:bg-gray-50" 
                    onClick={onClose}
                >
                    Batal
                </Button>
            </div>
        </div>
    );
};
