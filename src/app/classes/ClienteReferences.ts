export class ClientReference{
  redPackReference: string;
  fedExReference: string;
  paquetexpressReference: string;

  constructor( _redPack: string, _fedEx: string, _paquetexpress: string) {
    this.redPackReference = _redPack;
    this.fedExReference = _fedEx;
    this.paquetexpressReference = _paquetexpress;
  }
}
