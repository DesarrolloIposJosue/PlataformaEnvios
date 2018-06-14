export class ObjectExcel{
  public Folio_guia_creada: number;
  public Paqueteria: string;
  public Nombre_Producto:string;
  public Precio_total: number;
  public Monto_asegurado: number;
  public Costo_seguro: number;
  public Monto_kilo_extra: number;
  public Detalles_de_la_cotizacion: string;

  public Nombre_cliente_origen:string;
  public Compania_origen: string;
  public Pais_origen: string;
  public Estado_origen: string;
  public Ciudad_origen: string;
  public Codigo_postal_origen: number;
  public Colonia_origen: string;
  public Direccion_origen: string;
  public Entre_calles_origen: string;
  public Numero_telefonico_origen:string;

  public Nombre_cliente_destino:string;
  public Compania_destino: string;
  public Pais_destino: string;
  public Estado_destino: string;
  public Ciudad_destino: string;
  public Codigo_postal_destino: number;
  public Colonia_destino: string;
  public Direccion_destino: string;
  public Entre_calles_destino: string;
  public Numero_telefonico_destino:string;

  public Numero_de_rastreo:string;
  public Estatus:string;

  public Peso:number;
  public Largo: number;
  public Ancho: number;
  public Alto: number;

  public Fecha_creacion: string;

  public Multipieza: string; //contiene si o no

  constructor(_folioGuia:number, _paqueteria:string, _nombreProducto:string, _precioTotal:number, _detallesCotizacion:string,
    _nombreClienteOrigen:string, _companiaOrigen:string, _paisOrigen:string, _estadoOrigen:string, _ciudadOrigen:string, _cpOrigen:number,
    _coloniaOrigen:string, _direccionOrigen:string, _entreCallesOrigen:string, _numTelefonicoOrigen:string,
    _nombreClienteDestino:string, _companiaDestino:string, _paisDestino:string, _estadoDestino:string, _ciudadDestino:string, _cpDestino:number,
    _coloniaDestino:string, _direccionDestino:string, _entreCallesDestino:string, _numTelefonicoDestino:string,
    _numRastreo:string, _estatus:string, _peso:number, _largo:number, _ancho:number, _alto:number, _montoSeguro:number,
    _fecha:string, _multipieza:string, _monto_kilo_extra:number, _costoSeguro:number){

      this.Folio_guia_creada = _folioGuia;
      this.Paqueteria = _paqueteria,
      this.Nombre_Producto = _nombreProducto;
      this.Precio_total = _precioTotal;
      this.Monto_asegurado = _montoSeguro;
      this.Costo_seguro = _costoSeguro;
      this.Monto_kilo_extra = _monto_kilo_extra;
      this.Detalles_de_la_cotizacion = _detallesCotizacion;

      this.Nombre_cliente_origen = _nombreClienteOrigen;
      this.Compania_origen = _companiaOrigen;
      this.Pais_origen = _paisOrigen;
      this.Estado_origen = _estadoOrigen;
      this.Ciudad_origen = _ciudadOrigen;
      this.Codigo_postal_origen = _cpOrigen;
      this.Colonia_origen = _coloniaOrigen;
      this.Direccion_origen = _direccionOrigen;
      this.Entre_calles_origen = _entreCallesOrigen;
      this.Numero_telefonico_origen = _numTelefonicoOrigen;

      this.Nombre_cliente_destino = _nombreClienteDestino;
      this.Compania_destino = _companiaDestino;
      this.Pais_destino = _paisDestino;
      this.Estado_destino = _estadoDestino;
      this.Ciudad_destino = _ciudadDestino;
      this.Codigo_postal_destino = _cpDestino;
      this.Colonia_destino = _coloniaDestino;
      this.Direccion_destino = _direccionDestino;
      this.Entre_calles_destino = _entreCallesDestino;
      this.Numero_telefonico_destino = _numTelefonicoDestino;

      this.Peso = _peso;
      this.Largo = _largo;
      this.Ancho = _ancho;
      this.Alto = _alto;

      this.Fecha_creacion = _fecha;

      this.Multipieza = _multipieza;

  }
}
