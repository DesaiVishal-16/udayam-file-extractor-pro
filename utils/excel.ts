
import { TableData } from '../types';

/**
 * Professional Excel generation utility.
 * Optimised for Udayam AI Labs to handle massive multi-page table datasets.
 * Includes advanced sanitization to meet Excel's strict sheet naming constraints.
 */
export const generateExcel = async (tables: TableData[]) => {
  if (!tables || tables.length === 0) {
    alert('No table data found to export.');
    return;
  }

  try {
    // Dynamically load SheetJS from a reliable CDN
    const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs');
    
    const wb = XLSX.utils.book_new();
    const usedNames = new Set<string>();
    let totalSheets = 0;

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      
      // Data validation: ensure rows exist and are valid
      if (!table.rows || !Array.isArray(table.rows) || table.rows.length === 0) {
        continue;
      }

      // 1. Precise Sheet Name Sanitization
      // Excel sheets cannot:
      // - Contain characters: \ / ? * [ ] :
      // - Be empty or longer than 31 characters
      // - Start or end with an apostrophe (')
      let baseName = (table.tableName || `Table ${i + 1}`)
        .replace(/[\[\]\*\/\?\:\\\+]/g, ' ') // Remove illegal chars
        .trim()                            // Trim leading/trailing whitespace
        .replace(/^'+|'+$/g, '')            // CRITICAL: Remove leading/trailing apostrophes
        .replace(/\s+/g, ' ');             // Collapse multiple spaces

      // Fallback if sanitization results in an empty string
      let sheetName = baseName.substring(0, 31) || `Table ${i + 1}`;
      
      // Final check for leading/trailing apostrophe after substring (unlikely but safe)
      sheetName = sheetName.replace(/^'+|'+$/g, '') || `Table ${i + 1}`;
      
      // 2. Resolve Name Collisions (Common in multi-page docs)
      let finalName = sheetName;
      let collisionCounter = 1;
      while (usedNames.has(finalName.toLowerCase())) {
        const suffix = `-${collisionCounter}`;
        // Ensure name + suffix <= 31 chars
        const availableSpace = 31 - suffix.length;
        finalName = sheetName.substring(0, availableSpace).replace(/^'+|'+$/g, '') + suffix;
        collisionCounter++;
      }
      usedNames.add(finalName.toLowerCase());
      
      // 3. Ultra-Safe Data Mapping
      // Force everything to string to prevent library-level type crashes with complex AI outputs
      const headers = (table.headers || []).map(h => h == null ? "" : String(h));
      const rows = table.rows.map(row => 
        (Array.isArray(row) ? row : []).map(cell => cell == null ? "" : String(cell))
      );
      
      const wsData = [headers, ...rows];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      
      // Add auto-filter for professional touch
      if (headers.length > 0) {
        ws['!autofilter'] = { ref: XLSX.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: headers.length - 1, r: rows.length } }) };
      }

      XLSX.utils.book_append_sheet(wb, ws, finalName);
      totalSheets++;
    }
    
    if (totalSheets === 0) {
      alert('The extraction did not yield any valid tabular data to save.');
      return;
    }
    
    // Set Metadata
    wb.Props = {
      Title: "Udayam AI Labs - Table Extraction",
      Author: "Table Extractor Pro",
      Company: "Udayam AI Labs",
      CreatedDate: new Date()
    };
    
    // Generate file
    XLSX.writeFile(wb, `Udayam_Data_Export_${Date.now()}.xlsx`);
  } catch (error: any) {
    console.error('Critical Excel Generation Error:', error);
    alert(`Failed to generate Excel file: ${error.message || 'The data structure may be too complex.'} Please try a document with fewer pages if the problem persists.`);
  }
};
