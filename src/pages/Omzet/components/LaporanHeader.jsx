
import React, { useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import ExcelJS from 'exceljs';

export default function LaporanHeader({
  filterRange,
  setFilterRange,
  laporan,
  transaksi = [],
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const getPeriodName = (range) => {
    const periods = {
      hari_ini: 'Hari Ini',
      kemarin: 'Kemarin',
      minggu_ini: 'Minggu Ini',
      bulan_ini: 'Bulan Ini',
      semua: 'Semua Data',
    };

    return periods[range] || range;
  };

  const getCurrentDate = () => {
    return new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // FILTER TRANSAKSI BERDASARKAN PERIODE
  const filterTransaksi = () => {
    const now = new Date();

    const start = new Date(now);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    if (filterRange === 'semua') {
      return transaksi;
    }

    if (filterRange === 'kemarin') {
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
    }

    if (filterRange === 'minggu_ini') {
      const day = start.getDay();
      const difference = day === 0 ? 6 : day - 1;

      start.setDate(start.getDate() - difference);
    }

    if (filterRange === 'bulan_ini') {
      start.setDate(1);
    }

    return transaksi.filter((item) => {
      if (!item.created_at) return false;

      const tanggal = new Date(item.created_at);

      return tanggal >= start && tanggal <= end;
    });
  };

  // FORMAT STATUS
  const formatStatus = (status) => {
    if (!status) return '-';

    return String(status)
      .replaceAll('_', ' ')
      .replace(/\b\w/g, (huruf) => huruf.toUpperCase());
  };

  // STYLE HEADER TABEL
  const styleHeader = (row) => {
    row.height = 30;

    row.eachCell((cell) => {
      cell.font = {
        name: 'Arial',
        size: 10,
        bold: true,
        color: { argb: 'FFFFFFFF' },
      };

      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF402719' },
      };

      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      };

      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2DBD0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2DBD0' } },
        left: { style: 'thin', color: { argb: 'FFE2DBD0' } },
        right: { style: 'thin', color: { argb: 'FFE2DBD0' } },
      };
    });
  };

  // STYLE BARIS DATA
  const styleDataRow = (row, index) => {
    row.height = 23;

    row.eachCell((cell) => {
      cell.font = {
        name: 'Arial',
        size: 10,
        color: { argb: 'FF333333' },
      };

      cell.alignment = {
        vertical: 'middle',
        wrapText: true,
      };

      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2DBD0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2DBD0' } },
        left: { style: 'thin', color: { argb: 'FFE2DBD0' } },
        right: { style: 'thin', color: { argb: 'FFE2DBD0' } },
      };

      if (index % 2 === 0) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF4F1EA' },
        };
      }
    });
  };

  // MEMBUAT JUDUL SHEET
  const createSheetTitle = (worksheet, title, lastColumn) => {
    worksheet.mergeCells(1, 1, 1, lastColumn);

    const cell = worksheet.getCell('A1');
    cell.value = title;

    cell.font = {
      name: 'Arial',
      size: 16,
      bold: true,
      color: { argb: 'FFFFFFFF' },
    };

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF402719' },
    };

    cell.alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };

    worksheet.getRow(1).height = 38;

    worksheet.getCell('A2').value = 'Periode Laporan';
    worksheet.getCell('B2').value = getPeriodName(filterRange);

    worksheet.getCell('A3').value = 'Tanggal Unduh';
    worksheet.getCell('B3').value = getCurrentDate();

    ['A2', 'A3'].forEach((address) => {
      worksheet.getCell(address).font = {
        bold: true,
        color: { argb: 'FF402719' },
      };
    });
  };

  // DOWNLOAD EXCEL
  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const workbook = new ExcelJS.Workbook();

      workbook.creator = 'REDScan POS';
      workbook.subject = 'Laporan Omzet dan Transaksi';
      workbook.title = 'Laporan Omzet REDScan';
      workbook.created = new Date();

      const dataTransaksi = filterTransaksi().sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      // ==================================================
      // SHEET 1: RINGKASAN OMZET
      // ==================================================

      const ringkasan = workbook.addWorksheet('Ringkasan Omzet');

      ringkasan.columns = [
        { header: 'Keterangan', key: 'keterangan', width: 35 },
        { header: 'Nilai', key: 'nilai', width: 25 },
      ];

      createSheetTitle(ringkasan, 'LAPORAN OMZET REDSCAN', 2);

      const ringkasanHeader = ringkasan.getRow(5);
      ringkasanHeader.values = ['Keterangan', 'Nilai'];
      styleHeader(ringkasanHeader);

      const dataRingkasan = [
        ['Total Omzet', Number(laporan?.totalOmzet || 0), 'currency'],
        ['Total Transaksi', Number(laporan?.totalTransaksi || 0), 'number'],
        ['Rata-rata Transaksi', Number(laporan?.rataRataTransaksi || 0), 'currency'],
        ['Omzet QRIS', Number(laporan?.qrisOmzet || 0), 'currency'],
        ['Jumlah Transaksi QRIS', Number(laporan?.qrisTransaksi || 0), 'number'],
        ['Omzet Tunai', Number(laporan?.tunaiOmzet || 0), 'currency'],
        ['Jumlah Transaksi Tunai', Number(laporan?.tunaiTransaksi || 0), 'number'],
      ];

      dataRingkasan.forEach((item, index) => {
        const row = ringkasan.addRow([item[0], item[1]]);

        styleDataRow(row, index);

        row.getCell(2).font = {
          bold: true,
          color: { argb: 'FF402719' },
        };

        row.getCell(2).alignment = {
          horizontal: 'right',
          vertical: 'middle',
        };

        row.getCell(2).numFmt =
          item[2] === 'currency' ? '"Rp" #,##0' : '#,##0';
      });

      ringkasan.views = [
        {
          state: 'frozen',
          ySplit: 5,
          showGridLines: false,
        },
      ];

      // ==================================================
      // SHEET 2: DAFTAR TRANSAKSI
      // ==================================================

      const sheetTransaksi = workbook.addWorksheet('Daftar Transaksi');

      sheetTransaksi.columns = [
        { header: 'No', key: 'no', width: 7 },
        { header: 'Kode Transaksi', key: 'kode', width: 25 },
        { header: 'Nama Pelanggan', key: 'nama', width: 25 },
        { header: 'Nomor HP', key: 'hp', width: 18 },
        { header: 'Tanggal Transaksi', key: 'tanggal', width: 23 },
        { header: 'Metode Pembayaran', key: 'metode', width: 22 },
        { header: 'Status Pesanan', key: 'status', width: 18 },
        { header: 'Status Pembayaran', key: 'statusBayar', width: 22 },
        { header: 'Tanggal Pembayaran', key: 'tanggalBayar', width: 23 },
        { header: 'Total Harga', key: 'total', width: 20 },
      ];

      createSheetTitle(sheetTransaksi, 'DAFTAR TRANSAKSI REDSCAN', 10);

      const transaksiHeader = sheetTransaksi.getRow(5);
      transaksiHeader.values = [
        'No',
        'Kode Transaksi',
        'Nama Pelanggan',
        'Nomor HP',
        'Tanggal Transaksi',
        'Metode Pembayaran',
        'Status Pesanan',
        'Status Pembayaran',
        'Tanggal Pembayaran',
        'Total Harga',
      ];

      styleHeader(transaksiHeader);

      if (dataTransaksi.length > 0) {
        dataTransaksi.forEach((item, index) => {
          const row = sheetTransaksi.addRow([
            index + 1,
            item.kode_transaksi || '-',
            item.nama_pelanggan || '-',
            item.nomor_hp || '-',
            item.created_at ? new Date(item.created_at) : null,
            item.metode_pembayaran || '-',
            formatStatus(item.status),
            formatStatus(item.status_pembayaran),
            item.paid_at ? new Date(item.paid_at) : null,
            Number(item.total_harga || 0),
          ]);

          styleDataRow(row, index);

          row.getCell(5).numFmt = 'dd/mm/yyyy hh:mm';
          row.getCell(9).numFmt = 'dd/mm/yyyy hh:mm';
          row.getCell(10).numFmt = '"Rp" #,##0';

          row.getCell(10).alignment = {
            horizontal: 'right',
            vertical: 'middle',
          };
        });

        const totalRow = sheetTransaksi.addRow([
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          'TOTAL',
          {
            formula: `SUM(J6:J${dataTransaksi.length + 5})`,
          },
        ]);

        totalRow.font = { bold: true };
        totalRow.height = 27;
        totalRow.getCell(9).alignment = {
          horizontal: 'right',
          vertical: 'middle',
        };
        totalRow.getCell(10).numFmt = '"Rp" #,##0';

        totalRow.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE9E1CF' },
          };

          cell.border = {
            top: { style: 'medium', color: { argb: 'FF402719' } },
            bottom: { style: 'thin', color: { argb: 'FFE2DBD0' } },
          };
        });
      } else {
        sheetTransaksi.addRow([
          'Tidak ada transaksi pada periode ini.',
        ]);
      }

      sheetTransaksi.autoFilter = {
        from: 'A5',
        to: 'J5',
      };

      sheetTransaksi.views = [
        {
          state: 'frozen',
          ySplit: 5,
          showGridLines: false,
        },
      ];

      // ==================================================
      // SHEET 3: DETAIL MENU
      // ==================================================

      const sheetDetail = workbook.addWorksheet('Detail Menu');

      sheetDetail.columns = [
        { header: 'No', key: 'no', width: 7 },
        { header: 'Kode Transaksi', key: 'kode', width: 25 },
        { header: 'Nama Pelanggan', key: 'pelanggan', width: 25 },
        { header: 'Tanggal Transaksi', key: 'tanggal', width: 23 },
        { header: 'Nama Menu', key: 'menu', width: 28 },
        { header: 'Jumlah', key: 'jumlah', width: 12 },
        { header: 'Harga Satuan', key: 'harga', width: 20 },
        { header: 'Subtotal', key: 'subtotal', width: 20 },
      ];

      createSheetTitle(sheetDetail, 'RINCIAN MENU TRANSAKSI REDSCAN', 8);

      const detailHeader = sheetDetail.getRow(5);

      detailHeader.values = [
        'No',
        'Kode Transaksi',
        'Nama Pelanggan',
        'Tanggal Transaksi',
        'Nama Menu',
        'Jumlah',
        'Harga Satuan',
        'Subtotal',
      ];

      styleHeader(detailHeader);

      const semuaDetail = [];

      dataTransaksi.forEach((item) => {
        const daftarMenu = Array.isArray(item.detail)
          ? item.detail
          : [];

        daftarMenu.forEach((menu) => {
          semuaDetail.push({
            kode: item.kode_transaksi || '-',
            pelanggan: item.nama_pelanggan || '-',
            tanggal: item.created_at
              ? new Date(item.created_at)
              : null,
            namaMenu: menu.nama_menu || '-',
            jumlah: Number(menu.jumlah || 0),
            harga: Number(menu.harga || 0),
            subtotal: Number(menu.subtotal || 0),
          });
        });
      });

      if (semuaDetail.length > 0) {
        semuaDetail.forEach((item, index) => {
          const row = sheetDetail.addRow([
            index + 1,
            item.kode,
            item.pelanggan,
            item.tanggal,
            item.namaMenu,
            item.jumlah,
            item.harga,
            item.subtotal,
          ]);

          styleDataRow(row, index);

          row.getCell(4).numFmt = 'dd/mm/yyyy hh:mm';
          row.getCell(7).numFmt = '"Rp" #,##0';
          row.getCell(8).numFmt = '"Rp" #,##0';

          row.getCell(6).alignment = {
            horizontal: 'center',
            vertical: 'middle',
          };
        });

        const totalDetail = sheetDetail.addRow([
          '',
          '',
          '',
          '',
          'TOTAL',
          '',
          '',
          {
            formula: `SUM(H6:H${semuaDetail.length + 5})`,
          },
        ]);

        totalDetail.font = { bold: true };
        totalDetail.height = 27;
        totalDetail.getCell(8).numFmt = '"Rp" #,##0';

        totalDetail.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE9E1CF' },
          };

          cell.border = {
            top: { style: 'medium', color: { argb: 'FF402719' } },
            bottom: { style: 'thin', color: { argb: 'FFE2DBD0' } },
          };
        });
      } else {
        sheetDetail.addRow([
          'Tidak ada detail menu pada periode ini.',
        ]);
      }

      sheetDetail.autoFilter = {
        from: 'A5',
        to: 'H5',
      };

      sheetDetail.views = [
        {
          state: 'frozen',
          ySplit: 5,
          showGridLines: false,
        },
      ];

      // ==================================================
      // DOWNLOAD FILE
      // ==================================================

      const buffer = await workbook.xlsx.writeBuffer();

      const blob = new Blob(
        [buffer],
        {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }
      );

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = `Laporan-Omzet-REDScan-${filterRange}.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);

    } catch (error) {
      console.error('Gagal mengunduh laporan Excel:', error);

      alert('Gagal membuat laporan Excel. Silakan coba kembali.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#E6DFD5] bg-white p-5 shadow-xs sm:flex-row sm:items-center">

      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#1F1915]">
          Ringkasan Laporan Omzet
        </h1>

        <p className="mt-0.5 text-xs text-[#7A7167]">
          Laporan pendapatan dan statistik transaksi outlet
        </p>
      </div>

      <div className="flex w-full items-center gap-3 sm:w-auto">

        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-[#D8D1C9] bg-[#F4F1EA] px-3 py-2">
          <Calendar size={15} className="shrink-0 text-[#7A7167]" />

          <select
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
            className="w-full cursor-pointer bg-transparent text-xs font-semibold text-[#1F1915] focus:outline-none sm:w-auto"
          >
            <option value="hari_ini">Hari Ini</option>
            <option value="kemarin">Kemarin</option>
            <option value="minggu_ini">Minggu Ini</option>
            <option value="bulan_ini">Bulan Ini</option>
            <option value="semua">Semua Data</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E54322] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#D03B1C] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Download size={15} />

          <span>
            {isDownloading ? 'Membuat Excel...' : 'Unduh Laporan'}
          </span>
        </button>

      </div>
    </div>
  );
}
