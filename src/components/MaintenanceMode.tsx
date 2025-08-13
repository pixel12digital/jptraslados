'use client';

export default function MaintenanceMode() {
  // 🔧 SIMPLES: Mude para true para ativar manutenção, false para desativar
  const isMaintenanceMode = true; // ← MUDAR AQUI: true = manutenção, false = site normal
  
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