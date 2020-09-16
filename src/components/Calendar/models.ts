export interface ListData {
  eventTime: string;
  type: 'error' | 'default' | 'warning' | 'success' | 'processing';
  content: string;
}
