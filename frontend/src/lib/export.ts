import { reportService } from '@/services/report.service';
import { ReportFilters } from '@/types/reports';
import { toast } from 'sonner';

export async function downloadReport(reportName: string, format: 'csv' | 'excel' | 'pdf', filters?: ReportFilters) {
  if (format === 'pdf') {
    toast.error('PDF Export', { description: 'PDF export is not supported for this report.' });
    return;
  }

  toast.info(`Preparing ${format.toUpperCase()} export...`);
  try {
    let blob: Blob;
    const extension = format === 'excel' ? 'xls' : 'csv';
    const filename = `${reportName}_report_${new Date().toISOString().split('T')[0]}.${extension}`;

    if (format === 'csv') {
      blob = await reportService.exportCSV(reportName, filters);
    } else {
      blob = await reportService.exportExcel(reportName, filters);
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success(`${format.toUpperCase()} exported successfully!`);
  } catch (err) {
    toast.error('Export Failed', { description: 'Failed to download the report.' });
  }
}
