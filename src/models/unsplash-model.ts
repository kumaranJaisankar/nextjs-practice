export interface UnsplashModel {
  width: number;
  height: number;
  description: string;
  urls: Urls;
  user: User;
}

export interface Urls {
  raw: string;
}

export interface User {
  username: string;
}

export interface UnsplashSearchModel {
  results: UnsplashModel[];
}
