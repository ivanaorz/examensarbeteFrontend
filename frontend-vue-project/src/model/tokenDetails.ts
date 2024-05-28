export interface TokenPayload {
    exp: number; 
    iat: number; 
    sub: number; 
    author_name: string; 
  }
  
  export interface TokenDetails {
    token: string; // Encoded JWT token
    payload: TokenPayload; // Decoded token payload
  }