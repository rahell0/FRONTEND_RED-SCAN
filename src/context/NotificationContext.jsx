
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Trash2,
} from 'lucide-react';

import API from '../services/api';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [dialog, setDialog] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const toastId = useRef(0);
  const resolver = useRef(null);

  // ==========================================
  // MENGAMBIL JUMLAH NOTIFIKASI BELUM DIBACA
  // ==========================================
  const refreshUnreadCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('redscan_token');

      if (!token) {
        setUnreadCount(0);
        return;
      }

      const response = await API.get('/notifikasi/belum-dibaca');

      if (response.data.success === true) {
        setUnreadCount(Number(response.data.jumlah) || 0);
      }
    } catch (error) {
      console.error(
        'Gagal mengambil jumlah notifikasi belum dibaca:',
        error
      );
    }
  }, []);

  // ==========================================
  // MEMPERBARUI JUMLAH NOTIFIKASI OTOMATIS
  // ==========================================
  useEffect(() => {
    refreshUnreadCount();

    const interval = setInterval(() => {
      refreshUnreadCount();
    }, 15000);

    const handleFocus = () => {
      refreshUnreadCount();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshUnreadCount]);

  // ==========================================
  // MENAMPILKAN NOTIFIKASI TOAST
  // ==========================================
  const notify = useCallback(
    (message, type = 'success', title) => {
      const id = ++toastId.current;

      const titles = {
        success: 'Berhasil',
        error: 'Terjadi Kesalahan',
        warning: 'Perhatian',
        info: 'Informasi',
      };

      const newToast = {
        id,
        type,
        title: title || titles[type] || 'Informasi',
        message: String(message),
      };

      setToasts((previous) => [...previous, newToast]);

      return id;
    },
    []
  );

  // ==========================================
  // MENGHAPUS NOTIFIKASI TOAST
  // ==========================================
  const dismiss = useCallback((id) => {
    setToasts((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }, []);

  // ==========================================
  // MENGGANTI ALERT BROWSER MENJADI TOAST
  // ==========================================
  useEffect(() => {
    const originalAlert = window.alert;

    window.alert = (message) => {
      const text = String(message);
      const lowerText = text.toLowerCase();

      let type = 'info';
      let title = 'Informasi REDScan';

      if (
        lowerText.includes('berhasil') ||
        lowerText.includes('sukses') ||
        lowerText.includes('ditambahkan') ||
        lowerText.includes('diperbarui') ||
        lowerText.includes('dihapus')
      ) {
        type = 'success';
        title = 'Berhasil';
      } else if (
        lowerText.includes('gagal') ||
        lowerText.includes('error') ||
        lowerText.includes('kesalahan')
      ) {
        type = 'error';
        title = 'Terjadi Kesalahan';
      } else if (
        lowerText.includes('peringatan') ||
        lowerText.includes('harap') ||
        lowerText.includes('wajib') ||
        lowerText.includes('belum')
      ) {
        type = 'warning';
        title = 'Perhatian';
      }

      notify(text, type, title);
    };

    return () => {
      window.alert = originalAlert;
    };
  }, [notify]);

  // ==========================================
  // KONFIRMASI DIALOG REDSCAN
  // ==========================================
  const confirm = useCallback(
    ({
      title = 'Konfirmasi',
      message = 'Apakah kamu yakin ingin melanjutkan?',
      confirmText = 'Ya, Lanjutkan',
      cancelText = 'Batal',
      danger = false,
    } = {}) => {
      return new Promise((resolve) => {
        if (resolver.current) {
          resolver.current(false);
        }

        resolver.current = resolve;

        setDialog({
          title,
          message,
          confirmText,
          cancelText,
          danger,
        });
      });
    },
    []
  );

  // ==========================================
  // MENUTUP DIALOG
  // ==========================================
  const closeDialog = useCallback((result) => {
    setDialog(null);

    if (resolver.current) {
      resolver.current(result);
      resolver.current = null;
    }
  }, []);

  // ==========================================
  // MEMBERSIHKAN RESOLVER
  // ==========================================
  useEffect(() => {
    return () => {
      if (resolver.current) {
        resolver.current(false);
        resolver.current = null;
      }
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notify,
        confirm,
        dismiss,
        unreadCount,
        refreshUnreadCount,
      }}
    >
      {children}

      {/* AREA NOTIFIKASI GLOBAL */}
      <div className="pointer-events-none fixed right-4 top-4 z-[200] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => dismiss(toast.id)}
          />
        ))}
      </div>

      {/* DIALOG KONFIRMASI GLOBAL */}
      {dialog && (
        <ConfirmDialog
          dialog={dialog}
          onClose={() => closeDialog(false)}
          onConfirm={() => closeDialog(true)}
        />
      )}
    </NotificationContext.Provider>
  );
}

// ==========================================
// KOMPONEN TOAST
// ==========================================
function ToastItem({ toast, onClose }) {
  const [visible, setVisible] = useState(false);
  const closeCallback = useRef(onClose);

  useEffect(() => {
    closeCallback.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 20);

    const closeTimer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        closeCallback.current();
      }, 250);
    }, 3500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [toast.id]);

  const configurations = {
    success: {
      icon: CheckCircle2,
      color: 'text-emerald-600',
      background: 'bg-emerald-50',
      progress: 'bg-emerald-500',
    },

    error: {
      icon: AlertCircle,
      color: 'text-red-600',
      background: 'bg-red-50',
      progress: 'bg-red-500',
    },

    warning: {
      icon: AlertTriangle,
      color: 'text-amber-600',
      background: 'bg-amber-50',
      progress: 'bg-amber-500',
    },

    info: {
      icon: Info,
      color: 'text-[#648F94]',
      background: 'bg-[#648F94]/10',
      progress: 'bg-[#648F94]',
    },
  };

  const config =
    configurations[toast.type] || configurations.info;

  const Icon = config.icon;

  return (
    <div
      role="status"
      className={`pointer-events-auto overflow-hidden rounded-2xl border border-[#EAE5DF] bg-white shadow-[0_12px_40px_rgba(35,27,23,0.12)] transition-all duration-300 ${
        visible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-8 opacity-0'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.background} ${config.color}`}
        >
          <Icon size={21} />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold text-[#231B17]">
            {toast.title}
          </p>

          <p className="mt-1 break-words text-xs leading-relaxed text-gray-500">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setVisible(false);
            setTimeout(() => closeCallback.current(), 200);
          }}
          aria-label="Tutup notifikasi"
          className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      </div>

      <div className="h-[3px] w-full bg-gray-100">
        <div
          className={`h-full w-full origin-left animate-[notification-progress_3.5s_linear_forwards] ${config.progress}`}
        />
      </div>
    </div>
  );
}

// ==========================================
// KOMPONEN DIALOG KONFIRMASI
// ==========================================
function ConfirmDialog({ dialog, onClose, onConfirm }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleConfirm = () => {
    if (isClosing) return;

    setIsClosing(true);
    onConfirm();
  };

  const handleClose = () => {
    if (isClosing) return;

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[210] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        className="w-full max-w-sm animate-in zoom-in-95 fade-in rounded-2xl border border-[#EAE5DF] bg-white p-6 shadow-2xl duration-200"
      >
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
            dialog.danger
              ? 'bg-red-50 text-red-600'
              : 'bg-[#F4F1EA] text-[#402719]'
          }`}
        >
          {dialog.danger ? (
            <Trash2 size={23} />
          ) : (
            <AlertTriangle size={23} />
          )}
        </div>

        <h3 className="text-base font-bold text-[#231B17]">
          {dialog.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {dialog.message}
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            {dialog.cancelText}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className={`rounded-xl px-4 py-2.5 text-xs font-semibold text-white transition ${
              dialog.danger
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#402719] hover:bg-[#2F1D13]'
            }`}
          >
            {dialog.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CUSTOM HOOK
// ==========================================
export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification harus digunakan di dalam NotificationProvider.'
    );
  }

  return context;
}
