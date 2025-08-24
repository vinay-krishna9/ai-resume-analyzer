declare module "pdf-parse" {
  interface PDFInfo {
    PDFFormatVersion: string;
    IsAcroFormPresent: boolean;
    IsXFAPresent: boolean;
    [key: string]: any;
  }

  interface PDFMetadata {
    metadata: string;
    [key: string]: any;
  }

  interface PDFResult {
    numpages: number;
    numrender: number;
    info: PDFInfo;
    metadata: PDFMetadata;
    text: string;
    version: string;
  }

  function pdf(dataBuffer: Buffer): Promise<PDFResult>;

  export = pdf;
}
