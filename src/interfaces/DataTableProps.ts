import { Column } from "./Column";

export interface DataTableProps {
    columns: Column[];
    rows?: Record<string, string>[];
    endpoint: string;
    adjustRow?: (row: any) => any;
  }