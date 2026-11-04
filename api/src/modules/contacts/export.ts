import ExcelJS from 'exceljs';

import type { ContactRepository } from '#app/modules/contacts/repository';

const chunkSize = 500;

export async function exportContacts(repository: ContactRepository): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Contacts');

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Имя', key: 'name', width: 30 },
    { header: 'Телефон', key: 'phone', width: 20 },
    { header: 'Откуда', key: 'from', width: 30 },
    { header: 'Дата создания', key: 'createdAt', width: 24 },
  ];

  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0E0E0' } };

  const upperBound = await repository.exportUpperBound();
  let afterId = 0;

  while (afterId < upperBound) {
    const batch = await repository.exportBatch(afterId, upperBound, chunkSize);
    if (batch.length === 0) break;
    for (const contact of batch) {
      worksheet.addRow({
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        from: contact.from ?? '',
        createdAt: contact.createdAt.toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' }),
      });
      afterId = contact.id;
    }
  }

  return Buffer.from(await workbook.xlsx.writeBuffer());
}
