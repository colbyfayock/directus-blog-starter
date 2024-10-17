export interface Block {
  id: string;
  type: string;
  data: {
    text: string;
    level?: number;
  };
}