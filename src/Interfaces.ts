export interface IHashify {
  Digest: string;
  DigestEnc: string;
  Key: string;
  Type: string;
}

export interface ICharacters {
  name: string;
}

export interface IErrorResponse {
  code: string;
  status: string;
}
