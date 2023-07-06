export interface IGallery {
  id?: string;
  title: string;
  description: string;
  body: string;
  language: string;
  public?: boolean;
}
export interface IGallerySearchParams {
  title?: string;
  description?: string;
  public?: boolean;
}
