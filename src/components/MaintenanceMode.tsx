'use client';

import { useState, useEffect } from 'react';

export default function MaintenanceMode() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  
  useEffect(() => {
    // Verificar se está em modo manutenção
    const maintenance = localStorage.getItem('maintenance-mode') === 'true';
    setIsMaintenanceMode(maintenance);
  }, []);

  // Atalho secreto: Ctrl + Shift + M
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        const senha = prompt('Digite a senha para desativar o modo manutenção:');
        if (senha === 'JP2024') {
          localStorage.removeItem('maintenance-mode');
          setIsMaintenanceMode(false);
          window.location.reload();
        } else if (senha !== null) {
          alert('Senha incorreta!');
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!isMaintenanceMode) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-4 text-center">
        <div className="text-6xl mb-4">🔧</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Site em Manutenção
        </h1>
        <p className="text-gray-600 mb-6">
          Estamos realizando melhorias em nosso sistema. 
          Em breve estaremos de volta com novidades!
        </p>
        <div className="text-sm text-gray-500 mb-4">
          Para suporte: contato@jptraslados.com
        </div>
        <div className="text-xs text-gray-400 border-t pt-4">
          ⚠️ Site temporariamente indisponível
        </div>
      </div>
    </div>
  );
} 