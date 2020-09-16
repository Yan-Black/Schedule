export interface ListData {
  type: 'error' | 'default' | 'warning' | 'success' | 'processing';
  content: string;
}
