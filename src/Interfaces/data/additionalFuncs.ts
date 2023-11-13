export interface ContentObjectType {
  name: string;
  priority: number;
  kind: string;
  source: string;
}

export interface GetContentResType {
  data: ContentObjectType[];
}
