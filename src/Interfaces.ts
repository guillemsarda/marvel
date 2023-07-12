export interface IHashify {
  Digest: string;
  DigestEnc: string;
  Key: string;
  Type: string;
}

export interface IMedia {
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
  returned: number;
}

export interface IReference {
  type: string;
  url: string;
}

export interface ICharacters {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: IMedia;
  series: IMedia;
  stories: IMedia;
  events: IMedia;
  urls: IReference[];
}

export interface ISimpleChar {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface IErrorResponse {
  code: number;
  status: string;
}

export interface IMarvelResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: ICharacters[];
  };
}
