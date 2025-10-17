export interface CurrentReadResponse {
  currentRead?: string;
  attrs?: string;
}

export interface WordSearchResponse {
  search: string[][];
  words: string[];
}

export interface WordSearchPayload {
  words: string[];
}
