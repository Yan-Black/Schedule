export interface ListItem {
  title: string;
  name: string;
  options: string[];
  icon: () => JSX.Element;
}
